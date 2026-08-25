"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/pr-autopilot/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push("/admin/glow-club");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "No se pudo iniciar sesión");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-ivory px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-ivory-warm/40 border border-beige p-10"
      >
        <p className="mono-label text-tinto mb-2 text-center">— ADMIN —</p>
        <h1 className="font-display text-3xl text-tinto-deep mb-8 text-center">
          Tu tablero privado
        </h1>

        <label className="block text-sm text-tinto-deep/80 mb-1">Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-3 border border-beige bg-ivory focus:outline-none focus:border-tinto"
        />

        <label className="block text-sm text-tinto-deep/80 mb-1">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-4 py-3 border border-beige bg-ivory focus:outline-none focus:border-tinto"
        />

        {error && <p className="text-sm text-tinto mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-tinto text-ivory hover:bg-tinto-deep transition-colors mono-label disabled:opacity-50"
        >
          {loading ? "ENTRANDO..." : "ENTRAR"}
        </button>
      </form>
    </main>
  );
}
