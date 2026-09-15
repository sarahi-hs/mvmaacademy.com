"use client";

import { useState } from "react";
import { SECRETOS } from "./config";

const TAB_COLORS = [
  { bg: "bg-rosita-deep", text: "text-ivory", cardBg: "bg-tinto", cardText: "text-ivory" },
  { bg: "bg-tinto", text: "text-ivory", cardBg: "bg-rosita-deep", cardText: "text-tinto-deep" },
  { bg: "bg-beige", text: "text-tinto-deep", cardBg: "bg-ivory-warm", cardText: "text-tinto-deep" },
] as const;

export function SecretosTabs() {
  const [active, setActive] = useState(0);
  const current = SECRETOS[active];
  const color = TAB_COLORS[active];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
        {SECRETOS.map((s, i) => {
          const c = TAB_COLORS[i];
          const isActive = i === active;
          return (
            <button
              key={s.key}
              onClick={() => setActive(i)}
              className={`px-6 md:px-8 py-3 md:py-4 text-xs md:text-sm uppercase tracking-[0.2em] font-medium border transition-all ${
                isActive
                  ? `${c.bg} ${c.text} border-transparent shadow-lg`
                  : "bg-transparent text-tinto-deep border-tinto-deep/30 hover:border-tinto-deep"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Card grande del secreto activo */}
      <div
        className={`relative ${color.cardBg} ${color.cardText} p-10 md:p-16 lg:p-20 transition-all duration-500`}
      >
        {/* Número decorativo huge esquina */}
        <p
          className={`absolute top-4 right-6 md:top-8 md:right-10 font-display italic text-[6rem] md:text-[10rem] leading-none opacity-15 select-none pointer-events-none`}
          aria-hidden
        >
          {current.key}
        </p>

        <p className="editorial-eyebrow mb-6 opacity-80 relative z-10">
          {current.label}
        </p>
        <p className="font-display text-2xl md:text-4xl lg:text-5xl leading-[1.2] relative z-10">
          {current.body}
        </p>
      </div>
    </div>
  );
}
