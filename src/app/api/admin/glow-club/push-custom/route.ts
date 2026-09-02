import { NextResponse } from "next/server";
import { getSession } from "@/lib/pr/auth";
import { glowSupabase } from "@/lib/glow/supabase";
import { sendPushToSubscription, type GlowPushSubscription } from "@/lib/glow/push";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * POST /api/admin/glow-club/push-custom
 * Body: { body: string, title?: string }
 *
 * Sarahi escribe un mensaje libre y se lo manda a TODAS las chicas
 * con notificaciones activas. Perfecto para "abrazos random" durante
 * el día, mensajes motivacionales espontáneos, etc.
 */
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  let body: { body?: unknown; title?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const messageBody =
    typeof body.body === "string" ? body.body.trim() : "";
  const messageTitle =
    typeof body.title === "string" && body.title.trim().length > 0
      ? body.title.trim()
      : "Sarahi 🌸";

  if (messageBody.length === 0) {
    return NextResponse.json(
      { error: "Escribe algo antes de enviar" },
      { status: 400 }
    );
  }
  // Push notifications idealmente < 150 chars — más largo se corta en iOS
  if (messageBody.length > 250) {
    return NextResponse.json(
      { error: "El mensaje debe ser de máximo 250 caracteres" },
      { status: 400 }
    );
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
    title: messageTitle,
    body: messageBody,
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
