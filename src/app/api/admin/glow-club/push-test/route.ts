import { NextResponse } from "next/server";
import { getSession } from "@/lib/pr/auth";
import { glowSupabase } from "@/lib/glow/supabase";
import { sendPushToSubscription, type GlowPushSubscription } from "@/lib/glow/push";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * POST /api/admin/glow-club/push-test
 *
 * Manda un push de PRUEBA a TODAS las subscripciones activas —
 * ignora si la chica ya checkeó o no. Sirve para que Sarahi verifique
 * que las notificaciones llegan bien a su cel sin importar el estado
 * del check del día.
 */
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  const supa = glowSupabase();
  const { data: subs, error } = await supa
    .from("glow_push_subscriptions")
    .select("*");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!subs || subs.length === 0) {
    return NextResponse.json({
      ok: true,
      sent: 0,
      note: "Aún ninguna chica tiene notificaciones activas",
    });
  }

  const payload = {
    title: "Glow Club 🌸",
    body: "Prueba: las notificaciones están funcionando ✨",
    url: "/glow-club",
  };

  let sent = 0,
    failed = 0;
  for (const sub of subs as GlowPushSubscription[]) {
    const ok = await sendPushToSubscription(sub, payload);
    ok ? sent++ : failed++;
  }

  return NextResponse.json({
    ok: true,
    total_subscriptions: subs.length,
    sent,
    failed,
  });
}
