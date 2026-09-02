import { NextResponse } from "next/server";
import { glowSupabase } from "@/lib/glow/supabase";
import { sendPushToSubscription, type GlowPushSubscription } from "@/lib/glow/push";
import { todayMx, currentMonthStart } from "@/lib/glow/data";

export const runtime = "nodejs";
// Le damos hasta 60s por si hay muchas chicas — Vercel default es 10s
export const maxDuration = 60;

/**
 * GET/POST /api/cron/glow-push-reminder
 *
 * Se llama desde Vercel Cron a las 7pm hora México (1am UTC del día siguiente).
 * Puede llamarse manual desde el admin — validamos que el header lleve
 * el CRON_SECRET para bloquear llamadas públicas.
 *
 * Lógica:
 *   1. Buscar el reto del mes actual
 *   2. Ver qué miembros activos NO han hecho check hoy
 *   3. De esos, cuáles tienen subscripción push
 *   4. Mandarles el recordatorio
 */
export async function GET(req: Request) {
  return handle(req);
}
export async function POST(req: Request) {
  return handle(req);
}

async function handle(req: Request): Promise<Response> {
  // Autorización: Vercel Cron manda el header 'Authorization: Bearer <CRON_SECRET>'
  // Nosotros también aceptamos el mismo header cuando Sarahi lo llama manual.
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  const supa = glowSupabase();
  const today = todayMx();
  const monthStart = currentMonthStart();

  // 1. ¿Hay reto activo?
  const { data: challenge } = await supa
    .from("glow_challenges")
    .select("id, title")
    .eq("month", monthStart)
    .maybeSingle();

  if (!challenge) {
    return NextResponse.json({
      ok: true,
      skipped: "no active challenge for current month",
    });
  }

  // 2. Miembros activos
  const { data: activeMembers, error: memErr } = await supa
    .from("glow_members")
    .select("id, full_name")
    .eq("status", "active");
  if (memErr) {
    console.error("[cron push] members error", memErr);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
  const memberIds = (activeMembers || []).map((m) => m.id);
  if (memberIds.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, note: "no active members" });
  }

  // 3. ¿Quiénes YA hicieron check hoy? — los descartamos
  const { data: todayCheckins } = await supa
    .from("glow_checkins")
    .select("member_id")
    .eq("checkin_date", today)
    .in("member_id", memberIds);
  const checkedToday = new Set(
    (todayCheckins || []).map((c) => c.member_id as string)
  );

  const needReminder = memberIds.filter((id) => !checkedToday.has(id));
  if (needReminder.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, note: "todas ya checkearon" });
  }

  // 4. Subscripciones push de esas chicas
  const { data: subs, error: subErr } = await supa
    .from("glow_push_subscriptions")
    .select("*")
    .in("member_id", needReminder);
  if (subErr) {
    console.error("[cron push] subs error", subErr);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  // Caso: hay chicas que no checkearon, pero ninguna tiene push activo
  if (!subs || subs.length === 0) {
    return NextResponse.json({
      ok: true,
      sent: 0,
      note: `${needReminder.length} chica${
        needReminder.length === 1 ? "" : "s"
      } sin check aún, pero ninguna tiene notificaciones activas`,
    });
  }

  // 5. Mandar el push
  const payload = {
    title: "Glow Club 🌸",
    body: `Aún no diste tu check de hoy. Tu momento espera 💗`,
    url: "/glow-club",
  };

  let sent = 0,
    failed = 0;
  for (const sub of (subs as GlowPushSubscription[])) {
    const ok = await sendPushToSubscription(sub, payload);
    ok ? sent++ : failed++;
  }

  return NextResponse.json({
    ok: true,
    challenge: challenge.title,
    active_members: memberIds.length,
    checked_today: checkedToday.size,
    need_reminder: needReminder.length,
    subscriptions_targeted: subs.length,
    sent,
    failed,
  });
}
