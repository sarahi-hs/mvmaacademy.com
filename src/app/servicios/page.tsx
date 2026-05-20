import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Servicios Personalizados — Asesoría de Imagen 1:1",
  description:
    "Cinco servicios de Sarahi Haro: Estudio de Color, Asesoría de Imagen Básica/Intermedia/Avanzada y Mentoría 1:1. Encuentra el nivel para tu momento.",
  alternates: { canonical: "/servicios" },
};

// TODO: completar con precios reales + descripciones que pase Sarahi
const SERVICIOS = [
  {
    nivel: "01",
    titulo: "Estudio de Color Básico",
    bajada: "Tu paleta personal con análisis profesional.",
    duracion: "1 sesión · 90 min",
    incluye: [
      "Análisis de subtono, profundidad e intensidad",
      "Paleta personal de 12-18 tonos",
      "Guía visual para tus compras futuras",
    ],
    precio: "Próximamente",
    cta: "Solicitar info",
  },
  {
    nivel: "02",
    titulo: "Asesoría de Imagen Básica",
    bajada: "Tu primer mapa de imagen personal.",
    duracion: "2 sesiones · 4 horas total",
    incluye: [
      "Análisis de biotipo y proporciones",
      "Identificación de tu estilo personal",
      "Edición básica de closet",
      "Plan de compras priorizado",
    ],
    precio: "Próximamente",
    cta: "Solicitar info",
  },
  {
    nivel: "03",
    titulo: "Asesoría de Imagen Intermedia",
    bajada: "Profundizamos en tu identidad visual completa.",
    duracion: "4 sesiones · 8 horas total",
    incluye: [
      "Todo lo del nivel Básico",
      "Estudio de color completo incluido",
      "Edición profunda de closet con criterios",
      "Personal shopping virtual con paleta",
    ],
    precio: "Próximamente",
    cta: "Solicitar info",
    destacado: true,
  },
  {
    nivel: "04",
    titulo: "Asesoría de Imagen Avanzada",
    bajada: "Construimos tu imagen como activo estratégico.",
    duracion: "6 sesiones · 12 horas total",
    incluye: [
      "Todo lo del nivel Intermedio",
      "Personal shopping presencial",
      "Sesión fotográfica para tu marca personal",
      "Guía completa de identidad visual",
    ],
    precio: "Próximamente",
    cta: "Solicitar info",
  },
  {
    nivel: "05",
    titulo: "Consultoría 1:1 — Mentoría Integral",
    bajada: "Imagen + marca personal + mentalidad. El proceso completo.",
    duracion: "3-6 meses · personalizado",
    incluye: [
      "Programa completo MVMA personalizado",
      "Trabajo integral imagen + marca personal + mentalidad",
      "Sesiones quincenales 1:1",
      "Acompañamiento ilimitado por WhatsApp",
      "Acceso vitalicio a MVMA Tribe",
    ],
    precio: "Próximamente",
    cta: "Solicitar info",
  },
];

export default function ServiciosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: SITE.url },
          { name: "Servicios", url: `${SITE.url}/servicios` },
        ])}
      />

      {/* HERO */}
      <section className="bg-ivory py-24 md:py-32 border-b border-beige">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <p className="editorial-eyebrow mb-6">Servicios Personalizados</p>
            <h1 className="font-display text-5xl md:text-7xl text-tinto-deep leading-[1.05] mb-8">
              <span className="italic">Cinco caminos.</span>
              <br />
              Un destino: <span className="italic text-tinto">tu autenticidad.</span>
            </h1>
            <p className="text-lg md:text-xl text-tinto-deep/80 max-w-2xl mx-auto leading-relaxed">
              Cada servicio está diseñado para un momento específico de tu proceso.
              Si no estás segura cuál es el tuyo, escribime y lo definimos juntas.
            </p>
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
                <p className={`font-display text-6xl italic mb-6 ${s.destacado ? "text-beige" : "text-tinto/40"}`}>
                  {s.nivel}
                </p>
                <h2 className={`font-display text-3xl mb-3 ${s.destacado ? "text-ivory" : "text-tinto-deep"}`}>
                  {s.titulo}
                </h2>
                <p className={`italic text-lg mb-6 ${s.destacado ? "text-beige" : "text-tinto"}`}>
                  {s.bajada}
                </p>
                <p className={`editorial-eyebrow mb-6 ${s.destacado ? "text-beige" : ""}`} style={s.destacado ? { color: "#D6C7AE" } : {}}>
                  {s.duracion}
                </p>
                <ul className={`space-y-2 mb-8 flex-1 ${s.destacado ? "text-ivory/90" : "text-tinto-deep/80"}`}>
                  {s.incluye.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className={s.destacado ? "text-beige" : "text-tinto"}>·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-6 border-t border-beige/40">
                  <p className={`font-display text-2xl italic ${s.destacado ? "text-beige" : "text-tinto"}`}>
                    {s.precio}
                  </p>
                  <Link
                    href={`/contacto?servicio=${encodeURIComponent(s.titulo)}`}
                    className={`px-6 py-3 transition-colors ${
                      s.destacado
                        ? "bg-ivory text-tinto hover:bg-beige"
                        : "bg-tinto text-ivory hover:bg-tinto-deep"
                    }`}
                  >
                    {s.cta}
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
            Una llamada de 15 minutos gratuita para identificar cuál servicio es el indicado
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
    </>
  );
}
