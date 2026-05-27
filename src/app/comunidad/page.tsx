import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "MVMA Academy — Mi Versión Más Auténtica | Programa digital de 6 meses",
  description:
    "MVMA Academy: programa digital de 6 meses de Sarahi Haro. 7 módulos de transformación, certificación oficial, comunidad de mujeres y clases en vivo. Aprende a vender con tu imagen y presencia.",
  alternates: { canonical: "/comunidad" },
};

const VIMEO_ID = "1196047853";

const MODULOS = [
  {
    n: "01",
    titulo: "El Despertar",
    bajada:
      "Reconoces a la mujer que fuiste, la que eres y la que estás destinada a ser. Todo cambio empieza por mirarte de frente.",
  },
  {
    n: "02",
    titulo: "Limpieza Interna",
    bajada:
      "Quien domina su mente, domina su vida. Rompes las creencias y juicios que te mantuvieron pequeña.",
  },
  {
    n: "03",
    titulo: "Esencia",
    bajada:
      "Descubres quién eres en realidad, debajo de las máscaras que el mundo te pidió usar.",
  },
  {
    n: "04",
    titulo: "Imagen con Propósito",
    bajada:
      "Tu imagen exterior se vuelve el reflejo honesto de tu interior. Vistes a la mujer en la que te estás convirtiendo.",
  },
  {
    n: "05",
    titulo: "Lenguaje No Verbal y Presencia",
    bajada:
      "Tu cuerpo habla antes que tú. Aprendes a comunicar seguridad y autoridad sin decir una palabra.",
  },
  {
    n: "06",
    titulo: "Proyección al Mundo",
    bajada:
      "Tu marca personal en acción: cómo mostrarte para vender, inspirar y abrir puertas siendo tú.",
  },
  {
    n: "07",
    titulo: "Integración y Renacimiento",
    bajada:
      "Sostienes tu transformación en el tiempo. Sales siendo otra — y esta vez, para siempre.",
  },
];

const PREGUNTAS_EMOCIONALES = [
  "¿Alguna vez has sentido que ya deberías estar más avanzada de lo que estás?",
  "¿Sientes que a otras mujeres les va bien mientras tú no logras avanzar?",
  "¿Sientes que tu entorno te frena y estás buscando uno que te impulse?",
];

const LOGROS = [
  "Entras a cualquier lugar y tu sola presencia comunica seguridad y autoridad.",
  "Dejas de dudar de ti y empiezas a tomar decisiones desde tu poder, no desde el miedo.",
  "Tu imagen y tu mensaje por fin coinciden con la mujer que eres por dentro.",
  "Aprendes a vender con tu presencia, sin sentir que te traicionas.",
  "Te rodeas de mujeres que te impulsan, en lugar de un entorno que te frena.",
  "Recibes tu Certificación MVMA: la prueba oficial de tu transformación.",
];

const SI_ES_PARA_TI = [
  "Sientes que perdiste contacto con quién eres en algún momento del camino",
  "Estás lista para hacer trabajo interno real, no solo táctica",
  "Quieres acompañamiento sostenido, no un curso aislado de 4 semanas",
  "Disfrutas crecer en comunidad con otras mujeres en un proceso similar",
  "Quieres trabajar imagen + marca personal + mentalidad de forma integrada",
];

const NO_ES_PARA_TI = [
  "Quieres seguir viviendo la misma vida y no quieres trabajar en ti",
  "Prefieres invertir tu dinero en comida, salidas y ropa, y no quieres estructura en tu vida",
  "No quieres comprometerte con tu crecimiento y prefieres quedarte en tu zona de confort",
];

const OBJECIONES = [
  {
    q: "Pero ahora mismo no tengo el dinero",
    a: "Te entiendo. Por eso puedes pagar a 12 meses sin intereses con tarjeta mexicana: menos de $500 al mes. Es lo que gastas en cafés o en una salida — pero esto te transforma para siempre.",
    color: "bg-beige-light",
    rotate: "rotate-[-2deg]",
  },
  {
    q: "No tengo tiempo",
    a: "El contenido lo ves a tu ritmo, cuando puedas, más 2 clases en vivo al mes. Diseñado para mujeres ocupadas que aún así eligen crecer. Si no haces espacio para ti ahora, ¿cuándo?",
    color: "bg-rosita/40",
    rotate: "rotate-[1.5deg]",
  },
  {
    q: "Ya he intentado otros cursos y no funcionaron",
    a: "Esto no es un curso. Es un proceso de 6 meses con acompañamiento real conmigo y una comunidad activa. No trabajamos solo la táctica: trabajamos a la mujer. La diferencia se siente desde el módulo 01.",
    color: "bg-ivory-warm",
    rotate: "rotate-[-1deg]",
  },
  {
    q: "¿Y si no es para mí?",
    a: "Si después de leer todo aún tienes dudas, escríbele a mi equipo antes de inscribirte. Te decimos con honestidad si MVMA es para ti — o si te conviene más otro de mis servicios.",
    color: "bg-beige/40",
    rotate: "rotate-[2deg]",
  },
];

function CourseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "MVMA Academy — Mi Versión Más Auténtica",
    description:
      "Programa digital de 6 meses con 7 módulos de transformación, certificación oficial, comunidad de mujeres y clases en vivo. Creado por Sarahi Haro.",
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
            { name: "MVMA Academy", url: `${SITE.url}/comunidad` },
          ]),
          CourseSchema(),
        ]}
      />

      {/* HERO — Título primero */}
      <section className="bg-ivory pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <p className="mono-label text-tinto mb-6">— MVMA ACADEMY —</p>
            <h1 className="font-display text-5xl md:text-8xl text-tinto-deep leading-[1.0] mb-6">
              <span className="italic font-light text-tinto">M</span>i{" "}
              <span className="italic">Versión</span><br />
              Más <span className="italic">Auténtica.</span>
            </h1>
            <p className="text-lg md:text-2xl text-tinto-deep/80 max-w-3xl mx-auto leading-relaxed">
              Conviértete en una mujer segura y exitosa, aprendiendo a vender con tu
              imagen y tu presencia por medio de mi programa digital con duración de{" "}
              <span className="text-tinto font-medium">6 meses.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* VIDEO VSL */}
      <section className="bg-ivory pb-24 md:pb-32 border-b border-beige">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="relative w-full overflow-hidden shadow-[0_20px_60px_rgba(45,11,17,0.25)] bg-tinto-deep" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                src={`https://player.vimeo.com/video/${VIMEO_ID}?title=0&byline=0&portrait=0`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="MVMA — Mi Versión Más Auténtica"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* DATO CIENTÍFICO — Autoridad */}
      <section className="bg-tinto-deep text-ivory py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <p className="mono-label mb-10 text-center" style={{ color: "#D6C7AE" }}>
              — NO LO DIGO YO —
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <Reveal>
              <div className="border border-beige/20 p-10 h-full">
                <p
                  className="font-display text-6xl md:text-7xl text-beige mb-4"
                  style={{ fontFamily: "var(--font-script)" }}
                >
                  0.1 seg
                </p>
                <p className="text-ivory/90 leading-relaxed mb-4">
                  Es todo lo que necesita una persona para decidir si confía en ti —
                  solo con verte, antes de que digas una sola palabra.
                </p>
                <p className="mono-label text-beige/70" style={{ color: "rgba(214,199,174,0.7)" }}>
                  — INVESTIGACIÓN DE HARVARD &amp; PRINCETON
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="border border-beige/20 p-10 h-full">
                <p
                  className="font-display text-6xl md:text-7xl text-beige mb-4"
                  style={{ fontFamily: "var(--font-script)" }}
                >
                  +12%
                </p>
                <p className="text-ivory/90 leading-relaxed mb-4">
                  Es lo que pueden ganar de más, a lo largo de su carrera, las personas
                  que aprenden a cuidar y proyectar su imagen profesional.
                </p>
                <p className="mono-label text-beige/70" style={{ color: "rgba(214,199,174,0.7)" }}>
                  — ESTUDIO "BEAUTY PAYS", D. HAMERMESH
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={250}>
            <p className="text-center font-display italic text-2xl md:text-3xl mt-16 max-w-3xl mx-auto" style={{ color: "#D6C7AE" }}>
              Tu imagen y tu presencia no son superficiales.<br />Son tu carta de presentación al mundo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PREGUNTAS EMOCIONALES */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="font-display text-3xl md:text-4xl text-tinto italic text-center mb-16">
              Déjame preguntarte algo...
            </p>
          </Reveal>
          <div className="space-y-8">
            {PREGUNTAS_EMOCIONALES.map((q, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="flex gap-5 items-start border-b border-beige pb-8">
                  <span className="font-display text-4xl italic text-tinto/40 leading-none">
                    0{i + 1}
                  </span>
                  <p className="font-display text-2xl md:text-3xl text-tinto-deep leading-snug">
                    {q}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <p className="text-center font-display text-3xl md:text-4xl text-tinto-deep mt-16 leading-snug">
              Si respondiste <span className="italic text-tinto">que sí</span> aunque sea a una...<br />
              <span className="italic text-tinto">MVMA es para ti.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* QUÉ INCLUYE — Los 7 módulos */}
      <section className="bg-ivory-warm/40 py-24 md:py-32 border-y border-beige">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="mono-label text-tinto mb-4">— QUÉ INCLUYE —</p>
              <h2 className="font-display text-4xl md:text-6xl text-tinto-deep leading-[1.05]">
                <span className="italic">Siete módulos</span><br />
                de transformación.
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {MODULOS.map((m, i) => (
              <Reveal key={m.n} delay={(i % 2) * 100}>
                <article className="group flex gap-6 p-8 bg-ivory border border-beige hover:border-tinto hover:bg-beige-light/30 transition-all h-full">
                  <div className="font-display text-6xl italic text-tinto/40 group-hover:text-tinto leading-none transition-colors">
                    {m.n}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-tinto-deep mb-2">{m.titulo}</h3>
                    <p className="text-tinto-deep/70 italic leading-relaxed">{m.bajada}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Certificación + extras */}
          <Reveal delay={200}>
            <div className="mt-8 bg-tinto text-ivory p-10 md:p-12 text-center">
              <p className="mono-label mb-4" style={{ color: "#D6C7AE" }}>
                ⚜ INCLUYE CERTIFICACIÓN OFICIAL
              </p>
              <h3
                className="font-display text-3xl md:text-4xl italic mb-4"
                style={{ color: "#D6C7AE" }}
              >
                Certificación MVMA
              </h3>
              <p className="text-ivory/90 max-w-2xl mx-auto leading-relaxed">
                Al completar tu proceso recibes un reconocimiento oficial de tu
                transformación en MVMA — la prueba tangible de la mujer en la que te
                convertiste.
              </p>
            </div>
          </Reveal>

          {/* Extras de la membresía */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Reveal>
              <div className="border border-beige bg-ivory p-8 h-full">
                <h3 className="font-display text-xl text-tinto-deep mb-2">Acceso por 6 meses</h3>
                <p className="text-tinto-deep/70 text-sm leading-relaxed">Todos los módulos disponibles 24/7 en tu portal personal.</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="border border-beige bg-ivory p-8 h-full">
                <h3 className="font-display text-xl text-tinto-deep mb-2">2 clases en vivo al mes</h3>
                <p className="text-tinto-deep/70 text-sm leading-relaxed">Una clase conmigo + una con una experta empresaria que ya logró lo que tú quieres.</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="border border-beige bg-ivory p-8 h-full">
                <h3 className="font-display text-xl text-tinto-deep mb-2">Comunidad de mujeres</h3>
                <p className="text-tinto-deep/70 text-sm leading-relaxed">Un espacio cerrado para compartir tu proceso, preguntar y crecer acompañada.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* QUÉ VAS A LOGRAR */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="mono-label text-tinto mb-4">— ¿QUÉ VAS A LOGRAR? —</p>
              <h2 className="font-display text-4xl md:text-6xl text-tinto-deep leading-[1.05]">
                La mujer en la que<br />
                <span className="italic text-tinto">te vas a convertir.</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {LOGROS.map((l, i) => (
              <Reveal key={i} delay={(i % 2) * 100}>
                <div className="flex gap-4 items-start">
                  <span className="font-display text-2xl text-tinto leading-none mt-1">✓</span>
                  <p className="text-lg text-tinto-deep/85 leading-relaxed">{l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMUNIDAD VIVA */}
      <section className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
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

      {/* ¿ES PARA TI? */}
      <section className="bg-ivory-warm/40 border-y border-beige py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
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
              <div className="bg-ivory border border-tinto/20 p-8 h-full">
                <p className="mono-label text-tinto mb-6">SÍ ES PARA TI SI...</p>
                <ul className="space-y-3 text-tinto-deep/85">
                  {SI_ES_PARA_TI.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-tinto mt-1">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="bg-ivory border border-beige p-8 h-full">
                <p className="mono-label text-tinto-soft mb-6">NO ES PARA TI SI...</p>
                <ul className="space-y-3 text-tinto-deep/70">
                  {NO_ES_PARA_TI.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-tinto-soft mt-1">×</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BONOS DE ACCIÓN RÁPIDA */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <p className="mono-label text-tinto mb-4">— SI TOMAS ACCIÓN HOY —</p>
              <h2 className="font-display text-3xl md:text-5xl text-tinto-deep leading-[1.05]">
                Tengo un <span className="italic text-tinto">regalo para ti.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-beige p-10 md:p-12 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-tinto text-ivory text-xs uppercase tracking-widest">
                ⚡ Bono de acción rápida
              </span>
              <div className="flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
                <div className="flex-1">
                  <h3 className="font-display text-2xl md:text-3xl text-tinto-deep italic mb-3">
                    Estudio de Color Básico de cortesía
                  </h3>
                  <p className="text-tinto-deep/80 leading-relaxed">
                    Por inscribirte hoy te incluyo un estudio de color básico para que
                    descubras tu paleta personal y empieces a vestir a tu favor desde el día uno.
                  </p>
                </div>
                <div className="text-center">
                  <p className="mono-label text-tinto/60 mb-1">VALOR</p>
                  <p className="font-display text-4xl text-tinto line-through decoration-tinto/40">$1,999</p>
                  <p className="font-display text-2xl text-tinto italic">Gratis</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRECIO + CTA FINAL */}
      <section id="inversion" className="bg-tinto-deep text-ivory py-32 md:py-40 scroll-mt-20">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p className="mono-label mb-6" style={{ color: "#D6C7AE" }}>— RECUERDA —</p>
          <h2
            className="text-4xl md:text-7xl mb-12 leading-[1.0] italic"
            style={{ fontFamily: "var(--font-script)", color: "#D6C7AE" }}
          >
            Tu negocio crece,<br />
            cuando tú creces.
          </h2>

          {/* Precio y opciones */}
          <div className="border-y border-beige/30 py-12 my-12">
            <p className="mono-label text-beige/80 mb-4" style={{ color: "rgba(214,199,174,0.8)" }}>
              INVERSIÓN ÚNICA · 6 MESES DE ACCESO + CERTIFICACIÓN
            </p>
            <div className="flex flex-wrap items-baseline gap-4 justify-center mb-3">
              <p className="font-display text-7xl md:text-8xl text-beige">$5,997</p>
              <span className="mono-label text-ivory/80">MXN</span>
            </div>
            <p className="text-ivory/70 italic">
              o paga a <strong className="text-beige">12 meses sin intereses</strong> con tarjeta mexicana
            </p>
          </div>

          <a
            href="https://buy.stripe.com/eVqcN66qY0367ZoakH4wM0a"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-14 py-5 bg-ivory text-tinto-deep hover:bg-beige transition-colors mono-label text-lg"
            style={{ letterSpacing: "0.2em" }}
          >
            COMPRAR AHORA
          </a>
          <div className="mt-6">
            <Link
              href="/contacto?tipo=MVMA+Tribe+%28comunidad%29"
              className="text-sm italic text-ivory/60 hover:text-beige underline-offset-4 hover:underline"
            >
              ¿Tienes preguntas antes de comprar? Escríbeme
            </Link>
          </div>
          <p className="mt-8 mono-label text-ivory/50">
            * PLAZAS LIMITADAS PARA GARANTIZAR ACOMPAÑAMIENTO PERSONALIZADO
          </p>
        </Reveal>
      </section>

      {/* OBJECIONES — Post-its */}
      <section className="bg-ivory py-24 md:py-32 relative">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto px-6 mb-16">
            <p className="mono-label text-tinto mb-4">— SÉ LO QUE ESTÁS PENSANDO —</p>
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-tinto/20 border-l border-r border-dashed border-tinto/40" />
                <p className="mono-label text-tinto mb-4">PREGUNTA 0{i + 1}</p>
                <h3 className="font-display text-2xl md:text-3xl text-tinto-deep italic mb-4 leading-tight">
                  "{o.q}"
                </h3>
                <p className="text-tinto-deep/85 leading-relaxed">{o.a}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* CTA final tras objeciones */}
        <Reveal delay={200}>
          <div className="text-center mt-12">
            <a
              href="#inversion"
              className="inline-block px-12 py-5 bg-tinto text-ivory hover:bg-tinto-deep transition-colors mono-label text-base"
              style={{ letterSpacing: "0.2em" }}
            >
              ESTOY LISTA, QUIERO ENTRAR
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
