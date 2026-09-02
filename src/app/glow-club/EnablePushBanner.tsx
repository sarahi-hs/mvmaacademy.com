"use client";

import { useEffect, useState } from "react";

// Envuelve una promesa con timeout — evita quedarse esperando eternamente
// en steps de push notifications que pueden colgarse en iOS Safari.
function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} (timeout ${ms / 1000}s)`)), ms)
    ),
  ]);
}

/**
 * Espera a que el registration tenga un service worker en estado 'activated'.
 * Alternativa robusta a navigator.serviceWorker.ready, que se cuelga
 * indefinidamente en iOS si el SW quedó en estado 'installing' o
 * 'redundant'. Aquí escuchamos los cambios de estado del worker directamente.
 */
function waitForActiveWorker(
  reg: ServiceWorkerRegistration,
  timeoutMs: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (reg.active) {
      resolve();
      return;
    }
    const timer = setTimeout(() => {
      reject(new Error(`El service worker no se activó (timeout ${timeoutMs / 1000}s)`));
    }, timeoutMs);

    const check = () => {
      if (reg.active) {
        clearTimeout(timer);
        resolve();
      }
    };
    const attach = (worker: ServiceWorker | null) => {
      if (!worker) return;
      worker.addEventListener("statechange", check);
    };
    attach(reg.installing);
    attach(reg.waiting);
    attach(reg.active);
    reg.addEventListener("updatefound", () => {
      attach(reg.installing);
    });
  });
}

// Convierte la VAPID public key (base64url) al ArrayBuffer que necesita
// pushManager.subscribe(). Requisito de la Web Push API.
// Devolvemos ArrayBuffer (no Uint8Array) para que TypeScript no se queje
// con la firma tipada de applicationServerKey.
function urlBase64ToArrayBuffer(base64: string): ArrayBuffer {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const buffer = new ArrayBuffer(raw.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < raw.length; i++) view[i] = raw.charCodeAt(i);
  return buffer;
}

type UiState =
  | "loading"          // aún verificando qué tiene el browser
  | "unsupported"      // este browser no soporta push (iOS viejo, etc.)
  | "not-installed"    // iOS sin PWA instalada — la única forma de pushes es instalar
  | "denied"           // ya rechazó permisos en el pasado
  | "prompt"           // aún no ha decidido — mostramos botón
  | "subscribed"       // ya tiene notificaciones activas
  | "loading-action";  // spinner mientras subscribimos/desubscribimos

export default function EnablePushBanner() {
  const [state, setState] = useState<UiState>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void detectState();
  }, []);

  async function detectState() {
    setError(null);
    if (typeof window === "undefined") return;

    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setState("unsupported");
      return;
    }

    // iOS solo permite push si la PWA está instalada (standalone mode)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    if (isIOS && !isStandalone) {
      setState("not-installed");
      return;
    }

    if (Notification.permission === "denied") {
      setState("denied");
      return;
    }

    try {
      const reg = await navigator.serviceWorker.getRegistration("/glow-club/");
      const existing = await reg?.pushManager.getSubscription();
      if (existing && Notification.permission === "granted") {
        setState("subscribed");
        return;
      }
    } catch {
      // ignoramos, cae al prompt
    }
    setState("prompt");
  }

  async function enablePush() {
    setError(null);
    const vapid = process.env.NEXT_PUBLIC_GLOW_VAPID_PUBLIC_KEY;
    if (!vapid) {
      setError("Falta configurar las notificaciones. Contacta a Sarahi.");
      return;
    }

    // 🍎 CRÍTICO PARA iOS: la petición de permiso DEBE ir primero,
    // sincrónica al click. Si metemos awaits antes (como registrar el SW),
    // iOS pierde el "contexto de click" y la petición se cuelga en silencio.
    // requestPermission() se llama inmediatamente, sin awaits previos.
    let permission: NotificationPermission;
    try {
      permission = await Notification.requestPermission();
    } catch (err) {
      console.error("[push] requestPermission threw", err);
      setError("Tu navegador no permite notificaciones aquí.");
      return;
    }
    if (permission !== "granted") {
      setState(permission === "denied" ? "denied" : "prompt");
      return;
    }

    // Ya con permiso concedido, ahora sí podemos hacer el resto async
    setState("loading-action");
    try {
      // Registro fresco: si había un SW anterior en estado raro (colgado
      // en 'installing' desde un intento previo), lo desregistramos para
      // arrancar limpio. Esto arregla el clásico "El service worker no
      // se activó" en iOS que persiste hasta reinstalar la PWA.
      const existing = await navigator.serviceWorker.getRegistration("/glow-club/");
      if (existing && !existing.active) {
        // No hay SW activo — probablemente uno viejo colgado
        await existing.unregister();
      }

      const reg = await withTimeout(
        navigator.serviceWorker.register("/glow-club/sw.js", {
          scope: "/glow-club/",
          updateViaCache: "none", // no cachear el SW file — siempre fresco
        }),
        10000,
        "El service worker no cargó"
      );

      // Esperar a que haya un worker activo. En vez de serviceWorker.ready
      // (que puede colgarse indefinidamente en iOS), miramos directamente
      // el estado del registration. Si está installing/waiting, esperamos
      // que transicione a 'activated'.
      await waitForActiveWorker(reg, 10000);

      // Refrescar el registration porque el activo puede haber cambiado
      const readyReg =
        (await navigator.serviceWorker.getRegistration("/glow-club/")) || reg;

      // Subscribe al push service
      const sub = await withTimeout(
        readyReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToArrayBuffer(vapid),
        }),
        15000,
        "El push service no respondió (revisa tu conexión)"
      );
      const raw = sub.toJSON();
      const p256dh = raw.keys?.p256dh;
      const auth = raw.keys?.auth;
      if (!raw.endpoint || !p256dh || !auth) {
        throw new Error("Subscripción sin datos");
      }

      const res = await fetch("/api/glow-club/push/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          endpoint: raw.endpoint,
          keys: { p256dh, auth },
          userAgent: navigator.userAgent,
        }),
      });
      if (!res.ok) {
        throw new Error("El servidor rechazó la subscripción");
      }
      setState("subscribed");
    } catch (err) {
      console.error("[push] enablePush error", err);
      setError(err instanceof Error ? err.message : "No se pudo activar");
      setState("prompt");
    }
  }

  async function disablePush() {
    setState("loading-action");
    try {
      const reg = await navigator.serviceWorker.getRegistration("/glow-club/");
      const sub = await reg?.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/glow-club/push/unsubscribe", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setState("prompt");
    } catch {
      setState("subscribed");
    }
  }

  if (state === "loading" || state === "subscribed" || state === "unsupported") {
    // subscribed + unsupported: no mostramos nada (ya está o no aplica)
    // loading: espera silenciosa
    return null;
  }

  return (
    <div className="mt-5 rounded-2xl border border-[#F4D4D4] bg-[#F4D4D4]/30 p-4">
      <div className="flex items-start gap-3">
        <span className="text-lg" aria-hidden>🔔</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-[#3D1A1F]">
            Activa recordatorios diarios
          </p>
          {/* prompt: sin subtexto, solo el título + botón para no dar contexto */}
          {state === "not-installed" && (
            <p className="mt-1 text-xs text-[#3D1A1F]/70">
              Para recibir notificaciones en tu iPhone, primero{" "}
              <strong>agrega este portal a tu pantalla de inicio</strong> desde
              Safari (compartir → añadir a inicio). Después regresa aquí para
              activarlas.
            </p>
          )}
          {state === "denied" && (
            <p className="mt-1 text-xs text-[#3D1A1F]/70">
              Tienes las notificaciones bloqueadas para este sitio. Ve a los
              ajustes de tu navegador para permitirlas y vuelve a esta página.
            </p>
          )}
          {error && (
            <p className="mt-2 rounded-lg bg-red-50 px-2 py-1 text-[11px] text-red-700">
              {error}
            </p>
          )}

          {state === "prompt" && (
            <button
              onClick={enablePush}
              className="mt-3 rounded-lg bg-[#722F37] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#3D1A1F]"
            >
              Activar recordatorios
            </button>
          )}
          {state === "loading-action" && (
            <button
              disabled
              className="mt-3 rounded-lg bg-[#722F37] px-3 py-1.5 text-xs font-medium text-white opacity-60"
            >
              Activando…
            </button>
          )}
        </div>
        {state === "prompt" && (
          <button
            onClick={disablePush}
            className="text-[11px] text-[#3D1A1F]/40 underline"
            title="Ocultar (puedes activar más tarde)"
          >
            ahora no
          </button>
        )}
      </div>
    </div>
  );
}
