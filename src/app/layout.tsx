import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { personSchema, websiteSchema } from "@/lib/schema";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Asesora de Imagen y Coach de Marca Personal`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: [
    "Sarahi Haro",
    "MVMA",
    "Mi Versión Más Auténtica",
    "asesora de imagen",
    "coach de marca personal",
    "personal shopper",
    "coach de vida",
    "speaker mujeres",
    "marca personal femenina",
    "asesoría de imagen México",
  ],
  authors: [{ name: "Sarahi Haro", url: SITE.url }],
  creator: "Sarahi Haro",
  publisher: "MVMA Academy",
  alternates: {
    canonical: "/",
    languages: {
      "es-MX": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    alternateLocale: "en_US",
    url: SITE.url,
    siteName: SITE.shortName,
    title: SITE.name,
    description: SITE.description,
    images: [
      { url: "/og-default.jpg", width: 1200, height: 630, alt: "Sarahi Haro — MVMA Academy" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: ["/og-default.jpg"],
    creator: SITE.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={`${cormorant.variable} ${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <JsonLd data={[personSchema("es"), websiteSchema()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
