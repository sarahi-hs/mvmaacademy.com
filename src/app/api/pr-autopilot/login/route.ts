import { NextRequest, NextResponse } from "next/server";
import { prSupabase, PrUser } from "@/lib/pr/supabase";
import {
  verifyPassword,
  createSessionToken,
  setSessionCookie,
} from "@/lib/pr/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const start = Date.now();
  // Anti-timing: garantizamos un mínimo de 600ms en todo login
  const settle = async () => {
    const elapsed = Date.now() - start;
    if (elapsed < 600) await new Promise((r) => setTimeout(r, 600 - elapsed));
  };

  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    await settle();
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const password = body.password ?? "";
  if (!email || !password) {
    await settle();
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const supabase = prSupabase();
  const { data: user } = await supabase
    .from("pr_users")
    .select("*")
    .eq("email", email)
    .maybeSingle<PrUser>();

  if (!user) {
    await settle();
    return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
  }

  const ok = await verifyPassword(password, user.password_hash);
  if (!ok) {
    await settle();
    return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
  }

  const token = await createSessionToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
  await setSessionCookie(token);
  await settle();
  return NextResponse.json({ ok: true });
}
