import { NextResponse } from "next/server";
import { glowSupabase } from "@/lib/glow/supabase";
import { getGlowSession } from "@/lib/glow/auth";

export const runtime = "nodejs";

/**
 * POST /api/glow-club/checkin
 * Marca el reto del día actual como cumplido para la chica logueada.
 * - Solo permite checar el día de HOY (nunca días pasados o futuros).
 * - El unique (member_id, checkin_date) impide check duplicado.
 */
export async function POST() {
  const session = await getGlowSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  const supa = glowSupabase();

  // Zona horaria México (America/Mexico_City) para determinar "hoy"
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Mexico_City",
  }); // "YYYY-MM-DD"
  const monthStart = today.slice(0, 7) + "-01"; // primer día del mes

  // 1. Encontrar el reto del mes actual
  const { data: challenge, error: chErr } = await supa
    .from("glow_challenges")
    .select("*")
    .eq("month", monthStart)
    .maybeSingle();

  if (chErr) {
    console.error("[glow checkin] error challenge", chErr);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
  if (!challenge) {
    return NextResponse.json(
      { error: "No hay reto activo este mes. Espera a que Sarahi lo publique." },
      { status: 404 }
    );
  }

  // 2. Insertar el check-in (falla si ya existe uno para hoy)
  const { error: insErr } = await supa.from("glow_checkins").insert({
    member_id: session.memberId,
    challenge_id: challenge.id,
    checkin_date: today,
    points_earned: challenge.points_per_day,
  });

  if (insErr) {
    // Código 23505 = unique_violation → ya hizo check hoy
    if (insErr.code === "23505") {
      return NextResponse.json(
        { error: "Ya hiciste tu check de hoy 🌸" },
        { status: 409 }
      );
    }
    console.error("[glow checkin] insert error", insErr);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    points: challenge.points_per_day,
    date: today,
  });
}
