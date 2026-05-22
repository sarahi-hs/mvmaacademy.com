import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FAQS_CONFERENCIAS, SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";

export const metadata: Metadata = {
  title: "Conferencias, Talleres y Keynotes — Sarahi Haro Speaker",
  description:
    "Sarahi Haro como speaker internacional: keynotes y conferencias sobre marca personal, asesoría de imagen y empoderamiento femenino en México y Estados Unidos. Disponible para eventos corporativos y comunidades.",
  alternates: { canonical: "/conferencias" },
};

const TOPICS = [
  {
    titulo: "Mi Versión Más Auténtica",
    bajada: "Mi conferencia insignia.",
    desc: "El método MVMA explicado para tu audiencia: cómo integrar imagen, mentalidad y marca personal en un solo camino. Ideal para comunidades de mujeres emprendedoras y empresarias.",
  },
  {
    titulo: "Imagen Estratégica para Mujeres Líderes",
    bajada: "Para C-levels, founders y directivas.",
    desc: "La imagen como herramienta de comunicación no verbal en contextos profesionales y de negocios. Cómo construir presencia con autoridad sin sacrificar autenticidad.",
  },
  {
    titulo: "Marca Personal Auténtica",
    bajada: "Para emprendedoras y profesionales.",
    desc: "Cómo construir una marca personal que no se base en aparentar sino en revelar quién eres. Talleres prácticos con ejercicios aplicables al día siguiente.",
  },
  {
    titulo: "Imagen que Vende",
    bajada: "Para profesionales que quieren convertir su imagen en activo de negocio.",
    desc: "Cómo tu imagen exterior se traduce en autoridad, confianza y oportunidades. Estrategias prácticas para que tu presencia visual abra puertas — sin perder tu autenticidad en el camino.",
  },
];

const FORMATOS = [
  {
    titulo: "Conferencia / Keynote",
    duracion: "45-60 min + Q&A",
    publico: "Eventos corporativos, congresos, comunidades",
  },
  {
    titulo: "Taller / Workshop",
    duracion: "2-4 horas",
    publico: "Grupos pequeños con trabajo práctico",
  },
  {
    titulo: "Masterclass online",
    duracion: "60-90 min",
    publico: "Audiencias virtuales internacionales",
  },
  {
    titulo: "Programa de capacitación",
    duracion: "Multi-sesión",
    publico: "Empresas que quieren acompañar a sus líderes mujeres",
  },
];

export default function ConferenciasPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(FAQS_CONFERENCIAS),
          breadcrumbSchema([
            { name: "Inicio", url: SITE.url },
            { name: "Conferencias", url: `${SITE.url}/conferencias` },
          ]),
        ]}
      />

      {/* HERO con foto del Werkshop */}
      <section className="bg-ivory py-20 md:py-24 border-b border-beige">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <p className="mono-label text-tinto mb-6">— SPEAKER INTERNACIONAL —</p>
            <h1 className="font-display text-5xl md:text-7xl text-tinto-deep leading-[1.0] mb-8">
              <span className="italic">En el escenario.</span><br />
              En la <span className="italic text-tinto">televisión.</span><br />
              En tu próximo evento.
            </h1>
            <p className="text-lg text-tinto-deep/80 leading-relaxed mb-8">
              Speaker en México y Estados Unidos para comunidades de emprendedoras, empresarias y
              líderes. Más de 200 mujeres formadas en mis talleres presenciales. Disponible para
              eventos corporativos, congresos, TEDx y comunidades digitales.
            </p>
            <Link
              href="/contacto?tipo=Conferencia+%2F+Keynote"
              className="inline-block px-10 py-4 bg-tinto text-ivory hover:bg-tinto-deep transition-colors mono-label"
              style={{ letterSpacing: "0.2em" }}
            >
              SOLICITAR DISPONIBILIDAD
            </Link>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative aspect-[3/4] overflow-hidden bg-ivory-warm">
              <Image
                src="/images/sarahi/sarahi-taller-werkshop.jpg"
                alt="Sarahi Haro dando el Taller MVMA en Werkshop"
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

      {/* MARQUEE */}
      <section className="bg-ivory py-12 border-y border-beige overflow-hidden">
        <Marquee text="MI VERSIÓN MÁS AUTÉNTICA" />
      </section>

      {/* TEMAS / TOPICS */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="mono-label text-tinto mb-4">— TEMAS DE CONFERENCIA —</p>
            <h2 className="font-display text-4xl md:text-6xl text-tinto-deep leading-[1.05]">
              <span className="italic">Cuatro charlas</span><br />
              calibradas para tu audiencia.
            </h2>
            <p className="text-tinto-deep/75 mt-6 leading-relaxed">
              Cada tema se adapta al perfil de tu evento. Briefing previo conmigo
              para entender tu audiencia y armar la versión específica.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {TOPICS.map((t, i) => (
            <Reveal key={t.titulo} delay={(i % 2) * 100}>
              <article className="p-10 border border-beige bg-ivory-warm/40 h-full">
                <p className="mono-label text-tinto mb-4">0{i + 1}</p>
                <h3 className="font-display text-2xl md:text-3xl text-tinto-deep mb-3 leading-tight">
                  {t.titulo}
                </h3>
                <p className="italic text-lg text-tinto mb-4">{t.bajada}</p>
                <p className="text-tinto-deep/75 leading-relaxed">{t.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FORMATOS */}
      <section className="bg-ivory-warm/40 py-24 md:py-32 border-y border-beige">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="mono-label text-tinto mb-4">— FORMATOS DISPONIBLES —</p>
              <h2 className="font-display text-4xl md:text-5xl text-tinto-deep leading-[1.05]">
                Cuatro maneras <span className="italic text-tinto">de trabajar juntos.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {FORMATOS.map((f, i) => (
              <Reveal key={f.titulo} delay={(i % 2) * 100}>
                <article className="p-8 bg-ivory border border-beige">
                  <p className="mono-label text-tinto/60 mb-3">0{i + 1}</p>
                  <h3 className="font-display text-2xl text-tinto-deep mb-3">{f.titulo}</h3>
                  <p className="mono-label text-tinto-deep/70 mb-2">{f.duracion}</p>
                  <p className="text-tinto-deep/75">{f.publico}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <p className="mono-label text-tinto mb-4 text-center">— PREGUNTAS FRECUENTES —</p>
          <h2 className="font-display text-4xl md:text-5xl text-tinto-deep mb-12 text-center leading-[1.05]">
            Lo que <span className="italic text-tinto">suelen preguntar</span> los organizadores.
          </h2>
          <div className="space-y-2">
            {FAQS_CONFERENCIAS.map((f) => (
              <details key={f.q} className="group border-b border-beige py-4">
                <summary className="cursor-pointer font-display text-xl text-tinto-deep list-none flex justify-between items-center">
                  <span>{f.q}</span>
                  <span className="text-tinto group-open:rotate-45 transition-transform text-2xl ml-4">+</span>
                </summary>
                <p className="text-tinto-deep/75 leading-relaxed pt-4 pb-2">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="bg-tinto text-ivory py-24 md:py-32">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p className="mono-label mb-6" style={{ color: "#D6C7AE" }}>
            — RESERVAR FECHA —
          </p>
          <h2
            className="text-4xl md:text-6xl mb-10 leading-[1.05] italic"
            style={{ fontFamily: "var(--font-script)", color: "#D6C7AE" }}
          >
            ¿Tu evento necesita una voz<br />
            que les hable de mujer a mujer?
          </h2>
          <p className="text-lg text-ivory/85 max-w-2xl mx-auto mb-10">
            Mi asistente coordina disponibilidad, propuesta económica y briefing.
            Tiempo de respuesta: menos de 48 horas hábiles.
          </p>
          <Link
            href="/contacto?tipo=Conferencia+%2F+Keynote"
            className="inline-block px-12 py-5 bg-ivory text-tinto-deep hover:bg-beige transition-colors mono-label text-lg"
            style={{ letterSpacing: "0.2em" }}
          >
            SOLICITAR PROPUESTA
          </Link>
        </Reveal>
      </section>
    </>
  );
}
