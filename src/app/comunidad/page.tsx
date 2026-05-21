import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "MVMA Tribe — Mi programa digital de transformación de 6 meses",
  description:
    "MVMA Tribe: 7 módulos de transformación, 2 clases quincenales en vivo, comunidad de mujeres y acceso a eventos. Programa digital de Sarahi Haro por 6 meses.",
  alternates: { canonical: "/comunidad" },
};

const MODULOS = [
  {
    n: "01",
    titulo: "El Despertar",
    bajada: "Reconociendo a la mujer que soy.",
  },
  {
    n: "02",
    titulo: "Limpieza Interna",
    bajada: "Rompiendo creencias y juicios.",
  },
  {
    n: "03",
    titulo: "Esencia",
    bajada: "Descubriendo quién soy en realidad.",
  },
  {
    n: "04",
    titulo: "Imagen con Propósito",
    bajada: "Tu imagen exterior como reflejo de tu interior.",
  },
  {
    n: "05",
    titulo: "Lenguaje No Verbal y Presencia",
    bajada: "Cómo te muestras antes de hablar.",
  },
  {
    n: "06",
    titulo: "Proyección al Mundo",
    bajada: "Tu marca personal en acción.",
  },
  {
    n: "07",
    titulo: "Integración y Renacimiento",
    bajada: "Sostener tu transformación en el tiempo.",
  },
];

const INCLUYE = [
  {
    titulo: "Acceso a la plataforma por 6 meses",
    desc: "Todos los módulos disponibles 24/7 en tu portal personal.",
  },
  {
    titulo: "2 clases quincenales en vivo",
    desc: "Una clase conmigo + una clase con una experta empresaria que ya logró lo que vos querés.",
  },
  {
    titulo: "Comunidad activa de mujeres",
    desc: "Un espacio cerrado para compartir procesos, hacer preguntas y crecer juntas.",
  },
  {
    titulo: "Acompañamiento dentro de la comunidad",
    desc: "Resolvemos dudas en grupo. No estás sola en el camino.",
  },
  {
    titulo: "Eventos presenciales con precio preferencial",
    desc: "Acceso a workshops y encuentros exclusivos para miembros de MVMA Tribe.",
  },
  {
    titulo: "BONUS: Estudio de Color Básico de cortesía",
    desc: "Por acción rápida en tu inscripción te incluyo un estudio de color básico (valor $1,999 MXN).",
    bonus: true,
  },
];

function CourseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "MVMA Tribe — Programa Digital de Transformación",
    description:
      "Programa digital de 6 meses con 7 módulos de transformación, comunidad de mujeres y clases quincenales en vivo. Creado por Sarahi Haro.",
    provider: { "@id": `${SITE.url}/#person` },
    inLanguage: "es",
    offers: {
      "@type": "Offer",
      price: "5997",
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/comunidad`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT6M",
    },
    educationalCredentialAwarded: "Membresía MVMA Tribe (6 meses)",
    syllabusSections: MODULOS.map((m) => ({
      "@type": "Syllabus",
      name: `${m.n}. ${m.titulo}`,
      description: m.bajada,
    })),
  };
}

export default function ComunidadPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", url: SITE.url },
            { name: "MVMA Tribe", url: `${SITE.url}/comunidad` },
          ]),
          CourseSchema(),
        ]}
      />

      {/* HERO */}
      <section className="bg-ivory py-24 md:py-32 border-b border-beige">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <p className="editorial-eyebrow mb-6">Mi Comunidad</p>
            <h1 className="font-display text-5xl md:text-8xl text-tinto-deep leading-[1.0] mb-8">
              <span className="italic font-light text-tinto">M</span>VMA{" "}
              <span className="italic">Tribe.</span>
            </h1>
            <p className="font-display text-2xl md:text-4xl text-tinto-soft italic mb-10">
              Mi Versión Más Auténtica.
            </p>
            <p className="text-lg md:text-xl text-tinto-deep/80 max-w-2xl mx-auto leading-relaxed">
              Mi programa digital de 6 meses para mujeres que están listas para
              hacer el trabajo interno y reflejar afuera quiénes son por dentro.
            </p>
            <div className="editorial-divider my-10 max-w-xs mx-auto">
              <span className="font-display italic text-tinto">·</span>
            </div>
            <div className="flex flex-wrap gap-4 justify-center items-baseline">
              <p className="font-display text-5xl text-tinto">$5,997</p>
              <span className="text-tinto/70">MXN · 6 meses</span>
            </div>
            <Link
              href="/contacto?tipo=MVMA+Tribe+%28comunidad%29"
              className="inline-block mt-10 px-12 py-5 bg-tinto text-ivory hover:bg-tinto-deep transition-colors tracking-wide text-lg"
            >
              Quiero unirme a MVMA Tribe
            </Link>
          </Reveal>
        </div>
      </section>

      {/* MÓDULOS — Los 7 */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="text-center mb-16">
            <p className="editorial-eyebrow mb-4">El programa</p>
            <h2 className="font-display text-4xl md:text-6xl text-tinto-deep leading-[1.05]">
              <span className="italic">Siete módulos</span>
              <br />
              de transformación.
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {MODULOS.map((m, i) => (
            <Reveal key={m.n} delay={(i % 2) * 100}>
              <article className="group flex gap-6 p-8 bg-ivory-warm/40 border border-beige hover:border-tinto hover:bg-beige-light/30 transition-all">
                <div className="font-display text-6xl italic text-tinto/40 group-hover:text-tinto leading-none transition-colors">
                  {m.n}
                </div>
                <div>
                  <h3 className="font-display text-2xl text-tinto-deep mb-2">
                    {m.titulo}
                  </h3>
                  <p className="text-tinto-deep/70 italic">{m.bajada}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section className="bg-tinto text-ivory py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="editorial-eyebrow mb-4" style={{ color: "#D6C7AE" }}>
                Qué incluye tu membresía
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-ivory leading-[1.05]">
                <span className="italic">Todo</span> lo que necesitás
                <br />
                para tu proceso.
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {INCLUYE.map((item, i) => (
              <Reveal key={item.titulo} delay={(i % 2) * 100}>
                <div className={`p-8 ${item.bonus ? "bg-beige text-tinto-deep border-2 border-beige" : "border border-beige/30"}`}>
                  {item.bonus && (
                    <p className="editorial-eyebrow mb-3 text-tinto">⚡ Bonus de acción rápida</p>
                  )}
                  <h3 className={`font-display text-2xl mb-3 ${item.bonus ? "text-tinto-deep" : "text-ivory"}`}>
                    {item.titulo}
                  </h3>
                  <p className={item.bonus ? "text-tinto-deep/80" : "text-ivory/85"}>
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="text-center mb-12">
            <p className="editorial-eyebrow mb-4">Para quién es MVMA Tribe</p>
            <h2 className="font-display text-3xl md:text-5xl text-tinto-deep leading-[1.05]">
              ¿Es <span className="italic text-tinto">para vos</span>?
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10">
          <Reveal>
            <div>
              <p className="editorial-eyebrow mb-4">SÍ es para vos si...</p>
              <ul className="space-y-3 text-tinto-deep/85">
                <li className="flex gap-3"><span className="text-tinto mt-1">✓</span> Sentís que perdiste contacto con quién sos en algún momento del camino</li>
                <li className="flex gap-3"><span className="text-tinto mt-1">✓</span> Estás lista para hacer trabajo interno real (no solo táctica)</li>
                <li className="flex gap-3"><span className="text-tinto mt-1">✓</span> Querés acompañamiento sostenido (no un curso aislado de 4 semanas)</li>
                <li className="flex gap-3"><span className="text-tinto mt-1">✓</span> Disfrutás aprender en comunidad con otras mujeres en proceso similar</li>
                <li className="flex gap-3"><span className="text-tinto mt-1">✓</span> Querés trabajar imagen + marca personal + mentalidad integrados</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div>
              <p className="editorial-eyebrow mb-4 text-tinto-soft">NO es para vos si...</p>
              <ul className="space-y-3 text-tinto-deep/70">
                <li className="flex gap-3"><span className="text-tinto-soft mt-1">×</span> Querés un curso express de 4 semanas con resultados garantizados</li>
                <li className="flex gap-3"><span className="text-tinto-soft mt-1">×</span> Buscás solo asesoría de imagen sin trabajo de mentalidad</li>
                <li className="flex gap-3"><span className="text-tinto-soft mt-1">×</span> No tenés tiempo para clases quincenales en vivo</li>
                <li className="flex gap-3"><span className="text-tinto-soft mt-1">×</span> Preferís trabajar 1:1 sin componente de comunidad (mejor mirar mis servicios personalizados)</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-tinto-deep text-ivory py-32 md:py-40">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p className="editorial-eyebrow mb-8" style={{ color: "#D6C7AE" }}>
            Empezá hoy
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-ivory mb-10 leading-[1.05]">
            <span className="italic">Tu próxima versión</span>
            <br />
            te está esperando.
          </h2>
          <div className="flex flex-wrap items-baseline gap-4 justify-center mb-10">
            <p className="font-display text-6xl text-beige">$5,997</p>
            <span className="text-ivory/80">MXN · acceso por 6 meses</span>
          </div>
          <Link
            href="/contacto?tipo=MVMA+Tribe+%28comunidad%29"
            className="inline-block px-14 py-5 bg-ivory text-tinto-deep hover:bg-beige transition-colors tracking-wide text-lg"
          >
            Inscribirme a MVMA Tribe
          </Link>
          <p className="mt-8 text-sm text-ivory/60 italic">
            Plazas limitadas para garantizar acompañamiento personalizado.
          </p>
        </Reveal>
      </section>
    </>
  );
}
