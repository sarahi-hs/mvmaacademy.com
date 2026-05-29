"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PrQuery } from "@/lib/pr/supabase";

function scoreColor(score: number) {
  if (score >= 70) return "bg-tinto text-ivory";
  if (score >= 40) return "bg-beige text-tinto-deep";
  return "bg-ivory-warm text-tinto-deep/50";
}

export function QueriesBoard({
  pending,
  recent,
  role,
}: {
  pending: PrQuery[];
  recent: PrQuery[];
  role: "owner" | "editor" | "viewer";
}) {
  const router = useRouter();
  const [drafts, setDrafts] = useState<Record<string, string>>(
    Object.fromEntries(pending.map((q) => [q.id, q.draft_response ?? ""]))
  );
  const [busy, setBusy] = useState<string | null>(null);
  const canAct = role !== "viewer";

  async function act(id: string, action: "approve" | "reject") {
    setBusy(id);
    try {
      const res = await fetch("/api/pr-autopilot/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, draft: drafts[id] }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "No se pudo completar la acción");
      }
    } catch {
      alert("Error de conexión");
    } finally {
      setBusy(null);
    }
  }

  return (
    <>
      <h2 className="font-display text-2xl text-tinto-deep mb-4">
        Peticiones pendientes ({pending.length})
      </h2>

      {pending.length === 0 && (
        <p className="text-tinto-deep/60 italic mb-12">
          No hay peticiones pendientes por ahora. Cuando lleguen, aparecerán aquí
          ordenadas por relevancia. 💛
        </p>
      )}

      <div className="space-y-6 mb-16">
        {pending.map((q) => (
          <article key={q.id} className="border border-beige bg-ivory p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span
                  className={`inline-block px-3 py-1 text-xs font-bold mb-2 ${scoreColor(q.score)}`}
                >
                  Relevancia: {q.score}/100
                </span>
                <h3 className="font-display text-xl text-tinto-deep">
                  {q.subject || "(sin asunto)"}
                </h3>
                <p className="text-xs text-tinto-deep/50 mt-1">
                  {q.source ?? "PR"} · {q.journalist_email ?? "email desconocido"}
                  {q.deadline ? ` · vence: ${q.deadline}` : ""}
                </p>
              </div>
            </div>

            <p className="text-sm text-tinto-deep/80 whitespace-pre-wrap mb-4 bg-ivory-warm/40 p-3 border border-beige">
              {q.body || "(sin contenido)"}
            </p>

            {canAct && (
              <>
                <label className="block text-xs text-tinto mb-1 mono-label">
                  TU RESPUESTA (edítala si quieres):
                </label>
                <textarea
                  value={drafts[q.id] ?? ""}
                  onChange={(e) =>
                    setDrafts((d) => ({ ...d, [q.id]: e.target.value }))
                  }
                  rows={5}
                  className="w-full px-3 py-2 border border-beige bg-ivory text-sm focus:outline-none focus:border-tinto mb-3"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => act(q.id, "approve")}
                    disabled={busy === q.id}
                    className="px-6 py-2 bg-tinto text-ivory hover:bg-tinto-deep transition-colors mono-label text-sm disabled:opacity-50"
                  >
                    {busy === q.id ? "ENVIANDO..." : "APROBAR Y ENVIAR"}
                  </button>
                  <button
                    onClick={() => act(q.id, "reject")}
                    disabled={busy === q.id}
                    className="px-6 py-2 border border-beige text-tinto-deep/70 hover:border-tinto transition-colors mono-label text-sm disabled:opacity-50"
                  >
                    DESCARTAR
                  </button>
                </div>
              </>
            )}
          </article>
        ))}
      </div>

      {recent.length > 0 && (
        <>
          <h2 className="font-display text-2xl text-tinto-deep mb-4">Historial reciente</h2>
          <div className="space-y-2">
            {recent.map((q) => (
              <div
                key={q.id}
                className="flex items-center justify-between border-b border-beige py-3 text-sm"
              >
                <span className="text-tinto-deep/80 truncate mr-4">
                  {q.subject || "(sin asunto)"}
                </span>
                <span
                  className={`mono-label text-xs ${
                    q.status === "sent" ? "text-tinto" : "text-tinto-deep/40"
                  }`}
                >
                  {q.status === "sent" ? "ENVIADA" : "DESCARTADA"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
