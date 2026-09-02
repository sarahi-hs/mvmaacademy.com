import { NextResponse } from "next/server";
import { glowSupabase } from "@/lib/glow/supabase";
import { getGlowSession } from "@/lib/glow/auth";

export const runtime = "nodejs";

/**
 * POST /api/glow-club/reflection/[id]/reply
 * Body: { text: string }
 *
 * Añade una respuesta al hilo de una reflexión existente. Cualquier
 * chica logueada puede responder a la reflexión de cualquier otra
 * (incluida la suya propia).
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getGlowSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  const { id: reflectionId } = await params;
  if (!reflectionId || reflectionId.length < 10) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  let body: { text?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (text.length === 0) {
    return NextResponse.json(
      { error: "Escribe algo antes de responder 🌸" },
      { status: 400 }
    );
  }
  if (text.length > 1000) {
    return NextResponse.json(
      { error: "Máximo 1000 caracteres" },
      { status: 400 }
    );
  }

  const supa = glowSupabase();

  // Verificar que la reflexión existe (evita huérfanos si el ID es inventado)
  const { data: ref, error: refErr } = await supa
    .from("glow_reflections")
    .select("id")
    .eq("id", reflectionId)
    .maybeSingle();
  if (refErr) {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
  if (!ref) {
    return NextResponse.json({ error: "Reflexión no encontrada" }, { status: 404 });
  }

  const { data: reply, error: insErr } = await supa
    .from("glow_reflection_replies")
    .insert({
      reflection_id: reflectionId,
      member_id: session.memberId,
      text,
    })
    .select()
    .single();

  if (insErr) {
    console.error("[glow reply] insert", insErr);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, reply });
}
