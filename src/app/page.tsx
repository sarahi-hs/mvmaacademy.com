import Link from "next/link";
import Image from "next/image";
import { STATS, BOOKS, SOCIALS, MARQUEE_TEXT } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";

const PILARES = [
  {
    titulo: "No prometo transformaciones milagrosas",
    desc: "No voy a decirte que en 30 días cambias tu vida. Voy a acompañarte en un proceso real, porque las únicas transformaciones que se sostienen son las que llevan tiempo.",
  },
  {
    titulo: "Trabajamos las 3 capas a la vez",
    desc: "Imagen + mentalidad + marca personal. Si solo trabajas una, las otras dos la sabotean. Por eso MVMA es integral, nunca especializado.",
  },
  {
    titulo: "Tu clóset no es el problema",
    desc: "El problema casi nunca es la ropa. Es la mujer que la elige sin permiso para vestirse como es. Primero trabajamos la decisión interna. Después el guardarropa.",
  },
  {
    titulo: "Tú eres tu proyecto más importante",
    desc: "Antes que tu negocio, antes que tu pareja. Cuando tú estás en tu mejor versión, todo lo demás florece a tu alrededor.",
  },
];

const POSTITS_COLORS = [
  { bg: "bg-beige-light", rotate: "rotate-[-2deg]" },
  { bg: "bg-rosita/50", rotate: "rotate-[1.5deg]" },
  { bg: "bg-ivory-warm", rotate: "rotate-[-1.5deg]" },
  { bg: "bg-beige/40", rotate: "rotate-[2deg]" },
];

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          HERO — Mobile: stack vertical · Desktop: foto background + texto overlay
          ============================================================ */}

      {/* MOBILE: estructura vertical (texto arriba, foto abajo) */}
      <section className="md:hidden bg-ivory">
        <div className="px-6 pt-12 pb-8">
          <Reveal>
            <p className="font-display text-lg text-tinto leading-tight mb-6">
              Tu próxima <span className="italic text-tinto-deep">versión</span> empieza contigo
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display text-[18vw] leading-[0.88] text-tinto-deep tracking-tight">
              SARAHI<br />
              <span className="italic font-light text-tinto">HARO</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mono-label text-tinto-deep/80 mt-6">
              ASESORA DE IMAGEN · COACH · SPEAKER · AUTORA
            </p>
          </Reveal>
        </div>
        {/* Foto full-width */}
        <Reveal delay={150}>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/sarahi/sarahi-hero-horizontal.jpg"
              alt="Sarahi Haro — Asesora de imagen y coach de marca personal"
              fill
              priority
              className="object-cover object-right"
              sizes="100vw"
            />
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="px-6 py-8 flex flex-col gap-3">
            <Link
              href="/comunidad"
              className="text-center px-6 py-4 bg-tinto text-ivory font-medium hover:bg-tinto-deep transition-colors mono-label text-xs"
              style={{ letterSpacing: "0.18em" }}
            >
              QUIERO SER PARTE DE TU COMUNIDAD
            </Link>
            <Link
              href="/mi-historia"
              className="text-center px-6 py-4 bg-ivory border border-tinto text-tinto hover:bg-tinto hover:text-ivory transition-colors mono-label text-xs"
              style={{ letterSpacing: "0.18em" }}
            >
              CONOCER A SARAHI
            </Link>
          </div>
        </Reveal>
      </section>

      {/* DESKTOP: foto background con texto overlay */}
      <section className="hidden md:block relative min-h-[90vh] overflow-hidden bg-ivory">
        <Image
          src="/images/sarahi/sarahi-hero-horizontal.jpg"
          alt="Sarahi Haro — Asesora de imagen y coach de marca personal"
          fill
          priority
          className="object-cover object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/70 via-ivory/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 min-h-[90vh] flex flex-col justify-between py-14">
          <Reveal>
            <p className="font-display text-2xl text-tinto leading-tight max-w-md">
              Tu próxima <span className="italic text-tinto-deep">versión</span> empieza contigo
            </p>
          </Reveal>

          <div>
            <Reveal delay={150}>
              <h1 className="font-display text-[14vw] lg:text-[12vw] xl:text-[11rem] leading-[0.85] text-tinto-deep tracking-tight">
                SARAHI <span className="italic font-light text-tinto">HARO</span>
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-12 max-w-lg">
                <p className="mono-label text-tinto-deep/80 mb-6">
                  ASESORA DE IMAGEN · COACH · SPEAKER · AUTORA
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/comunidad"
                    className="px-10 py-4 bg-tinto text-ivory font-medium hover:bg-tinto-deep transition-colors mono-label text-sm"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    QUIERO SER PARTE DE TU COMUNIDAD
                  </Link>
                  <Link
                    href="/mi-historia"
                    className="px-10 py-4 bg-ivory border border-tinto text-tinto hover:bg-tinto hover:text-ivory transition-colors mono-label text-sm"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    CONOCER A SARAHI
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          MARQUEE — Manifiesto declarativo
          ============================================================ */}
      <section className="bg-ivory py-12 border-y border-beige overflow-hidden">
        <Marquee text={MARQUEE_TEXT} />
      </section>

      {/* ============================================================
          PARA LAS MUJERES — Declaración estilo editorial
          ============================================================ */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display leading-[1.0] mb-10">
              <span className="block text-4xl md:text-7xl lg:text-8xl italic text-tinto" style={{ fontFamily: "var(--font-script)" }}>
                Para las mujeres
              </span>
              <span className="block text-4xl md:text-6xl text-tinto-deep mt-2 font-medium">
                que están construyendo
              </span>
              <span className="block text-4xl md:text-6xl text-tinto-deep font-medium">
                algo{" "}
                <span className="italic relative inline-block">
                  real.
                  <span className="absolute left-0 right-0 -bottom-1 h-1 bg-tinto" />
                </span>
              </span>
            </h2>
            <p className="text-lg md:text-xl text-tinto-deep/80 max-w-2xl mx-auto leading-relaxed">
              Las que se <strong className="text-tinto">eligieron a sí mismas</strong> aún cuando
              <em> no le hizo sentido a nadie más</em>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          MI HISTORIA + STATS POST-IT
          ============================================================ */}
      <section className="bg-ivory-warm/40 py-24 md:py-32 border-y border-beige">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          <Reveal className="md:col-span-5">
            <div className="polaroid relative max-w-[420px] mx-auto" style={{ transform: "rotate(-2deg)" }}>
              <div className="polaroid-tape" />
              <div className="aspect-[2/3] relative overflow-hidden bg-ivory-warm">
                <Image
                  src="/images/sarahi/sarahi-historia.jpg"
                  alt="Sarahi Haro — Mi historia"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>
              <p className="font-display italic text-center text-tinto-deep mt-4 text-base">
                Sarahi · 2026
              </p>
            </div>
          </Reveal>

          <Reveal delay={150} className="md:col-span-7">
            <p className="mono-label text-tinto mb-6">— MI HISTORIA EN 30 SEGUNDOS —</p>
            <h2 className="font-display text-4xl md:text-6xl text-tinto-deep leading-[1.0] mb-8">
              <span className="italic">Yo también</span><br />
              me sentí perdida.<br />
              <span className="italic text-tinto">Y encontré</span><br />
              el camino de regreso.
            </h2>
            <p className="text-tinto-deep/85 leading-relaxed text-lg mb-4">
              Soy <strong className="text-tinto">Sarahi Haro</strong>. Asesora de imagen certificada
              con máster en estilismo, producción y marketing de moda. Pero antes de los títulos,
              fui una mujer que se sintió perdida en versiones que ya no la representaban.
            </p>
            <p className="text-tinto-deep/85 leading-relaxed text-lg mb-10">
              De ese proceso de regreso a mí nació <strong className="text-tinto">MVMA</strong> —
              el método que hoy comparto con cientos de mujeres en México, Estados Unidos y mi comunidad digital.
            </p>

            <Link
              href="/mi-historia"
              className="inline-block mb-12 mono-label text-tinto hover:text-tinto-deep editorial-underline"
              style={{ letterSpacing: "0.2em" }}
            >
              LEE MI HISTORIA COMPLETA →
            </Link>

            {/* Stats como post-its */}
            <div className="pt-10 border-t border-beige">
              <p className="mono-label text-tinto mb-8">— EN NÚMEROS —</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-2 md:px-0">
                {STATS.map((s, i) => (
                  <Reveal key={s.label} delay={i * 80}>
                    <div className={`relative ${POSTITS_COLORS[i].bg} ${POSTITS_COLORS[i].rotate} p-5 shadow-[0_3px_12px_rgba(45,11,17,0.10)] hover:rotate-0 transition-all duration-500`}>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-tinto/20 border-l border-r border-dashed border-tinto/40" />
                      <div className="font-display text-4xl md:text-5xl text-tinto leading-none text-center">
                        {s.value}
                      </div>
                      <div className="mt-3 mono-label text-tinto-deep/70 text-[0.6rem] text-center leading-tight">
                        {s.label.toUpperCase()}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          SI LLEGASTE HASTA AQUÍ — Reescrito (mentalidad + imagen)
          ============================================================ */}
      <section className="bg-ivory py-28 md:py-36 relative overflow-hidden">
        <div aria-hidden className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04] overflow-hidden whitespace-nowrap">
          <p className="font-display italic text-[30vw] leading-none text-tinto">volver</p>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 md:gap-20 items-start">

          <Reveal className="md:col-span-7">
            <p className="font-display italic text-3xl md:text-4xl text-tinto-soft mb-8 leading-tight">
              Si llegaste hasta aquí,
            </p>

            <h2 className="font-display text-4xl md:text-6xl text-tinto-deep leading-[1.0] mb-12">
              sabes que esto no es<br />
              sobre verte <span className="italic text-tinto">distinta.</span><br />
              Es sobre <span className="italic text-tinto">sentirte</span> distinta.
            </h2>

            <div className="flex items-center gap-6 mb-12 max-w-md">
              <div className="flex-1 h-px bg-tinto/30" />
              <p className="mono-label text-tinto-soft">PORQUE TRABAJAMOS</p>
              <div className="flex-1 h-px bg-tinto/30" />
            </div>

            <div className="grid md:grid-cols-2 gap-10 mb-12">
              <div>
                <p className="mono-label text-tinto mb-3">LO QUE VES EN EL ESPEJO</p>
                <p className="text-tinto-deep/85 leading-relaxed">
                  Tu imagen exterior. Lo que la gente percibe antes de conocerte. Lo que comunica
                  algo de ti antes de que abras la boca. Tu paleta, tu silueta, tu estilo personal.
                </p>
              </div>
              <div>
                <p className="mono-label text-tinto mb-3">LO QUE ESCUCHAS POR DENTRO</p>
                <p className="text-tinto-deep/85 leading-relaxed">
                  Tu voz interna. Las creencias limitantes que te dicen <em>"esto no es para ti"</em>.
                  Las heridas que te frenan más años de los que querrías admitir. La identidad.
                </p>
              </div>
            </div>

            <p className="font-display italic text-2xl md:text-3xl text-tinto-deep leading-tight pt-6 border-t border-beige">
              Yo trabajo <span className="text-tinto">las dos cosas.</span><br />
              Porque ninguna funciona sin la otra.
            </p>
          </Reveal>

          <Reveal delay={300} className="md:col-span-5">
            <div className="polaroid relative max-w-[440px] mx-auto">
              <div className="polaroid-tape" />
              <div className="aspect-[3/4] relative overflow-hidden bg-ivory-warm">
                <Image
                  src="/images/sarahi/sarahi-about.jpg"
                  alt="Sarahi Haro"
                  fill
                  className="object-cover"
                  sizes="440px"
                />
              </div>
              <p className="font-display italic text-center text-tinto-deep mt-4 text-base">
                Sarahi · Guadalajara, MX · 2026
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          MARQUEE 2 — Aquí empieza tu transformación
          ============================================================ */}
      <section className="bg-tinto-deep py-12 overflow-hidden">
        <div className="overflow-hidden w-full">
          <div className="marquee-track">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-[18vw] md:text-[12vw] leading-[0.85] text-ivory whitespace-nowrap px-8"
              >
                AQUÍ EMPIEZA TU TRANSFORMACIÓN <span className="italic text-beige mx-4">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PILARES — Títulos en dorado/cursiva (contraste arreglado)
          ============================================================ */}
      <section className="bg-ivory-warm py-24 md:py-32 relative">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(45,11,17,0.3) 35px, rgba(45,11,17,0.3) 36px)`,
        }} aria-hidden />

        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="mono-label text-tinto mb-4">— EL MÉTODO MVMA —</p>
              <h2 className="font-display text-3xl md:text-5xl text-tinto-deep leading-[1.05]">
                Cuatro cosas <span className="italic text-tinto">que vas a vivir</span> trabajando conmigo.
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {PILARES.map((v, i) => (
              <Reveal key={v.titulo} delay={(i % 2) * 100}>
                <article className="bg-tinto text-ivory p-10 md:p-12 h-full">
                  <p className="font-display text-7xl italic text-beige mb-6 leading-none">0{i + 1}</p>
                  <h3
                    className="text-3xl md:text-4xl mb-6 leading-tight italic"
                    style={{ fontFamily: "var(--font-script)", color: "#D6C7AE" }}
                  >
                    {v.titulo}
                  </h3>
                  <p className="text-ivory leading-relaxed text-base md:text-lg">
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
          MI COMUNIDAD — Sin precio + bonus de inscripción
          ============================================================ */}
      <section className="bg-tinto text-ivory py-28 md:py-40">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-16 items-center">
          <Reveal className="md:col-span-2">
            <div className="aspect-[4/5] relative overflow-hidden bg-ivory">
              <Image
                src="/images/sarahi/sarahi-mvma.jpg"
                alt="Sarahi Haro — Mi Comunidad MVMA"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
              <div className="absolute inset-3 border border-beige/30 pointer-events-none" />
            </div>
          </Reveal>

          <Reveal delay={150} className="md:col-span-3">
            <p className="mono-label text-beige mb-6" style={{ color: "#D6C7AE" }}>
              — MI COMUNIDAD —
            </p>
            <h2
              className="text-4xl md:text-6xl mb-8 leading-[1.0] italic"
              style={{ fontFamily: "var(--font-script)", color: "#D6C7AE" }}
            >
              Seis meses.<br />
              Siete módulos.<br />
              Una comunidad real.
            </h2>
            <p className="text-ivory/90 leading-relaxed text-lg mb-8">
              Mi programa digital para mujeres que no quieren una sesión aislada — quieren un proceso
              completo. Clases quincenales en vivo, comunidad cerrada, y todo el método MVMA
              estructurado en 7 módulos de transformación.
            </p>

            {/* Bonus de inscripción */}
            <div className="bg-beige text-tinto-deep p-6 md:p-8 mb-8">
              <p className="mono-label text-tinto mb-2">⚡ REGALO DE ACCIÓN RÁPIDA</p>
              <p className="font-display text-xl md:text-2xl italic text-tinto-deep leading-tight">
                Si decides inscribirte hoy,<br />
                tengo un regalo exclusivo para ti.
              </p>
              <p className="text-sm text-tinto-deep/75 mt-3">
                Te lo cuento en la página de Mi Comunidad.
              </p>
            </div>

            <Link
              href="/comunidad"
              className="inline-block px-10 py-4 bg-ivory text-tinto-deep hover:bg-beige transition-colors mono-label"
              style={{ letterSpacing: "0.2em" }}
            >
              CONOCER MI COMUNIDAD
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
            <div className="aspect-[2/3] relative overflow-hidden max-w-sm mx-auto shadow-2xl">
              <Image
                src="/books/volver-a-mi.jpg"
                alt="Portada del libro 'Volver a mí y no irme nunca más' de Sarahi Haro"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </Reveal>

          <Reveal delay={200} className="order-1 md:order-2">
            <p className="mono-label text-tinto mb-6">— MI PRIMER LIBRO —</p>
            <h2 className="font-display text-4xl md:text-6xl text-tinto-deep mb-8 leading-[1.0]">
              <span className="italic">Volver a mí.</span><br />
              Y no irme nunca más.
            </h2>
            <p className="text-tinto-deep/85 leading-relaxed text-lg mb-4">
              Este libro nació porque yo también <em>me sentí perdida</em> en algún punto de mi vida.
              En sus páginas plasmo mi propio proceso de reconciliación personal —
              con mi cuerpo, con quién soy y con la mujer que decidí ser.
            </p>
            <p className="text-tinto-deep/85 leading-relaxed text-lg mb-8">
              No es teoría: es el camino que recorrí, y el que hoy acompaño en otras mujeres.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={BOOKS[0].amazonUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-tinto text-ivory hover:bg-tinto-deep transition-colors mono-label"
                style={{ letterSpacing: "0.2em" }}
              >
                COMPRAR EN AMAZON →
              </a>
              <Link
                href={`/libros/${BOOKS[0].slug}`}
                className="inline-block px-10 py-4 border border-tinto text-tinto hover:bg-tinto hover:text-ivory transition-colors mono-label"
                style={{ letterSpacing: "0.2em" }}
              >
                LEER MÁS
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          SOCIAL PROOF
          ============================================================ */}
      <section className="bg-ivory-warm/40 py-28 md:py-36 border-y border-beige">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <p className="mono-label text-tinto mb-6">— EN REDES —</p>
            <h2 className="font-display text-4xl md:text-7xl text-tinto-deep mb-4 leading-[0.95]">
              <span className="italic">400,000+</span> MUJERES
            </h2>
            <p className="font-display text-2xl md:text-3xl text-tinto italic mb-6">
              ya empezaron el camino.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
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
          CTA FINAL — Reescrito
          ============================================================ */}
      <section className="bg-tinto-deep text-ivory py-32 md:py-40">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <p className="mono-label text-beige mb-8 text-center" style={{ color: "#D6C7AE" }}>
              — UNA CONVERSACIÓN, GRATIS —
            </p>
            <h2 className="font-display text-4xl md:text-7xl text-ivory mb-10 leading-[0.95] text-center">
              ¿No estás segura<br />
              <span className="italic text-beige">si es para ti?</span>
            </h2>
            <p className="text-lg md:text-xl text-ivory/85 max-w-3xl mx-auto leading-relaxed text-center mb-12">
              Agenda una llamada gratis de 15 minutos. Mi equipo está listo para escucharte
              y honestamente decirte si esto es lo que estás buscando — o si lo que necesitas
              es algo distinto.
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
                * SIN COMPROMISO · SOLO UNA CONVERSACIÓN
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
