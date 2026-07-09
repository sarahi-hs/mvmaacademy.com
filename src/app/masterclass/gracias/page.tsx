import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MASTERCLASS } from "../config";

export const metadata: Metadata = {
  title: "¡Estás registrada! — Deja de Esconderte",
  description: "Únete a la comunidad de WhatsApp para recibir el link de la masterclass.",
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <div className="border-b border-beige/60">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/sarahi/mvma-logo.png"
              alt="MVMA logo"
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
            />
            <span className="font-display text-lg tracking-tight text-tinto-deep">
              <span className="italic">S</span>arahi{" "}
              <span className="italic">H</span>aro
            </span>
          </Link>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full text-center">
          <p className="editorial-eyebrow mb-6">Tu lugar está reservado</p>

          <h1 className="font-display text-4xl md:text-6xl text-tinto-deep mb-6 leading-tight">
            <span className="italic">B</span>ienvenida a<br />
            <em className="italic">Deja de Esconderte</em>
          </h1>

          <p className="text-lg text-tinto-deep/80 mb-10 max-w-lg mx-auto leading-relaxed">
            Falta un último paso importante: únete a nuestra comunidad de WhatsApp,
            ahí te compartiré el <strong>link de Zoom</strong>, los recordatorios y
            contenido extra para prepararte.
          </p>

          <a
            href={MASTERCLASS.whatsappCommunityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-5 bg-tinto text-hueso hover:bg-tinto-deep transition-colors text-base md:text-lg font-medium tracking-wide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12.05 2C6.55 2 2.1 6.45 2.1 11.95c0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.94 9.94 0 004.89 1.27h.01c5.5 0 9.95-4.45 9.95-9.95S17.55 2 12.05 2zm5.83 14.09c-.25.7-1.45 1.34-2.02 1.42-.53.08-1.2.11-1.93-.12-.44-.14-1.01-.33-1.75-.65-3.08-1.33-5.09-4.44-5.25-4.65-.15-.2-1.25-1.66-1.25-3.17s.79-2.25 1.07-2.55c.28-.31.62-.39.83-.39l.6.01c.19.01.45-.07.7.53.26.63.87 2.15.95 2.31.08.16.13.35.03.55-.1.2-.15.32-.3.5-.15.19-.31.42-.45.56-.15.14-.31.31-.13.61.18.3.79 1.31 1.7 2.12 1.17 1.04 2.16 1.37 2.46 1.52.3.15.48.13.66-.08.19-.21.76-.88.96-1.19.2-.31.4-.26.68-.15.28.11 1.78.84 2.08.99.3.15.5.22.57.35.07.13.07.75-.18 1.44z" />
            </svg>
            Unirme a la comunidad
          </a>

          <p className="text-sm text-tinto-deep/60 mt-8 max-w-md mx-auto">
            El link se abre en WhatsApp. Es una <strong>comunidad</strong>, no un
            grupo — nadie verá tu número.
          </p>

          <div className="mt-14 pt-10 border-t border-beige max-w-md mx-auto">
            <p className="editorial-eyebrow mb-4">Guarda la fecha</p>
            <p className="text-tinto-deep">
              📅 {MASTERCLASS.dateDisplay}
              <br />
              💻 {MASTERCLASS.platform}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
