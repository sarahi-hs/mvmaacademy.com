import { NextRequest, NextResponse } from "next/server";
import { prSupabase } from "@/lib/pr/supabase";
import { scoreAndDraft } from "@/lib/pr/anthropic";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Recibe peticiones de periodistas reenviadas desde el Apps Script del Gmail.
 * Valida el secreto, califica con la IA, y guarda en la base de datos.
 */
export async function POST(req: NextRequest) {
  // 1. Validar el secreto del header
  const secret = req.headers.get("x-webhook-secret");
  if (!secret || secret !== process.env.PR_AUTOPILOT_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // 2. Parsear el email reenviado
  let body: {
    source?: string;
    subject?: string;
    journalist_email?: string;
    body?: string;
    deadline?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const supabase = prSupabase();

  // 3. Calificar + redactar con la IA
  let score = 0;
  let draft = "";
  try {
    const result = await scoreAndDraft({
      subject: body.subject,
      body: body.body,
      source: body.source,
    });
    score = result.score;
    draft = result.draft;
  } catch (e) {
    console.error("Error al calificar con IA:", e);
    // Si la IA falla, guardamos la petición igual con score 0 para no perderla
  }

  // 4. Guardar la petición
  const { data: inserted, error } = await supabase
    .from("pr_queries")
    .insert({
      source: body.source ?? null,
      subject: body.subject ?? null,
      journalist_email: body.journalist_email ?? null,
      body: body.body ?? null,
      deadline: body.deadline ?? null,
      score,
      draft_response: draft || null,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error al guardar query:", error);
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }

  // 5. Actualizar estadísticas del día
  const today = new Date().toISOString().slice(0, 10);
  const { data: existing } = await supabase
    .from("pr_stats")
    .select("*")
    .eq("date", today)
    .maybeSingle();

  const isHigh = score >= 70;
  const isMedium = score >= 40 && score < 70;

  if (existing) {
    await supabase
      .from("pr_stats")
      .update({
        queries_received: existing.queries_received + 1,
        matches_high: existing.matches_high + (isHigh ? 1 : 0),
        matches_medium: existing.matches_medium + (isMedium ? 1 : 0),
      })
      .eq("date", today);
  } else {
    await supabase.from("pr_stats").insert({
      date: today,
      queries_received: 1,
      matches_high: isHigh ? 1 : 0,
      matches_medium: isMedium ? 1 : 0,
      responses_sent: 0,
      mentions_obtained: 0,
    });
  }

  return NextResponse.json({ ok: true, id: inserted.id, score });
}
