import type { Metadata } from "next";
import Link from "next/link";
import { FAQS_CONFERENCIAS, SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Conferencias y Keynotes",
  description:
    "Sarahi Haro como speaker: keynotes y conferencias sobre marca personal, asesoría de imagen y empoderamiento femenino en México y Estados Unidos.",
  alternates: { canonical: "/conferencias" },
};

const TOPICS = [
  {
    title: "Marca Personal Auténtica",
    desc: "Cómo construir una marca personal que no se base en aparentar sino en revelar quién eres.",
  },
  {
    title: "Imagen Estratégica para Mujeres Líderes",
    desc: "La imagen como herramienta de comunicación no verbal en contextos profesionales y de negocios.",
  },
  {
    title: "MVMA — Mi Versión Más Auténtica",
    desc: "El método integral que combina imagen exterior, mentalidad y marca personal.",
  },
  {
    title: "Comunidad Digital y Audiencia Femenina",
    desc: "Lecciones de construir una comunidad de 400,000+ mujeres en redes sociales.",
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

      <section className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <p className="text-xs uppercase tracking-[0.3em] text-tinto-soft mb-6">Speaker</p>
        <h1 className="font-display text-5xl md:text-7xl text-tinto-deep mb-8 leading-[1.05]">
          Conferencias <span className="italic text-tinto">y keynotes.</span>
        </h1>
        <p className="text-lg text-tinto-deep/75 max-w-2xl leading-relaxed">
          He compartido escenario con comunidades de emprendedoras, empresarias y líderes en
          México y Estados Unidos. Disponible para eventos presenciales, híbridos y virtuales.
        </p>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {TOPICS.map((t) => (
            <div key={t.title} className="p-8 border border-rosita bg-hueso-warm/40">
              <h3 className="font-display text-2xl text-tinto-deep mb-3">{t.title}</h3>
              <p className="text-tinto-deep/70 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="font-display text-3xl text-tinto-deep mb-8">Preguntas frecuentes</h2>
          <div className="space-y-6">
            {FAQS_CONFERENCIAS.map((f) => (
              <details key={f.q} className="group border-b border-rosita/60 pb-4">
                <summary className="cursor-pointer font-medium text-tinto-deep py-3 list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-tinto group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-tinto-deep/70 leading-relaxed pb-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/contacto?tipo=conferencia"
            className="inline-block px-10 py-5 bg-tinto text-hueso text-lg hover:bg-tinto-deep transition-colors"
          >
            Solicitar disponibilidad
          </Link>
        </div>
      </section>
    </>
  );
}
