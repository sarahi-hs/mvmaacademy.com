import { NextResponse } from "next/server";
import { glowSupabase } from "@/lib/glow/supabase";
import { getGlowSession } from "@/lib/glow/auth";

export const runtime = "nodejs";

/**
 * POST /api/glow-club/push/subscribe
 * Body: { endpoint, keys: { p256dh, auth }, userAgent? }
 *
 * Guarda el "buzón push" de la chica. Idempotente por endpoint:
 * si el mismo endpoint ya existe, actualiza el member_id y las llaves.
 * Esto pasa si una chica cambia de cuenta pero el mismo device
 * mantiene su endpoint (raro pero posible).
 */
export async function POST(req: Request) {
  const session = await getGlowSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      endpoint?: string;
      keys?: { p256dh?: string; auth?: string };
      userAgent?: string;
    };

    const endpoint = body?.endpoint;
    const p256dh = body?.keys?.p256dh;
    const auth = body?.keys?.auth;

    if (!endpoint || !p256dh || !auth) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const supa = glowSupabase();
    const { error } = await supa.from("glow_push_subscriptions").upsert(
      {
        member_id: session.memberId,
        endpoint,
        p256dh,
        auth,
        user_agent: body.userAgent?.slice(0, 500) || null,
      },
      { onConflict: "endpoint" }
    );

    if (error) {
      console.error("[glow push subscribe]", error);
      return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[glow push subscribe] unexpected", err);
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
}
