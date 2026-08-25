// PWA manifest para el portal Glow Club.
// Cuando una chica abre el portal en su cel y le da "Añadir a pantalla de
// inicio", el sistema lee este manifest y crea un ícono que abre el portal
// en modo standalone (sin barra de dirección, como una app real).

export const runtime = "edge";

export function GET() {
  const manifest = {
    name: "Glow Club — Sarahi Haro",
    short_name: "Glow Club",
    description:
      "Tu portal privado del Glow Club. Reto del mes, comunidad y tu versión más auténtica ✨",
    id: "/glow-club",
    start_url: "/glow-club",
    scope: "/glow-club/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#722F37",
    background_color: "#FAF7F2",
    lang: "es-MX",
    icons: [
      {
        src: "/glow-club/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/glow-club/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    categories: ["lifestyle", "education"],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "content-type": "application/manifest+json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
