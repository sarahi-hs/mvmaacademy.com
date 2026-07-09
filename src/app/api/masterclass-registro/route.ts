import { NextRequest, NextResponse } from "next/server";
import { PERSON } from "@/lib/site";

/**
 * POST /api/masterclass-registro
 *
 * Guarda un registro (nombre/email/telefono) para la masterclass:
 *   1. Manda los datos al webhook de Google Apps Script (GOOGLE_SHEETS_WEBHOOK_URL)
 *      que los escribe en una Google Sheet.
 *   2. Notifica por email al equipo vía Resend (RESEND_API_KEY).
 *
 * Ambos son opcionales — si falta uno, el otro sigue funcionando y el registro
 * no se pierde. Si ambos fallan, respondemos 502 y el usuario ve el error.
 */

const RESEND_FROM = "MVMA Academy <noreply@mvmaacademy.com>";

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

    const registro = {
      nombre,
      email,
      telefono,
      timestamp: new Date().toISOString(),
      timestampMx: new Date().toLocaleString("es-MX", {
        timeZone: "America/Mexico_City",
      }),
      masterclass: "Deja de Esconderte — 2026-07-20",
    };

    const results = await Promise.allSettled([
      guardarEnGoogleSheets(registro),
      notificarPorEmail(registro),
    ]);

    const allFailed = results.every((r) => r.status === "rejected");
    if (allFailed) {
      console.error(
        "Registro fallido en ambos canales:",
        results.map((r) => (r.status === "rejected" ? r.reason : null))
      );
      return NextResponse.json(
        { error: "No pudimos guardar tu registro. Intenta de nuevo en un momento." },
        { status: 502 }
      );
    }

    for (const r of results) {
      if (r.status === "rejected") {
        console.warn("Canal de registro con falla parcial:", r.reason);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Masterclass registro error:", e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

async function guardarEnGoogleSheets(r: {
  nombre: string;
  email: string;
  telefono: string;
  timestamp: string;
  timestampMx: string;
  masterclass: string;
}) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL no configurada");
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(r),
  });
  if (!res.ok) {
    throw new Error(`Google Sheets webhook respondió ${res.status}`);
  }
}

async function notificarPorEmail(r: {
  nombre: string;
  email: string;
  telefono: string;
  timestampMx: string;
  masterclass: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY no configurada");
  }

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #2A0B11;">
      <div style="background: #6B1F2A; color: #F7F2E8; padding: 24px;">
        <h1 style="margin: 0; font-family: Georgia, serif;">Nuevo registro · Masterclass</h1>
        <p style="margin: 4px 0 0 0; opacity: 0.85; font-size: 14px;">${escape(r.masterclass)}</p>
      </div>
      <div style="padding: 24px; background: #F7F2E8;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Nombre:</td><td>${escape(r.nombre)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${escape(r.email)}">${escape(r.email)}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Teléfono:</td><td>${escape(r.telefono)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Fecha:</td><td>${escape(r.timestampMx)}</td></tr>
        </table>
      </div>
      <div style="padding: 16px 24px; background: #EFE7D5; font-size: 12px; color: #6B1F2A;">
        Registro desde mvmaacademy.com/masterclass
      </div>
    </div>
  `;

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [PERSON.email],
      reply_to: r.email,
      subject: `[Masterclass] Nuevo registro — ${r.nombre}`,
      html,
    }),
  });

  if (!resendRes.ok) {
    const errText = await resendRes.text().catch(() => "");
    throw new Error(`Resend respondió ${resendRes.status}: ${errText}`);
  }
}

function escape(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
