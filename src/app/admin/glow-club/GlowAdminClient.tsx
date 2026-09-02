"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { GlowChallenge, GlowRankingRow } from "@/lib/glow/supabase";

type MemberRow = {
  id: string;
  email: string;
  full_name: string;
  initials: string | null;
  status: "active" | "paused";
  must_change_password: boolean;
  created_at: string;
};

type Props = {
  members: MemberRow[];
  challenge: GlowChallenge | null;
  ranking: GlowRankingRow[];
  subscribedMemberIds: string[]; // chicas con push activo
};

export default function GlowAdminClient({
  members,
  challenge,
  ranking,
  subscribedMemberIds,
}: Props) {
  const subscribedSet = new Set(subscribedMemberIds);
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Estado del reto
  const [title, setTitle] = useState(challenge?.title || "");
  const [description, setDescription] = useState(challenge?.description || "");
  const [prize, setPrize] = useState(challenge?.prize || "");
  const [closingPhrase, setClosingPhrase] = useState(
    challenge?.closing_phrase || ""
  );
  const [pointsPerDay, setPointsPerDay] = useState(
    challenge?.points_per_day ?? 10
  );
  const [savingChallenge, setSavingChallenge] = useState(false);
  const [challengeMsg, setChallengeMsg] = useState<string | null>(null);

  // Estado del alta de chica
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [creating, setCreating] = useState(false);
  const [createErr, setCreateErr] = useState<string | null>(null);
  const [tempPasswordShown, setTempPasswordShown] = useState<{
    email: string;
    name: string;
    password: string;
  } | null>(null);

  async function saveChallenge(e: React.FormEvent) {
    e.preventDefault();
    setSavingChallenge(true);
    setChallengeMsg(null);
    const res = await fetch("/api/admin/glow-club/challenge", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        prize,
        closing_phrase: closingPhrase,
        points_per_day: pointsPerDay,
      }),
    });
    setSavingChallenge(false);
    const data = await res.json();
    if (!res.ok) {
      setChallengeMsg(`❌ ${data.error || "Error al guardar"}`);
      return;
    }
    setChallengeMsg("✓ Reto guardado");
    startTransition(() => router.refresh());
  }

  async function createMember(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setCreateErr(null);
    const res = await fetch("/api/admin/glow-club/members", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: newEmail, fullName: newName }),
    });
    setCreating(false);
    const data = await res.json();
    if (!res.ok) {
      setCreateErr(data.error || "No se pudo crear");
      return;
    }
    setTempPasswordShown({
      email: newEmail,
      name: newName,
      password: data.tempPassword,
    });
    setNewName("");
    setNewEmail("");
    startTransition(() => router.refresh());
  }

  async function resetMemberPassword(m: MemberRow) {
    if (
      !confirm(
        `¿Generar una contraseña nueva para ${m.full_name}?\n\nLa contraseña anterior deja de servir. Vas a poder copiar la nueva desde una ventanita para mandársela por WhatsApp.`
      )
    )
      return;
    const res = await fetch("/api/admin/glow-club/members/reset-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ memberId: m.id }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "No se pudo generar la nueva contraseña");
      return;
    }
    // Reutilizamos el mismo modal del alta para mostrar la contraseña nueva
    setTempPasswordShown({
      email: data.member.email,
      name: data.member.full_name,
      password: data.tempPassword,
    });
    // Scroll suave al modal
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
    startTransition(() => router.refresh());
  }

  async function toggleMemberStatus(m: MemberRow) {
    const newStatus = m.status === "active" ? "paused" : "active";
    const confirmMsg =
      newStatus === "paused"
        ? `¿Pausar acceso de ${m.full_name}?`
        : `¿Reactivar acceso de ${m.full_name}?`;
    if (!confirm(confirmMsg)) return;
    const res = await fetch("/api/admin/glow-club/members", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ memberId: m.id, status: newStatus }),
    });
    if (!res.ok) {
      alert("Error al cambiar estado");
      return;
    }
    startTransition(() => router.refresh());
  }

  const activeCount = members.filter((m) => m.status === "active").length;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-[#3D1A1F]">
          Admin · Glow Club
        </h1>
        <p className="text-sm text-[#3D1A1F]/60">
          {activeCount} chica{activeCount === 1 ? "" : "s"} activa
          {activeCount === 1 ? "" : "s"} · {members.length} total
        </p>
      </div>

      {/* Notificaciones */}
      <PushRemindPanel
        totalMembers={members.filter((m) => m.status === "active").length}
        subscribedCount={subscribedSet.size}
      />

      {/* Reto del mes */}
      <section className="mb-6 rounded-2xl border border-[#F4D4D4] bg-white p-5">
        <h2 className="mb-3 text-lg font-medium text-[#3D1A1F]">
          Reto de este mes
        </h2>
        <form onSubmit={saveChallenge} className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-[#3D1A1F]">Título</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="5 minutos a solas cada día"
              className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[#3D1A1F]">
              Descripción (opcional)
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Un momento contigo misma, sin celular, sin ruido."
              className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-[#3D1A1F]">
                Premio del mes
              </span>
              <input
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
                placeholder="Sesión 1:1 con Sarahi"
                className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[#3D1A1F]">
                Puntos por día
              </span>
              <input
                type="number"
                min={1}
                value={pointsPerDay}
                onChange={(e) => setPointsPerDay(parseInt(e.target.value) || 10)}
                className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-medium text-[#3D1A1F]">
              Frase de cierre (opcional)
            </span>
            <input
              value={closingPhrase}
              onChange={(e) => setClosingPhrase(e.target.value)}
              placeholder="Cada día que te eliges, te construyes."
              maxLength={200}
              className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
            />
            <span className="mt-1 block text-[10px] text-[#3D1A1F]/50">
              Aparece a las chicas después de dar su check + reflexión. Si la
              dejas vacía, se muestra la frase por defecto.
            </span>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={savingChallenge}
              className="rounded-lg bg-[#722F37] px-4 py-2 text-sm font-medium text-white hover:bg-[#3D1A1F] disabled:opacity-60"
            >
              {savingChallenge ? "Guardando…" : "Guardar reto"}
            </button>
            {challengeMsg && (
              <span className="text-xs text-[#3D1A1F]/70">{challengeMsg}</span>
            )}
          </div>
        </form>
      </section>

      {/* Alta manual de chica */}
      <section className="mb-6 rounded-2xl border border-[#F4D4D4] bg-white p-5">
        <h2 className="mb-3 text-lg font-medium text-[#3D1A1F]">
          Dar de alta a una chica nueva
        </h2>
        <form onSubmit={createMember} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            placeholder="Nombre completo"
            className="rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
          />
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
            placeholder="correo@ejemplo.com"
            className="rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
          />
          <button
            type="submit"
            disabled={creating}
            className="rounded-lg bg-[#722F37] px-4 py-2 text-sm font-medium text-white hover:bg-[#3D1A1F] disabled:opacity-60"
          >
            {creating ? "Creando…" : "Crear"}
          </button>
        </form>
        {createErr && (
          <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
            {createErr}
          </p>
        )}

        {tempPasswordShown && (
          <TempPasswordCard
            data={tempPasswordShown}
            onClose={() => {
              if (
                confirm(
                  "¿Segura de cerrar? La contraseña no se vuelve a mostrar."
                )
              ) {
                setTempPasswordShown(null);
              }
            }}
          />
        )}
      </section>

      {/* Lista de chicas + ranking */}
      <section className="rounded-2xl border border-[#F4D4D4] bg-white p-5">
        <h2 className="mb-3 text-lg font-medium text-[#3D1A1F]">
          Todas las chicas
        </h2>
        {members.length === 0 ? (
          <p className="py-6 text-center text-sm text-[#3D1A1F]/50">
            Aún no hay chicas. Da de alta a la primera arriba ↑
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F4D4D4] text-left text-xs text-[#3D1A1F]/60">
                <th className="pb-2 font-medium">Chica</th>
                <th className="pb-2 font-medium">Correo</th>
                <th className="pb-2 text-center font-medium">Puntos mes</th>
                <th className="pb-2 text-center font-medium">Estado</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => {
                const rankRow = ranking.find((r) => r.member_id === m.id);
                return (
                  <tr key={m.id} className="border-b border-[#F4D4D4]/50">
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4D4D4] text-[11px] font-medium text-[#722F37]">
                          {m.initials || "?"}
                        </div>
                        <span>{m.full_name}</span>
                        {subscribedSet.has(m.id) && (
                          <span
                            title="Notificaciones activas"
                            className="text-[11px]"
                            aria-label="Notificaciones activas"
                          >
                            🔔
                          </span>
                        )}
                        {m.must_change_password && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] text-amber-800">
                            aún no cambia contraseña
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 text-xs text-[#3D1A1F]/70">{m.email}</td>
                    <td className="py-2 text-center">
                      {rankRow ? (
                        <span className="font-medium">{rankRow.total_points}</span>
                      ) : (
                        <span className="text-[#3D1A1F]/40">—</span>
                      )}
                    </td>
                    <td className="py-2 text-center">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] ${
                          m.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {m.status === "active" ? "activa" : "pausada"}
                      </span>
                    </td>
                    <td className="py-2 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => resetMemberPassword(m)}
                          disabled={pending}
                          className="text-xs text-[#722F37] underline underline-offset-2 hover:no-underline"
                          title="Generar una contraseña temporal nueva"
                        >
                          🔑 nueva contraseña
                        </button>
                        <button
                          onClick={() => toggleMemberStatus(m)}
                          disabled={pending}
                          className="text-xs text-[#722F37] underline underline-offset-2 hover:no-underline"
                        >
                          {m.status === "active" ? "pausar" : "reactivar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

// -----------------------------------------------------------
// TempPasswordCard
// -----------------------------------------------------------
// Modal defensivo — muestra la contraseña temporal y hace TODO lo posible
// para que Sarahi no la pierda si accidentalmente refresca o cierra:
//   1. Auto-copia el mensaje al portapapeles apenas aparece
//   2. Warning ANTES de cerrar (confirm)
//   3. Botón para abrir WhatsApp Web con el mensaje pre-cargado
//   4. Botón para descargar como .txt de respaldo
// -----------------------------------------------------------
function TempPasswordCard({
  data,
  onClose,
}: {
  data: { email: string; name: string; password: string };
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const message = `Bienvenida al Glow Club 🌸\n\nPortal: https://mvmaacademy.com/glow-club\nCorreo: ${data.email}\nContraseña temporal: ${data.password}\n\nEntra y cambia tu contraseña por una que solo tú sepas ✨`;

  // Auto-copiar al portapapeles cuando el modal se muestra por primera vez
  useEffect(() => {
    navigator.clipboard
      .writeText(message)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
    // No dependemos de "message" — solo queremos correrlo una vez por modal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prevenir cerrar la pestaña sin querer mientras el modal está abierto
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("No se pudo copiar. Selecciona el texto manualmente.");
    }
  }

  function openWhatsApp() {
    // Abre WhatsApp Web con el mensaje listo (sin destinatario, para elegir a quién enviarlo)
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, "_blank", "noopener,noreferrer");
  }

  function downloadTxt() {
    const blob = new Blob([message], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `glow-club-${data.email.replace(/[@.]/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-4 rounded-xl border-2 border-[#722F37] bg-[#F4D4D4]/30 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#3D1A1F]">
          ✅ Contraseña temporal lista para {data.name}
        </p>
        {copied && (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-800">
            ✓ copiada al portapapeles
          </span>
        )}
      </div>

      <p className="mt-2 text-xs text-[#3D1A1F]/70">
        Manda estos datos por WhatsApp:
      </p>
      <div className="mt-2 rounded-lg bg-white p-3 font-mono text-sm">
        <div>Portal: mvmaacademy.com/glow-club</div>
        <div>
          Correo: <strong>{data.email}</strong>
        </div>
        <div>
          Contraseña temporal:{" "}
          <strong className="text-[#722F37]">{data.password}</strong>
        </div>
      </div>

      <p className="mt-2 text-[11px] text-[#3D1A1F]/60">
        ⚠️ La contraseña <strong>no se vuelve a mostrar</strong>. Ya la copié al
        portapapeles automáticamente y también puedes descargarla como archivo
        de respaldo. Si la pierdes, usa el botón <strong>🔑 nueva contraseña</strong> en
        la lista de abajo.
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={copyToClipboard}
          className="rounded-lg bg-[#722F37] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#3D1A1F]"
        >
          📋 {copied ? "Copiada ✓" : "Copiar de nuevo"}
        </button>
        <button
          onClick={openWhatsApp}
          className="rounded-lg border border-[#722F37] px-3 py-1.5 text-xs font-medium text-[#722F37] hover:bg-[#F4D4D4]/40"
        >
          💬 Abrir en WhatsApp
        </button>
        <button
          onClick={downloadTxt}
          className="rounded-lg border border-[#722F37] px-3 py-1.5 text-xs font-medium text-[#722F37] hover:bg-[#F4D4D4]/40"
        >
          💾 Descargar como .txt
        </button>
        <button
          onClick={onClose}
          className="ml-auto text-xs text-[#3D1A1F]/60 underline"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}


// -----------------------------------------------------------
// PushRemindPanel
// -----------------------------------------------------------
// Sección del admin con:
//   - Contador: cuántas chicas activas tienen notificaciones activas
//   - Botón manual "Recordar ahora" — dispara el cron cuando Sarahi quiera
// -----------------------------------------------------------
function PushRemindPanel({
  totalMembers,
  subscribedCount,
}: {
  totalMembers: number;
  subscribedCount: number;
}) {
  const [sending, setSending] = useState<null | "remind" | "test" | "custom">(
    null
  );
  const [result, setResult] = useState<string | null>(null);
  const [customBody, setCustomBody] = useState("");

  async function sendReminder() {
    if (
      !confirm(
        "¿Mandar recordatorio a las chicas que aún no han checkeado hoy?"
      )
    )
      return;
    await callEndpoint("/api/admin/glow-club/push-remind", "remind");
  }

  async function sendTest() {
    await callEndpoint("/api/admin/glow-club/push-test", "test");
  }

  async function sendCustom() {
    if (customBody.trim().length === 0) {
      setResult("Escribe algo antes de enviar 🌸");
      return;
    }
    if (
      !confirm(
        `¿Enviar este mensaje a ${subscribedCount} chica${
          subscribedCount === 1 ? "" : "s"
        }?\n\n"${customBody.trim()}"`
      )
    )
      return;
    setSending("custom");
    setResult(null);
    try {
      const res = await fetch("/api/admin/glow-club/push-custom", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ body: customBody.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(`❌ ${data.error || "Error"}`);
        return;
      }
      if (data.sent === 0 && data.note) {
        setResult(`ℹ️ ${data.note}`);
      } else {
        setResult(
          `✓ Tu mensaje se envió a ${data.sent} chica${
            data.sent === 1 ? "" : "s"
          }${data.failed ? ` · ${data.failed} fallaron` : ""}`
        );
        setCustomBody(""); // limpiar para escribir otro después
      }
    } catch {
      setResult("❌ Error de conexión");
    } finally {
      setSending(null);
    }
  }

  async function callEndpoint(url: string, kind: "remind" | "test") {
    setSending(kind);
    setResult(null);
    try {
      const res = await fetch(url, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setResult(`❌ ${data.error || "Error"}`);
        return;
      }
      if (data.sent === 0 && data.note) {
        setResult(`ℹ️ ${data.note}`);
      } else {
        setResult(
          `✓ ${data.sent} notificación${data.sent === 1 ? "" : "es"} enviada${
            data.sent === 1 ? "" : "s"
          }${data.failed ? ` · ${data.failed} fallaron` : ""}`
        );
      }
    } catch {
      setResult("❌ Error de conexión");
    } finally {
      setSending(null);
    }
  }

  return (
    <section className="mb-6 rounded-2xl border border-[#F4D4D4] bg-white p-5">
      <div>
        <h2 className="text-lg font-medium text-[#3D1A1F]">
          🔔 Notificaciones al cel
        </h2>
        <p className="mt-1 text-xs text-[#3D1A1F]/70">
          {subscribedCount} de {totalMembers} chica
          {totalMembers === 1 ? "" : "s"} activa
          {totalMembers === 1 ? "" : "s"} tienen notificaciones prendidas.
          El recordatorio automático se manda todos los días a las 7pm a
          las que no hayan checkeado.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={sendReminder}
          disabled={sending !== null || subscribedCount === 0}
          className="rounded-lg bg-[#722F37] px-3 py-2 text-xs font-medium text-white hover:bg-[#3D1A1F] disabled:opacity-50"
          title="Solo va a las que aún no dieron su check hoy"
        >
          {sending === "remind" ? "Enviando…" : "🔔 Recordar ahora"}
        </button>
        <button
          onClick={sendTest}
          disabled={sending !== null || subscribedCount === 0}
          className="rounded-lg border border-[#722F37] bg-white px-3 py-2 text-xs font-medium text-[#722F37] hover:bg-[#F4D4D4]/40 disabled:opacity-50"
          title="Manda una notificación de prueba a TODAS las chicas con notificaciones activas (incluida tú si estás suscrita), sin importar si ya checkearon"
        >
          {sending === "test" ? "Enviando…" : "🧪 Prueba (a todas)"}
        </button>
      </div>

      {result && (
        <p className="mt-3 text-xs text-[#3D1A1F]/80">{result}</p>
      )}

      {/* Caja para mandar mensajes libres — "abrazos random" durante el día */}
      <div className="mt-5 border-t border-[#F4D4D4] pt-4">
        <label className="block">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[#3D1A1F]/60">
            💌 Mandar un mensaje libre a todas
          </span>
          <textarea
            value={customBody}
            onChange={(e) => setCustomBody(e.target.value)}
            rows={2}
            maxLength={250}
            placeholder="Ej: Hermosa, hoy te elijo con todo mi corazón. Sigue brillando 🌸"
            className="mt-1 w-full resize-none rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
          />
        </label>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-[10px] text-[#3D1A1F]/40">
            {customBody.length}/250 · aparece como &quot;Sarahi 🌸&quot;
          </span>
          <button
            onClick={sendCustom}
            disabled={
              sending !== null ||
              subscribedCount === 0 ||
              customBody.trim().length === 0
            }
            className="rounded-lg bg-[#722F37] px-3 py-2 text-xs font-medium text-white hover:bg-[#3D1A1F] disabled:opacity-50"
          >
            {sending === "custom" ? "Enviando…" : "💌 Enviar a todas"}
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-[#FAF7F2] px-3 py-2 text-[11px] text-[#3D1A1F]/70">
        <p className="font-medium text-[#3D1A1F]">Los 3 botones:</p>
        <p className="mt-1">
          <strong>🔔 Recordar ahora</strong> → solo a chicas que NO han
          checkeado hoy. Si tú ya cumpliste, no te llega.
        </p>
        <p className="mt-1">
          <strong>🧪 Prueba (a todas)</strong> → a TODAS las suscritas para
          verificar que llegan. Úsalo para probar en tu propio cel.
        </p>
        <p className="mt-1">
          <strong>💌 Enviar a todas</strong> → tu mensaje libre a TODAS las
          suscritas. Perfecto para abrazos random.
        </p>
      </div>

      {subscribedCount === 0 && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
          Aún ninguna chica tiene notificaciones activas. Deben instalar el
          portal como app en su cel y aceptar el permiso desde su dashboard.
        </p>
      )}
    </section>
  );
}
