import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glow Club — Portal privado",
  description: "Portal privado del Glow Club de Sarahi Haro.",
  robots: { index: false, follow: false }, // portal privado, no indexar
};

export default function GlowClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#FAF7F2]">{children}</div>;
}
