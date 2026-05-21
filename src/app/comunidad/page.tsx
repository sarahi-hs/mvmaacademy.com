import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Mi Comunidad — MVMA: programa digital de 6 meses",
  description:
    "Mi Comunidad MVMA: 7 módulos de transformación, 2 clases quincenales en vivo, comunidad de mujeres y acceso a eventos. Programa digital de Sarahi Haro por 6 meses.",
  alternates: { canonical: "/comunidad" },
};

const MODULOS = [
  { n: "01", titulo: "El Despertar", bajada: "Reconociendo a la mujer que soy." },
  { n: "02", titulo: "Limpieza Interna", bajada: "Rompiendo creencias y juicios." },
  { n: "03", titulo: "Esencia", bajada: "Descubriendo quién soy en realidad." },
  { n: "04", titulo: "Imagen con Propósito", bajada: "Tu imagen exterior como reflejo de tu interior." },
  { n: "05", titulo: "Lenguaje No Verbal y Presencia", bajada: "Cómo te muestras antes de hablar." },
  { n: "06", titulo: "Proyección al Mundo", bajada: "Tu marca personal en acción." },
  { n: "07", titulo: "Integración y Renacimiento", bajada: "Sostener tu transformación en el tiempo." },
];

const INCLUYE = [
  {
    titulo: "Acceso a la plataforma por 6 meses",
    desc: "Todos los módulos disponibles 24/7 en tu portal personal.",
  },
  {
    titulo: "2 clases quincenales en vivo",
    desc: "Una clase conmigo + una clase con una experta empresaria que ya logró lo que tú quieres.",
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
    desc: "Acceso a workshops y encuentros exclusivos para miembros de Mi Comunidad.",
  },
  {
    titulo: "BONUS: Estudio de Color Básico de cortesía",
    desc: "Por acción rápida en tu inscripción te incluyo un estudio de color básico (valor $1,999 MXN).",
    bonus: true,
  },
];

const OBJECIONES = [
  {
    q: "Pero ahora mismo no tengo el dinero",
    a: "Te entiendo. Por eso te ofrezco pagar en mensualidades: 6 pagos de $999 MXN. Menos que tu Netflix + Spotify + un café al día. Es una inversión que recuperás en autoestima.",
    color: "bg-beige-light",
    rotate: "rotate-[-2deg]",
  },
  {
    q: "No tengo tiempo",
    a: "Solo 2 clases al mes en vivo (1 hora cada una). El resto del contenido lo ves a tu ritmo, cuando puedas. Diseñado para mujeres ocupadas que aún así eligen crecer.",
    color: "bg-rosita/40",
    rotate: "rotate-[1.5deg]",
  },
  {
    q: "Ya he intentado otros cursos y no funcionaron",
    a: "Esto no es un curso. Es un proceso de 6 meses con acompañamiento real conmigo y comunidad activa. La diferencia se siente desde el módulo 01.",
    color: "bg-ivory-warm",
    rotate: "rotate-[-1deg]",
  },
  {
    q: "¿Y si no es para mí?",
    a: "Antes de inscribirte puedes agendar una llamada gratuita de 15 minutos. Te digo con honestidad si Mi Comunidad es para ti — o si te conviene otro de mis servicios.",
    color: "bg-beige/40",
    rotate: "rotate-[2deg]",
  },
];

function CourseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Mi Comunidad MVMA — Programa Digital de Transformación",
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
  };
}

export default function ComunidadPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", url: SITE.url },
            { name: "Mi Comunidad", url: `${SITE.url}/comunidad` },
          ]),
          CourseSchema(),
        ]}
      />

      {/* HERO sin precio */}
      <section className="bg-ivory py-24 md:py-32 border-b border-beige">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <p className="mono-label text-tinto mb-6">— MI COMUNIDAD —</p>
            <h1 className="font-display text-5xl md:text-8xl text-tinto-deep leading-[1.0] mb-8">
              <span className="italic font-light text-tinto">M</span>VMA{" "}
              <span className="italic">Academy.</span>
            </h1>
            <p className="font-display text-2xl md:text-4xl text-tinto-soft italic mb-10">
              Mi Versión Más Auténtica.
            </p>
            <p className="text-lg md:text-xl text-tinto-deep/80 max-w-2xl mx-auto leading-relaxed">
              Mi programa digital de 6 meses para mujeres que están listas para hacer el trabajo
              interno y reflejar afuera quiénes son por dentro.
            </p>
          </Reveal>
        </div>
      </section>

      {/* QUÉ INCLUYE — Primero, antes que el precio */}
      <section className="bg-tinto text-ivory py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="mono-label text-beige mb-4" style={{ color: "#D6C7AE" }}>
                — TODO LO QUE INCLUYE TU MEMBRESÍA —
              </p>
              <h2 className="font-display text-4xl md:text-6xl text-ivory leading-[1.05]">
                <span className="italic">Todo</span> lo que necesitas<br />
                para tu proceso.
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {INCLUYE.map((item, i) => (
              <Reveal key={item.titulo} delay={(i % 2) * 100}>
                <div className={`p-8 ${item.bonus ? "bg-beige text-tinto-deep border-2 border-beige" : "border border-beige/30"}`}>
                  {item.bonus && (
                    <p className="mono-label mb-3 text-tinto">⚡ BONUS DE ACCIÓN RÁPIDA</p>
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

      {/* COMUNIDAD VIVA — Fotos de brunch/encuentros */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="mono-label text-tinto mb-4">— LA COMUNIDAD QUE TE ESPERA —</p>
            <h2 className="font-display text-3xl md:text-5xl text-tinto-deep leading-[1.05]">
              No es un curso solitario.<br />
              Es una <span className="italic text-tinto">tribu de mujeres reales.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-center">
          <Reveal className="md:col-span-7">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/sarahi/comunidad-brunch-1.jpg"
                alt="Sarahi Haro con su comunidad en encuentro presencial"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
              <div className="absolute inset-3 border border-tinto/10 pointer-events-none" />
            </div>
          </Reveal>

          <Reveal delay={150} className="md:col-span-5 space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/sarahi/comunidad-brunch-2.jpg"
                alt="Comunidad MVMA brindando en encuentro"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <p className="font-display italic text-2xl md:text-3xl text-tinto-deep leading-tight">
              "Mujeres que llegan buscando lo mismo. Y se quedan porque encuentran algo más."
            </p>
            <p className="mono-label text-tinto-soft">— SARAHI</p>
          </Reveal>
        </div>
      </section>

      {/* MÓDULOS — Los 7 */}
      <section className="bg-ivory-warm/40 py-24 md:py-32 border-y border-beige">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="mono-label text-tinto mb-4">— EL PROGRAMA —</p>
              <h2 className="font-display text-4xl md:text-6xl text-tinto-deep leading-[1.05]">
                <span className="italic">Siete módulos</span><br />
                de transformación.
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {MODULOS.map((m, i) => (
              <Reveal key={m.n} delay={(i % 2) * 100}>
                <article className="group flex gap-6 p-8 bg-ivory border border-beige hover:border-tinto hover:bg-beige-light/30 transition-all">
                  <div className="font-display text-6xl italic text-tinto/40 group-hover:text-tinto leading-none transition-colors">
                    {m.n}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-tinto-deep mb-2">{m.titulo}</h3>
                    <p className="text-tinto-deep/70 italic">{m.bajada}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OBJECIONES — Post-its */}
      <section className="bg-ivory py-24 md:py-32 relative">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto px-6 mb-16">
            <p className="mono-label text-tinto mb-4">— LO QUE PROBABLEMENTE ESTÁS PENSANDO —</p>
            <h2 className="font-display text-3xl md:text-5xl text-tinto-deep leading-[1.05]">
              Sé lo que <span className="italic text-tinto">estás dudando.</span><br />
              Te respondo desde ya.
            </h2>
          </div>
        </Reveal>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-12 py-8">
          {OBJECIONES.map((o, i) => (
            <Reveal key={o.q} delay={(i % 2) * 100}>
              <article
                className={`relative ${o.color} ${o.rotate} p-8 md:p-10 shadow-[0_4px_20px_rgba(45,11,17,0.10)] hover:rotate-0 hover:scale-[1.02] transition-all duration-500`}
              >
                {/* Cinta adhesiva decorativa */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-tinto/20 border-l border-r border-dashed border-tinto/40" />
                <p className="mono-label text-tinto mb-4">PREGUNTA 0{i + 1}</p>
                <h3 className="font-display text-2xl md:text-3xl text-tinto-deep italic mb-4 leading-tight">
                  "{o.q}"
                </h3>
                <p className="text-tinto-deep/85 leading-relaxed">
                  {o.a}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PARA QUIÉN ES — Español mexicano corregido */}
      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="text-center mb-12">
            <p className="mono-label text-tinto mb-4">— ¿ES PARA TI? —</p>
            <h2 className="font-display text-3xl md:text-5xl text-tinto-deep leading-[1.05]">
              Te ahorro el clic <span className="italic text-tinto">de inscribirte</span> si no es lo tuyo.
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10">
          <Reveal>
            <div>
              <p className="mono-label text-tinto mb-4">SÍ ES PARA TI SI...</p>
              <ul className="space-y-3 text-tinto-deep/85">
                <li className="flex gap-3"><span className="text-tinto mt-1">✓</span> Sientes que perdiste contacto con quién eres en algún momento del camino</li>
                <li className="flex gap-3"><span className="text-tinto mt-1">✓</span> Estás lista para hacer trabajo interno real (no solo táctica)</li>
                <li className="flex gap-3"><span className="text-tinto mt-1">✓</span> Quieres acompañamiento sostenido (no un curso aislado de 4 semanas)</li>
                <li className="flex gap-3"><span className="text-tinto mt-1">✓</span> Disfrutas aprender en comunidad con otras mujeres en proceso similar</li>
                <li className="flex gap-3"><span className="text-tinto mt-1">✓</span> Quieres trabajar imagen + marca personal + mentalidad integrados</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div>
              <p className="mono-label text-tinto-soft mb-4">NO ES PARA TI SI...</p>
              <ul className="space-y-3 text-tinto-deep/70">
                <li className="flex gap-3"><span className="text-tinto-soft mt-1">×</span> Quieres un curso express de 4 semanas con resultados garantizados</li>
                <li className="flex gap-3"><span className="text-tinto-soft mt-1">×</span> Buscas solo asesoría de imagen sin trabajo de mentalidad</li>
                <li className="flex gap-3"><span className="text-tinto-soft mt-1">×</span> No tienes tiempo para clases quincenales en vivo</li>
                <li className="flex gap-3"><span className="text-tinto-soft mt-1">×</span> Prefieres trabajar 1:1 sin componente de comunidad (mira mis servicios personalizados)</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRECIO + CTA FINAL */}
      <section className="bg-tinto-deep text-ivory py-32 md:py-40">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p className="mono-label text-beige mb-6" style={{ color: "#D6C7AE" }}>— TU DECIDES —</p>
          <h2 className="font-display text-4xl md:text-6xl text-ivory mb-12 leading-[1.05]">
            <span className="italic">Tú decides hasta cuándo</span><br />
            dejar de posponer<br />
            <span className="italic text-beige">tu crecimiento.</span>
          </h2>

          {/* Precio y opciones */}
          <div className="border-y border-beige/30 py-12 my-12">
            <p className="mono-label text-beige/80 mb-4" style={{ color: "rgba(214,199,174,0.8)" }}>
              INVERSIÓN ÚNICA · 6 MESES DE ACCESO
            </p>
            <div className="flex flex-wrap items-baseline gap-4 justify-center mb-3">
              <p className="font-display text-7xl md:text-8xl text-beige">$5,997</p>
              <span className="mono-label text-ivory/80">MXN</span>
            </div>
            <p className="text-ivory/70 italic">
              o 6 pagos de <strong className="text-beige">$999 MXN</strong> al mes
            </p>
          </div>

          <Link
            href="/contacto?tipo=MVMA+Tribe+%28comunidad%29"
            className="inline-block px-14 py-5 bg-ivory text-tinto-deep hover:bg-beige transition-colors mono-label text-lg"
            style={{ letterSpacing: "0.2em" }}
          >
            ESTOY LISTA PARA INVERTIR EN MÍ
          </Link>
          <p className="mt-8 mono-label text-ivory/50">
            * PLAZAS LIMITADAS PARA GARANTIZAR ACOMPAÑAMIENTO PERSONALIZADO
          </p>
        </Reveal>
      </section>
    </>
  );
}
