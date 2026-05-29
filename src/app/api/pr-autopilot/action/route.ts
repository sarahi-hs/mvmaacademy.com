import { NextRequest, NextResponse } from "next/server";
import { prSupabase, PrQuery } from "@/lib/pr/supabase";
import { getSession } from "@/lib/pr/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_FROM = "Sarahi Haro <noreply@mvmaacademy.com>";
const REPLY_TO = "sarahiharoequipo@gmail.com";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (session.role === "viewer") {
    return NextResponse.json({ error: "Tu rol no permite esta acción" }, { status: 403 });
  }

  let body: { id?: string; action?: "approve" | "reject"; draft?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const { id, action, draft } = body;
  if (!id || !action) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const supabase = prSupabase();
  const { data: query } = await supabase
    .from("pr_queries")
    .select("*")
    .eq("id", id)
    .maybeSingle<PrQuery>();

  if (!query) {
    return NextResponse.json({ error: "Petición no encontrada" }, { status: 404 });
  }

  // RECHAZAR
  if (action === "reject") {
    await supabase.from("pr_queries").update({ status: "rejected" }).eq("id", id);
    return NextResponse.json({ ok: true, status: "rejected" });
  }

  // APROBAR → enviar respuesta al periodista
  const finalDraft = (draft ?? query.draft_response ?? "").trim();
  if (!finalDraft) {
    return NextResponse.json({ error: "No hay respuesta para enviar" }, { status: 400 });
  }
  if (!query.journalist_email) {
    return NextResponse.json(
      { error: "No se conoce el email del periodista" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email no configurado" }, { status: 500 });
  }

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [query.journalist_email],
      reply_to: REPLY_TO,
      subject: `Re: ${query.subject ?? "Tu petición de fuente experta"}`,
      text: finalDraft,
    }),
  });

  if (!resendRes.ok) {
    const errText = await resendRes.text();
    console.error("Resend error:", errText);
    return NextResponse.json({ error: "No se pudo enviar el email" }, { status: 502 });
  }

  // Marcar como enviada
  await supabase
    .from("pr_queries")
    .update({
      status: "sent",
      draft_response: finalDraft,
      approved_by_user_id: session.userId,
      sent_at: new Date().toISOString(),
    })
    .eq("id", id);

  // Sumar a estadísticas del día
  const today = new Date().toISOString().slice(0, 10);
  const { data: existing } = await supabase
    .from("pr_stats")
    .select("*")
    .eq("date", today)
    .maybeSingle();
  if (existing) {
    await supabase
      .from("pr_stats")
      .update({ responses_sent: existing.responses_sent + 1 })
      .eq("date", today);
  } else {
    await supabase.from("pr_stats").insert({ date: today, responses_sent: 1 });
  }

  return NextResponse.json({ ok: true, status: "sent" });
}
