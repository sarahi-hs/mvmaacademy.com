import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/pr/auth";
import { glowSupabase, type GlowChallenge } from "@/lib/glow/supabase";
import { currentMonthStart, getMonthlyRanking, getRecentReflections } from "@/lib/glow/data";

export const dynamic = "force-dynamic";

const monthLabel = (month: string) =>
  new Date(month + "T12:00:00").toLocaleDateString("es-MX", { month: "long", year: "numeric" });

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short" });

const medals = ["🥇", "🥈", "🥉"];

export default async function GlowHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ mes?: string }>;
}) {
  if (!(await getSession())) redirect("/admin/login");

  const { data } = await glowSupabase()
    .from("glow_challenges")
    .select("*")
    .order("month", { ascending: false });
  const challenges = (data || []) as GlowChallenge[];

  const { mes } = await searchParams;
  const lastFinished = challenges.find((c) => c.month < currentMonthStart());
  const selected = challenges.find((c) => c.month === mes) ?? lastFinished ?? challenges[0];

  if (!selected) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-sm text-[#3D1A1F]/60">Aún no hay retos registrados.</p>
      </main>
    );
  }

  const [ranking, reflections] = await Promise.all([
    getMonthlyRanking(selected.month),
    getRecentReflections(selected.id, 1000),
  ]);
  const withPoints = ranking.filter((r) => r.total_points > 0);
  const podium = withPoints.slice(0, 3);
  const totalReplies = reflections.reduce((n, r) => n + r.replies.length, 0);
  const chronological = [...reflections].reverse();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/admin/glow-club" className="text-xs text-[#722F37] underline underline-offset-2">
        ← Volver al admin
      </Link>
      <h1 className="mt-2 text-2xl font-medium text-[#3D1A1F]">Historial de retos</h1>

      <nav className="mt-4 flex flex-wrap gap-2">
        {challenges.map((c) => (
          <Link
            key={c.id}
            href={`/admin/glow-club/historial?mes=${c.month}`}
            className={`rounded-full px-3 py-1 text-xs capitalize transition ${
              c.id === selected.id
                ? "bg-[#722F37] text-white"
                : "border border-[#F4D4D4] bg-white text-[#3D1A1F]/80 hover:border-[#722F37]/50"
            }`}
          >
            {monthLabel(c.month)}
          </Link>
        ))}
      </nav>

      {/* Tarjeta de cierre — pensada para tomarle screenshot */}
      <section className="mt-6 rounded-2xl border border-[#F4D4D4] bg-white p-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-widest text-[#722F37]">
          Reto de {monthLabel(selected.month)}
        </p>
        <h2 className="mt-1 text-2xl text-[#3D1A1F]" style={{ fontFamily: "Georgia, serif" }}>
          {selected.title}
        </h2>
        {selected.prize && (
          <p className="mt-1 text-xs text-[#3D1A1F]/60">🎁 Premio: {selected.prize}</p>
        )}

        {podium.length === 0 ? (
          <p className="mt-6 text-sm text-[#3D1A1F]/50">Nadie sumó puntos este mes.</p>
        ) : (
          <ol className="mx-auto mt-6 max-w-sm space-y-2">
            {podium.map((r, i) => (
              <li
                key={r.member_id}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                  i === 0 ? "bg-[#F4D4D4]/50" : "bg-[#FAF7F2]"
                }`}
              >
                <span className="text-2xl">{medals[i]}</span>
                <span className="flex-1 text-left text-sm font-medium text-[#3D1A1F]">{r.full_name}</span>
                <span className="text-right text-xs text-[#3D1A1F]/70">
                  <strong className="text-sm text-[#722F37]">{r.total_points}</strong> pts
                  <br />
                  {r.days_completed} días
                </span>
              </li>
            ))}
          </ol>
        )}

        <p className="mt-6 text-xs text-[#3D1A1F]/60">
          {withPoints.length} chica{withPoints.length === 1 ? "" : "s"} participaron ·{" "}
          {reflections.length} reflexion{reflections.length === 1 ? "" : "es"} · {totalReplies} respuesta
          {totalReplies === 1 ? "" : "s"}
        </p>
      </section>

      {withPoints.length > 3 && (
        <section className="mt-6 rounded-2xl border border-[#F4D4D4] bg-white p-5">
          <h3 className="mb-3 text-lg font-medium text-[#3D1A1F]">Ranking completo</h3>
          <ol className="divide-y divide-[#F4D4D4]/60 text-sm">
            {withPoints.map((r, i) => (
              <li key={r.member_id} className="flex items-center gap-3 py-2">
                <span className="w-6 text-[#3D1A1F]/50">{i + 1}</span>
                <span className="flex-1 text-[#3D1A1F]">{r.full_name}</span>
                <span className="text-xs text-[#3D1A1F]/60">{r.days_completed} días</span>
                <span className="w-16 text-right font-medium text-[#722F37]">{r.total_points} pts</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="mt-6 rounded-2xl border border-[#F4D4D4] bg-white p-5">
        <h3 className="text-lg font-medium text-[#3D1A1F]">Recap del diario</h3>
        <p className="mb-4 text-xs text-[#3D1A1F]/60">Todas las reflexiones del mes, de la primera a la última.</p>
        {chronological.length === 0 ? (
          <p className="text-sm text-[#3D1A1F]/50">No hubo reflexiones este mes.</p>
        ) : (
          <ol className="space-y-3">
            {chronological.map((r) => (
              <li key={r.id} className="rounded-xl bg-[#FAF7F2] p-3">
                <p className="text-xs text-[#3D1A1F]/60">
                  <strong className="text-[#3D1A1F]">{r.author_name}</strong> · {fmtDate(r.reflection_date + "T12:00:00")}
                </p>
                <p className="mt-1 whitespace-pre-line text-sm text-[#3D1A1F]/90">{r.text}</p>
                {r.replies.length > 0 && (
                  <ul className="mt-2 space-y-1.5 border-l-2 border-[#F4D4D4] pl-3">
                    {r.replies.map((rp) => (
                      <li key={rp.id} className="text-[13px] text-[#3D1A1F]/85">
                        <strong className="text-[#3D1A1F]">{rp.author_name}:</strong> {rp.text}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
