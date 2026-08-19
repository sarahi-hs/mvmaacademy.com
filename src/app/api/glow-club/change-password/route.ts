import { NextResponse } from "next/server";
import { glowSupabase } from "@/lib/glow/supabase";
import {
  getGlowSession,
  verifyPassword,
  hashPassword,
} from "@/lib/glow/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getGlowSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizada" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await req.json();
    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string"
    ) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "La contraseña nueva debe tener al menos 8 caracteres" },
        { status: 400 }
      );
    }

    const supa = glowSupabase();
    const { data: member, error } = await supa
      .from("glow_members")
      .select("id, password_hash")
      .eq("id", session.memberId)
      .maybeSingle();
    if (error || !member) {
      return NextResponse.json({ error: "No encontrada" }, { status: 404 });
    }

    const ok = await verifyPassword(currentPassword, member.password_hash);
    if (!ok) {
      return NextResponse.json(
        { error: "La contraseña actual no es correcta" },
        { status: 401 }
      );
    }

    const newHash = await hashPassword(newPassword);
    const { error: upErr } = await supa
      .from("glow_members")
      .update({
        password_hash: newHash,
        must_change_password: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.memberId);

    if (upErr) {
      console.error("[glow change-pw] update error", upErr);
      return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[glow change-pw] unexpected", err);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
