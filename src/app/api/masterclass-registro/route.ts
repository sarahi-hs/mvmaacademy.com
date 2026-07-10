import { NextRequest, NextResponse } from "next/server";
import { MASTERCLASS } from "@/app/masterclass/config";

/**
 * POST /api/masterclass-registro
 *
 * Da de alta a la persona en MailerLite dentro del grupo de la masterclass.
 * Env vars: MAILERLITE_API_TOKEN. Group ID en MASTERCLASS.mailerLiteGroupId.
 */

const MAILERLITE_ENDPOINT = "https://connect.mailerlite.com/api/subscribers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const nombre = String(body.nombre ?? "").trim();
    const email = String(body.email ?? "").trim();
    const telefono = String(body.telefono ?? "").trim();

    if (!nombre || !email || !telefono) {
      return NextResponse.json(
        { error: "Faltan campos requeridos (nombre, email, teléfono)" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Correo inválido" }, { status: 400 });
    }

    const token = process.env.MAILERLITE_API_TOKEN;
    if (!token) {
      console.error("MAILERLITE_API_TOKEN no configurada");
      return NextResponse.json(
        { error: "Servicio no configurado. Intenta más tarde." },
        { status: 503 }
      );
    }

    const res = await fetch(MAILERLITE_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        fields: { name: nombre, phone: telefono },
        groups: [MASTERCLASS.mailerLiteGroupId],
        status: "active",
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(`MailerLite respondió ${res.status}:`, errText);
      return NextResponse.json(
        { error: "No pudimos guardar tu registro. Intenta de nuevo en un momento." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Masterclass registro error:", e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
