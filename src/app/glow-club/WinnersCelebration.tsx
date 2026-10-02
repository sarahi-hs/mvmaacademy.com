"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export type LastMonthWinners = {
  monthKey: string; // 'YYYY-MM-01' del mes que terminó
  monthLabel: string; // 'septiembre'
  challengeTitle: string;
  winners: { memberId: string; name: string; points: number; days: number }[];
};

const medals = ["🥇", "🥈", "🥉"];
const brandColors = ["#722F37", "#F4D4D4", "#C9A15C", "#FAF7F2"];

export default function WinnersCelebration({
  data,
  meMemberId,
}: {
  data: LastMonthWinners;
  meMemberId: string;
}) {
  const storageKey = `glow-winners-seen-${data.monthKey}`;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey)) return;
    } catch {
      // sin localStorage (modo privado): lo mostramos igual
    }
    const timer = setTimeout(() => {
      setOpen(true);
      const end = Date.now() + 1800;
      const burst = () => {
        confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0 }, colors: brandColors });
        confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1 }, colors: brandColors });
        if (Date.now() < end) requestAnimationFrame(burst);
      };
      burst();
    }, 400);
    return () => clearTimeout(timer);
  }, [storageKey]);

  function close() {
    try {
      localStorage.setItem(storageKey, "1");
    } catch {}
    setOpen(false);
  }

  if (!open) return null;

  const myPlace = data.winners.findIndex((w) => w.memberId === meMemberId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#3D1A1F]/40 px-4"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="glow-winners-title"
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-[#F4D4D4] bg-white p-6 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[11px] font-medium uppercase tracking-widest text-[#722F37]">
          Ganadoras de {data.monthLabel}
        </p>
        <h2
          id="glow-winners-title"
          className="mt-1 text-xl text-[#3D1A1F]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {data.challengeTitle}
        </h2>

        <ol className="mt-5 space-y-2">
          {data.winners.map((w, i) => (
            <li
              key={w.memberId}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                w.memberId === meMemberId
                  ? "border border-[#722F37]/40 bg-[#F4D4D4]/40"
                  : i === 0
                    ? "bg-[#F4D4D4]/30"
                    : "bg-[#FAF7F2]"
              }`}
            >
              <span className="text-2xl">{medals[i]}</span>
              <span className="flex-1 text-left text-sm font-medium text-[#3D1A1F]">
                {w.memberId === meMemberId ? "¡Tú!" : w.name}
              </span>
              <span className="text-xs text-[#3D1A1F]/70">
                <strong className="text-sm text-[#722F37]">{w.points}</strong> pts
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-5 text-sm text-[#3D1A1F]/80">
          {myPlace >= 0
            ? `Quedaste en el lugar #${myPlace + 1}, hermosa. ¡Qué orgullo! 💗`
            : "Gracias por sostenerte todo el mes. Este mes también es tuyo 🌸"}
        </p>

        <button
          onClick={close}
          className="mt-5 w-full rounded-lg bg-[#722F37] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3D1A1F]"
        >
          Empezar mi nuevo reto ✨
        </button>
      </div>
    </div>
  );
}
