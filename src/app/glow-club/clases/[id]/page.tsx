import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getGlowSession } from "@/lib/glow/auth";
import { getLesson } from "@/lib/glow/lessons";
import { embedUrl } from "@/lib/glow/video";
import GlowNav from "../../GlowNav";

export const dynamic = "force-dynamic";

export default async function GlowLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getGlowSession();
  if (!session) redirect("/glow-club/login");

  const { id } = await params;
  const lesson = await getLesson(id);
  if (!lesson) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <GlowNav firstName={session.fullName.split(" ")[0] ?? ""} active="clases" />
      <Link href="/glow-club/clases" className="text-xs text-[#722F37] underline underline-offset-2">
        ← Todas las clases
      </Link>

      <div className="mt-3 overflow-hidden rounded-2xl border border-[#F4D4D4] bg-white">
        <div className="relative aspect-video bg-black">
          <iframe
            src={embedUrl(lesson)}
            title={lesson.title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        </div>
        <div className="p-5">
          {lesson.topic && (
            <p className="text-[11px] font-medium uppercase tracking-wider text-[#722F37]/80">
              {lesson.topic}
            </p>
          )}
          <h1 className="mt-1 text-xl font-medium text-[#3D1A1F]">{lesson.title}</h1>
          {lesson.description && (
            <p className="mt-2 whitespace-pre-line text-sm text-[#3D1A1F]/75">{lesson.description}</p>
          )}
        </div>
      </div>
    </main>
  );
}
