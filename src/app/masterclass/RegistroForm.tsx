"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RegistroForm({ ctaLabel }: { ctaLabel: string }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "sending" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrMsg("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/masterclass-registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Error al registrar");
      }
      router.push("/masterclass/gracias");
    } catch (e) {
      setState("err");
      setErrMsg(e instanceof Error ? e.message : "Error desconocido");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Field name="nombre" label="Nombre completo" required autoComplete="name" />
      <Field
        name="email"
        label="Correo electrónico"
        type="email"
        required
        autoComplete="email"
      />
      <Field
        name="telefono"
        label="WhatsApp (con lada)"
        type="tel"
        required
        autoComplete="tel"
        placeholder="Ej: +52 33 1234 5678"
      />

      {state === "err" && (
        <p className="text-sm text-tinto bg-rosita/40 p-3 border border-rosita">
          No pudimos registrarte: {errMsg}. Intenta de nuevo o escríbenos a{" "}
          <a href="mailto:sarahiharoequipo@gmail.com" className="underline">
            sarahiharoequipo@gmail.com
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full px-8 py-5 bg-tinto text-hueso hover:bg-tinto-deep transition-colors disabled:opacity-60 text-base md:text-lg font-medium tracking-wide"
      >
        {state === "sending" ? "Enviando..." : ctaLabel}
      </button>

      <p className="text-xs text-tinto-deep/60 text-center">
        Al registrarte serás dirigida a nuestra comunidad de WhatsApp donde recibirás el
        link de acceso a la clase.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-tinto-soft mb-2">
        {label}
        {required && " *"}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-hueso border border-rosita focus:border-tinto outline-none text-tinto-deep"
      />
    </div>
  );
}
