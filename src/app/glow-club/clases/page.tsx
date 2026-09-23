import { redirect } from "next/navigation";
import { getGlowSession } from "@/lib/glow/auth";
import { getLessons } from "@/lib/glow/lessons";
import GlowNav from "../GlowNav";
import LessonsGrid from "./LessonsGrid";

export const dynamic = "force-dynamic";

export default async function GlowLessonsPage() {
  const session = await getGlowSession();
  if (!session) redirect("/glow-club/login");
  const lessons = await getLessons();

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <GlowNav firstName={session.fullName.split(" ")[0] ?? ""} active="clases" />
      <div className="rounded-2xl border border-[#F4D4D4] bg-white p-5">
        <h1 className="text-xl font-medium text-[#3D1A1F]">Clases grabadas</h1>
        <p className="mt-1 text-sm text-[#3D1A1F]/60">
          Tu biblioteca para ver y volver a ver cuando lo necesites 🌸
        </p>
        <LessonsGrid lessons={lessons} />
      </div>
    </main>
  );
}
