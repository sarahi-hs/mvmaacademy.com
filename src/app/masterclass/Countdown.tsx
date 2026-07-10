"use client";

import { useEffect, useState } from "react";

function calcRemaining(targetIso: string) {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s, done: false };
}

export function Countdown({ targetIso }: { targetIso: string }) {
  const [t, setT] = useState<ReturnType<typeof calcRemaining> | null>(null);

  useEffect(() => {
    setT(calcRemaining(targetIso));
    const id = setInterval(() => setT(calcRemaining(targetIso)), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  if (!t) {
    return <div className="h-24" aria-hidden />;
  }

  if (t.done) {
    return (
      <p className="editorial-eyebrow text-tinto">La masterclass ya comenzó</p>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 md:gap-8">
      <Cell value={t.d} label="días" />
      <Sep />
      <Cell value={t.h} label="horas" />
      <Sep />
      <Cell value={t.m} label="min" />
      <Sep />
      <Cell value={t.s} label="seg" />
    </div>
  );
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-5xl md:text-6xl text-tinto-deep tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="editorial-eyebrow text-[0.6rem] md:text-xs mt-1">
        {label}
      </span>
    </div>
  );
}

function Sep() {
  return (
    <span className="font-display text-4xl md:text-5xl text-tinto/40" aria-hidden>
      :
    </span>
  );
}
