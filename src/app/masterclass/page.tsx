import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PERSON } from "@/lib/site";
import { Countdown } from "./Countdown";
import { RegistroForm } from "./RegistroForm";
import { SecretosTabs } from "./SecretosTabs";
import {
  MASTERCLASS,
  PARA_QUIEN,
  HOST,
  TESTIMONIOS,
} from "./config";

/* Paleta de cards para testimonios (contraste editorial) */
const TESTIMONIAL_PALETTE = [
  { bg: "bg-tinto", text: "text-ivory", accent: "text-rosita" },
  { bg: "bg-rosita-deep", text: "text-tinto-deep", accent: "text-tinto" },
  { bg: "bg-ivory-warm", text: "text-tinto-deep", accent: "text-rosita-deep" },
  { bg: "bg-beige", text: "text-tinto-deep", accent: "text-tinto" },
  { bg: "bg-tinto-deep", text: "text-ivory", accent: "text-rosita" },
];

export default function MasterclassPage() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${MASTERCLASS.title} — Masterclass con ${HOST.name}`,
    description: MASTERCLASS.promise,
    startDate: MASTERCLASS.nextSessionIso,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: "https://mvmaacademy.com/masterclass",
    },
    organizer: {
      "@type": "Person",
      name: PERSON.name,
      url: "https://mvmaacademy.com",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
      url: "https://mvmaacademy.com/masterclass",
    },
    image: ["https://mvmaacademy.com/og-default.jpg"],
  };

  return (
    <>
      <JsonLd data={eventSchema} />

      {/* ============================================================
          HEADER estilo revista — íconos, logo centro, sección derecha
      ============================================================ */}
      <header className="relative z-20 bg-ivory border-b border-tinto-deep/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left: social */}
          <div className="flex items-center gap-4 text-tinto-deep/70">
            <a
              href="https://www.instagram.com/sarahiharooficial"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-tinto transition-colors"
            >
              <IconIG />
            </a>
            <a
              href="https://www.tiktok.com/@sarahiharo18"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-tinto transition-colors"
            >
              <IconTikTok />
            </a>
          </div>

          {/* Center: logo brand */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/sarahi/mvma-logo.png"
              alt="MVMA"
              width={32}
              height={32}
              className="h-7 w-7 md:h-8 md:w-8 object-contain"
            />
            <span className="font-display text-lg md:text-xl tracking-[0.15em] uppercase text-tinto-deep">
              MVMA · Sara Haro
            </span>
          </Link>

          {/* Right: masterclass label */}
          <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-tinto">
            <span className="hidden sm:inline">MASTERCLASS · </span>GRATIS
          </div>
        </div>
      </header>

      {/* ============================================================
          HERO — split con foto y tipografía mixta
      ============================================================ */}
      <section className="relative overflow-hidden bg-ivory">
        <SparkleDecoration className="absolute top-24 right-20 hidden lg:block text-tinto" />
        <SparkleDecoration className="absolute bottom-16 left-24 hidden lg:block text-rosita-deep" />

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: texto */}
          <div className="md:col-span-7 relative">
            <p className="editorial-eyebrow mb-8 text-tinto">
              <span className="inline-block h-[1px] w-8 bg-tinto align-middle mr-3" />
              {MASTERCLASS.eyebrow}
            </p>

            <h1 className="font-display leading-[0.95] text-tinto-deep mb-6">
              <span className="block text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] tracking-tight uppercase">
                Conviértete en una
              </span>
              <span className="block text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] tracking-tight uppercase">
                mujer que
              </span>
              <span
                className="block text-[3.6rem] sm:text-7xl md:text-[6rem] lg:text-[8rem] italic text-rosita-deep -mt-1"
                style={{ letterSpacing: "-0.03em", fontWeight: 400 }}
              >
                se cumple
              </span>
            </h1>

            <p className="font-display text-xl md:text-2xl text-tinto italic mb-8 max-w-lg">
              Recupera tu confianza y alcanza tus objetivos
            </p>

            <p className="text-base md:text-lg text-tinto-deep/80 max-w-xl leading-relaxed mb-10">
              {MASTERCLASS.promise}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">
              <a href="#registro" className={ctaPillClasses}>
                {MASTERCLASS.ctaHero}
              </a>
              <div className="text-sm text-tinto-deep/70 space-y-0.5">
                <p>🗓 {MASTERCLASS.cadence}</p>
                <p>⏱ {MASTERCLASS.durationDisplay} · 💻 Zoom</p>
              </div>
            </div>
          </div>

          {/* Right: foto + círculo rotativo */}
          <div className="md:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
              {/* Frame decorativo detrás */}
              <div
                className="absolute -inset-3 md:-inset-4 bg-rosita-deep/30 -rotate-3"
                aria-hidden
              />
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/sarahi/sarahi-tablet.jpg"
                  alt="Sara Haro"
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Círculo rotativo con texto */}
              <RotatingSeal className="absolute -bottom-8 -right-6 md:-bottom-12 md:-right-12 w-24 md:w-32" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          BLOQUE TINTO — statement con polaroids
      ============================================================ */}
      <section className="relative overflow-hidden bg-tinto py-24 md:py-32">
        <SparkleDecoration className="absolute top-12 left-1/4 text-rosita" />
        <SparkleDecoration className="absolute bottom-16 right-1/4 text-rosita" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Polaroid izquierda */}
            <div className="md:col-span-3 hidden md:flex justify-center">
              <PolaroidPhoto
                src="/images/sarahi/sarahi-parada.jpg"
                alt="Sara Haro"
                rotate="-rotate-6"
              />
            </div>

            {/* Texto centro */}
            <div className="md:col-span-6 text-center">
              <p className="editorial-eyebrow mb-6 text-rosita">
                Deja de empezar de cero.
              </p>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-ivory mb-8">
                <em className="italic text-rosita">Cumplirte</em> no es
                <br />
                cuestión de motivación
                <br />
                <span className="italic">— es cuestión de método.</span>
              </h2>
              <p className="text-ivory/85 text-lg leading-relaxed max-w-xl mx-auto">
                Una hora que reorganiza cómo te tratas, cómo te sostienes, y cómo
                vuelves a tu palabra. Sin discursos motivacionales. Con lo que sí
                funciona.
              </p>
            </div>

            {/* Polaroid derecha */}
            <div className="md:col-span-3 hidden md:flex justify-center">
              <PolaroidPhoto
                src="/images/sarahi/sarahi-extra-laptop-rosa.jpg"
                alt="Sara Haro trabajando"
                rotate="rotate-6"
              />
            </div>
          </div>

          {/* Polaroids mobile */}
          <div className="md:hidden flex justify-center gap-6 mt-12">
            <PolaroidPhoto
              src="/images/sarahi/sarahi-parada.jpg"
              alt="Sara Haro"
              rotate="-rotate-6"
              size="small"
            />
            <PolaroidPhoto
              src="/images/sarahi/sarahi-extra-laptop-rosa.jpg"
              alt="Sara Haro trabajando"
              rotate="rotate-6"
              size="small"
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          SECRETOS — tabs con colores
      ============================================================ */}
      <section className="relative overflow-hidden bg-rosita/40 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            <p className="editorial-eyebrow mb-4 text-rosita-deep">
              En esta masterclass
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1] text-tinto-deep mb-4">
              Te voy a revelar
              <br />
              <span className="italic text-rosita-deep">3 secretos</span>
            </h2>
          </div>

          <SecretosTabs />

          <div className="text-center mt-14 md:mt-16">
            <a href="#registro" className={ctaPillClasses}>
              {MASTERCLASS.ctaSecretos}
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          PARA QUIÉN ES
      ============================================================ */}
      <section className="relative overflow-hidden bg-ivory py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Título + intro */}
          <div className="md:col-span-5 md:sticky md:top-24">
            <p className="editorial-eyebrow mb-4 text-tinto">
              Esta masterclass es para ti si…
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] text-tinto-deep mb-6">
              <span className="italic">T</span>e reconoces
              <br />
              en <em className="italic text-rosita-deep">al menos</em>
              <br />
              una frase.
            </h2>
            <div className="hidden md:block">
              <SparkleDecoration className="text-rosita-deep mb-6" />
            </div>
            <a href="#registro" className={ctaPillClassesAlt}>
              {MASTERCLASS.ctaPara}
            </a>
          </div>

          {/* Lista bullets numerados */}
          <div className="md:col-span-7">
            <ul className="divide-y divide-tinto-deep/15 border-t border-b border-tinto-deep/15">
              {PARA_QUIEN.map((linea, i) => (
                <li key={i} className="py-6 md:py-7 flex gap-5 md:gap-7 items-start group">
                  <span className="font-display italic text-3xl md:text-4xl text-rosita-deep leading-none pt-1 shrink-0 min-w-[3rem] group-hover:text-tinto transition-colors">
                    0{i + 1}
                  </span>
                  <p className="text-lg md:text-xl text-tinto-deep/90 leading-relaxed">
                    {linea}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================
          TU HOST
      ============================================================ */}
      <section className="relative overflow-hidden bg-ivory-warm py-24 md:py-32">
        <SparkleDecoration className="absolute top-16 right-16 hidden md:block text-tinto" />
        <SparkleDecoration className="absolute bottom-20 left-20 hidden md:block text-rosita-deep" />

        <div className="max-w-6xl mx-auto px-6">
          <p className="editorial-eyebrow text-center mb-4 text-tinto">
            Tu host
          </p>
          <h2 className="font-display text-center text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] text-tinto-deep mb-12 md:mb-16">
            <span className="italic">S</span>ara <span className="italic">H</span>aro
          </h2>

          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            {/* Foto grande */}
            <div className="md:col-span-5">
              <div className="relative aspect-[3/4] max-w-md mx-auto w-full">
                <div
                  className="absolute -inset-4 border border-tinto-deep/30 rotate-2"
                  aria-hidden
                />
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/sarahi/sarahi-hero.jpg"
                    alt="Sara Haro"
                    fill
                    sizes="(max-width: 768px) 80vw, 400px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-7">
              <p className="text-tinto italic mb-2 text-xl font-display">
                {HOST.role}
              </p>
              <p className="text-sm text-tinto-deep/70 mb-8 tracking-[0.15em] uppercase">
                {HOST.credentials}
              </p>
              <div className="space-y-5 text-lg md:text-xl text-tinto-deep/85 leading-relaxed">
                {HOST.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="editorial-eyebrow mt-10 text-rosita-deep">
                <span className="inline-block h-[1px] w-8 bg-rosita-deep align-middle mr-3" />
                Nos vemos en la clase
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIOS (colored cards) — solo si hay
      ============================================================ */}
      {TESTIMONIOS.length > 0 && (
        <section className="relative overflow-hidden bg-ivory py-24 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14 md:mb-16">
              <p className="editorial-eyebrow mb-4 text-rosita-deep">
                Lo que dicen mujeres que ya lo vivieron
              </p>
              <h2 className="font-display text-4xl md:text-6xl leading-[1] text-tinto-deep">
                <span className="italic">C</span>lient <em className="italic">Love</em>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIOS.map((t, i) => {
                const c = TESTIMONIAL_PALETTE[i % TESTIMONIAL_PALETTE.length];
                return (
                  <figure
                    key={i}
                    className={`${c.bg} ${c.text} p-8 md:p-10 flex flex-col relative`}
                  >
                    <span
                      className={`font-display italic text-6xl ${c.accent} leading-none mb-2 opacity-70`}
                      aria-hidden
                    >
                      &ldquo;
                    </span>
                    <blockquote className="flex-1 leading-relaxed">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-6 pt-6 border-t border-current/20">
                      <p className="font-display text-lg">{t.name}</p>
                      {t.location && (
                        <p className={`editorial-eyebrow mt-1 ${c.accent}`}>
                          {t.location}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          REGISTRO FINAL
      ============================================================ */}
      <section
        id="registro"
        className="relative overflow-hidden bg-tinto-deep py-24 md:py-32"
      >
        {/* Glow blobs */}
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-tinto rounded-full blur-3xl opacity-40"
          aria-hidden
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-rosita-deep rounded-full blur-3xl opacity-25"
          aria-hidden
        />
        <SparkleDecoration className="absolute top-16 right-1/4 text-rosita" />
        <SparkleDecoration className="absolute bottom-24 left-1/4 text-rosita" />

        <div className="relative max-w-2xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-12">
            <p className="editorial-eyebrow text-rosita mb-4">
              Reserva tu lugar
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-ivory leading-[0.95] mb-6">
              <span className="italic">V</span>engo a
              <br />
              <span className="italic text-rosita">cumplirme</span>
            </h2>

            <div className="inline-flex flex-col gap-2 text-ivory/85 text-base md:text-lg">
              <span>📍 Masterclass online</span>
              <span>🎟 Acceso gratuito</span>
              <span>🗓 {MASTERCLASS.nextSessionDisplay}</span>
              <span>⏰ 60 minutos exactos</span>
            </div>
          </div>

          <div className="bg-ivory p-8 md:p-12 border border-rosita-deep/30 shadow-2xl shadow-tinto-deep/50">
            <p className="editorial-eyebrow mb-2 text-rosita-deep">
              Comienza en
            </p>
            <div className="mb-6">
              <Countdown targetIso={MASTERCLASS.nextSessionIso} />
            </div>
            <RegistroForm ctaLabel={MASTERCLASS.ctaForm} />
          </div>
        </div>
      </section>

      {/* ============================================================
          FIRMA / FOOTER editorial
      ============================================================ */}
      <footer className="bg-ivory border-t border-tinto-deep/10">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-20 text-center">
          <p className="font-display text-5xl md:text-7xl text-tinto-deep/80 tracking-tight">
            <span className="italic">M</span>VMA <em className="italic">Academy</em>
          </p>
          <p className="editorial-eyebrow mt-4 text-tinto">
            Sara Haro · MVMA Academy®
          </p>

          <div className="mt-10 pt-6 border-t border-tinto-deep/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-tinto-deep/60">
            <p>© {new Date().getFullYear()} Sara Haro · MVMA Academy</p>
            <div className="flex gap-6">
              <Link href="/" className="hover:text-tinto">
                Ir al sitio
              </Link>
              <a href={`mailto:${PERSON.email}`} className="hover:text-tinto">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ============================================================
   ESTILOS DE CTA
============================================================ */

const ctaPillClasses =
  "inline-block px-8 md:px-10 py-3.5 md:py-4 bg-tinto text-ivory hover:bg-tinto-deep transition-all duration-300 text-sm md:text-base font-medium tracking-wide rounded-full shadow-lg shadow-tinto/20 hover:shadow-xl hover:shadow-tinto/30 hover:-translate-y-0.5";

const ctaPillClassesAlt =
  "inline-block px-8 md:px-10 py-3.5 md:py-4 bg-rosita-deep text-ivory hover:bg-tinto transition-all duration-300 text-sm md:text-base font-medium tracking-wide rounded-full shadow-lg shadow-rosita-deep/30 hover:shadow-xl hover:-translate-y-0.5";

/* ============================================================
   COMPONENTES DECORATIVOS
============================================================ */

function PolaroidPhoto({
  src,
  alt,
  rotate,
  size = "normal",
}: {
  src: string;
  alt: string;
  rotate: string;
  size?: "small" | "normal";
}) {
  const dims = size === "small" ? "w-32" : "w-36 md:w-48";
  return (
    <div
      className={`${rotate} ${dims} bg-ivory p-2 md:p-3 pb-6 md:pb-8 shadow-2xl shadow-tinto-deep/40`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function SparkleDecoration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="28"
      height="28"
      aria-hidden
    >
      <path
        d="M20 4 L22 18 L36 20 L22 22 L20 36 L18 22 L4 20 L18 18 Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

function RotatingSeal({ className }: { className?: string }) {
  return (
    <div className={`${className} pointer-events-none`}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-[spin_18s_linear_infinite]"
        aria-hidden
      >
        <defs>
          <path
            id="rotating-circle"
            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
          />
        </defs>
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="currentColor"
          className="text-tinto-deep"
        />
        <text
          fill="#F7F2E8"
          className="text-[11px] tracking-[0.3em]"
          fontFamily="var(--font-inter), sans-serif"
        >
          <textPath xlinkHref="#rotating-circle">
            · MASTERCLASS · GRATIS · CADA JUEVES · MASTERCLASS · GRATIS · CADA
            JUEVES ·
          </textPath>
        </text>
        {/* Centro con logo texto */}
        <text
          x="100"
          y="105"
          textAnchor="middle"
          fill="#F7F2E8"
          className="text-xs italic tracking-wide"
          fontFamily="var(--font-cormorant), serif"
        >
          reserva
        </text>
      </svg>
    </div>
  );
}

function IconIG() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.29a8.31 8.31 0 0 0 4.87 1.55V7.5a4.76 4.76 0 0 1-1.94-.81z" />
    </svg>
  );
}
