import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MASTERCLASS } from "../config";

export const metadata: Metadata = {
  title: "¡Casi lista! — Únete a la comunidad de WhatsApp",
  description: "Falta un paso: únete a la comunidad de WhatsApp para recibir el link de la masterclass.",
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

      <main className="flex-1 flex items-center justify-center px-6 py-12 md:py-16">
        <div className="max-w-2xl w-full text-center">
          <p className="editorial-eyebrow mb-4 text-tinto">Registro confirmado ✓</p>

          <h1 className="font-display text-4xl md:text-6xl text-tinto-deep mb-4 leading-tight">
            <span className="italic">C</span>asi lista.
            <br />
            <em className="italic">Falta 1 paso.</em>
          </h1>

          <p className="text-lg text-tinto-deep/80 mb-8 max-w-lg mx-auto leading-relaxed">
            Únete a nuestra comunidad de WhatsApp — es donde vas a recibir el{" "}
            <strong>link de Zoom</strong> el día de la clase.
          </p>

          <a
            href={MASTERCLASS.whatsappCommunityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-6 bg-[#25D366] text-white hover:bg-[#1DA851] transition-colors text-lg md:text-xl font-medium tracking-wide shadow-lg shadow-tinto-deep/10"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12.05 2C6.55 2 2.1 6.45 2.1 11.95c0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.94 9.94 0 004.89 1.27h.01c5.5 0 9.95-4.45 9.95-9.95S17.55 2 12.05 2zm5.83 14.09c-.25.7-1.45 1.34-2.02 1.42-.53.08-1.2.11-1.93-.12-.44-.14-1.01-.33-1.75-.65-3.08-1.33-5.09-4.44-5.25-4.65-.15-.2-1.25-1.66-1.25-3.17s.79-2.25 1.07-2.55c.28-.31.62-.39.83-.39l.6.01c.19.01.45-.07.7.53.26.63.87 2.15.95 2.31.08.16.13.35.03.55-.1.2-.15.32-.3.5-.15.19-.31.42-.45.56-.15.14-.31.31-.13.61.18.3.79 1.31 1.7 2.12 1.17 1.04 2.16 1.37 2.46 1.52.3.15.48.13.66-.08.19-.21.76-.88.96-1.19.2-.31.4-.26.68-.15.28.11 1.78.84 2.08.99.3.15.5.22.57.35.07.13.07.75-.18 1.44z" />
            </svg>
            Unirme a la comunidad
          </a>

          <p className="text-xs text-tinto-deep/50 mt-4 max-w-md mx-auto">
            Es una <strong>comunidad</strong>, no un grupo — nadie verá tu número ni el de las demás.
          </p>

          <div className="mt-12 pt-8 border-t border-beige max-w-md mx-auto space-y-4">
            <div>
              <p className="editorial-eyebrow mb-2">Dentro de la comunidad recibes</p>
              <ul className="text-sm text-tinto-deep/75 space-y-1.5 text-left inline-block">
                <li>✦ El link de Zoom el día del evento</li>
                <li>✦ Recordatorios previos</li>
                <li>✦ Contenido de preparación para la clase</li>
                <li>✦ Acceso directo al equipo antes y después</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-beige">
              <p className="editorial-eyebrow mb-2">Guarda la fecha</p>
              <p className="text-tinto-deep">
                📅 {MASTERCLASS.dateDisplay}
                <br />
                💻 {MASTERCLASS.platform}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
