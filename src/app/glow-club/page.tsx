import { redirect } from "next/navigation";
import { getGlowSession } from "@/lib/glow/auth";
import {
  currentMonthStart,
  getCurrentChallenge,
  getMemberCheckinsThisMonth,
  computeStreak,
  getMonthlyRanking,
  todayMx,
} from "@/lib/glow/data";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function GlowClubPage() {
  const session = await getGlowSession();
  if (!session) redirect("/glow-club/login");

  const [challenge, checkins, ranking] = await Promise.all([
    getCurrentChallenge(),
    getMemberCheckinsThisMonth(session.memberId),
    getMonthlyRanking(),
  ]);

  const today = todayMx();
  const checkedToday = checkins.has(today);
  const streak = computeStreak(checkins);
  const monthStart = currentMonthStart();

  // Puntos totales del mes = check-ins × points_per_day del reto
  const pointsPerDay = challenge?.points_per_day ?? 10;
  const totalPoints = checkins.size * pointsPerDay;

  // Días del mes hasta hoy (para el calendario)
  const todayNum = parseInt(today.slice(-2), 10);
  const daysArray = Array.from({ length: todayNum }, (_, i) => {
    const day = String(i + 1).padStart(2, "0");
    const dateKey = `${monthStart.slice(0, 8)}${day}`;
    return { day: i + 1, dateKey, checked: checkins.has(dateKey) };
  });

  // Posición de la chica en el ranking
  const myPosition = ranking.findIndex((r) => r.member_id === session.memberId);

  return (
    <DashboardClient
      session={session}
      challenge={challenge}
      today={today}
      checkedToday={checkedToday}
      streak={streak}
      totalPoints={totalPoints}
      daysArray={daysArray}
      ranking={ranking}
      myPosition={myPosition}
    />
  );
}
