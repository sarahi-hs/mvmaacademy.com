import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Glow Club — Portal privado",
  description: "Portal privado del Glow Club de Sarahi Haro.",
  robots: { index: false, follow: false }, // portal privado, no indexar
  manifest: "/glow-club/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Glow Club",
    statusBarStyle: "black-translucent",
  },
  other: {
    // Meta tags necesarios para que Safari trate el portal como app
    // (algunos duplican appleWebApp para máxima compatibilidad con iOS viejos)
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#722F37",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // para que se vea bien en iPhones con notch
};

export default function GlowClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#FAF7F2]">{children}</div>;
}
