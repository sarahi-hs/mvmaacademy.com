"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export type LastMonthWinners = {
  monthKey: string; // 'YYYY-MM-01' del mes que terminó
  monthLabel: string; // 'septiembre'
  challengeTitle: string;
  prize: string | null;
  winners: { memberId: string; name: string; points: number; days: number }[];
};

const brandColors = ["#722F37", "#F4D4D4", "#C9A15C", "#FAF7F2"];

export default function WinnersCelebration({
  data,
  meMemberId,
}: {
  data: LastMonthWinners;
  meMemberId: string;
}) {
  const storageKey = `glow-winners-seen-v2-${data.monthKey}`;
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
  const [winner, ...honorable] = data.winners;
  if (!winner) return null;

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
          La ganadora de {data.monthLabel}
        </p>
        <p className="mt-0.5 text-xs text-[#3D1A1F]/60">Reto: {data.challengeTitle}</p>

        <div
          className={`mt-5 rounded-2xl px-4 py-5 ${
            winner.memberId === meMemberId ? "border border-[#722F37]/40 bg-[#F4D4D4]/50" : "bg-[#F4D4D4]/40"
          }`}
        >
          <div className="text-4xl">👑</div>
          <h2
            id="glow-winners-title"
            className="mt-2 text-2xl text-[#3D1A1F]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {winner.memberId === meMemberId ? "¡Tú!" : winner.name}
          </h2>
          <p className="mt-1 text-xs text-[#3D1A1F]/70">
            <strong className="text-sm text-[#722F37]">{winner.points}</strong> puntos · {winner.days} días
          </p>
          {data.prize && (
            <p className="mt-3 inline-block rounded-full bg-white px-3 py-1 text-xs font-medium text-[#722F37]">
              🎁 Se lleva: {data.prize}
            </p>
          )}
        </div>

        {honorable.length > 0 && (
          <div className="mt-4">
            <p className="text-[10px] font-medium uppercase tracking-widest text-[#3D1A1F]/50">
              ✨ También brillaron
            </p>
            <ul className="mt-2 space-y-1">
              {honorable.map((w) => (
                <li
                  key={w.memberId}
                  className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-xs ${
                    w.memberId === meMemberId ? "bg-[#F4D4D4]/40 text-[#3D1A1F]" : "bg-[#FAF7F2] text-[#3D1A1F]/80"
                  }`}
                >
                  <span>{w.memberId === meMemberId ? "Tú" : w.name}</span>
                  <span>{w.points} pts</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-5 text-sm text-[#3D1A1F]/80">
          {myPlace === 0
            ? "¡Ganaste el reto, hermosa! Sarahi te contactará para tu premio 💗"
            : myPlace > 0
              ? "¡Estuviste en el top del mes! Qué orgullo verte brillar 💗"
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
