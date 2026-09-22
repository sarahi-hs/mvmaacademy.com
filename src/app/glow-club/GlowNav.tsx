"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const tabs = [
  { key: "reto", href: "/glow-club", label: "Mi reto" },
  { key: "clases", href: "/glow-club/clases", label: "Clases" },
] as const;

export default function GlowNav({
  firstName,
  active,
}: {
  firstName: string;
  active: (typeof tabs)[number]["key"];
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/glow-club/logout", { method: "POST" });
    router.push("/glow-club/login");
    router.refresh();
  }

  return (
    <header className="mb-5 rounded-2xl border border-[#F4D4D4] bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 overflow-hidden rounded-full bg-[#FAF7F2]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/glow-club/icons/logomark-192.png" alt="" aria-hidden className="h-full w-full object-cover" />
          </div>
          <span className="text-sm font-medium text-[#3D1A1F]">Glow Club</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#3D1A1F]/60">Hola, {firstName} 🌸</span>
          <button
            onClick={logout}
            className="text-xs text-[#722F37] underline underline-offset-2 hover:no-underline"
          >
            Salir
          </button>
        </div>
      </div>
      <nav className="mt-3 flex gap-1 rounded-xl bg-[#FAF7F2] p-1">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={t.href}
            className={`flex-1 rounded-lg px-3 py-1.5 text-center text-xs font-medium transition ${
              active === t.key
                ? "bg-white text-[#722F37] shadow-sm"
                : "text-[#3D1A1F]/60 hover:text-[#3D1A1F]"
            }`}
          >
            {t.key === "clases" ? "🎥 " : "🔥 "}
            {t.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
