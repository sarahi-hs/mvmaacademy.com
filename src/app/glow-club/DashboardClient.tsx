"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type {
  GlowChallenge,
  GlowRankingRow,
  GlowReflection,
  GlowReflectionWithAuthor,
} from "@/lib/glow/supabase";
import type { GlowSession } from "@/lib/glow/auth";

type DayCell = {
  day: number;
  dateKey: string;
  checked: boolean;
  state: "done" | "missed" | "today" | "future";
};

type Props = {
  session: GlowSession;
  challenge: GlowChallenge | null;
  today: string;
  checkedToday: boolean;
  streak: number;
  totalPoints: number;
  daysArray: DayCell[];
  ranking: GlowRankingRow[];
  myPosition: number;
  todayReflection: GlowReflection | null;
  reflections: GlowReflectionWithAuthor[];
};

const monthNames = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

function dayName(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("es-MX", { weekday: "long" });
}

export default function DashboardClient({
  session,
  challenge,
  today,
  checkedToday: initialChecked,
  streak: initialStreak,
  totalPoints: initialPoints,
  daysArray,
  ranking,
  myPosition,
  todayReflection: initialTodayReflection,
  reflections,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [checked, setChecked] = useState(initialChecked);
  const [streak, setStreak] = useState(initialStreak);
  const [points, setPoints] = useState(initialPoints);
  const [err, setErr] = useState<string | null>(null);
  const [todayReflection, setTodayReflection] = useState<GlowReflection | null>(
    initialTodayReflection
  );

  const todayNum = parseInt(today.slice(-2), 10);
  const monthNum = parseInt(today.slice(5, 7), 10);

  async function doCheckin() {
    setErr(null);
    const res = await fetch("/api/glow-club/checkin", { method: "POST" });
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error || "No se pudo guardar tu check");
      return;
    }
    setChecked(true);
    setStreak((s) => s + 1);
    setPoints((p) => p + (data.points || 10));
    startTransition(() => router.refresh());
  }

  async function doLogout() {
    await fetch("/api/glow-club/logout", { method: "POST" });
    router.push("/glow-club/login");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      {/* Header */}
      <header className="mb-5 flex items-center justify-between rounded-2xl border border-[#F4D4D4] bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4D4D4]">
            <span aria-hidden>✨</span>
          </div>
          <span className="text-sm font-medium text-[#3D1A1F]">Glow Club</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#3D1A1F]/60">
            Hola, {session.fullName.split(" ")[0]} 🌸
          </span>
          <button
            onClick={doLogout}
            className="text-xs text-[#722F37] underline underline-offset-2 hover:no-underline"
          >
            Salir
          </button>
        </div>
      </header>

      {/* Contenedor blanco principal */}
      <div className="space-y-5 rounded-2xl border border-[#F4D4D4] bg-white p-5">
        {/* Reto del mes */}
        <section className="rounded-2xl bg-[#F4D4D4]/40 px-5 py-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[#722F37]">
            🔥 Reto de {monthNames[monthNum - 1]}
          </p>
          <h1 className="mt-1 text-xl font-medium text-[#3D1A1F]">
            {challenge?.title || "Aún no hay reto este mes"}
          </h1>
          {challenge?.description && (
            <p className="mt-1 text-sm text-[#3D1A1F]/70">
              {challenge.description}
            </p>
          )}
        </section>

        {/* Check + racha */}
        <div className="grid gap-3 sm:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl bg-[#FAF7F2] p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-[#3D1A1F]/60">
              Tu check de hoy · {dayName(today)} {todayNum}
            </p>
            {checked ? (
              <>
                <div className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                  ✓ Ya cumpliste hoy, hermosa
                </div>
                <TodayReflection
                  existing={todayReflection}
                  onSaved={(r) => {
                    setTodayReflection(r);
                    startTransition(() => router.refresh());
                  }}
                />
              </>
            ) : (
              <button
                onClick={doCheckin}
                disabled={pending || !challenge}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#722F37] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3D1A1F] disabled:opacity-60"
              >
                {pending ? "Guardando…" : "✓  Sí cumplí mi reto hoy"}
              </button>
            )}
            {err && (
              <p className="mt-2 text-xs text-red-700">{err}</p>
            )}
            {!checked && (
              <p className="mt-2 text-center text-[11px] text-[#3D1A1F]/50">
                Suma {challenge?.points_per_day ?? 10} puntos al presionar
              </p>
            )}
          </div>

          <div className="rounded-2xl bg-[#FAF7F2] p-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-[#3D1A1F]/60">
              Tu racha
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-medium text-[#3D1A1F]">
                {streak}
              </span>
              <span className="text-xs text-[#3D1A1F]/60">
                día{streak === 1 ? "" : "s"} seguido{streak === 1 ? "" : "s"}
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl font-medium text-[#722F37]">
                {points}
              </span>
              <span className="text-xs text-[#3D1A1F]/60">puntos del mes</span>
            </div>
          </div>
        </div>

        {/* Calendario del mes completo */}
        <section className="rounded-2xl bg-[#FAF7F2] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-wider text-[#3D1A1F]/60">
              Tu mes
            </p>
            <p className="text-xs text-[#3D1A1F]/60">
              {daysArray.filter((d) => d.checked).length} de {daysArray.length}{" "}
              días ✓
            </p>
          </div>
          <div
            className="grid gap-1"
            style={{
              // Repartimos el mes en filas parejas; 16 columnas se ve bien
              // tanto para meses de 28 como para meses de 31 días.
              gridTemplateColumns: `repeat(16, minmax(0, 1fr))`,
            }}
          >
            {daysArray.map((d) => {
              // 4 estados visuales:
              // done    → tinto sólido con ✓ (día cumplido)
              // today   → borde punteado tinto sobre blanco (hoy, aún puede)
              // missed  → rosita claro con ✕ tenue (ya pasó y no cumplió)
              // future  → gris muy claro (aún no llega)
              const styles: Record<DayCell["state"], string> = {
                done: "bg-[#722F37]",
                today: "border-2 border-dashed border-[#722F37] bg-white",
                missed: "bg-[#F4D4D4]",
                future: "bg-[#F4D4D4]/30 border border-[#F4D4D4]",
              };
              const dateLabel = new Date(d.dateKey + "T12:00:00")
                .toLocaleDateString("es-MX", {
                  day: "numeric",
                  month: "short",
                });
              const titleByState = {
                done: `${dateLabel} — ✓ cumpliste`,
                today: `${dateLabel} — hoy`,
                missed: `${dateLabel} — no cumpliste`,
                future: `${dateLabel} — aún no llega`,
              };
              return (
                <div
                  key={d.dateKey}
                  className={`aspect-square rounded ${styles[d.state]} flex items-center justify-center`}
                  title={titleByState[d.state]}
                >
                  {d.state === "done" && (
                    <span className="text-[10px] font-bold text-white">✓</span>
                  )}
                  {d.state === "today" && (
                    <span className="text-[9px] font-bold text-[#722F37]">
                      {d.day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {/* Leyenda pequeña */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-[#3D1A1F]/60">
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#722F37]" />{" "}
              cumplido
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 rounded-sm border-2 border-dashed border-[#722F37] bg-white" />{" "}
              hoy
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#F4D4D4]" />{" "}
              no cumpliste
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 rounded-sm border border-[#F4D4D4] bg-[#F4D4D4]/30" />{" "}
              por venir
            </span>
          </div>
        </section>

        {/* Ranking */}
        <section className="rounded-2xl bg-[#FAF7F2] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-wider text-[#3D1A1F]/60">
              Ranking del mes
            </p>
            {challenge?.prize && (
              <span className="rounded-full bg-[#F4D4D4] px-2 py-0.5 text-[10px] font-medium text-[#722F37]">
                🎁 {challenge.prize}
              </span>
            )}
          </div>

          {ranking.length === 0 ? (
            <p className="py-3 text-center text-sm text-[#3D1A1F]/50">
              Aún no hay ranking este mes. ¡Sé la primera! 🌸
            </p>
          ) : (
            <ol>
              {ranking.slice(0, 10).map((r, i) => {
                const isMe = r.member_id === session.memberId;
                return (
                  <li
                    key={r.member_id}
                    className={`flex items-center gap-3 border-t border-[#F4D4D4] py-2 first:border-0 ${
                      isMe ? "-mx-4 rounded-lg bg-[#F4D4D4]/40 px-4" : ""
                    }`}
                  >
                    <span
                      className={`w-5 text-sm font-medium ${
                        i < 3 ? "text-[#722F37]" : "text-[#3D1A1F]/50"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4D4D4] text-[11px] font-medium text-[#722F37]">
                      {r.initials || initials(r.full_name)}
                    </div>
                    <span
                      className={`flex-1 text-sm ${isMe ? "font-medium text-[#3D1A1F]" : "text-[#3D1A1F]/90"}`}
                    >
                      {isMe ? `Tú · ${r.full_name.split(" ")[0]}` : r.full_name}
                    </span>
                    <span className="text-sm font-medium text-[#3D1A1F]">
                      {r.total_points} pts
                    </span>
                  </li>
                );
              })}
            </ol>
          )}

          {myPosition >= 0 && myPosition >= 10 && (
            <p className="mt-3 text-center text-xs text-[#3D1A1F]/60">
              Tu posición: #{myPosition + 1}
            </p>
          )}
        </section>
      </div>

      {/* Diario de la Comunidad — reflexiones de todas las chicas del mes */}
      <CommunityDiary reflections={reflections} meMemberId={session.memberId} />

      {/* Placeholder de Sarahi AI (Fase 3) */}
      <div className="mt-5 rounded-2xl bg-[#3D1A1F] p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4D4D4]">
            <span className="text-lg">✨</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Sarahi AI</p>
            <p className="text-xs text-[#F4D4D4]">Próximamente 🌸</p>
          </div>
        </div>
      </div>
    </main>
  );
}

// -----------------------------------------------------------
// TodayReflection
// -----------------------------------------------------------
// Cajita opcional que aparece justo debajo del "✓ Ya cumpliste hoy".
// - Si la chica AÚN no escribió reflexión hoy: muestra la textarea con
//   el prompt "¿Cómo te sentiste?" y botón "Compartir con la comunidad".
// - Si ya escribió: muestra su texto tal cual, con un "editar" pequeñito
//   para poder cambiarlo.
// -----------------------------------------------------------
function TodayReflection({
  existing,
  onSaved,
}: {
  existing: GlowReflection | null;
  onSaved: (r: GlowReflection) => void;
}) {
  const [editing, setEditing] = useState(!existing);
  const [text, setText] = useState(existing?.text ?? "");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (text.trim().length === 0) {
      setErr("Escribe algo antes de compartir 🌸");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/glow-club/reflection", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "No se pudo guardar");
        return;
      }
      onSaved(data.reflection as GlowReflection);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  if (!editing && existing) {
    return (
      <div className="mt-3 rounded-lg border border-[#F4D4D4] bg-white p-3">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#3D1A1F]/50">
            Tu reflexión de hoy
          </p>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-[11px] text-[#722F37] underline underline-offset-2 hover:no-underline"
          >
            editar
          </button>
        </div>
        <p className="whitespace-pre-line text-sm text-[#3D1A1F]/90">
          {existing.text}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-3">
      <label className="block text-[11px] font-medium uppercase tracking-wider text-[#3D1A1F]/60">
        ¿Cómo te sentiste? <span className="normal-case text-[#3D1A1F]/40">(opcional)</span>
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={2000}
        rows={3}
        placeholder="Cuéntanos qué cambió, qué sentiste, qué descubriste hoy…"
        className="mt-1 w-full resize-none rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
      />
      {err && <p className="mt-1 text-xs text-red-700">{err}</p>}
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-[10px] text-[#3D1A1F]/40">
          {text.length}/2000
        </span>
        <div className="flex items-center gap-2">
          {existing && (
            <button
              type="button"
              onClick={() => {
                setText(existing.text);
                setEditing(false);
                setErr(null);
              }}
              className="text-[11px] text-[#3D1A1F]/60 underline"
            >
              cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#722F37] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#3D1A1F] disabled:opacity-60"
          >
            {saving ? "Guardando…" : "💌 Compartir con la comunidad"}
          </button>
        </div>
      </div>
    </form>
  );
}

// -----------------------------------------------------------
// CommunityDiary
// -----------------------------------------------------------
// Feed con las reflexiones de todas las chicas del reto del mes.
// Ordenadas de la más nueva a la más vieja. Marca la del yo con un
// borde tinto sutil para que la chica encuentre lo suyo fácil.
// -----------------------------------------------------------
function CommunityDiary({
  reflections,
  meMemberId,
}: {
  reflections: GlowReflectionWithAuthor[];
  meMemberId: string;
}) {
  return (
    <section className="mt-5 rounded-2xl border border-[#F4D4D4] bg-white p-5">
      <div className="mb-1 flex items-center gap-2">
        <span aria-hidden>🌸</span>
        <h2 className="text-lg font-medium text-[#3D1A1F]">
          Diario de la comunidad
        </h2>
      </div>
      <p className="mb-4 text-xs text-[#3D1A1F]/60">
        Cómo se están sintiendo las Glow Girls este mes.
      </p>

      {reflections.length === 0 ? (
        <p className="rounded-lg bg-[#FAF7F2] px-4 py-6 text-center text-sm text-[#3D1A1F]/60">
          Aún no hay reflexiones este mes. ¡Sé la primera en compartir cómo te
          sentiste después de tu check! 🌸
        </p>
      ) : (
        <ol className="space-y-3">
          {reflections.map((r) => {
            const isMine = r.member_id === meMemberId;
            return (
              <li
                key={r.id}
                className={`rounded-xl p-3 ${
                  isMine
                    ? "border border-[#722F37]/40 bg-[#F4D4D4]/20"
                    : "bg-[#FAF7F2]"
                }`}
              >
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4D4D4] text-[11px] font-medium text-[#722F37]">
                    {r.author_initials || r.author_name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-[#3D1A1F]">
                    {isMine ? "Tú" : r.author_name}
                  </span>
                  <span className="text-[10px] text-[#3D1A1F]/50">
                    · {formatRelativeMx(r.created_at)}
                  </span>
                </div>
                <p className="whitespace-pre-line text-sm text-[#3D1A1F]/90">
                  {r.text}
                </p>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

// Timestamp legible en español ("hace 2 h", "hace 3 d", etc.)
function formatRelativeMx(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMin = Math.round((now - then) / 60000);
  if (diffMin < 1) return "ahorita";
  if (diffMin < 60) return `hace ${diffMin} min`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `hace ${diffHr} h`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 30) return `hace ${diffDay} d`;
  return new Date(iso).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
  });
}
