import { NextResponse } from "next/server";
import { glowSupabase } from "@/lib/glow/supabase";
import { getGlowSession } from "@/lib/glow/auth";
import { todayMx, currentMonthStart } from "@/lib/glow/data";

export const runtime = "nodejs";

/**
 * POST /api/glow-club/reflection
 * Body: { text: string }
 *
 * Crea (o actualiza) la reflexión del día actual de la chica logueada
 * sobre el reto del mes. Requiere que ya haya hecho su check de hoy —
 * la reflexión es un cierre emocional después de cumplir.
 *
 * El texto se limpia (trim) y se rechaza si queda vacío o excede 2000
 * caracteres. Si ya existía una reflexión hoy, se sobreescribe (upsert
 * por member_id + reflection_date, unique constraint en DB).
 */
export async function POST(req: Request) {
  const session = await getGlowSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  let body: { text?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const rawText = typeof body.text === "string" ? body.text.trim() : "";
  if (rawText.length === 0) {
    return NextResponse.json(
      { error: "Escribe algo bonito antes de enviar 🌸" },
      { status: 400 }
    );
  }
  if (rawText.length > 2000) {
    return NextResponse.json(
      { error: "Máximo 2000 caracteres" },
      { status: 400 }
    );
  }

  const supa = glowSupabase();
  const today = todayMx();
  const monthStart = currentMonthStart();

  // 1. Buscar el reto del mes en curso
  const { data: challenge, error: chErr } = await supa
    .from("glow_challenges")
    .select("id")
    .eq("month", monthStart)
    .maybeSingle();
  if (chErr) {
    console.error("[glow reflection] challenge lookup", chErr);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
  if (!challenge) {
    return NextResponse.json(
      { error: "No hay reto activo este mes" },
      { status: 404 }
    );
  }

  // 2. Verificar que la chica ya hizo check hoy — la reflexión es cierre
  //    emocional después de cumplir, no un canal libre para escribir.
  const { data: checkin, error: ciErr } = await supa
    .from("glow_checkins")
    .select("id")
    .eq("member_id", session.memberId)
    .eq("checkin_date", today)
    .maybeSingle();
  if (ciErr) {
    console.error("[glow reflection] checkin lookup", ciErr);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
  if (!checkin) {
    return NextResponse.json(
      { error: "Primero da tu check de hoy 🌸" },
      { status: 409 }
    );
  }

  // 3. Upsert por (member_id, reflection_date)
  const { data: saved, error: upErr } = await supa
    .from("glow_reflections")
    .upsert(
      {
        member_id: session.memberId,
        challenge_id: challenge.id,
        reflection_date: today,
        text: rawText,
      },
      { onConflict: "member_id,reflection_date" }
    )
    .select()
    .single();

  if (upErr) {
    console.error("[glow reflection] upsert", upErr);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, reflection: saved });
}
