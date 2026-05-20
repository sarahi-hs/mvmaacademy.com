import { NextRequest, NextResponse } from "next/server";
import { PERSON } from "@/lib/site";

/**
 * POST /api/contacto
 * Envía email al asistente vía Resend.
 * Requiere env var RESEND_API_KEY en Vercel (verificar con `vercel env pull`).
 */

// Mientras mvmaacademy.com no esté verificado en Resend, usamos su dominio de prueba.
// Cuando se verifique el dominio (agregar SPF/DKIM/DMARC en GoDaddy), cambiar a:
//   "MVMA Academy <noreply@mvmaacademy.com>"
const RESEND_FROM = "MVMA Academy <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, whatsapp, empresa, tipo, mensaje } = body;

    if (!nombre || !email || !tipo || !mensaje) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY no configurada");
      return NextResponse.json(
        { error: "Servicio de email no configurado todavía" },
        { status: 503 }
      );
    }

    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #3D1A1F;">
        <div style="background: #722F37; color: #FAF7F2; padding: 24px;">
          <h1 style="margin: 0; font-family: Georgia, serif;">Nuevo mensaje · MVMA Academy</h1>
        </div>
        <div style="padding: 24px; background: #FAF7F2;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Nombre:</td><td>${escape(nombre)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
            ${whatsapp ? `<tr><td style="padding: 8px 0; font-weight: bold;">WhatsApp:</td><td>${escape(whatsapp)}</td></tr>` : ""}
            ${empresa ? `<tr><td style="padding: 8px 0; font-weight: bold;">Empresa:</td><td>${escape(empresa)}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; font-weight: bold;">Tipo:</td><td>${escape(tipo)}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #F4D4D4; border-left: 4px solid #722F37;">
            <p style="margin: 0 0 8px 0; font-weight: bold;">Mensaje:</p>
            <p style="margin: 0; white-space: pre-wrap;">${escape(mensaje)}</p>
          </div>
        </div>
        <div style="padding: 16px 24px; background: #F2EDE5; font-size: 12px; color: #722F37;">
          Recibido desde mvmaacademy.com · ${new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" })}
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
        reply_to: email,
        subject: `[MVMA] ${tipo} — ${nombre}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend error:", errText);
      return NextResponse.json({ error: "No se pudo enviar el email" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact form error:", e);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

function escape(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
