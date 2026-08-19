import { glowSupabase, type GlowChallenge, type GlowRankingRow } from "./supabase";

/** Devuelve fecha "YYYY-MM-DD" en zona México. */
export function todayMx(): string {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Mexico_City",
  });
}

/** Primer día del mes actual, "YYYY-MM-01". */
export function currentMonthStart(): string {
  return todayMx().slice(0, 7) + "-01";
}

/** El reto del mes en curso, o null si no hay. */
export async function getCurrentChallenge(): Promise<GlowChallenge | null> {
  const supa = glowSupabase();
  const { data, error } = await supa
    .from("glow_challenges")
    .select("*")
    .eq("month", currentMonthStart())
    .maybeSingle();
  if (error) {
    console.error("[glow data] getCurrentChallenge", error);
    return null;
  }
  return (data as GlowChallenge) || null;
}

/** Días del mes actual en los que la chica ya hizo check. */
export async function getMemberCheckinsThisMonth(
  memberId: string
): Promise<Set<string>> {
  const supa = glowSupabase();
  const monthStart = currentMonthStart();
  const nextMonthStart = (() => {
    const [y, m] = monthStart.split("-").map(Number);
    if (m === 12) return `${y + 1}-01-01`;
    return `${y}-${String(m + 1).padStart(2, "0")}-01`;
  })();
  const { data, error } = await supa
    .from("glow_checkins")
    .select("checkin_date")
    .eq("member_id", memberId)
    .gte("checkin_date", monthStart)
    .lt("checkin_date", nextMonthStart);
  if (error) {
    console.error("[glow data] getMemberCheckinsThisMonth", error);
    return new Set();
  }
  return new Set((data || []).map((r) => r.checkin_date as string));
}

/** Racha actual (días consecutivos incluyendo hoy o ayer). */
export function computeStreak(checkedDates: Set<string>): number {
  if (checkedDates.size === 0) return 0;
  const today = new Date(todayMx() + "T00:00:00");
  let streak = 0;
  // Contamos desde hoy hacia atrás
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toLocaleDateString("en-CA");
    if (checkedDates.has(key)) {
      streak++;
    } else if (i === 0) {
      // Si hoy no está, permitimos que la racha cuente desde ayer
      continue;
    } else {
      break;
    }
  }
  return streak;
}

/** Ranking del mes actual. */
export async function getMonthlyRanking(): Promise<GlowRankingRow[]> {
  const supa = glowSupabase();
  const { data, error } = await supa
    .from("glow_monthly_ranking")
    .select("*")
    .eq("challenge_month", currentMonthStart());
  if (error) {
    console.error("[glow data] getMonthlyRanking", error);
    return [];
  }
  return (data || []) as GlowRankingRow[];
}
