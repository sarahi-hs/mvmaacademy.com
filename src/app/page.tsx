import Link from "next/link";
import Image from "next/image";
import { STATS, BOOKS, SOCIALS, HERO } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";

/**
 * Cuatro pilares concretos de cómo trabaja Sarahi.
 * Reemplaza los "valores" abstractos por un posicionamiento por contraste.
 */
const ENFOQUE = [
  {
    titulo: "No vendo transformaciones milagrosas",
    desc: "No te voy a prometer que en 30 días cambiás tu vida. Te voy a acompañar en un proceso real — porque las únicas transformaciones que se sostienen son las que llevan tiempo.",
  },
  {
    titulo: "Trabajamos las 3 capas a la vez",
    desc: "Imagen + mentalidad + marca personal. Si solo arreglás una, las otras dos la sabotean. Por eso MVMA es integral, no especializado.",
  },
  {
    titulo: "Tu closet no es el problema",
    desc: "El problema casi nunca es la ropa. Es la mujer que la elige sin permiso para vestirse como es. Primero trabajamos la decisión interna. Después el guardarropa.",
  },
  {
    titulo: "No sos un proyecto. Sos una persona",
    desc: "Acá no hay 'antes y después' de Instagram. Hay procesos personales con tiempos únicos. Vos elegís cuándo, cómo y hasta dónde llevarlo.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          HERO — Mega tipográfico
          ============================================================ */}
      <section className="relative overflow-hidden bg-ivory min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-beige-light/40 via-ivory to-ivory-warm/60" aria-hidden />

        <div className="absolute top-8 right-12 hidden md:block mono-label text-tinto-soft">
          N° 01 / MMXXVI
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-24 grid md:grid-cols-12 gap-8 items-center w-full">

          <div className="md:col-span-7 relative z-10">
            <p className="mono-label text-tinto mb-8 animate-fade-in">
              ← SARAHI HARO STUDIO
            </p>

            <h1 className="font-display text-[18vw] md:text-[10vw] lg:text-[9rem] xl:text-[10rem] leading-[0.85] text-tinto-deep animate-slide-up">
              HOLA,
              <br />
              <span className="italic font-light text-tinto">SOY</span>{" "}
              <span className="text-tinto">SARAHI</span>
            </h1>

            <Reveal delay={300}>
              <div className="mt-12 max-w-xl">
                <p className="mono-label text-tinto-deep/80 mb-6">
                  ASESORA DE IMAGEN · COACH DE MARCA PERSONAL · SPEAKER INTERNACIONAL · AUTORA
                </p>
                <p className="text-xl md:text-2xl text-tinto-deep leading-[1.3] font-display italic">
                  {HERO.headline}
                </p>
                <p className="mt-6 text-tinto-deep/75 leading-relaxed">
                  Llevo 5 años acompañando a mujeres que se cansaron de esperar el momento perfecto
                  para verse como son. Trabajamos imagen, mentalidad y marca personal —
                  los tres a la vez, porque ninguno funciona sin los otros.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/contacto?tipo=Mentor%C3%ADa+%2F+Asesor%C3%ADa+1%3A1"
                    className="px-10 py-4 bg-tinto text-ivory font-medium hover:bg-tinto-deep transition-colors mono-label"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    AGENDAR LLAMADA GRATIS
                  </Link>
                  <Link
                    href="/servicios"
                    className="px-10 py-4 border border-tinto text-tinto hover:bg-tinto hover:text-ivory transition-colors mono-label"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    VER SERVICIOS
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Foto principal con etiquetas decorativas */}
          <div className="md:col-span-5 relative">
            <Reveal delay={200}>
              <div className="relative aspect-[3/4] bg-ivory-warm overflow-hidden">
                <Image
                  src="/images/sarahi/sarahi-hero.jpg"
                  alt="Sarahi Haro — Asesora de imagen y coach de marca personal"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-4 border border-tinto/10 pointer-events-none" />

                {/* Etiqueta 1: izquierda arriba */}
                <div className="hidden md:flex absolute -left-32 top-12 items-end gap-2 max-w-[140px]">
                  <div>
                    <p className="mono-label text-tinto-deep/80 text-right">
                      MÁSTER EN<br />ASESORÍA DE<br />IMAGEN
                    </p>
                  </div>
                  <svg width="60" height="60" viewBox="0 0 60 60" className="text-tinto-soft -mb-3" fill="none">
                    <path d="M5 10 Q 30 5, 55 50" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M50 45 L 55 50 L 50 55" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* Etiqueta 2: derecha abajo */}
                <div className="hidden md:flex absolute -right-32 bottom-12 items-start gap-2 max-w-[140px]">
                  <svg width="60" height="60" viewBox="0 0 60 60" className="text-tinto-soft -mt-3" fill="none">
                    <path d="M55 10 Q 30 5, 5 50" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 45 L 5 50 L 10 55" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <div>
                    <p className="mono-label text-tinto-deep/80">
                      400K+<br />MUJERES<br />EN REDES
                    </p>
                  </div>
                </div>

                {/* Etiqueta 3: abajo izquierda */}
                <div className="hidden lg:block absolute -bottom-8 -left-24 max-w-[140px]">
                  <p className="mono-label text-tinto-deep/80 text-center">
                    3× EN TV<br />SPEAKER MX + USA
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          MARQUEE 1 — Frase declarativa
          ============================================================ */}
      <section className="bg-ivory py-12 border-y border-beige overflow-hidden">
        <Marquee text="VOLVER A TI" />
      </section>

      {/* ============================================================
          STATS — Credibilidad
          ============================================================ */}
      <section className="bg-ivory-warm/40">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <p className="mono-label text-tinto text-center mb-12">— LO QUE HE CONSTRUIDO —</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="text-center">
                  <div className="font-display text-6xl md:text-7xl text-tinto leading-none">
                    {s.value}
                  </div>
                  <div className="mt-4 mono-label text-tinto-deep/60">
                    {s.label.toUpperCase()}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          ABOUT — Hablar a la mujer que llega
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="font-display italic text-2xl text-tinto-soft mb-4">Si llegaste hasta acá,</p>
            <h2 className="font-display text-3xl md:text-5xl text-tinto-deep leading-[1.05] tracking-tight">
              ES PROBABLE QUE SEPAS
              <br />
              EXACTAMENTE QUIÉN SOS<br />
              <span className="italic text-tinto">por dentro.</span>
              <br />
              SOLO QUE NO SABÉS<br />
              CÓMO MOSTRARLO <span className="italic">por fuera.</span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="space-y-6">
              <p className="mono-label text-tinto-deep/80 leading-loose">
                LO VEO TODOS LOS DÍAS: MUJERES BRILLANTES, EXITOSAS, QUERIDAS — QUE SIENTEN
                QUE SU IMAGEN NO LAS REPRESENTA. QUE SE VISTEN "COMO DEBEN" PERO NO COMO SON.
              </p>
              <p className="text-tinto-deep/85 leading-relaxed text-lg">
                Soy asesora de imagen certificada con un máster en estilismo, producción y marketing
                de moda. Pero más que eso: soy una mujer que pasó por su propio proceso de regreso
                a sí misma.
              </p>
              <p className="text-tinto-deep/85 leading-relaxed text-lg">
                Lo que aprendí en ese camino se convirtió en <strong className="text-tinto">MVMA</strong> —
                un método que integra imagen, marca personal y trabajo de mentalidad. Porque ninguno
                funciona si los otros dos te sabotean.
              </p>
              <Link
                href="/mi-historia"
                className="inline-block mt-4 mono-label text-tinto hover:text-tinto-deep editorial-underline pt-2"
                style={{ letterSpacing: "0.2em" }}
              >
                LEÉ MI HISTORIA →
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={400}>
          <div className="mt-20 flex justify-center md:justify-end">
            <div className="polaroid relative max-w-[280px]">
              <div className="polaroid-tape" />
              <div className="aspect-square relative overflow-hidden bg-ivory-warm">
                <Image
                  src="/images/sarahi/sarahi-about.jpg"
                  alt="Sarahi Haro — momento informal"
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
              <p className="font-display italic text-center text-tinto-deep mt-3 text-sm">Sarahi · 2026</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============================================================
          MARQUEE 2 — "Mi enfoque"
          ============================================================ */}
      <section className="bg-tinto-deep py-12 overflow-hidden">
        <div className="overflow-hidden w-full">
          <div className="marquee-track">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-[18vw] md:text-[12vw] leading-[0.85] text-ivory whitespace-nowrap px-8"
              >
                CÓMO TRABAJO <span className="italic text-beige mx-4">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          MI ENFOQUE — 4 pilares concretos
          ============================================================ */}
      <section className="bg-ivory-warm py-24 md:py-32 relative">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(45,11,17,0.3) 35px, rgba(45,11,17,0.3) 36px)`,
        }} aria-hidden />

        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="mono-label text-tinto mb-4">— LO QUE PODÉS ESPERAR DE TRABAJAR CONMIGO —</p>
              <h2 className="font-display text-3xl md:text-5xl text-tinto-deep leading-[1.05]">
                Cuatro cosas que <span className="italic text-tinto">no vas a encontrar</span> en cualquier otro lado.
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {ENFOQUE.map((v, i) => (
              <Reveal key={v.titulo} delay={(i % 2) * 100}>
                <article className="bg-tinto text-ivory p-10 md:p-12 h-full">
                  <p className="mono-label text-beige mb-4" style={{ color: "#D6C7AE" }}>0{i + 1}</p>
                  <h3 className="font-display text-2xl md:text-3xl text-ivory mb-5 leading-tight">
                    {v.titulo}
                  </h3>
                  <p className="text-ivory/85 leading-relaxed">
                    {v.desc}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SERVICIOS preview
          ============================================================ */}
      <section className="bg-ivory py-28 md:py-36">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <p className="mono-label text-tinto mb-8">— TRABAJEMOS 1:1 —</p>
            <h2 className="font-display text-4xl md:text-7xl text-tinto-deep mb-10 leading-[0.95]">
              CINCO FORMAS<br />
              <span className="italic text-tinto">de acompañarte.</span>
            </h2>
            <p className="text-lg md:text-xl text-tinto-deep/80 leading-relaxed max-w-2xl mx-auto mb-12">
              Desde una sesión de 40 minutos para descubrir tu paleta personal,
              hasta 4 meses de trabajo integral. Cada servicio responde a un momento distinto.
            </p>
            <Link
              href="/servicios"
              className="inline-block px-12 py-5 bg-tinto text-ivory hover:bg-tinto-deep transition-colors mono-label"
              style={{ letterSpacing: "0.2em" }}
            >
              VER LOS 5 SERVICIOS
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          MVMA TRIBE
          ============================================================ */}
      <section className="bg-tinto text-ivory py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-16 items-center">
          <Reveal className="md:col-span-2">
            <div className="aspect-[4/5] relative overflow-hidden bg-ivory">
              <Image
                src="/images/sarahi/sarahi-mvma.jpg"
                alt="Sarahi Haro — MVMA Tribe"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
              <div className="absolute inset-3 border border-beige/30 pointer-events-none" />
            </div>
          </Reveal>

          <Reveal delay={150} className="md:col-span-3">
            <p className="mono-label text-beige mb-6" style={{ color: "#D6C7AE" }}>
              — SI NECESITÁS UN PROCESO COMPLETO —
            </p>
            <h2 className="font-display text-4xl md:text-6xl text-ivory mb-6 leading-[1.0]">
              MVMA <span className="italic">Tribe.</span><br />
              <span className="italic text-beige">Seis meses</span><br />
              de trabajo real.
            </h2>
            <p className="text-ivory/85 leading-relaxed text-lg mb-6">
              Mi programa digital para mujeres que no quieren una sesión aislada — quieren
              un proceso completo. 7 módulos de transformación, clases quincenales en vivo,
              y una comunidad cerrada de mujeres haciendo el mismo trabajo que vos.
            </p>
            <div className="flex items-baseline gap-3 mb-8">
              <p className="font-display text-5xl text-beige">$5,997</p>
              <span className="mono-label text-beige/80" style={{ color: "rgba(214,199,174,0.8)" }}>MXN · 6 MESES</span>
            </div>
            <Link
              href="/comunidad"
              className="inline-block px-10 py-4 bg-ivory text-tinto-deep hover:bg-beige transition-colors mono-label"
              style={{ letterSpacing: "0.2em" }}
            >
              CONOCER MVMA TRIBE
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          LIBRO
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <Reveal className="order-2 md:order-1">
            <div className="aspect-[2/3] bg-gradient-to-br from-tinto-deep via-tinto to-tinto-soft flex items-center justify-center relative max-w-sm mx-auto">
              <div className="absolute inset-3 border border-beige/30" />
              <div className="text-center px-8 relative">
                <p className="font-display text-4xl text-ivory italic">Volver a mí</p>
                <div className="mt-3 mx-auto w-12 h-px bg-beige" />
                <p className="font-display text-xl text-beige mt-3">y no irme nunca más</p>
                <p className="mt-10 mono-label text-beige" style={{ color: "#E8DFCB" }}>SARAHI HARO</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} className="order-1 md:order-2">
            <p className="mono-label text-tinto mb-6">— MI PRIMER LIBRO —</p>
            <h2 className="font-display text-4xl md:text-6xl text-tinto-deep mb-8 leading-[1.0]">
              <span className="italic">Volver a mí.</span><br />
              Y no irme nunca más.
            </h2>
            <p className="text-tinto-deep/80 leading-relaxed text-lg mb-4">
              Nació de una frase que escribí en mi diario después de una sesión con una clienta.
              La frase: <em>"vuelvo a sentir que esto que tengo, ya no soy yo"</em>.
            </p>
            <p className="text-tinto-deep/80 leading-relaxed text-lg mb-8">
              Este libro es la respuesta que llevaba años intentando armar. Si te sentís perdida
              en alguna versión tuya que ya no te representa — empezá por acá.
            </p>
            <Link
              href={`/libros/${BOOKS[0].slug}`}
              className="inline-block px-10 py-4 border border-tinto text-tinto hover:bg-tinto hover:text-ivory transition-colors mono-label"
              style={{ letterSpacing: "0.2em" }}
            >
              CONOCER EL LIBRO →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          SOCIAL PROOF
          ============================================================ */}
      <section className="bg-ivory-warm/40 py-28 md:py-36 border-y border-beige">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <p className="mono-label text-tinto mb-6">— LA COMUNIDAD —</p>
            <h2 className="font-display text-4xl md:text-7xl text-tinto-deep mb-4 leading-[0.95]">
              <span className="italic">400,000+</span> MUJERES
            </h2>
            <p className="font-display text-2xl md:text-3xl text-tinto italic mb-6">
              ya empezaron el camino.
            </p>
            <p className="text-tinto-deep/70 max-w-2xl mx-auto mb-16">
              Pero los números importan menos que las historias detrás. Cada mujer que llega a MVMA
              llega con la misma sensación. Y se va con un mapa de regreso a sí misma.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {Object.values(SOCIALS).map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-10 border border-beige hover:border-tinto hover:bg-beige-light/30 transition-all group bg-ivory"
                >
                  <div className="font-display text-5xl text-tinto group-hover:text-tinto-deep">
                    {(s.followers / 1000).toFixed(0)}K
                  </div>
                  <div className="mt-3 mono-label text-tinto-deep/60">
                    {s.label.toUpperCase()}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA FINAL — Oferta específica, no genérica
          ============================================================ */}
      <section className="bg-tinto-deep text-ivory py-32 md:py-40">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <p className="mono-label text-beige mb-8 text-center" style={{ color: "#D6C7AE" }}>
              — TU PRIMERA LLAMADA, GRATIS —
            </p>
            <h2 className="font-display text-4xl md:text-7xl text-ivory mb-10 leading-[0.95] text-center">
              <span className="italic">15 minutos.</span><br />
              Tu situación. Mi mirada profesional.
            </h2>
            <p className="text-lg md:text-xl text-ivory/85 max-w-3xl mx-auto leading-relaxed text-center mb-12">
              No es una venta. No es un pitch. Es una conversación honesta donde te digo
              si puedo acompañarte y cómo — o si necesitás algo distinto.
              Si después querés trabajar juntas, te muestro cuál de mis servicios
              o programas es el indicado para tu momento.
            </p>
            <div className="text-center">
              <Link
                href="/contacto?tipo=Mentor%C3%ADa+%2F+Asesor%C3%ADa+1%3A1"
                className="inline-block px-14 py-5 bg-ivory text-tinto-deep hover:bg-beige transition-colors mono-label text-lg"
                style={{ letterSpacing: "0.2em" }}
              >
                AGENDAR MI LLAMADA
              </Link>
              <p className="mt-6 mono-label text-beige/60" style={{ color: "rgba(214,199,174,0.6)" }}>
                * SIN COMPROMISO · SIN VENTAS · SOLO UNA CONVERSACIÓN
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
