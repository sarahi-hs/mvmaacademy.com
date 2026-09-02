import webpush from "web-push";
import { glowSupabase } from "./supabase";

let vapidConfigured = false;

/** Configura web-push con las VAPID keys una sola vez por cold start. */
function ensureVapid() {
  if (vapidConfigured) return;
  const publicKey = process.env.GLOW_VAPID_PUBLIC_KEY;
  const privateKey = process.env.GLOW_VAPID_PRIVATE_KEY;
  const subject = process.env.GLOW_VAPID_SUBJECT || "mailto:sarahiharoequipo@gmail.com";
  if (!publicKey || !privateKey) {
    throw new Error("Faltan GLOW_VAPID_PUBLIC_KEY o GLOW_VAPID_PRIVATE_KEY en env");
  }
  webpush.setVapidDetails(subject, publicKey, privateKey);
  vapidConfigured = true;
}

export type GlowPushSubscription = {
  id: string;
  member_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  user_agent: string | null;
  created_at: string;
  last_used_at: string | null;
};

export type PushPayload = {
  title: string;
  body: string;
  url?: string; // ruta a la que abre el portal al tocar la notificación
};

/**
 * Envía una notificación push a una subscripción específica.
 * - Actualiza last_used_at si sale bien.
 * - Si el push service dice que el endpoint ya no existe (410/404),
 *   borra la subscripción de la DB para no seguir intentando.
 * Devuelve true si el push se entregó, false si algo falló.
 */
export async function sendPushToSubscription(
  sub: GlowPushSubscription,
  payload: PushPayload
): Promise<boolean> {
  ensureVapid();
  const supa = glowSupabase();

  try {
    await webpush.sendNotification(
      {
        endpoint: sub.endpoint,
        keys: { p256dh: sub.p256dh, auth: sub.auth },
      },
      JSON.stringify(payload),
      { TTL: 60 * 60 * 6 } // el push service guarda hasta 6h si el cel está apagado
    );
    // Marcamos que fue usada, útil para debugging
    await supa
      .from("glow_push_subscriptions")
      .update({ last_used_at: new Date().toISOString() })
      .eq("id", sub.id);
    return true;
  } catch (err: unknown) {
    const status = (err as { statusCode?: number })?.statusCode;
    // 404 o 410 = la chica desinstaló la app o revocó permiso; borrar
    if (status === 404 || status === 410) {
      await supa.from("glow_push_subscriptions").delete().eq("id", sub.id);
    } else {
      console.error("[glow push] sendNotification error", status, err);
    }
    return false;
  }
}

/** Envía la misma notificación a todas las subscripciones de un miembro. */
export async function sendPushToMember(
  memberId: string,
  payload: PushPayload
): Promise<{ sent: number; failed: number }> {
  const supa = glowSupabase();
  const { data, error } = await supa
    .from("glow_push_subscriptions")
    .select("*")
    .eq("member_id", memberId);
  if (error || !data) return { sent: 0, failed: 0 };
  let sent = 0,
    failed = 0;
  for (const sub of data as GlowPushSubscription[]) {
    const ok = await sendPushToSubscription(sub, payload);
    ok ? sent++ : failed++;
  }
  return { sent, failed };
}
