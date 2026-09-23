"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GlowLesson } from "@/lib/glow/video";
import LessonThumb from "./LessonThumb";

export default function LessonsGrid({ lessons }: { lessons: GlowLesson[] }) {
  const [topic, setTopic] = useState<string | null>(null);
  const topics = useMemo(
    () => Array.from(new Set(lessons.map((l) => l.topic).filter(Boolean))) as string[],
    [lessons]
  );
  const visible = topic ? lessons.filter((l) => l.topic === topic) : lessons;

  if (lessons.length === 0) {
    return (
      <p className="mt-6 rounded-lg bg-[#FAF7F2] px-4 py-8 text-center text-sm text-[#3D1A1F]/60">
        Pronto vas a encontrar aquí las clases grabadas ✨
      </p>
    );
  }

  return (
    <>
      {topics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip active={topic === null} onClick={() => setTopic(null)}>
            Todas
          </Chip>
          {topics.map((t) => (
            <Chip key={t} active={topic === t} onClick={() => setTopic(t)}>
              {t}
            </Chip>
          ))}
        </div>
      )}

      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {visible.map((l) => {
          return (
            <li key={l.id}>
              <Link
                href={`/glow-club/clases/${l.id}`}
                className="group block overflow-hidden rounded-xl border border-[#F4D4D4] bg-[#FAF7F2] transition hover:border-[#722F37]/50"
              >
                <div className="relative aspect-video bg-[#F4D4D4]/50">
                  <LessonThumb lesson={l} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-lg text-[#722F37] shadow-sm transition group-hover:scale-105">
                      ▶
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  {l.topic && (
                    <p className="text-[10px] font-medium uppercase tracking-wider text-[#722F37]/80">
                      {l.topic}
                    </p>
                  )}
                  <p className="mt-0.5 text-sm font-medium text-[#3D1A1F]">{l.title}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs transition ${
        active
          ? "bg-[#722F37] text-white"
          : "border border-[#F4D4D4] bg-white text-[#3D1A1F]/80 hover:border-[#722F37]/50"
      }`}
    >
      {children}
    </button>
  );
}
