"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { GlowChallenge, GlowRankingRow } from "@/lib/glow/supabase";
import type { GlowSession } from "@/lib/glow/auth";

type DayCell = { day: number; dateKey: string; checked: boolean };

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
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [checked, setChecked] = useState(initialChecked);
  const [streak, setStreak] = useState(initialStreak);
  const [points, setPoints] = useState(initialPoints);
  const [err, setErr] = useState<string | null>(null);

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
              <div className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                ✓ Ya cumpliste hoy, hermosa
              </div>
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
            <p className="mt-2 text-center text-[11px] text-[#3D1A1F]/50">
              Suma {challenge?.points_per_day ?? 10} puntos al presionar
            </p>
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

        {/* Calendario del mes */}
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
              gridTemplateColumns: `repeat(${Math.min(
                daysArray.length,
                17
              )}, minmax(0, 1fr))`,
            }}
          >
            {daysArray.map((d) => {
              const isToday = d.day === todayNum;
              return (
                <div
                  key={d.dateKey}
                  className={`aspect-square rounded ${
                    d.checked
                      ? "bg-[#722F37]"
                      : isToday
                        ? "border border-dashed border-[#722F37] bg-white"
                        : "bg-[#F4D4D4]"
                  } flex items-center justify-center`}
                  title={`Día ${d.day}${d.checked ? " ✓" : ""}`}
                >
                  {d.checked && (
                    <span className="text-[10px] font-bold text-white">✓</span>
                  )}
                </div>
              );
            })}
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
