"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { GlowChallenge, GlowRankingRow } from "@/lib/glow/supabase";

type MemberRow = {
  id: string;
  email: string;
  full_name: string;
  initials: string | null;
  status: "active" | "paused";
  must_change_password: boolean;
  created_at: string;
};

type Props = {
  members: MemberRow[];
  challenge: GlowChallenge | null;
  ranking: GlowRankingRow[];
};

export default function GlowAdminClient({
  members,
  challenge,
  ranking,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Estado del reto
  const [title, setTitle] = useState(challenge?.title || "");
  const [description, setDescription] = useState(challenge?.description || "");
  const [prize, setPrize] = useState(challenge?.prize || "");
  const [pointsPerDay, setPointsPerDay] = useState(
    challenge?.points_per_day ?? 10
  );
  const [savingChallenge, setSavingChallenge] = useState(false);
  const [challengeMsg, setChallengeMsg] = useState<string | null>(null);

  // Estado del alta de chica
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [creating, setCreating] = useState(false);
  const [createErr, setCreateErr] = useState<string | null>(null);
  const [tempPasswordShown, setTempPasswordShown] = useState<{
    email: string;
    name: string;
    password: string;
  } | null>(null);

  async function saveChallenge(e: React.FormEvent) {
    e.preventDefault();
    setSavingChallenge(true);
    setChallengeMsg(null);
    const res = await fetch("/api/admin/glow-club/challenge", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, description, prize, points_per_day: pointsPerDay }),
    });
    setSavingChallenge(false);
    const data = await res.json();
    if (!res.ok) {
      setChallengeMsg(`❌ ${data.error || "Error al guardar"}`);
      return;
    }
    setChallengeMsg("✓ Reto guardado");
    startTransition(() => router.refresh());
  }

  async function createMember(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setCreateErr(null);
    const res = await fetch("/api/admin/glow-club/members", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: newEmail, fullName: newName }),
    });
    setCreating(false);
    const data = await res.json();
    if (!res.ok) {
      setCreateErr(data.error || "No se pudo crear");
      return;
    }
    setTempPasswordShown({
      email: newEmail,
      name: newName,
      password: data.tempPassword,
    });
    setNewName("");
    setNewEmail("");
    startTransition(() => router.refresh());
  }

  async function toggleMemberStatus(m: MemberRow) {
    const newStatus = m.status === "active" ? "paused" : "active";
    const confirmMsg =
      newStatus === "paused"
        ? `¿Pausar acceso de ${m.full_name}?`
        : `¿Reactivar acceso de ${m.full_name}?`;
    if (!confirm(confirmMsg)) return;
    const res = await fetch("/api/admin/glow-club/members", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ memberId: m.id, status: newStatus }),
    });
    if (!res.ok) {
      alert("Error al cambiar estado");
      return;
    }
    startTransition(() => router.refresh());
  }

  const activeCount = members.filter((m) => m.status === "active").length;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-[#3D1A1F]">
            Admin · Glow Club
          </h1>
          <p className="text-sm text-[#3D1A1F]/60">
            {activeCount} chica{activeCount === 1 ? "" : "s"} activa
            {activeCount === 1 ? "" : "s"} · {members.length} total
          </p>
        </div>
        <a
          href="/admin/pr-autopilot"
          className="text-xs text-[#722F37] underline underline-offset-2"
        >
          ← PR Autopilot
        </a>
      </div>

      {/* Reto del mes */}
      <section className="mb-6 rounded-2xl border border-[#F4D4D4] bg-white p-5">
        <h2 className="mb-3 text-lg font-medium text-[#3D1A1F]">
          Reto de este mes
        </h2>
        <form onSubmit={saveChallenge} className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium text-[#3D1A1F]">Título</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="5 minutos a solas cada día"
              className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-[#3D1A1F]">
              Descripción (opcional)
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Un momento contigo misma, sin celular, sin ruido."
              className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-[#3D1A1F]">
                Premio del mes
              </span>
              <input
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
                placeholder="Sesión 1:1 con Sarahi"
                className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[#3D1A1F]">
                Puntos por día
              </span>
              <input
                type="number"
                min={1}
                value={pointsPerDay}
                onChange={(e) => setPointsPerDay(parseInt(e.target.value) || 10)}
                className="mt-1 w-full rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
              />
            </label>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={savingChallenge}
              className="rounded-lg bg-[#722F37] px-4 py-2 text-sm font-medium text-white hover:bg-[#3D1A1F] disabled:opacity-60"
            >
              {savingChallenge ? "Guardando…" : "Guardar reto"}
            </button>
            {challengeMsg && (
              <span className="text-xs text-[#3D1A1F]/70">{challengeMsg}</span>
            )}
          </div>
        </form>
      </section>

      {/* Alta manual de chica */}
      <section className="mb-6 rounded-2xl border border-[#F4D4D4] bg-white p-5">
        <h2 className="mb-3 text-lg font-medium text-[#3D1A1F]">
          Dar de alta a una chica nueva
        </h2>
        <form onSubmit={createMember} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            placeholder="Nombre completo"
            className="rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
          />
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
            placeholder="correo@ejemplo.com"
            className="rounded-lg border border-[#F4D4D4] bg-white px-3 py-2 text-sm outline-none focus:border-[#722F37]"
          />
          <button
            type="submit"
            disabled={creating}
            className="rounded-lg bg-[#722F37] px-4 py-2 text-sm font-medium text-white hover:bg-[#3D1A1F] disabled:opacity-60"
          >
            {creating ? "Creando…" : "Crear"}
          </button>
        </form>
        {createErr && (
          <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
            {createErr}
          </p>
        )}

        {tempPasswordShown && (
          <div className="mt-4 rounded-xl border-2 border-[#722F37] bg-[#F4D4D4]/30 p-4">
            <p className="text-sm font-medium text-[#3D1A1F]">
              ✅ Cuenta creada para {tempPasswordShown.name}
            </p>
            <p className="mt-2 text-xs text-[#3D1A1F]/70">
              Manda estos datos por WhatsApp:
            </p>
            <div className="mt-2 rounded-lg bg-white p-3 font-mono text-sm">
              <div>Portal: mvmaacademy.com/glow-club</div>
              <div>Correo: <strong>{tempPasswordShown.email}</strong></div>
              <div>
                Contraseña temporal:{" "}
                <strong className="text-[#722F37]">
                  {tempPasswordShown.password}
                </strong>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-[#3D1A1F]/60">
              ⚠️ Guarda o copia la contraseña ahora — no se vuelve a mostrar. Ella
              la va a cambiar la primera vez que entre.
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `Bienvenida al Glow Club 🌸\n\nPortal: https://mvmaacademy.com/glow-club\nCorreo: ${tempPasswordShown.email}\nContraseña: ${tempPasswordShown.password}\n\nEntra y cambia tu contraseña por una que solo tú sepas ✨`
                );
              }}
              className="mt-3 rounded-lg bg-[#722F37] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#3D1A1F]"
            >
              📋 Copiar mensaje para WhatsApp
            </button>
            <button
              onClick={() => setTempPasswordShown(null)}
              className="ml-2 text-xs text-[#3D1A1F]/60 underline"
            >
              Cerrar
            </button>
          </div>
        )}
      </section>

      {/* Lista de chicas + ranking */}
      <section className="rounded-2xl border border-[#F4D4D4] bg-white p-5">
        <h2 className="mb-3 text-lg font-medium text-[#3D1A1F]">
          Todas las chicas
        </h2>
        {members.length === 0 ? (
          <p className="py-6 text-center text-sm text-[#3D1A1F]/50">
            Aún no hay chicas. Da de alta a la primera arriba ↑
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F4D4D4] text-left text-xs text-[#3D1A1F]/60">
                <th className="pb-2 font-medium">Chica</th>
                <th className="pb-2 font-medium">Correo</th>
                <th className="pb-2 text-center font-medium">Puntos mes</th>
                <th className="pb-2 text-center font-medium">Estado</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => {
                const rankRow = ranking.find((r) => r.member_id === m.id);
                return (
                  <tr key={m.id} className="border-b border-[#F4D4D4]/50">
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4D4D4] text-[11px] font-medium text-[#722F37]">
                          {m.initials || "?"}
                        </div>
                        <span>{m.full_name}</span>
                        {m.must_change_password && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] text-amber-800">
                            aún no cambia contraseña
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 text-xs text-[#3D1A1F]/70">{m.email}</td>
                    <td className="py-2 text-center">
                      {rankRow ? (
                        <span className="font-medium">{rankRow.total_points}</span>
                      ) : (
                        <span className="text-[#3D1A1F]/40">—</span>
                      )}
                    </td>
                    <td className="py-2 text-center">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] ${
                          m.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {m.status === "active" ? "activa" : "pausada"}
                      </span>
                    </td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => toggleMemberStatus(m)}
                        disabled={pending}
                        className="text-xs text-[#722F37] underline underline-offset-2 hover:no-underline"
                      >
                        {m.status === "active" ? "pausar" : "reactivar"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
