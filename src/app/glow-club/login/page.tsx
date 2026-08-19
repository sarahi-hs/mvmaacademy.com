"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GlowLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/glow-club/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "No se pudo iniciar sesión");
        return;
      }
      if (data.mustChangePassword) {
        router.push("/glow-club/cambiar-contrasena");
      } else {
        router.push("/glow-club");
      }
      router.refresh();
    } catch {
      setErr("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F4D4D4]">
          <span className="text-2xl" aria-hidden>
            ✨
          </span>
        </div>
        <h1 className="text-2xl font-medium text-[#3D1A1F]">Glow Club</h1>
        <p className="mt-1 text-sm text-[#3D1A1F]/60">
          Bienvenida de vuelta a tu comunidad 🌸
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#F4D4D4] bg-white p-6 shadow-sm"
      >
        <label className="block">
          <span className="text-sm font-medium text-[#3D1A1F]">Correo</span>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
            placeholder="tu@correo.com"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium text-[#3D1A1F]">Contraseña</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
            placeholder="Tu contraseña"
          />
        </label>

        {err && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {err}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-[#722F37] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3D1A1F] disabled:opacity-60"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-[#3D1A1F]/50">
        ¿No tienes cuenta? Escríbele a Sarahi por WhatsApp para que te dé de alta.
      </p>
    </main>
  );
}
