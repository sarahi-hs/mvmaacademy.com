import { NextResponse } from "next/server";
import { getSession } from "@/lib/pr/auth";
import { glowSupabase } from "@/lib/glow/supabase";
import { parseVideoUrl } from "@/lib/glow/video";

export const runtime = "nodejs";

function cleanText(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length === 0 ? null : t.slice(0, max);
}

export async function POST(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const title = cleanText(body.title, 200);
  if (!title || title.length < 2) {
    return NextResponse.json({ error: "Ponle un título a la clase" }, { status: 400 });
  }
  const videoUrl = typeof body.videoUrl === "string" ? body.videoUrl.trim() : "";
  const parsed = parseVideoUrl(videoUrl);
  if (!parsed) {
    return NextResponse.json(
      { error: "El link no es de YouTube ni de Vimeo. Copia el link completo del video." },
      { status: 400 }
    );
  }

  const { data, error } = await glowSupabase()
    .from("glow_lessons")
    .insert({
      title,
      description: cleanText(body.description, 2000),
      topic: cleanText(body.topic, 60),
      provider: parsed.provider,
      video_id: parsed.videoId,
      video_url: videoUrl,
    })
    .select()
    .single();

  if (error) {
    console.error("[admin lessons POST]", error);
    return NextResponse.json({ error: "No se pudo guardar la clase" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, lesson: data });
}

export async function PATCH(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  if (typeof body.id !== "string") {
    return NextResponse.json({ error: "Falta la clase" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (typeof body.published === "boolean") updates.published = body.published;
  if (body.title !== undefined) {
    const title = cleanText(body.title, 200);
    if (!title || title.length < 2) {
      return NextResponse.json({ error: "El título es muy corto" }, { status: 400 });
    }
    updates.title = title;
  }
  if (body.description !== undefined) updates.description = cleanText(body.description, 2000);
  if (body.topic !== undefined) updates.topic = cleanText(body.topic, 60);
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nada que actualizar" }, { status: 400 });
  }

  const { error } = await glowSupabase().from("glow_lessons").update(updates).eq("id", body.id);
  if (error) {
    console.error("[admin lessons PATCH]", error);
    return NextResponse.json({ error: "No se pudo actualizar" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Falta la clase" }, { status: 400 });
  }
  const { error } = await glowSupabase().from("glow_lessons").delete().eq("id", id);
  if (error) {
    console.error("[admin lessons DELETE]", error);
    return NextResponse.json({ error: "No se pudo borrar" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
