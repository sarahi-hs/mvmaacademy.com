import { NextResponse } from "next/server";
import { getSession } from "@/lib/pr/auth";

export const runtime = "nodejs";

/**
 * POST /api/admin/glow-club/push-remind
 * Botón manual del admin: dispara el cron con el CRON_SECRET.
 * Reutiliza toda la lógica del cron para no duplicar.
 */
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  if (!process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: "Falta CRON_SECRET en env vars" },
      { status: 500 }
    );
  }

  // Usamos la URL del propio request para armar la de /api/cron/...
  const url = new URL("/api/cron/glow-push-reminder", req.url);
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.CRON_SECRET}`,
    },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
