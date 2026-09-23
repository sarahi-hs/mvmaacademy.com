"use client";

import { useState } from "react";
import { thumbnailUrl, type GlowLesson } from "@/lib/glow/video";

// maxresdefault no existe para videos de baja resolución: YouTube responde
// con un placeholder gris de 120×90 en vez de un error, así que también
// revisamos el tamaño al cargar.
export default function LessonThumb({
  lesson,
  className,
}: {
  lesson: Pick<GlowLesson, "provider" | "video_id">;
  className?: string;
}) {
  const [quality, setQuality] = useState<"hd" | "sd">("hd");
  const src = thumbnailUrl(lesson, quality);

  if (!src) {
    return <div className={`flex items-center justify-center text-3xl ${className ?? ""}`}>🎬</div>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={src}
      src={src}
      alt=""
      className={className}
      onLoad={(e) => {
        if (quality === "hd" && e.currentTarget.naturalWidth <= 120) setQuality("sd");
      }}
      onError={() => quality === "hd" && setQuality("sd")}
    />
  );
}
