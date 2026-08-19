import { NextResponse } from "next/server";
import { glowSupabase, hasActiveAccess, type GlowMember } from "@/lib/glow/supabase";
import {
  verifyPassword,
  createSessionToken,
  setSessionCookie,
} from "@/lib/glow/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const supa = glowSupabase();
    const { data, error } = await supa
      .from("glow_members")
      .select("*")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (error) {
      console.error("[glow login] supabase error", error);
      return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
    }
    const member = data as GlowMember | null;
    if (!member) {
      // Mensaje genérico — no revelar si el correo existe o no
      return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
    }

    const ok = await verifyPassword(password, member.password_hash);
    if (!ok) {
      return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
    }

    if (!hasActiveAccess(member)) {
      return NextResponse.json(
        { error: "Tu acceso al Glow Club está pausado. Contacta a Sarahi." },
        { status: 403 }
      );
    }

    const token = await createSessionToken({
      memberId: member.id,
      email: member.email,
      fullName: member.full_name,
    });
    await setSessionCookie(token);

    return NextResponse.json({
      ok: true,
      mustChangePassword: member.must_change_password,
    });
  } catch (err) {
    console.error("[glow login] unexpected", err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
