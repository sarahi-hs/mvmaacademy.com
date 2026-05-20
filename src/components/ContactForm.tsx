"use client";

import { useState } from "react";

const TIPOS = [
  "Conferencia / Keynote",
  "Evento Corporativo",
  "Mentoría / Asesoría 1:1",
  "MVMA Tribe (comunidad)",
  "Colaboración / Marca",
  "Medios / Prensa",
  "Otro",
];

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrMsg("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Error al enviar");
      }
      setState("ok");
      form.reset();
    } catch (e) {
      setState("err");
      setErrMsg(e instanceof Error ? e.message : "Error desconocido");
    }
  }

  if (state === "ok") {
    return (
      <div className="p-12 bg-rosita/40 border border-rosita text-center">
        <p className="font-display text-3xl text-tinto-deep mb-4">¡Gracias!</p>
        <p className="text-tinto-deep/75">
          Recibimos tu mensaje. Mi asistente te responderá en menos de 48 horas hábiles.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <Field name="nombre" label="Nombre completo" required />
        <Field name="email" label="Email" type="email" required />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Field name="whatsapp" label="WhatsApp (opcional)" />
        <Field name="empresa" label="Empresa u organización (opcional)" />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-tinto-soft mb-2">
          Tipo de consulta
        </label>
        <select
          name="tipo"
          required
          defaultValue=""
          className="w-full px-4 py-3 bg-hueso border border-rosita focus:border-tinto outline-none text-tinto-deep"
        >
          <option value="" disabled>Selecciona una opción</option>
          {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest text-tinto-soft mb-2">
          Mensaje
        </label>
        <textarea
          name="mensaje"
          required
          rows={5}
          className="w-full px-4 py-3 bg-hueso border border-rosita focus:border-tinto outline-none text-tinto-deep resize-none"
        />
      </div>

      {state === "err" && (
        <p className="text-sm text-tinto bg-rosita/40 p-3 border border-rosita">
          No pudimos enviar tu mensaje: {errMsg}. Escríbenos directo a{" "}
          <a href="mailto:sarahiharoequipo@gmail.com" className="underline">sarahiharoequipo@gmail.com</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full md:w-auto px-10 py-4 bg-tinto text-hueso hover:bg-tinto-deep transition-colors disabled:opacity-60"
      >
        {state === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}

function Field({
  name, label, type = "text", required = false,
}: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-tinto-soft mb-2">
        {label}{required && " *"}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-3 bg-hueso border border-rosita focus:border-tinto outline-none text-tinto-deep"
      />
    </div>
  );
}
