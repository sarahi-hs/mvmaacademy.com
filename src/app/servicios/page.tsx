import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Servicios Personalizados 1:1 — Asesoría de Imagen",
  description:
    "5 servicios de Sarahi Haro: Estudio de Color, Asesoría de Imagen Básica / Intermedia / Avanzada y Mentoría 1:1 de coaching. Precios en pesos mexicanos.",
  alternates: { canonical: "/servicios" },
};

const SERVICIOS = [
  {
    nivel: "01",
    titulo: "Estudio de Color Básico",
    bajada: "Tu paleta personal dentro de las 12 estaciones.",
    duracion: "1 sesión · 40 min",
    modalidad: "Presencial o virtual",
    incluye: [
      "Análisis de color dentro de las 12 estaciones",
      "Paleta de colores digital personalizada",
      "Guía visual para tus próximas compras",
    ],
    precio: "$555",
    precioRegular: "$888",
    moneda: "MXN",
    promo: true,
    cta: "Comprar y reservar",
    stripeUrl: "https://buy.stripe.com/6oUeVe16E8zC3J8fF14wM0b",
  },
  {
    nivel: "02",
    titulo: "Asesoría de Imagen Básica",
    bajada: "Tu primer mapa completo de imagen.",
    duracion: "2 sesiones · 40 min cada una",
    modalidad: "Presencial o virtual",
    incluye: [
      "Evaluación diagnóstica integral",
      "Estudio de color completo",
      "Tipología corporal + visagismo",
      "Book con resultados: prendas y cortes que más te favorecen",
      "Paleta de colores digital",
    ],
    precio: "$2,500",
    moneda: "MXN",
    cta: "Comprar y reservar",
    stripeUrl: "https://buy.stripe.com/6oU7sMcPm17adjIcsP4wM06",
  },
  {
    nivel: "03",
    titulo: "Asesoría de Imagen Intermedia",
    bajada: "Tu estilo personal + el primer trabajo de mentalidad.",
    duracion: "3 sesiones",
    modalidad: "Presencial o virtual",
    incluye: [
      "Todo lo de la Asesoría Básica",
      "Guía para descubrir tu estilo personal",
      "1 sesión de coaching 1:1 de mentalidad",
    ],
    precio: "$5,000",
    moneda: "MXN",
    cta: "Comprar y reservar",
    stripeUrl: "https://buy.stripe.com/8x214o02AcPS5RgfF14wM07",
    destacado: true,
  },
  {
    nivel: "04",
    titulo: "Asesoría de Imagen Avanzada",
    bajada: "El proceso completo: imagen + mentalidad + tu closet.",
    duracion: "4 sesiones",
    modalidad: "Presencial o virtual",
    incluye: [
      "Todo lo de la Asesoría Intermedia",
      "Detox de closet completo",
      "Edición profesional de tu guardarropa",
      "Plan de compras priorizado según tu paleta",
    ],
    precio: "$10,000",
    moneda: "MXN",
    cta: "Comprar y reservar",
    stripeUrl: "https://buy.stripe.com/28EaEY5mU8zCdjIgJ54wM08",
  },
  {
    nivel: "05",
    titulo: "Mentoría 1:1 de Coaching",
    bajada: "Trabajo individual conmigo. Mentalidad, identidad, vida.",
    duracion: "2 sesiones · 1 hora cada una",
    modalidad: "Presencial o virtual",
    incluye: [
      "Mentoría de coaching personalizada conmigo",
      "Trabajo profundo de identidad y mentalidad",
      "Plan de acción individual diseñado contigo",
      "Acompañamiento personalizado entre sesiones",
    ],
    precio: "$5,000",
    moneda: "MXN",
    cta: "Comprar y reservar",
    stripeUrl: "https://buy.stripe.com/fZu14o2aI7vy5Rg2Sf4wM09",
  },
];

function ServiceSchema() {
  // ProfessionalService Schema.org para SEO + IAs
  const services = SERVICIOS.map((s) => ({
    "@type": "Service",
    "@id": `${SITE.url}/servicios#${s.nivel}`,
    name: s.titulo,
    description: s.bajada,
    provider: { "@id": `${SITE.url}/#person` },
    areaServed: { "@type": "Country", name: "México" },
    offers: {
      "@type": "Offer",
      price: s.precio.replace("$", "").replace(",", ""),
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/contacto?servicio=${encodeURIComponent(s.titulo)}`,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios Personalizados — Sarahi Haro",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: s,
    })),
  };
}

export default function ServiciosPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", url: SITE.url },
            { name: "Servicios", url: `${SITE.url}/servicios` },
          ]),
          ServiceSchema(),
        ]}
      />

      {/* HERO con foto */}
      <section className="bg-ivory py-20 md:py-24 border-b border-beige">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <p className="mono-label text-tinto mb-6">— SERVICIOS PERSONALIZADOS 1:1 —</p>
            <h1 className="font-display text-5xl md:text-7xl text-tinto-deep leading-[1.0] mb-8">
              <span className="italic">Cinco caminos.</span><br />
              Un destino:<br />
              <span className="italic text-tinto">tu autenticidad.</span>
            </h1>
            <p className="text-lg text-tinto-deep/80 leading-relaxed mb-6">
              Cada servicio diseñado para un momento específico de tu proceso.
              Si no sabés cuál es el tuyo, escribime y lo definimos juntas.
            </p>
            <p className="mono-label text-tinto-deep/60">
              MODALIDAD PRESENCIAL O VIRTUAL · PRECIOS EN PESOS MEXICANOS
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative aspect-[3/4] overflow-hidden bg-ivory-warm">
              <Image
                src="/images/sarahi/sarahi-servicios.jpg"
                alt="Sarahi Haro — Estudio de imagen y color"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-3 border border-tinto/10 pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* GRID DE SERVICIOS */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {SERVICIOS.map((s, i) => (
            <Reveal key={s.titulo} delay={(i % 2) * 100}>
              <article
                className={`relative p-10 md:p-12 h-full flex flex-col ${
                  s.destacado
                    ? "bg-tinto text-ivory"
                    : "bg-ivory-warm/40 border border-beige"
                }`}
              >
                {s.destacado && (
                  <span className="absolute -top-3 right-6 px-4 py-1 bg-beige text-tinto-deep text-xs uppercase tracking-widest">
                    Más popular
                  </span>
                )}
                {s.promo && (
                  <span className="absolute -top-3 right-6 px-4 py-1 bg-tinto text-ivory text-xs uppercase tracking-widest">
                    Solo esta semana
                  </span>
                )}
                <p className={`font-display text-6xl italic mb-6 ${s.destacado ? "text-beige" : "text-tinto/40"}`}>
                  {s.nivel}
                </p>
                <h2 className={`font-display text-3xl mb-3 ${s.destacado ? "text-ivory" : "text-tinto-deep"}`}>
                  {s.titulo}
                </h2>
                <p className={`italic text-lg mb-6 ${s.destacado ? "text-beige" : "text-tinto"}`}>
                  {s.bajada}
                </p>
                <div className={`mb-6 space-y-1 ${s.destacado ? "text-beige" : ""}`} style={s.destacado ? { color: "#D6C7AE" } : {}}>
                  <p className="editorial-eyebrow">{s.duracion}</p>
                  <p className="text-xs italic opacity-80">{s.modalidad}</p>
                </div>
                <ul className={`space-y-2 mb-8 flex-1 ${s.destacado ? "text-ivory/90" : "text-tinto-deep/80"}`}>
                  {s.incluye.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className={s.destacado ? "text-beige" : "text-tinto"}>·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-4 pt-6 border-t border-beige/40">
                  <div className="flex items-baseline gap-3">
                    <p className={`font-display text-4xl ${s.destacado ? "text-beige" : "text-tinto"}`}>
                      {s.precio}
                    </p>
                    <span className={`text-sm ${s.destacado ? "text-beige/80" : "text-tinto/70"}`}>{s.moneda}</span>
                    {s.precioRegular && (
                      <span className={`text-sm line-through ${s.destacado ? "text-beige/60" : "text-tinto/50"}`}>
                        {s.precioRegular}
                      </span>
                    )}
                  </div>
                  <a
                    href={s.stripeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-center px-6 py-3 transition-colors mono-label text-sm ${
                      s.destacado
                        ? "bg-ivory text-tinto hover:bg-beige"
                        : "bg-tinto text-ivory hover:bg-tinto-deep"
                    }`}
                    style={{ letterSpacing: "0.15em" }}
                  >
                    {s.cta.toUpperCase()}
                  </a>
                  <Link
                    href={`/contacto?servicio=${encodeURIComponent(s.titulo)}`}
                    className={`text-center text-xs italic underline-offset-4 hover:underline ${
                      s.destacado ? "text-beige/80" : "text-tinto/70"
                    }`}
                  >
                    ¿Tienes preguntas? Escríbeme primero
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* AYUDA A ELEGIR */}
      <section className="bg-ivory-warm/40 border-y border-beige py-20">
        <Reveal className="max-w-3xl mx-auto px-6 text-center">
          <p className="editorial-eyebrow mb-6">¿No estás segura?</p>
          <h2 className="font-display text-3xl md:text-4xl text-tinto-deep mb-6">
            Escribime y lo <span className="italic text-tinto">definimos juntas</span>.
          </h2>
          <p className="text-tinto-deep/75 mb-8">
            Una llamada de 15 minutos para identificar cuál servicio es el indicado
            para tu momento actual.
          </p>
          <Link
            href="/contacto?tipo=Mentor%C3%ADa+%2F+Asesor%C3%ADa+1%3A1"
            className="inline-block px-10 py-4 bg-tinto text-ivory hover:bg-tinto-deep transition-colors"
          >
            Agendar llamada
          </Link>
        </Reveal>
      </section>

      {/* CROSS-SELL MVMA TRIBE */}
      <section className="bg-tinto-deep text-ivory py-20">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p className="editorial-eyebrow mb-6" style={{ color: "#D6C7AE" }}>
            ¿Buscás un proceso integral?
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-ivory mb-6">
            Conocé <span className="italic">MVMA Tribe</span>
          </h2>
          <p className="text-ivory/85 max-w-2xl mx-auto mb-8">
            Mi programa digital de 6 meses con 7 módulos de transformación, comunidad de mujeres en proceso
            y clases quincenales. Para quienes quieren un acompañamiento sostenido más allá de las sesiones 1:1.
          </p>
          <Link
            href="/comunidad"
            className="inline-block px-10 py-4 bg-ivory text-tinto-deep hover:bg-beige transition-colors"
          >
            Ver MVMA Tribe
          </Link>
        </Reveal>
      </section>
    </>
  );
}
