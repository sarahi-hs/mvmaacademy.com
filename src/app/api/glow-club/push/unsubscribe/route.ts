import { NextResponse } from "next/server";
import { glowSupabase } from "@/lib/glow/supabase";
import { getGlowSession } from "@/lib/glow/auth";

export const runtime = "nodejs";

/**
 * POST /api/glow-club/push/unsubscribe
 * Body: { endpoint }
 * Borra la subscripción de este device. Solo puede borrar las suyas.
 */
export async function POST(req: Request) {
  const session = await getGlowSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  try {
    const { endpoint } = (await req.json()) as { endpoint?: string };
    if (!endpoint) {
      return NextResponse.json({ error: "Falta endpoint" }, { status: 400 });
    }
    const supa = glowSupabase();
    await supa
      .from("glow_push_subscriptions")
      .delete()
      .eq("endpoint", endpoint)
      .eq("member_id", session.memberId);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
}
