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

  // Calendario del MES COMPLETO — muestra todos los días del mes actual.
  // Cada día tiene un estado: cumplido, fallado (ya pasó y no checó),
  // hoy (aún puede checar), o futuro (aún no llega).
  const todayNum = parseInt(today.slice(-2), 10);
  const [year, month] = monthStart.split("-").map(Number);
  // último día del mes: día 0 del siguiente mes = último día del actual
  const daysInMonth = new Date(year!, month!, 0).getDate();
  type DayState = "done" | "missed" | "today" | "future";
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    const day = String(dayNum).padStart(2, "0");
    const dateKey = `${monthStart.slice(0, 8)}${day}`;
    const checked = checkins.has(dateKey);
    let state: DayState;
    if (checked) state = "done";
    else if (dayNum < todayNum) state = "missed";
    else if (dayNum === todayNum) state = "today";
    else state = "future";
    return { day: dayNum, dateKey, checked, state };
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
