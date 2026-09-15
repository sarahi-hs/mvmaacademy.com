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

/* Paleta rotativa para "Para ti si…" — cuadros de distintos colores */
const PARA_QUIEN_COLORS = [
  { bg: "bg-tinto", text: "text-ivory", num: "text-rosa-vivo" },
  { bg: "bg-rosa-vivo", text: "text-tinto-deep", num: "text-tinto-deep" },
  { bg: "bg-gris", text: "text-ivory", num: "text-rosa-vivo" },
  { bg: "bg-ivory-warm", text: "text-tinto-deep", num: "text-tinto" },
  { bg: "bg-rosa-suave", text: "text-tinto-deep", num: "text-tinto" },
  { bg: "bg-tinto-deep", text: "text-ivory", num: "text-rosa-vivo" },
];

/* Paleta rotativa para testimonios */
const TESTIMONIAL_PALETTE = [
  { bg: "bg-tinto", text: "text-ivory", accent: "text-rosa-vivo" },
  { bg: "bg-rosa-vivo", text: "text-tinto-deep", accent: "text-tinto" },
  { bg: "bg-gris", text: "text-ivory", accent: "text-rosa-vivo" },
  { bg: "bg-ivory-warm", text: "text-tinto-deep", accent: "text-rosa-shock" },
  { bg: "bg-tinto-deep", text: "text-ivory", accent: "text-rosa-vivo" },
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
          HEADER estilo revista
      ============================================================ */}
      <header className="relative z-20 bg-ivory border-b border-tinto-deep/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
              MVMA · Sarahi Haro
            </span>
          </Link>

          <div className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-tinto">
            <span className="hidden sm:inline">MASTERCLASS · </span>GRATIS
          </div>
        </div>
      </header>

      {/* ============================================================
          HERO — countdown arriba, título, post-it, CTA
      ============================================================ */}
      <section className="relative overflow-hidden bg-ivory py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="editorial-eyebrow mb-6 text-rosa-shock">
            <span className="inline-block h-[1px] w-8 bg-rosa-shock align-middle mr-3" />
            {MASTERCLASS.eyebrow}
            <span className="inline-block h-[1px] w-8 bg-rosa-shock align-middle ml-3" />
          </p>

          {/* COUNTDOWN arriba */}
          <div className="mb-10 md:mb-12">
            <div className="inline-block bg-rosa-suave/60 border border-rosa-vivo/50 px-6 md:px-10 py-5 md:py-6">
              <Countdown targetIso={MASTERCLASS.nextSessionIso} />
            </div>
          </div>

          <h1 className="font-display leading-[0.95] text-tinto-deep mb-8">
            <span className="block text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] tracking-tight uppercase">
              Conviértete en una
            </span>
            <span className="block text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] tracking-tight uppercase">
              mujer que
            </span>
            <span
              className="block text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[11rem] italic text-rosa-vivo -mt-2 md:-mt-4"
              style={{
                fontFamily:
                  "var(--font-cormorant), 'Playfair Display', serif",
                fontWeight: 300,
                letterSpacing: "-0.04em",
                lineHeight: "0.85",
              }}
            >
              se cumple
            </span>
          </h1>

          <p className="font-display text-xl md:text-3xl text-tinto italic mb-12 max-w-2xl mx-auto">
            Recupera tu confianza y alcanza tus objetivos
          </p>

          {/* POST-IT horizontal con promesa + fecha */}
          <div className="max-w-2xl mx-auto mb-12 md:mb-14">
            <PostIt />
          </div>

          <div>
            <a href="#registro" className={ctaPinkClasses}>
              {MASTERCLASS.ctaHero}
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          BLOQUE TINTO-DEEP — statement con todo en rosa
      ============================================================ */}
      <section className="relative overflow-hidden bg-tinto-deep py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Foto izquierda (reference #1 — reemplazar cuando Sarahi la suba) */}
            <div className="md:col-span-3 hidden md:flex justify-center">
              <PolaroidPhoto
                src="/images/sarahi/masterclass-host.png"
                alt="Sarahi Haro"
                rotate="-rotate-6"
              />
            </div>

            <div className="md:col-span-6 text-center">
              <p className="editorial-eyebrow mb-6 text-rosa-vivo">
                Deja de empezar de cero.
              </p>
              <h2
                className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-8"
                style={{ color: "var(--color-rosa-vivo)" }}
              >
                <em className="italic">Cumplirte</em> no es
                <br />
                cuestión de motivación
                <br />
                <span className="italic">— es cuestión de método.</span>
              </h2>
              <p className="text-rosa-suave text-lg leading-relaxed max-w-xl mx-auto">
                Una hora que reorganiza cómo te tratas, cómo te sostienes y cómo
                vuelves a tu palabra.
              </p>
            </div>

            {/* Foto derecha (reference #2 — reemplazar cuando Sarahi la suba) */}
            <div className="md:col-span-3 hidden md:flex justify-center">
              <PolaroidPhoto
                src="/images/sarahi/masterclass-2.jpg"
                alt="Sarahi Haro"
                rotate="rotate-6"
              />
            </div>
          </div>

          <div className="md:hidden flex justify-center gap-6 mt-12">
            <PolaroidPhoto
              src="/images/sarahi/masterclass-host.png"
              alt="Sarahi Haro"
              rotate="-rotate-6"
              size="small"
            />
            <PolaroidPhoto
              src="/images/sarahi/masterclass-2.jpg"
              alt="Sarahi Haro"
              rotate="rotate-6"
              size="small"
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          SECRETOS — tabs estilo CARPETA
      ============================================================ */}
      <section className="relative overflow-hidden bg-rosa-suave/60 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            <p className="editorial-eyebrow mb-4 text-rosa-shock">
              En esta masterclass
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1] text-tinto-deep mb-4">
              Te voy a revelar
              <br />
              <span className="italic text-rosa-shock">3 secretos</span>
            </h2>
          </div>

          <SecretosTabs />

          <div className="text-center mt-14 md:mt-16">
            <a href="#registro" className={ctaPinkClasses}>
              {MASTERCLASS.ctaSecretos}
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          PARA QUIÉN ES — GRID de cuadros de colores
      ============================================================ */}
      <section className="relative overflow-hidden bg-ivory py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            <p className="editorial-eyebrow mb-4 text-rosa-shock">
              Esta masterclass es para ti si…
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.98] text-tinto-deep mb-4">
              <span className="italic">T</span>e reconoces en
              <br />
              <em className="italic text-rosa-vivo">al menos</em> una frase
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {PARA_QUIEN.map((linea, i) => {
              const c = PARA_QUIEN_COLORS[i % PARA_QUIEN_COLORS.length];
              return (
                <div
                  key={i}
                  className={`
                    ${c.bg} ${c.text} relative
                    p-8 md:p-10 aspect-square md:aspect-[4/3]
                    flex flex-col justify-between
                    transition-transform hover:-translate-y-1 duration-300
                    shadow-lg
                  `}
                >
                  <p
                    className={`font-display italic text-6xl md:text-7xl leading-none ${c.num} opacity-90`}
                    aria-hidden
                  >
                    0{i + 1}
                  </p>
                  <p className="font-display text-lg md:text-xl leading-snug">
                    {linea}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-14 md:mt-16">
            <a href="#registro" className={ctaPinkClasses}>
              {MASTERCLASS.ctaPara}
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          TU HOST — sobre fondo gris claro
      ============================================================ */}
      <section className="relative overflow-hidden bg-gris-claro/70 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <p className="editorial-eyebrow text-center mb-4 text-rosa-shock">
            Tu host
          </p>
          <h2 className="font-display text-center text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] text-tinto-deep mb-12 md:mb-16">
            <span className="italic">S</span>arahi <span className="italic">H</span>aro
          </h2>

          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            <div className="md:col-span-5">
              <div className="relative aspect-[3/4] max-w-md mx-auto w-full">
                <div
                  className="absolute -inset-4 bg-rosa-vivo rotate-2"
                  aria-hidden
                />
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/sarahi/sarahi-tablet.jpg"
                    alt="Sarahi Haro"
                    fill
                    sizes="(max-width: 768px) 80vw, 400px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <p className="text-tinto italic mb-2 text-xl font-display">
                {HOST.role}
              </p>
              <p className="text-sm text-gris-oscuro mb-8 tracking-[0.15em] uppercase">
                {HOST.credentials}
              </p>
              <div className="space-y-5 text-lg md:text-xl text-tinto-deep/85 leading-relaxed">
                {HOST.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="editorial-eyebrow mt-10 text-rosa-shock">
                <span className="inline-block h-[1px] w-8 bg-rosa-shock align-middle mr-3" />
                Nos vemos en la clase
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIOS
      ============================================================ */}
      {TESTIMONIOS.length > 0 && (
        <section className="relative overflow-hidden bg-ivory py-24 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14 md:mb-16">
              <p className="editorial-eyebrow mb-4 text-rosa-shock">
                Lo que dicen mujeres que ya lo vivieron
              </p>
              <h2 className="font-display text-4xl md:text-6xl leading-[1] text-tinto-deep">
                <span className="italic">C</span>lient{" "}
                <em className="italic text-rosa-vivo">Love</em>
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
          REGISTRO FINAL — Timer arriba, "Reserva tu lugar" grande
      ============================================================ */}
      <section
        id="registro"
        className="relative overflow-hidden bg-tinto-deep py-24 md:py-32"
      >
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-tinto rounded-full blur-3xl opacity-40"
          aria-hidden
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-rosa-vivo rounded-full blur-3xl opacity-30"
          aria-hidden
        />

        <div className="relative max-w-2xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-12">
            <p className="editorial-eyebrow text-rosa-vivo mb-4">
              — Reserva tu lugar —
            </p>
            <h2
              className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6"
              style={{ color: "var(--color-ivory)" }}
            >
              <span className="italic">R</span>eserva
              <br />
              <em
                className="italic"
                style={{ color: "var(--color-rosa-vivo)" }}
              >
                tu lugar
              </em>
            </h2>

            <div className="inline-flex flex-col gap-2 text-ivory/85 text-base md:text-lg mt-6">
              <span>📍 Masterclass online</span>
              <span>🎟 Acceso gratuito</span>
              <span>🗓 {MASTERCLASS.nextSessionDisplay}</span>
              <span>⏰ Duración: 60 minutos</span>
            </div>
          </div>

          <div className="bg-ivory p-8 md:p-12 border border-rosa-vivo shadow-2xl shadow-tinto-deep/50">
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
            <span className="italic">M</span>VMA{" "}
            <em className="italic text-rosa-vivo">Academy</em>
          </p>
          <p className="editorial-eyebrow mt-4 text-rosa-shock">
            Sarahi Haro · MVMA Academy®
          </p>

          <div className="mt-10 pt-6 border-t border-tinto-deep/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-tinto-deep/60">
            <p>© {new Date().getFullYear()} Sarahi Haro · MVMA Academy</p>
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

const ctaPinkClasses =
  "inline-block px-8 md:px-10 py-3.5 md:py-4 bg-rosa-vivo text-tinto-deep hover:bg-rosa-shock hover:text-ivory transition-all duration-300 text-sm md:text-base font-semibold tracking-wide rounded-full shadow-lg shadow-rosa-vivo/30 hover:shadow-xl hover:shadow-rosa-shock/40 hover:-translate-y-0.5";

/* ============================================================
   POST-IT horizontal — promesa + fecha
============================================================ */

function PostIt() {
  return (
    <div className="relative inline-block max-w-2xl w-full -rotate-1 mx-auto">
      {/* Cinta washi arriba */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-6 md:h-7 bg-tinto-deep/70 shadow-md rotate-2 z-20"
        style={{
          clipPath:
            "polygon(4% 20%, 96% 0%, 100% 80%, 0% 100%)",
        }}
        aria-hidden
      />

      {/* Cuerpo post-it */}
      <div className="relative bg-rosa-suave px-8 md:px-12 py-8 md:py-10 shadow-2xl shadow-tinto-deep/25 border-b-4 border-rosa-vivo/40">
        <p className="text-base md:text-lg leading-relaxed text-tinto-deep/90 mb-5 font-display italic">
          &ldquo;{MASTERCLASS.promise}&rdquo;
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-1 text-xs md:text-sm uppercase tracking-[0.2em] text-tinto pt-4 border-t border-tinto-deep/15">
          <span>🗓 {MASTERCLASS.nextSessionDisplay}</span>
          <span>⏱ 60 min</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   POLAROID
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
        <Image src={src} alt={alt} fill sizes="200px" className="object-cover" />
      </div>
    </div>
  );
}

/* ============================================================
   ICONS SOCIAL
============================================================ */

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
