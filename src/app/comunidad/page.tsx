import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Glow Club by MVMA — Membresía mensual de Sarahi Haro",
  description:
    "The Glow Club by MVMA: la comunidad para mujeres que quieren dejar de esconderse y convertirse en su mejor carta de presentación. Membresía mensual con acompañamiento semanal.",
  alternates: { canonical: "/comunidad" },
};

const VIMEO_ID_PLACEHOLDER = "1196047853"; // TODO: cambiar cuando Sarahi grabe el VSL del Glow Club

const INCLUYE = [
  {
    icon: "✨",
    titulo: "Un espacio para dejar de empezar y volver a empezar",
    desc: "Deja atrás esa sensación de avanzar unos días y después regresar al mismo lugar.",
  },
  {
    icon: "🌱",
    titulo: "Acompañamiento semanal",
    desc: "Contenido y encuentros cada semana para que te mantengas constante en tu proceso de crecimiento.",
  },
  {
    icon: "💛",
    titulo: "Mujeres que te inspiran y celebran contigo",
    desc: "Una comunidad de mujeres reales que te impulsan, te acompañan y celebran cada paso que das.",
  },
  {
    icon: "🎯",
    titulo: "Retos que se convierten en resultados",
    desc: "Retos prácticos que transforman lo que aprendes en resultados visibles en tu día a día.",
  },
  {
    icon: "🗣️",
    titulo: "Conversaciones que se aplican desde el día uno",
    desc: "Charlas sobre imagen, autoestima, hábitos, comunicación y desarrollo personal, listas para aplicar.",
  },
  {
    icon: "🌟",
    titulo: "Un recordatorio semanal de tu decisión",
    desc: "Un lugar para volver, cada semana, a la mujer en la que decidiste convertirte.",
  },
];

function CourseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "The Glow Club by MVMA",
    description:
      "Membresía mensual para mujeres que quieren dejar de esconderse y proyectar una imagen alineada con la mujer que quieren llegar a ser. Comunidad, acompañamiento semanal y retos aplicables.",
    provider: { "@id": `${SITE.url}/#person` },
    inLanguage: "es",
    offers: {
      "@type": "Offer",
      price: "499",
      priceCurrency: "MXN",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/comunidad`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
    },
  };
}

export default function GlowClubPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", url: SITE.url },
            { name: "The Glow Club", url: `${SITE.url}/comunidad` },
          ]),
          CourseSchema(),
        ]}
      />

      {/* HERO */}
      <section className="bg-ivory pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <p className="mono-label text-tinto mb-6">— MVMA · THE GLOW CLUB —</p>
            <h1 className="font-display text-5xl md:text-8xl text-tinto-deep leading-[1.0] mb-8">
              The{" "}
              <span className="italic font-light text-tinto">Glow</span>{" "}
              <span className="italic">Club.</span>
            </h1>
            <p className="text-lg md:text-2xl text-tinto-deep/80 max-w-3xl mx-auto leading-relaxed">
              La comunidad para mujeres que quieren dejar de esconderse y empezar a convertirse
              en su <span className="text-tinto font-medium">mejor carta de presentación.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* VIDEO — placeholder mientras Sarahi graba el VSL del Glow Club */}
      <section className="bg-ivory pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="relative w-full overflow-hidden shadow-[0_20px_60px_rgba(45,11,17,0.25)] bg-tinto-deep" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                src={`https://player.vimeo.com/video/${VIMEO_ID_PLACEHOLDER}?title=0&byline=0&portrait=0`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="The Glow Club by MVMA"
              />
            </div>
            <p className="text-center text-sm text-tinto-deep/50 italic mt-3">
              Video oficial próximamente
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROMESA / DESCRIPCIÓN */}
      <section className="bg-ivory pb-24 md:pb-32 border-b border-beige">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <p className="font-display text-2xl md:text-3xl text-tinto-deep leading-snug italic">
              Cada mes tendrás el acompañamiento, la motivación y el entorno que necesitas
              para construir hábitos, fortalecer tu confianza y proyectar una imagen alineada
              con la <span className="text-tinto">mujer que quieres llegar a ser.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* CARNITA — El entorno */}
      <section className="bg-tinto-deep text-ivory py-20 md:py-24">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p
            className="text-3xl md:text-5xl italic leading-tight"
            style={{ fontFamily: "var(--font-script)", color: "#D6C7AE" }}
          >
            El entorno en el que te rodeas<br />
            te suma o te resta.<br />
            <span className="text-ivory">No hay término medio.</span>
          </p>
        </Reveal>
      </section>

      {/* QUÉ ENCONTRARÁS DENTRO */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="mono-label text-tinto mb-4">— QUÉ ENCONTRARÁS DENTRO —</p>
              <h2 className="font-display text-4xl md:text-6xl text-tinto-deep leading-[1.05]">
                Un lugar para <span className="italic text-tinto">reencontrarte.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {INCLUYE.map((item, i) => (
              <Reveal key={item.titulo} delay={(i % 2) * 100}>
                <article className="p-8 bg-ivory-warm/40 border border-beige h-full">
                  <p className="text-3xl mb-4">{item.icon}</p>
                  <h3 className="font-display text-xl text-tinto-deep mb-2 leading-tight">
                    {item.titulo}
                  </h3>
                  <p className="text-tinto-deep/75 leading-relaxed">{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIO + CTA */}
      <section id="inversion" className="bg-tinto-deep text-ivory py-32 md:py-40 scroll-mt-20">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p className="mono-label mb-6" style={{ color: "#D6C7AE" }}>— TU INVERSIÓN —</p>
          <h2
            className="text-4xl md:text-6xl mb-8 leading-[1.0] italic"
            style={{ fontFamily: "var(--font-script)", color: "#D6C7AE" }}
          >
            Menos que un<br />café a la semana.
          </h2>
          <p className="text-lg md:text-xl text-ivory/85 max-w-2xl mx-auto mb-12 leading-relaxed">
            The Glow Club vale lo mismo que <strong className="text-beige">dos cafés de Starbucks
            a la semana.</strong> La diferencia es que un café dura 20 minutos y esto te
            acompaña <em>los 30 días del mes</em>.
          </p>

          <div className="border-y border-beige/30 py-12 my-8">
            <p className="mono-label text-beige/80 mb-4" style={{ color: "rgba(214,199,174,0.8)" }}>
              MEMBRESÍA MENSUAL
            </p>
            <div className="flex flex-wrap items-baseline gap-3 justify-center mb-3">
              <p className="font-display text-7xl md:text-8xl text-beige">$499</p>
              <span className="mono-label text-ivory/80">MXN / MES</span>
            </div>
            <p className="text-ivory/70 italic">Cancela cuando quieras</p>
          </div>

          {/* TODO(sarahi): reemplazar href con Payment Link real de Stripe cuando creemos la suscripción */}
          <a
            href="/contacto?tipo=Quiero+entrar+al+Glow+Club"
            className="inline-block px-14 py-5 bg-ivory text-tinto-deep hover:bg-beige transition-colors mono-label text-lg"
            style={{ letterSpacing: "0.2em" }}
          >
            QUIERO ENTRAR AL GLOW CLUB
          </a>
        </Reveal>
      </section>

      {/* CARNITA #2 — Pregunta de cierre */}
      <section className="bg-ivory py-24 md:py-32 border-y border-beige">
        <Reveal className="max-w-3xl mx-auto px-6 text-center">
          <p className="mono-label text-tinto mb-6">— ANTES DE IRTE —</p>
          <p className="font-display text-3xl md:text-5xl text-tinto-deep leading-tight italic">
            ¿Cuánto te está costando<br />
            <span className="text-tinto">no comprometerte</span><br />
            con tu crecimiento?
          </p>
          <p className="text-tinto-deep/70 mt-8 leading-relaxed max-w-xl mx-auto">
            Un año más igual. Los mismos hábitos. La misma inseguridad. Los mismos "algún día".
            El Glow Club no es un curso más — es la decisión de dejar de posponerte.
          </p>
        </Reveal>
      </section>

      {/* CROSS-SELL A SERVICIOS */}
      <section className="bg-ivory-warm/40 py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="mono-label text-tinto mb-4">— ¿QUIERES ALGO MÁS PROFUNDO? —</p>
            <h2 className="font-display text-3xl md:text-5xl text-tinto-deep leading-[1.05] mb-6">
              Quiero un proceso <span className="italic text-tinto">más personalizado.</span>
            </h2>
            <p className="text-tinto-deep/80 leading-relaxed max-w-2xl mx-auto mb-10">
              Si buscas trabajar conmigo 1:1 o entrar a mi programa insignia de 6 meses,
              revisa mis servicios personalizados y agendemos una llamada para diseñar
              el camino correcto para ti.
            </p>
            <Link
              href="/servicios"
              className="inline-block px-12 py-4 bg-tinto text-ivory hover:bg-tinto-deep transition-colors mono-label"
              style={{ letterSpacing: "0.2em" }}
            >
              VER MIS SERVICIOS
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
