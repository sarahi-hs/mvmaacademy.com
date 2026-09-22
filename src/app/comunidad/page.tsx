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

const VIMEO_ID = "1228212050";

const INCLUYE = [
  {
    titulo: "Un espacio para dejar de empezar y volver a empezar",
    desc: "Deja atrás esa sensación de avanzar unos días y después regresar al mismo lugar.",
  },
  {
    titulo: "Acompañamiento semanal",
    desc: "Contenido y encuentros cada semana para mantenerte constante en tu proceso de crecimiento.",
  },
  {
    titulo: "Mujeres que te inspiran y celebran contigo",
    desc: "Una comunidad de mujeres reales que te impulsan, te acompañan y celebran cada paso que das.",
  },
  {
    titulo: "Retos que se convierten en resultados",
    desc: "Retos prácticos que transforman lo que aprendes en resultados visibles en tu día a día.",
  },
  {
    titulo: "Conversaciones que se aplican desde el día uno",
    desc: "Charlas sobre imagen, autoestima, hábitos, comunicación y desarrollo personal listas para aplicar.",
  },
  {
    titulo: "Un recordatorio semanal de tu decisión",
    desc: "Un lugar para volver, cada semana, a la mujer en la que decidiste convertirte.",
  },
];

// Post-its en corcho — colores cálidos + rotaciones sutiles para look orgánico
const POSTIT_COLORS = [
  { bg: "bg-amber-100", tape: "bg-amber-300/60" },
  { bg: "bg-rosa-suave", tape: "bg-rosa-vivo/50" },
  { bg: "bg-yellow-100", tape: "bg-yellow-300/60" },
  { bg: "bg-orange-100", tape: "bg-orange-300/50" },
  { bg: "bg-lime-100", tape: "bg-lime-300/50" },
  { bg: "bg-rosita", tape: "bg-rosa-shock/40" },
];

const POSTIT_ROTATIONS = [
  "md:-rotate-3",
  "md:rotate-2",
  "md:-rotate-1",
  "md:rotate-3",
  "md:-rotate-2",
  "md:rotate-1",
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

      {/* VIDEO */}
      <section className="bg-ivory pt-4 pb-12 md:pt-8 md:pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div
              className="relative w-full overflow-hidden shadow-[0_20px_60px_rgba(45,11,17,0.25)] bg-tinto-deep"
              style={{ aspectRatio: "16 / 9" }}
            >
              <iframe
                src={`https://player.vimeo.com/video/${VIMEO_ID}?title=0&byline=0&portrait=0`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="The Glow Club by MVMA"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="text-center mt-10">
              <a
                href="#inversion"
                className="inline-block px-12 py-4 bg-tinto text-ivory hover:bg-tinto-deep transition-colors mono-label text-base"
                style={{ letterSpacing: "0.2em" }}
              >
                QUIERO SER PARTE
              </a>
            </div>
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

      {/* QUÉ ENCONTRARÁS DENTRO — Post-its pegados en pizarrón de corcho */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{
          backgroundColor: "#B08B5A",
          backgroundImage: [
            // Textura de corcho — puntos irregulares en varios tamaños
            "radial-gradient(circle at 25% 30%, rgba(88, 60, 30, 0.28) 1.2px, transparent 1.6px)",
            "radial-gradient(circle at 70% 65%, rgba(60, 40, 20, 0.22) 1px, transparent 1.4px)",
            "radial-gradient(circle at 45% 80%, rgba(100, 70, 35, 0.20) 0.8px, transparent 1.2px)",
            "radial-gradient(circle at 85% 20%, rgba(70, 45, 22, 0.24) 1.4px, transparent 1.8px)",
            // Sombreado lateral para dar profundidad
            "linear-gradient(135deg, rgba(80, 55, 28, 0.15) 0%, transparent 40%, rgba(60, 40, 20, 0.12) 100%)",
          ].join(", "),
          backgroundSize: "18px 18px, 14px 14px, 22px 22px, 16px 16px, 100% 100%",
        }}
      >
        {/* Sombras decorativas de "marco" del pizarrón */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.35)]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
              <p className="mono-label text-amber-100 mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                — QUÉ ENCONTRARÁS DENTRO —
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-ivory leading-[0.98] drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                Un lugar para<br />
                <em className="italic text-rosa-suave">reencontrarte.</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {INCLUYE.map((item, i) => {
              const c = POSTIT_COLORS[i % POSTIT_COLORS.length];
              const r = POSTIT_ROTATIONS[i % POSTIT_ROTATIONS.length];
              return (
                <Reveal key={item.titulo} delay={(i % 3) * 100}>
                  <article
                    className={`${c.bg} ${r} relative p-6 md:p-7 min-h-[240px] md:min-h-[260px] flex flex-col justify-between transition-transform duration-300 hover:rotate-0 hover:scale-[1.03] shadow-[0_10px_22px_rgba(0,0,0,0.28),0_2px_4px_rgba(0,0,0,0.18)]`}
                  >
                    {/* Cinta adhesiva arriba */}
                    <span
                      className={`${c.tape} absolute -top-3 left-1/2 -translate-x-1/2 w-20 md:w-24 h-5 md:h-6 border-x border-white/30 shadow-sm`}
                      aria-hidden
                    />

                    <p
                      className="font-display italic text-5xl md:text-6xl leading-none text-tinto-deep/70"
                      style={{ fontFamily: "var(--font-script)" }}
                      aria-hidden
                    >
                      0{i + 1}
                    </p>

                    <div>
                      <h3 className="font-display text-lg md:text-xl leading-tight mb-2 text-tinto-deep">
                        {item.titulo}
                      </h3>
                      <p className="text-tinto-deep/75 text-sm md:text-[15px] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
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
            Menos que dos<br />cafés a la semana.
          </h2>
          <p className="text-lg md:text-xl text-ivory/85 max-w-2xl mx-auto mb-12 leading-relaxed">
            The Glow Club vale <strong className="text-beige">menos que dos cafés de Starbucks
            a la semana.</strong> La diferencia es que un café dura 20 minutos y esto te
            acompaña <em>los 30 días del mes</em>.
          </p>

          {/* DOS PLANES: MENSUAL + ANUAL */}
          <div className="grid md:grid-cols-2 gap-6 my-8 max-w-4xl mx-auto">
            {/* PLAN MENSUAL */}
            <div className="border border-beige/30 p-8 flex flex-col">
              <p className="mono-label text-beige/80 mb-4" style={{ color: "rgba(214,199,174,0.8)" }}>
                MENSUAL
              </p>
              <div className="flex items-baseline gap-3 justify-center mb-2">
                <p className="font-display text-6xl md:text-7xl text-beige">$499</p>
              </div>
              <p className="mono-label text-ivory/70 mb-6">MXN / MES</p>
              <p className="text-ivory/60 italic text-sm mb-8">
                Cancela cuando quieras
              </p>
              <a
                href="https://buy.stripe.com/4gMfZidTq3fifrQ78v4wM0c"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-auto px-10 py-4 bg-ivory text-tinto-deep hover:bg-beige transition-colors mono-label text-sm"
                style={{ letterSpacing: "0.18em" }}
              >
                PAGAR MENSUAL
              </a>
            </div>

            {/* PLAN ANUAL — DESTACADO */}
            <div className="relative border-2 border-beige bg-tinto p-8 flex flex-col">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-beige text-tinto-deep text-xs uppercase tracking-widest">
                ⚜ AHORRA 25%
              </span>
              <p className="mono-label text-beige/90 mb-4" style={{ color: "rgba(214,199,174,0.9)" }}>
                ANUAL · MEJOR VALOR
              </p>
              <div className="flex items-baseline gap-3 justify-center mb-2">
                <p className="font-display text-3xl text-ivory/40 line-through decoration-ivory/60">
                  $5,988
                </p>
                <p className="font-display text-6xl md:text-7xl text-beige">$4,491</p>
              </div>
              <p className="mono-label text-ivory/70 mb-6">MXN / AÑO</p>
              <p className="text-beige italic text-sm mb-8">
                Equivale a $374/mes · Te ahorras $1,497
              </p>
              <a
                href="https://buy.stripe.com/9B69AUg1yg24cfEfF14wM0f"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-auto px-10 py-4 bg-beige text-tinto-deep hover:bg-ivory transition-colors mono-label text-sm"
                style={{ letterSpacing: "0.18em" }}
              >
                PAGAR AÑO COMPLETO
              </a>
            </div>
          </div>

          <p className="mt-8 text-xs text-ivory/50">
            Pagos seguros vía Stripe · Cancela cuando quieras
          </p>
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
