import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Glow Club — Portal privado",
  description: "Portal privado del Glow Club de Sarahi Haro.",
  robots: { index: false, follow: false }, // portal privado, no indexar
  manifest: "/glow-club/manifest.webmanifest",
  // Favicon de la pestaña del navegador
  icons: {
    icon: [
      { url: "/glow-club/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/glow-club/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/glow-club/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Glow Club",
    // "default" o "black-translucent". Con el logo claro, "default" (barra blanca) va mejor
    statusBarStyle: "default",
  },
  other: {
    // Duplicados para máxima compatibilidad con iOS viejos
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  // Match del fondo hueso del logo — la splash screen y la barra del sistema
  // se ven consistentes con el logo.
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function GlowClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#FAF7F2]">{children}</div>;
}
