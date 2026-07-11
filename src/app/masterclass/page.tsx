import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PERSON } from "@/lib/site";
import { Countdown } from "./Countdown";
import { RegistroForm } from "./RegistroForm";
import {
  MASTERCLASS,
  PARA_QUIEN,
  APRENDERAS,
  TESTIMONIOS,
  PILARES,
} from "./config";

const PILAR_ICONS: Record<string, React.ReactNode> = {
  autoridad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 8l3 8h12l3-8-5 3-4-6-4 6-5-3z" />
      <path d="M6 20h12" />
      <circle cx="3" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="4" r="1" fill="currentColor" />
      <circle cx="21" cy="8" r="1" fill="currentColor" />
    </svg>
  ),
  impacto: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 3h12l3 6-9 12L3 9l3-6z" />
      <path d="M6 3l3 6h6l3-6" />
      <path d="M9 9l3 12 3-12" />
    </svg>
  ),
  libertad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 20h18" />
      <path d="M6 20V12" />
      <path d="M11 20V8" />
      <path d="M16 20V5" />
      <path d="M4 8l6-3 4 2 6-4" />
      <circle cx="20" cy="3" r="1.5" fill="currentColor" />
    </svg>
  ),
};

export default function MasterclassPage() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${MASTERCLASS.title} — Masterclass con Sarahi Haro`,
    description: MASTERCLASS.subtitle,
    startDate: MASTERCLASS.dateIso,
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

      {/* Barra superior con logo — sin nav */}
      <div className="border-b border-beige/60 bg-ivory/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/sarahi/mvma-logo.png"
              alt="MVMA logo"
              width={40}
              height={40}
              className="h-9 w-9 md:h-10 md:w-10 object-contain"
            />
            <span className="font-display text-lg md:text-xl tracking-tight text-tinto-deep">
              <span className="italic">S</span>arahi{" "}
              <span className="italic">H</span>aro
            </span>
          </Link>
          <a
            href="#registro"
            className="hidden sm:inline text-xs uppercase tracking-widest text-tinto hover:text-tinto-deep"
          >
            Reservar mi lugar →
          </a>
        </div>
      </div>

      {/* ========================= HERO ========================= */}
      <section className="relative overflow-hidden bg-ivory">
        <div className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-12 md:pb-16 text-center">
          <p className="editorial-eyebrow mb-6">
            Masterclass en vivo · {MASTERCLASS.dateDisplay}
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mb-6">
            <span className="text-tinto-deep">
              <span className="italic">D</span>eja de
            </span>
            <br />
            <span className="text-rosita-deep">
              <span className="italic">E</span>sconderte
            </span>
          </h1>
          <p className="text-lg md:text-xl text-tinto-deep/75 max-w-2xl mx-auto leading-relaxed">
            {MASTERCLASS.subtitle}
          </p>

          <div className="mt-12 mb-8">
            <p className="editorial-eyebrow mb-4">Comienza en</p>
            <Countdown targetIso={MASTERCLASS.dateIso} />
          </div>

          <a
            href="#registro"
            className="inline-block px-10 py-4 bg-tinto text-hueso hover:bg-tinto-deep transition-colors text-base md:text-lg font-medium tracking-wide"
          >
            {MASTERCLASS.ctaShort}
          </a>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-tinto-deep/70">
            <span>📅 {MASTERCLASS.dateDisplay}</span>
            <span>⏱ Duración: {MASTERCLASS.durationDisplay}</span>
            <span>💻 {MASTERCLASS.platform}</span>
          </div>
        </div>
      </section>

      {/* ========================= 3 PILARES ========================= */}
      <section className="bg-rosita/30 py-16 md:py-20 border-y border-rosita-deep/20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="editorial-eyebrow text-center mb-10 text-rosita-deep">
            Los 3 pilares que trabajaremos
          </p>
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {PILARES.map((pilar) => (
              <div key={pilar.key} className="text-center">
                <div className="mx-auto w-14 h-14 md:w-16 md:h-16 mb-5 text-rosita-deep">
                  {PILAR_ICONS[pilar.key]}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-tinto-deep mb-3 tracking-wide uppercase">
                  {pilar.label}
                </h3>
                <p className="text-sm md:text-base text-tinto-deep/75 leading-relaxed max-w-xs mx-auto">
                  {pilar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= VIDEO ========================= */}
      <section className="bg-ivory-warm/60 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="editorial-eyebrow text-center mb-6">
            Un mensaje para ti antes de la clase
          </p>
          <div className="aspect-video w-full relative bg-tinto-deep/5 border border-beige overflow-hidden">
            <iframe
              src="https://player.vimeo.com/video/1208957237?title=0&byline=0&portrait=0"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Masterclass — Deja de Esconderte"
            />
          </div>
        </div>
      </section>

      {/* ========================= PARA QUIÉN ========================= */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="editorial-eyebrow text-center mb-4">Esta clase es para ti si</p>
          <h2 className="font-display text-3xl md:text-5xl text-tinto-deep text-center mb-12 leading-tight">
            <span className="italic">T</span>e reconoces en{" "}
            <em className="italic">al menos</em> una de estas frases
          </h2>
          <ul className="space-y-5 max-w-2xl mx-auto">
            {PARA_QUIEN.map((linea, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="font-display text-rosita-deep text-2xl leading-none pt-1">
                  ✦
                </span>
                <p className="text-lg text-tinto-deep/85 leading-relaxed">
                  {linea}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ========================= APRENDERÁS — versión editorial suave ========================= */}
      <section className="bg-ivory-warm py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="editorial-eyebrow text-center mb-4 text-rosita-deep">
            Lo que te vas a llevar
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-tinto-deep text-center mb-16 leading-tight">
            <span className="italic">3</span> cambios de percepción que
            <br />
            transforman cómo te ven
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {APRENDERAS.map((item, i) => (
              <div
                key={i}
                className="bg-ivory p-8 border border-rosita-deep/20 text-center md:text-left"
              >
                <p className="font-display italic text-5xl text-rosita-deep mb-4">
                  0{i + 1}
                </p>
                <h3 className="font-display text-xl md:text-2xl text-tinto-deep mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-tinto-deep/75 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= SOBRE SARAHI ========================= */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="editorial-eyebrow text-center mb-4">Quién imparte esta clase</p>
          <h2 className="font-display text-3xl md:text-5xl text-tinto-deep text-center mb-12 leading-tight">
            <span className="italic">S</span>arahi <span className="italic">H</span>aro
          </h2>

          <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-center max-w-5xl mx-auto">
            {/* Foto */}
            <div className="md:col-span-2 relative aspect-[3/4] max-w-sm mx-auto md:max-w-none w-full">
              <div className="absolute inset-0 border border-rosita-deep/30 translate-x-3 translate-y-3" aria-hidden />
              <Image
                src="/images/sarahi/sarahi-tablet.jpg"
                alt="Sarahi Haro con blazer negro riendo con tablet"
                fill
                sizes="(max-width: 768px) 80vw, 320px"
                className="object-cover relative"
                priority={false}
              />
            </div>

            {/* Texto */}
            <div className="md:col-span-3 text-tinto-deep/85 leading-relaxed space-y-4 text-lg">
              <p>
                Asesora de imagen certificada, mercadóloga, coach de marca personal,
                speaker internacional y autora del libro{" "}
                <em>&ldquo;Volver a mí y no irme nunca más&rdquo;</em>.
              </p>
              <p>
                Fundadora del método{" "}
                <strong className="text-rosita-deep">MVMA</strong> — Mi Versión Más
                Auténtica, con el que ha acompañado a más de{" "}
                <strong>200 mujeres</strong> a construir una marca personal alineada
                con quiénes son y hacia dónde van. Su comunidad supera las{" "}
                <strong>400,000 personas</strong> en redes sociales.
              </p>
              <div className="pt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <span className="editorial-eyebrow text-rosita-deep">
                  Autoridad
                </span>
                <span className="editorial-eyebrow text-rosita-deep">
                  Impacto
                </span>
                <span className="editorial-eyebrow text-rosita-deep">
                  Libertad
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= TESTIMONIOS ========================= */}
      <section className="bg-beige-light/40 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="editorial-eyebrow text-center mb-4">
            Lo que dicen de trabajar con Sarahi
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-tinto-deep text-center mb-14 leading-tight">
            <span className="italic">M</span>ujeres que ya
            <br />
            dieron el paso
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIOS.map((t, i) => (
              <figure
                key={i}
                className="bg-ivory p-8 border border-rosita-deep/20 flex flex-col"
              >
                <span
                  className="font-display italic text-6xl text-rosita-deep/50 leading-none mb-2"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote className="flex-1 text-tinto-deep/85 leading-relaxed italic">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-rosita-deep/20">
                  <p className="font-display text-lg text-tinto-deep">
                    {t.name}
                  </p>
                  <p className="editorial-eyebrow mt-1 text-rosita-deep">
                    {t.location}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= REGISTRO ========================= */}
      <section id="registro" className="bg-tinto py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-6">
          <p className="editorial-eyebrow text-rosita text-center mb-4">
            Reserva tu lugar — 100% gratis
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-hueso text-center mb-4 leading-tight">
            <span className="italic">E</span>stoy lista para
            <br />
            mi grandeza
          </h2>
          <p className="text-hueso/80 text-center mb-10">
            {MASTERCLASS.dateDisplay} · {MASTERCLASS.platform}
          </p>

          <div className="bg-ivory p-6 md:p-10 border border-rosita">
            <RegistroForm ctaLabel={MASTERCLASS.ctaLabel} />
          </div>
        </div>
      </section>

      {/* ========================= FOOTER MINIMAL ========================= */}
      <footer className="bg-ivory border-t border-beige">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-tinto-deep/60">
          <p>© {new Date().getFullYear()} Sarahi Haro · MVMA Academy</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-tinto">
              Ir al sitio
            </Link>
            <a
              href={`mailto:${PERSON.email}`}
              className="hover:text-tinto"
            >
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
