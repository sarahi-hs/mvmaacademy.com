import {
  glowSupabase,
  type GlowChallenge,
  type GlowRankingRow,
  type GlowReflection,
  type GlowReflectionWithAuthor,
} from "./supabase";

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

/** La reflexión de hoy de la chica logueada, si ya escribió una. */
export async function getTodayReflection(
  memberId: string
): Promise<GlowReflection | null> {
  const supa = glowSupabase();
  const { data, error } = await supa
    .from("glow_reflections")
    .select("*")
    .eq("member_id", memberId)
    .eq("reflection_date", todayMx())
    .maybeSingle();
  if (error) {
    console.error("[glow data] getTodayReflection", error);
    return null;
  }
  return (data as GlowReflection) || null;
}

/**
 * Reflexiones recientes del reto del mes en curso, con nombre e iniciales
 * de la autora ya resueltos para pintar el feed sin joins extra.
 * Ordenadas de la más nueva a la más vieja.
 */
export async function getRecentReflections(
  challengeId: string,
  limit = 50
): Promise<GlowReflectionWithAuthor[]> {
  const supa = glowSupabase();
  // Traemos reflexiones + join con glow_members para autor
  const { data, error } = await supa
    .from("glow_reflections")
    .select(
      `id, member_id, challenge_id, reflection_date, text, created_at,
       glow_members ( full_name, initials )`
    )
    .eq("challenge_id", challengeId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[glow data] getRecentReflections", error);
    return [];
  }
  // Supabase tipa las relaciones anidadas como array aunque el FK sea 1:1;
  // por eso tomamos el primer (y único) elemento de glow_members.
  type Row = GlowReflection & {
    glow_members:
      | { full_name: string; initials: string | null }
      | { full_name: string; initials: string | null }[]
      | null;
  };
  return ((data || []) as unknown as Row[]).map((r) => {
    const author = Array.isArray(r.glow_members)
      ? r.glow_members[0]
      : r.glow_members;
    return {
      id: r.id,
      member_id: r.member_id,
      challenge_id: r.challenge_id,
      reflection_date: r.reflection_date,
      text: r.text,
      created_at: r.created_at,
      author_name: author?.full_name ?? "Una Glow Girl",
      author_initials: author?.initials ?? null,
    };
  });
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
