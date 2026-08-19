"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CambiarContrasenaPage() {
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (next.length < 8) {
      setErr("La contraseña nueva debe tener al menos 8 caracteres");
      return;
    }
    if (next !== confirm) {
      setErr("Las contraseñas nuevas no coinciden");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/glow-club/change-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "No se pudo cambiar la contraseña");
        return;
      }
      router.push("/glow-club");
      router.refresh();
    } catch {
      setErr("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-medium text-[#3D1A1F]">
          Cambia tu contraseña
        </h1>
        <p className="mt-1 text-sm text-[#3D1A1F]/60">
          Ponle una nueva que solo tú sepas 🔒
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#F4D4D4] bg-white p-6 shadow-sm"
      >
        <label className="block">
          <span className="text-sm font-medium text-[#3D1A1F]">
            Contraseña actual (la que te mandó Sarahi)
          </span>
          <input
            type="password"
            required
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium text-[#3D1A1F]">
            Contraseña nueva
          </span>
          <input
            type="password"
            required
            minLength={8}
            value={next}
            onChange={(e) => setNext(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
            placeholder="Mínimo 8 caracteres"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-medium text-[#3D1A1F]">
            Repite la nueva
          </span>
          <input
            type="password"
            required
            minLength={8}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
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
          {loading ? "Guardando…" : "Guardar contraseña"}
        </button>
      </form>
    </main>
  );
}
