import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PERSON } from "@/lib/site";
import { Countdown } from "./Countdown";
import { RegistroForm } from "./RegistroForm";
import {
  MASTERCLASS,
  SECRETOS,
  PARA_QUIEN,
  HOST,
  TESTIMONIOS,
} from "./config";

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

      {/* ========================= NAV MÍNIMAL ========================= */}
      <div className="relative z-20 border-b border-ivory-warm bg-ivory/85 backdrop-blur-md">
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
              <span className="italic">S</span>ara <span className="italic">H</span>aro
            </span>
          </Link>
          <a
            href="#registro"
            className="hidden sm:inline text-xs uppercase tracking-[0.25em] text-tinto hover:text-tinto-deep"
          >
            Reservar mi lugar →
          </a>
        </div>
      </div>

      {/* ========================= HERO ========================= */}
      <section className="relative overflow-hidden bg-ivory">
        {/* Blobs orgánicos decorativos */}
        <ArtyBlob className="absolute -top-24 -right-24 w-[520px] h-[520px] text-rosita/60" />
        <ArtyBlob2 className="absolute -bottom-32 -left-40 w-[600px] h-[600px] text-beige/70" />
        <FloatingDot className="absolute top-32 left-16 hidden lg:block text-tinto" />
        <FloatingDot className="absolute top-24 right-1/4 hidden lg:block text-rosita-deep" />

        <div className="relative max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-16 md:pb-24 text-center">
          <p className="editorial-eyebrow mb-6 md:mb-8 text-tinto">
            {MASTERCLASS.eyebrow}
          </p>

          <h1 className="font-display leading-[0.92] mb-8 md:mb-10 text-tinto-deep">
            <span className="block text-[2.6rem] sm:text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight">
              <span className="italic">C</span>onviértete en una mujer que
            </span>
            <span
              className="block text-[3rem] sm:text-6xl md:text-[5.5rem] lg:text-[7rem] italic text-rosita-deep mt-1 md:mt-2"
              style={{ letterSpacing: "-0.02em" }}
            >
              se cumple
            </span>
          </h1>

          <p className="font-display text-xl md:text-2xl lg:text-3xl text-tinto italic mb-6 md:mb-8">
            Recupera tu confianza y alcanza tus objetivos
          </p>

          <p className="text-base md:text-lg text-tinto-deep/80 max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12">
            {MASTERCLASS.promise}
          </p>

          {/* Bloque fecha + contador con marco decorativo */}
          <div className="relative inline-block mb-10 md:mb-12">
            <div className="absolute inset-0 -m-4 border border-rosita-deep/30" aria-hidden />
            <div className="relative px-6 md:px-10 py-6 md:py-8 bg-ivory">
              <p className="editorial-eyebrow mb-2 text-rosita-deep">
                Próxima sesión
              </p>
              <p className="font-display text-lg md:text-xl text-tinto-deep mb-5">
                {MASTERCLASS.nextSessionDisplay}
              </p>
              <Countdown targetIso={MASTERCLASS.nextSessionIso} />
            </div>
          </div>

          <div>
            <a href="#registro" className={ctaPrimaryClasses}>
              {MASTERCLASS.ctaHero}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-tinto-deep/70">
            <span>🗓 {MASTERCLASS.cadence}</span>
            <span>⏱ {MASTERCLASS.durationDisplay}</span>
            <span>💻 {MASTERCLASS.platform}</span>
          </div>
        </div>
      </section>

      {/* ========================= 3 SECRETOS ========================= */}
      <section className="relative overflow-hidden bg-ivory-warm py-20 md:py-28">
        {/* Curvas decorativas */}
        <CurvaDecorativa className="absolute top-8 right-0 w-64 opacity-40 text-rosita-deep hidden md:block" />
        <FloatingDot className="absolute top-16 left-12 text-tinto" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
            <p className="editorial-eyebrow mb-4 text-rosita-deep">
              Lo que voy a revelarte
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[0.98] text-tinto-deep">
              <span className="italic">3</span> secretos que van a{" "}
              <span className="italic">cambiar</span>
              <br />
              cómo te sostienes en tu evolución
            </h2>
          </div>

          <div className="grid gap-12 md:gap-10 lg:gap-14">
            {SECRETOS.map((s, i) => (
              <div
                key={s.key}
                className={`relative grid md:grid-cols-12 gap-6 md:gap-10 items-center ${
                  i % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* Número decorativo HUGE */}
                <div
                  className="md:col-span-5 relative flex items-center justify-center"
                  style={{ direction: "ltr" }}
                >
                  <div
                    className={`absolute inset-0 rounded-full blur-3xl opacity-30 ${
                      i === 0
                        ? "bg-rosita-deep"
                        : i === 1
                        ? "bg-tinto"
                        : "bg-beige"
                    }`}
                    aria-hidden
                  />
                  <p
                    className={`relative font-display italic text-[10rem] md:text-[14rem] lg:text-[18rem] leading-none select-none ${
                      i === 0
                        ? "text-rosita-deep"
                        : i === 1
                        ? "text-tinto"
                        : "text-tinto-soft"
                    }`}
                    aria-hidden
                  >
                    {s.key}
                  </p>
                </div>

                {/* Texto del secreto */}
                <div
                  className="md:col-span-7 text-center md:text-left"
                  style={{ direction: "ltr" }}
                >
                  <p className="editorial-eyebrow mb-4 text-tinto">
                    {s.label}
                  </p>
                  <p className="font-display text-2xl md:text-3xl lg:text-4xl text-tinto-deep leading-[1.15]">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 md:mt-20">
            <a href="#registro" className={ctaPrimaryClasses}>
              {MASTERCLASS.ctaSecretos}
            </a>
          </div>
        </div>
      </section>

      {/* ========================= PARA QUIÉN ========================= */}
      <section className="relative overflow-hidden bg-ivory py-20 md:py-28">
        <ArtyBlob className="absolute top-20 -left-40 w-[500px] h-[500px] text-rosita/50" />

        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-14 md:mb-16">
            <p className="editorial-eyebrow mb-4 text-rosita-deep">
              Esta masterclass es para ti si…
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-tight text-tinto-deep">
              <span className="italic">T</span>e reconoces en{" "}
              <em className="italic">al menos</em>
              <br />
              una de estas frases
            </h2>
          </div>

          <ul className="space-y-4 md:space-y-5 max-w-2xl mx-auto">
            {PARA_QUIEN.map((linea, i) => (
              <li
                key={i}
                className="flex gap-4 items-start p-5 md:p-6 bg-ivory-warm/40 border-l-2 border-rosita-deep/60 hover:border-rosita-deep transition-colors"
              >
                <span className="font-display italic text-2xl md:text-3xl text-rosita-deep leading-none pt-1 shrink-0">
                  0{i + 1}
                </span>
                <p className="text-lg text-tinto-deep/90 leading-relaxed">
                  {linea}
                </p>
              </li>
            ))}
          </ul>

          <div className="text-center mt-14 md:mt-16">
            <a href="#registro" className={ctaPrimaryClasses}>
              {MASTERCLASS.ctaPara}
            </a>
          </div>
        </div>
      </section>

      {/* ========================= TU HOST ========================= */}
      <section className="relative overflow-hidden bg-ivory-warm py-20 md:py-28">
        <CurvaDecorativa className="absolute bottom-16 left-0 w-64 opacity-30 text-tinto rotate-180 hidden md:block" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
            {/* Foto asimétrica */}
            <div className="md:col-span-5 relative">
              <div
                className="absolute -inset-4 md:-inset-6 bg-rosita-deep/20 -rotate-2"
                aria-hidden
              />
              <div className="relative aspect-[3/4] max-w-sm mx-auto md:max-w-none w-full overflow-hidden">
                <Image
                  src={HOST.photo}
                  alt={`${HOST.name} — ${HOST.role}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 400px"
                  className="object-cover"
                  priority={false}
                />
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-7">
              <p className="editorial-eyebrow mb-4 text-rosita-deep">
                Tu host
              </p>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-tinto-deep mb-4">
                <span className="italic">S</span>ara <span className="italic">H</span>aro
              </h2>
              <p className="text-tinto italic mb-2 text-lg">{HOST.role}</p>
              <p className="text-sm text-tinto-deep/70 mb-8 tracking-wide">
                {HOST.credentials}
              </p>

              <div className="space-y-4 text-lg text-tinto-deep/85 leading-relaxed">
                {HOST.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= TESTIMONIOS (opcional) ========================= */}
      {TESTIMONIOS.length > 0 && (
        <section className="relative overflow-hidden bg-ivory py-20 md:py-24">
          <div className="relative max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="editorial-eyebrow mb-4 text-rosita-deep">
                Lo que dicen mujeres que ya lo vivieron
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-tinto-deep leading-tight">
                <span className="italic">M</span>ujeres que ya
                <br />
                dijeron sí a sí mismas
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIOS.map((t, i) => (
                <figure
                  key={i}
                  className="bg-ivory-warm/40 p-8 border border-rosita-deep/20 flex flex-col"
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
                    {t.location && (
                      <p className="editorial-eyebrow mt-1 text-rosita-deep">
                        {t.location}
                      </p>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================= REGISTRO ========================= */}
      <section
        id="registro"
        className="relative overflow-hidden bg-tinto-deep py-20 md:py-28"
      >
        {/* Blobs oscuros decorativos */}
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-tinto rounded-full blur-3xl opacity-40"
          aria-hidden
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-rosita-deep rounded-full blur-3xl opacity-25"
          aria-hidden
        />

        <div className="relative max-w-2xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-12">
            <p className="editorial-eyebrow text-rosita mb-4">
              Reserva tu lugar
            </p>
            <h2 className="font-display text-4xl md:text-6xl text-ivory leading-[0.95] mb-6">
              <span className="italic">V</span>engo a<br />
              <span className="italic text-rosita">cumplirme</span>
            </h2>

            <div className="inline-flex flex-col gap-2 text-ivory/85 text-base md:text-lg">
              <span>📍 Masterclass online</span>
              <span>🎟 Acceso gratuito</span>
              <span>🗓 {MASTERCLASS.nextSessionDisplay}</span>
              <span>⏰ 60 minutos exactos</span>
            </div>
          </div>

          <div className="bg-ivory p-6 md:p-10 border border-rosita-deep/30 shadow-2xl shadow-tinto-deep/50">
            <RegistroForm ctaLabel={MASTERCLASS.ctaForm} />
          </div>
        </div>
      </section>

      {/* ========================= FOOTER ========================= */}
      <footer className="bg-ivory border-t border-beige">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-tinto-deep/60">
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
      </footer>
    </>
  );
}

/* ========================= ESTILOS COMPARTIDOS ========================= */

const ctaPrimaryClasses =
  "inline-block px-10 md:px-12 py-4 md:py-5 bg-tinto text-ivory hover:bg-tinto-deep transition-all duration-300 text-base md:text-lg font-medium tracking-wide shadow-lg shadow-tinto/20 hover:shadow-xl hover:shadow-tinto/30 hover:-translate-y-0.5";

/* ========================= DECORATIVOS SVG ========================= */

function ArtyBlob({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M406.5,325Q377,400,301,439.5Q225,479,145,431Q65,383,49.5,301.5Q34,220,86,151Q138,82,226,69.5Q314,57,375.5,123Q437,189,436,264.5Q435,340,406.5,325Z"
      />
    </svg>
  );
}

function ArtyBlob2({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M427.5,320Q408,390,338.5,417Q269,444,199,428Q129,412,80,347Q31,282,55,205Q79,128,152,98Q225,68,296,90.5Q367,113,412.5,181.5Q458,250,427.5,320Z"
      />
    </svg>
  );
}

function CurvaDecorativa({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M10,100 Q60,20 100,100 T190,100" />
      <path d="M10,120 Q60,40 100,120 T190,120" opacity="0.6" />
      <path d="M10,140 Q60,60 100,140 T190,140" opacity="0.3" />
    </svg>
  );
}

function FloatingDot({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="6" cy="6" r="3" fill="currentColor" opacity="0.4" />
      <circle
        cx="6"
        cy="6"
        r="5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
      />
    </svg>
  );
}
