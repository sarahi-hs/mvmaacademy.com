import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/pr/auth";
import { prSupabase, PrQuery } from "@/lib/pr/supabase";
import { QueriesBoard } from "./QueriesBoard";

export const metadata: Metadata = {
  title: "PR Auto-Pilot",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PrAutopilotPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const supabase = prSupabase();

  const today = new Date().toISOString().slice(0, 10);
  const [{ data: stats }, { data: pending }, { data: recent }] = await Promise.all([
    supabase.from("pr_stats").select("*").eq("date", today).maybeSingle(),
    supabase
      .from("pr_queries")
      .select("*")
      .eq("status", "pending")
      .order("score", { ascending: false })
      .limit(50),
    supabase
      .from("pr_queries")
      .select("*")
      .in("status", ["sent", "rejected"])
      .order("created_at", { ascending: false })
      .limit(20),
  ]);

  const pendingQueries = (pending ?? []) as PrQuery[];
  const recentQueries = (recent ?? []) as PrQuery[];

  return (
    <main className="min-h-screen bg-ivory px-6 py-12 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="mono-label text-tinto mb-1">— PR AUTO-PILOT —</p>
          <h1 className="font-display text-4xl text-tinto-deep">Hola, Sarahi</h1>
        </div>
        <form action="/api/pr-autopilot/logout" method="post">
          <button
            formAction="/api/pr-autopilot/logout"
            className="text-sm text-tinto-deep/60 hover:text-tinto underline-offset-4 hover:underline"
          >
            Salir
          </button>
        </form>
      </div>

      {/* Estadísticas de hoy */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Stat label="Peticiones hoy" value={stats?.queries_received ?? 0} />
        <Stat label="Alta relevancia" value={stats?.matches_high ?? 0} />
        <Stat label="Media relevancia" value={stats?.matches_medium ?? 0} />
        <Stat label="Respuestas enviadas" value={stats?.responses_sent ?? 0} />
      </div>

      <QueriesBoard pending={pendingQueries} recent={recentQueries} role={session.role} />
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-beige bg-ivory-warm/40 p-6 text-center">
      <p className="font-display text-4xl text-tinto">{value}</p>
      <p className="text-xs text-tinto-deep/70 mt-1">{label}</p>
    </div>
  );
}
