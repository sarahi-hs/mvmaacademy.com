import { NextResponse } from "next/server";
import { getSession } from "@/lib/pr/auth"; // reutilizamos el auth de admin (PR)
import { glowSupabase } from "@/lib/glow/supabase";
import { hashPassword, initialsFromName } from "@/lib/glow/auth";

export const runtime = "nodejs";

/**
 * Genera una contraseña temporal legible (10 chars, sin ambigüedades).
 * Solo letras y números (nada de 0/O ni 1/l).
 */
function generateTempPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < 10; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

/** GET → lista de miembros del Glow Club (solo admin). */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  const supa = glowSupabase();
  const { data, error } = await supa
    .from("glow_members")
    .select("id, email, full_name, initials, status, must_change_password, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ members: data || [] });
}

/** POST → alta manual de chica nueva. Devuelve la contraseña temporal. */
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  try {
    const { email, fullName } = await req.json();
    if (
      typeof email !== "string" ||
      typeof fullName !== "string" ||
      !email.includes("@") ||
      fullName.trim().length < 2
    ) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const supa = glowSupabase();
    const cleanEmail = email.toLowerCase().trim();

    // ¿Ya existe?
    const { data: exists } = await supa
      .from("glow_members")
      .select("id")
      .eq("email", cleanEmail)
      .maybeSingle();
    if (exists) {
      return NextResponse.json(
        { error: "Ya hay una chica registrada con ese correo" },
        { status: 409 }
      );
    }

    const tempPassword = generateTempPassword();
    const password_hash = await hashPassword(tempPassword);

    const { data, error } = await supa
      .from("glow_members")
      .insert({
        email: cleanEmail,
        full_name: fullName.trim(),
        initials: initialsFromName(fullName),
        password_hash,
        status: "active",
        must_change_password: true,
      })
      .select("id, email, full_name")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      member: data,
      tempPassword, // Sarahi la ve UNA vez y la manda por WhatsApp
    });
  } catch (err) {
    console.error("[admin glow members POST]", err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

/** PATCH → cambiar status (activar / pausar). */
export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  try {
    const { memberId, status } = await req.json();
    if (
      typeof memberId !== "string" ||
      (status !== "active" && status !== "paused")
    ) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const supa = glowSupabase();
    const { error } = await supa
      .from("glow_members")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", memberId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin glow members PATCH]", err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
