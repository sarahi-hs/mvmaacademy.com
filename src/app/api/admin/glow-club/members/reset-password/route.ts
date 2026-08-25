import { NextResponse } from "next/server";
import { getSession } from "@/lib/pr/auth";
import { glowSupabase } from "@/lib/glow/supabase";
import { hashPassword } from "@/lib/glow/auth";

export const runtime = "nodejs";

/**
 * Genera una contraseña temporal legible (misma lógica del alta).
 */
function generateTempPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < 10; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

/**
 * POST /api/admin/glow-club/members/reset-password
 * Body: { memberId }
 * Genera una contraseña temporal nueva, la guarda hasheada, marca la
 * flag must_change_password=true, y devuelve la contraseña en claro
 * UNA sola vez para que Sarahi la mande por WhatsApp.
 */
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  try {
    const { memberId } = await req.json();
    if (typeof memberId !== "string" || memberId.length < 5) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const supa = glowSupabase();

    // Buscamos primero para devolver también el correo y nombre en la respuesta
    const { data: member, error: findErr } = await supa
      .from("glow_members")
      .select("id, email, full_name")
      .eq("id", memberId)
      .maybeSingle();

    if (findErr) {
      return NextResponse.json({ error: findErr.message }, { status: 500 });
    }
    if (!member) {
      return NextResponse.json({ error: "Chica no encontrada" }, { status: 404 });
    }

    const tempPassword = generateTempPassword();
    const password_hash = await hashPassword(tempPassword);

    const { error: upErr } = await supa
      .from("glow_members")
      .update({
        password_hash,
        must_change_password: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", memberId);

    if (upErr) {
      return NextResponse.json({ error: upErr.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      member: {
        id: member.id,
        email: member.email,
        full_name: member.full_name,
      },
      tempPassword,
    });
  } catch (err) {
    console.error("[glow reset-password]", err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
