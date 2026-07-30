"use client";

import { useEffect, useState } from "react";

type Props = {
  /** ISO string. Ejemplo: "2026-08-04T23:59:59-06:00" (Mexico Central). */
  endAt: string;
  /** Texto del label superior. */
  label?: string;
};

function parts(msLeft: number) {
  const s = Math.max(0, Math.floor(msLeft / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function CountdownBanner({ endAt, label = "PRECIO DE APERTURA TERMINA EN" }: Props) {
  const [now, setNow] = useState<number | null>(null);
  const target = new Date(endAt).getTime();

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Render nada hasta hidratar (evita mismatch SSR/CSR)
  if (now === null) {
    return (
      <div className="bg-tinto-deep text-ivory py-4 border-b border-beige/20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="mono-label text-beige/70 text-xs tracking-wider">{label}</p>
          <p className="font-display text-2xl md:text-3xl text-beige mt-1">— : — : — : —</p>
        </div>
      </div>
    );
  }

  const msLeft = target - now;
  if (msLeft <= 0) return null; // Promo terminó — no se muestra nada

  const { days, hours, minutes, seconds } = parts(msLeft);

  return (
    <div className="bg-tinto-deep text-ivory py-4 border-b border-beige/20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="mono-label text-beige/80 text-xs tracking-widest mb-2" style={{ color: "rgba(214,199,174,0.85)" }}>
          ⏱ {label}
        </p>
        <div className="flex justify-center items-baseline gap-3 md:gap-6">
          <Unit num={days} label="días" />
          <Sep />
          <Unit num={hours} label="hrs" />
          <Sep />
          <Unit num={minutes} label="min" />
          <Sep />
          <Unit num={seconds} label="seg" />
        </div>
      </div>
    </div>
  );
}

function Unit({ num, label }: { num: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-3xl md:text-4xl text-beige tabular-nums leading-none">
        {pad(num)}
      </span>
      <span className="mono-label text-[9px] md:text-[10px] text-ivory/50 mt-1 tracking-widest">
        {label}
      </span>
    </div>
  );
}

function Sep() {
  return (
    <span className="font-display text-2xl md:text-3xl text-beige/40 leading-none">:</span>
  );
}
