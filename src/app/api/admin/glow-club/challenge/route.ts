import { NextResponse } from "next/server";
import { getSession } from "@/lib/pr/auth";
import { glowSupabase } from "@/lib/glow/supabase";
import { currentMonthStart } from "@/lib/glow/data";

export const runtime = "nodejs";

/**
 * POST/PUT → crea o actualiza el reto del mes indicado (default: mes actual).
 * Body: { month?, title, description?, points_per_day?, prize? }
 */
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const month = typeof body.month === "string" ? body.month : currentMonthStart();
    if (typeof body.title !== "string" || body.title.trim().length < 3) {
      return NextResponse.json(
        { error: "Falta el título del reto" },
        { status: 400 }
      );
    }

    const supa = glowSupabase();
    const payload = {
      month,
      title: body.title.trim(),
      description: typeof body.description === "string" ? body.description.trim() : null,
      points_per_day:
        typeof body.points_per_day === "number" ? body.points_per_day : 10,
      prize: typeof body.prize === "string" ? body.prize.trim() : null,
    };

    // Upsert por mes
    const { data, error } = await supa
      .from("glow_challenges")
      .upsert(payload, { onConflict: "month" })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, challenge: data });
  } catch (err) {
    console.error("[admin glow challenge]", err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
