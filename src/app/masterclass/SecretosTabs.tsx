"use client";

import { useState } from "react";
import { SECRETOS } from "./config";

/**
 * 3 tabs estilo CARPETA:
 * - Cada tab está pegada arriba del cuerpo (folder-tab style)
 * - El tab activo "sobresale" con color pleno
 * - Los inactivos se ven detrás con color muted
 * - El cuerpo hereda el color del tab activo
 */

const FOLDER_STYLES = [
  {
    // Secreto 1 — Rosa vivo
    activeTab: "bg-rosa-vivo text-tinto-deep border-rosa-vivo",
    inactiveTab: "bg-rosa-suave text-tinto-deep/60 border-rosa-suave hover:bg-rosa-vivo/40",
    body: "bg-rosa-vivo text-tinto-deep",
    accent: "text-tinto",
  },
  {
    // Secreto 2 — Tinto
    activeTab: "bg-tinto text-ivory border-tinto",
    inactiveTab: "bg-tinto/20 text-tinto-deep/60 border-tinto/20 hover:bg-tinto/40",
    body: "bg-tinto text-ivory",
    accent: "text-rosa-vivo",
  },
  {
    // Secreto 3 — Gris
    activeTab: "bg-gris text-ivory border-gris",
    inactiveTab: "bg-gris-claro text-tinto-deep/60 border-gris-claro hover:bg-gris/40",
    body: "bg-gris text-ivory",
    accent: "text-rosa-vivo",
  },
] as const;

export function SecretosTabs() {
  const [active, setActive] = useState(0);
  const current = SECRETOS[active];
  const style = FOLDER_STYLES[active];

  return (
    <div className="max-w-4xl mx-auto">
      {/* CARPETA — Tabs pegadas al body */}
      <div className="relative">
        {/* Fila de tabs */}
        <div className="flex gap-1 md:gap-2 pl-2 md:pl-6">
          {SECRETOS.map((s, i) => {
            const c = FOLDER_STYLES[i];
            const isActive = i === active;
            return (
              <button
                key={s.key}
                onClick={() => setActive(i)}
                className={`
                  relative px-5 md:px-8 py-3 md:py-4
                  text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold
                  border-2 border-b-0
                  transition-all duration-200
                  ${isActive ? c.activeTab : c.inactiveTab}
                  ${isActive ? "translate-y-[2px] z-10" : "opacity-90"}
                `}
                style={{
                  clipPath:
                    "polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Body de la "carpeta" */}
        <div
          className={`relative ${style.body} p-8 md:p-14 lg:p-20 border-2 border-t-0 shadow-2xl transition-all duration-300`}
          style={{ borderColor: "currentColor", borderTopWidth: 0 }}
        >
          {/* Número decorativo huge */}
          <p
            className={`absolute -top-4 right-6 md:top-6 md:right-12 font-display italic text-[7rem] md:text-[12rem] leading-none opacity-15 select-none pointer-events-none`}
            aria-hidden
          >
            {current.key}
          </p>

          <p className={`editorial-eyebrow mb-6 relative z-10 ${style.accent}`}>
            {current.label}
          </p>
          <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.2] relative z-10">
            {current.body}
          </p>
        </div>
      </div>

      {/* Hint pequeño */}
      <p className="text-center text-xs uppercase tracking-[0.2em] text-tinto-deep/50 mt-6">
        · Da clic en cada pestaña ·
      </p>
    </div>
  );
}
