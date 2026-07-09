import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PERSON } from "@/lib/site";
import { Countdown } from "./Countdown";
import { RegistroForm } from "./RegistroForm";
import { MASTERCLASS, PARA_QUIEN, APRENDERAS, TESTIMONIOS } from "./config";

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
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-tinto-deep mb-6">
            <span className="italic">D</span>eja de{" "}
            <span className="italic">e</span>sconderte
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

      {/* ========================= VIDEO ========================= */}
      <section className="bg-ivory-warm/60 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <p className="editorial-eyebrow text-center mb-6">
            Un mensaje para ti antes de la clase
          </p>
          <div className="aspect-video w-full bg-tinto-deep/5 border border-beige flex items-center justify-center">
            {/* Placeholder para video — reemplazar con <iframe> de YouTube/Vimeo cuando esté listo */}
            <div className="text-center text-tinto-deep/40 p-8">
              <svg
                width="72"
                height="72"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mx-auto mb-4"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <p className="editorial-eyebrow">Video próximamente</p>
            </div>
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
                <span className="font-display text-tinto text-2xl leading-none pt-1">
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

      {/* ========================= APRENDERÁS ========================= */}
      <section className="bg-tinto-deep py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="editorial-eyebrow text-hueso/70 text-center mb-4">
            Lo que te vas a llevar
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-hueso text-center mb-16 leading-tight">
            <span className="italic">3</span> cambios de percepción que
            <br />
            transforman cómo te ven
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {APRENDERAS.map((item, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="font-display italic text-5xl text-rosita/80 mb-4">
                  0{i + 1}
                </p>
                <h3 className="font-display text-xl md:text-2xl text-hueso mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-hueso/70 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= SOBRE SARAHI ========================= */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="editorial-eyebrow mb-4">Quién imparte esta clase</p>
          <h2 className="font-display text-3xl md:text-5xl text-tinto-deep mb-8 leading-tight">
            <span className="italic">S</span>arahi <span className="italic">H</span>aro
          </h2>
          <div className="max-w-2xl mx-auto text-tinto-deep/80 leading-relaxed space-y-4 text-lg">
            <p>
              Asesora de imagen certificada, mercadóloga, coach de marca personal,
              speaker internacional y autora del libro{" "}
              <em>&ldquo;Volver a mí y no irme nunca más&rdquo;</em>.
            </p>
            <p>
              Fundadora del método <strong className="text-tinto">MVMA</strong> — Mi
              Versión Más Auténtica, con el que ha acompañado a más de{" "}
              <strong>200 mujeres</strong> a construir una marca personal alineada
              con quiénes son y hacia dónde van. Su comunidad supera las{" "}
              <strong>400,000 personas</strong> en redes sociales.
            </p>
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
                className="bg-ivory p-8 border border-beige flex flex-col"
              >
                <span
                  className="font-display italic text-6xl text-tinto/40 leading-none mb-2"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote className="flex-1 text-tinto-deep/85 leading-relaxed italic">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-beige">
                  <p className="font-display text-lg text-tinto-deep">
                    {t.name}
                  </p>
                  <p className="editorial-eyebrow mt-1">{t.location}</p>
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
