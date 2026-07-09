import type { Metadata } from "next";
import { MASTERCLASS } from "./config";

const ogTitle = `${MASTERCLASS.title} — Masterclass con Sarahi Haro`;
const ogDescription = MASTERCLASS.subtitle;

export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  alternates: { canonical: "/masterclass" },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://mvmaacademy.com/masterclass",
    siteName: "MVMA Academy",
    title: ogTitle,
    description: ogDescription,
    images: [
      { url: "/og-default.jpg", width: 1200, height: 630, alt: ogTitle },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function MasterclassLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
