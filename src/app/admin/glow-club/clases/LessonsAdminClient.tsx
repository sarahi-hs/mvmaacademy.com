"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { parseVideoUrl, type GlowLesson } from "@/lib/glow/video";
import LessonThumb from "@/app/glow-club/clases/LessonThumb";

const inputCls =
  "mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]";

export default function LessonsAdminClient({ lessons }: { lessons: GlowLesson[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const parsed = useMemo(() => (videoUrl ? parseVideoUrl(videoUrl) : null), [videoUrl]);
  const topics = useMemo(
    () => Array.from(new Set(lessons.map((l) => l.topic).filter(Boolean))) as string[],
    [lessons]
  );

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    try {
      const res = await fetch("/api/admin/glow-club/lessons", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ videoUrl, title, topic, description }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(`❌ ${data.error || "No se pudo guardar"}`);
        return;
      }
      setVideoUrl("");
      setTitle("");
      setDescription("");
      setMsg("✓ Clase publicada — ya la ven las chicas");
      startTransition(() => router.refresh());
    } finally {
      setSaving(false);
    }
  }

  async function patch(id: string, updates: Record<string, unknown>) {
    const res = await fetch("/api/admin/glow-club/lessons", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "No se pudo actualizar");
      return;
    }
    startTransition(() => router.refresh());
  }

  function rename(l: GlowLesson) {
    const nuevo = prompt("Título de la clase:", l.title);
    if (nuevo === null || nuevo.trim() === l.title) return;
    void patch(l.id, { title: nuevo });
  }

  function retopic(l: GlowLesson) {
    const nuevo = prompt("Tema (déjalo vacío para quitarlo):", l.topic ?? "");
    if (nuevo === null) return;
    void patch(l.id, { topic: nuevo });
  }

  async function remove(l: GlowLesson) {
    if (!confirm(`¿Borrar "${l.title}" del portal?\n\nEl video sigue en YouTube/Vimeo, solo deja de aparecer aquí.`)) return;
    const res = await fetch(`/api/admin/glow-club/lessons?id=${l.id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("No se pudo borrar");
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <a href="/admin/glow-club" className="text-xs text-[#722F37] underline underline-offset-2">
        ← Volver al admin
      </a>
      <h1 className="mt-2 text-2xl font-medium text-[#3D1A1F]">Clases grabadas</h1>
      <p className="text-sm text-[#3D1A1F]/60">
        {lessons.filter((l) => l.published).length} publicada
        {lessons.filter((l) => l.published).length === 1 ? "" : "s"} · las chicas las ven en su pestaña &quot;Clases&quot;
      </p>

      <section className="mt-6 rounded-2xl border border-[#F4D4D4] bg-white p-5">
        <h2 className="mb-1 text-lg font-medium text-[#3D1A1F]">Agregar una clase</h2>
        <p className="mb-4 text-xs text-[#3D1A1F]/60">
          Sube el video a YouTube como <strong>&quot;No listado&quot;</strong> (o a Vimeo) y pega aquí el link.
        </p>
        <form onSubmit={create} className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-[#3D1A1F]">Link del video</span>
            <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
              placeholder="https://youtu.be/…"
              className={inputCls}
            />
            {videoUrl && !parsed && (
              <span className="mt-1 block text-[11px] text-red-700">
                Ese link no parece de YouTube o Vimeo. Copia el link completo del video.
              </span>
            )}
            {parsed && (
              <span className="mt-1 block text-[11px] text-green-700">
                ✓ Video de {parsed.provider === "youtube" ? "YouTube" : "Vimeo"} detectado
              </span>
            )}
          </label>

          {parsed?.provider === "youtube" && (
            <LessonThumb
              lesson={{ provider: parsed.provider, video_id: parsed.videoId }}
              className="aspect-video w-48 rounded-lg border border-[#F4D4D4] object-cover"
            />
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-[#3D1A1F]">Título</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Colorimetría: descubre tu paleta"
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[#3D1A1F]">Tema (opcional)</span>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                list="glow-lesson-topics"
                placeholder="Imagen, Autoestima, Marca personal…"
                className={inputCls}
              />
              <datalist id="glow-lesson-topics">
                {topics.map((t) => (
                  <option key={t} value={t} />
                ))}
              </datalist>
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-medium text-[#3D1A1F]">Descripción (opcional)</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="De qué trata la clase, qué van a aprender…"
              className={inputCls}
            />
          </label>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving || !parsed}
              className="rounded-lg bg-[#722F37] px-4 py-2 text-sm font-medium text-white hover:bg-[#3D1A1F] disabled:opacity-50"
            >
              {saving ? "Publicando…" : "Publicar clase"}
            </button>
            {msg && <span className="text-xs text-[#3D1A1F]/70">{msg}</span>}
          </div>
        </form>
      </section>

      <section className="mt-6 rounded-2xl border border-[#F4D4D4] bg-white p-5">
        <h2 className="mb-3 text-lg font-medium text-[#3D1A1F]">Tus clases</h2>
        {lessons.length === 0 ? (
          <p className="py-6 text-center text-sm text-[#3D1A1F]/50">
            Aún no has subido clases. Agrega la primera arriba ↑
          </p>
        ) : (
          <ul className="divide-y divide-[#F4D4D4]/60">
            {lessons.map((l) => {
              return (
                <li key={l.id} className="flex flex-wrap items-center gap-3 py-3">
                  <div className="h-14 w-24 flex-none overflow-hidden rounded-md bg-[#F4D4D4]/50">
                    <LessonThumb lesson={l} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-sm font-medium ${l.published ? "text-[#3D1A1F]" : "text-[#3D1A1F]/40 line-through"}`}>
                      {l.title}
                    </p>
                    <p className="text-[11px] text-[#3D1A1F]/50">
                      {l.topic || "Sin tema"} ·{" "}
                      {new Date(l.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
                      {!l.published && " · oculta"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                    <button onClick={() => rename(l)} disabled={pending} className="text-[#722F37] underline underline-offset-2">
                      ✏️ título
                    </button>
                    <button onClick={() => retopic(l)} disabled={pending} className="text-[#722F37] underline underline-offset-2">
                      🏷️ tema
                    </button>
                    <button
                      onClick={() => patch(l.id, { published: !l.published })}
                      disabled={pending}
                      className="text-[#722F37] underline underline-offset-2"
                    >
                      {l.published ? "ocultar" : "mostrar"}
                    </button>
                    <button onClick={() => remove(l)} disabled={pending} className="text-red-700 underline underline-offset-2">
                      borrar
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
