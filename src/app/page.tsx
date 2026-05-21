import Link from "next/link";
import Image from "next/image";
import { STATS, BOOKS, SOCIALS, HERO, MARQUEE_TEXT } from "@/lib/site";
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
    desc: "Antes que tu negocio, antes que tu pareja, antes que tu familia. Cuando tú estás en tu mejor versión, todo lo demás florece a tu alrededor.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          HERO — Pregunta poderosa + foto grande
          ============================================================ */}
      <section className="relative overflow-hidden bg-ivory min-h-[92vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-beige-light/40 via-ivory to-ivory-warm/60" aria-hidden />

        <div className="absolute top-8 right-12 hidden md:block mono-label text-tinto-soft">
          N° 01 / MMXXVI
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-12 gap-6 lg:gap-10 items-center w-full">

          {/* Texto */}
          <div className="md:col-span-6 lg:col-span-7 relative z-10">
            <p className="mono-label text-tinto mb-6 animate-fade-in">
              ← {HERO.eyebrow.toUpperCase()}
            </p>

            <h1 className="font-display text-[14vw] md:text-[7vw] lg:text-[6.5rem] xl:text-[7.5rem] leading-[0.88] text-tinto-deep animate-slide-up">
              ¿<span className="italic font-light text-tinto">Lista</span>
              <br />
              para ser
              <br />
              la <span className="italic text-tinto">mujer</span>
              <br />
              que ya sabes
              <br />
              que eres?
            </h1>

            <Reveal delay={300}>
              <div className="mt-10 max-w-xl">
                <p className="text-base md:text-lg text-tinto-deep/85 leading-relaxed">
                  {HERO.subheadline}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/comunidad"
                    className="px-10 py-4 bg-tinto text-ivory font-medium hover:bg-tinto-deep transition-colors mono-label"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    QUIERO SER PARTE DE TU COMUNIDAD
                  </Link>
                  <Link
                    href="/mi-historia"
                    className="px-10 py-4 border border-tinto text-tinto hover:bg-tinto hover:text-ivory transition-colors mono-label"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    CONOCER A SARAHI
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Foto principal grande con etiquetas */}
          <div className="md:col-span-6 lg:col-span-5 relative">
            <Reveal delay={200}>
              <div className="relative aspect-[4/5] overflow-hidden bg-ivory-warm">
                <Image
                  src="/images/sarahi/sarahi-hero.jpg"
                  alt="Sarahi Haro — Asesora de imagen y coach de marca personal"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-4 border border-tinto/15 pointer-events-none" />

                {/* Etiquetas con flechas */}
                <div className="hidden lg:flex absolute -left-32 top-16 items-end gap-2 max-w-[140px]">
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

                <div className="hidden lg:flex absolute -right-32 bottom-16 items-start gap-2 max-w-[140px]">
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

                <div className="hidden lg:block absolute -bottom-10 -left-20 max-w-[140px]">
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
          MARQUEE 1 — Manifiesto declarativo
          ============================================================ */}
      <section className="bg-ivory py-12 border-y border-beige overflow-hidden">
        <Marquee text={MARQUEE_TEXT} />
      </section>

      {/* ============================================================
          MI HISTORIA + STATS — Autoridad antes de vender
          ============================================================ */}
      <section className="bg-ivory-warm/40 py-24 md:py-32 border-b border-beige">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/sarahi/sarahi-historia.jpg"
                alt="Sarahi Haro — Mi historia"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-3 border border-tinto/20 pointer-events-none" />
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
              Soy <strong className="text-tinto">Sarahi Haro</strong>. Asesora de imagen certificada con
              máster en estilismo, producción y marketing de moda. Pero antes de los títulos,
              fui una mujer que se sintió perdida en versiones que ya no la representaban.
            </p>
            <p className="text-tinto-deep/85 leading-relaxed text-lg mb-8">
              De ese proceso de regreso a mí nació <strong className="text-tinto">MVMA</strong> —
              el método que hoy comparto con cientos de mujeres en México, Estados Unidos y mi comunidad digital.
            </p>

            {/* Stats inline */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-beige">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl md:text-5xl text-tinto leading-none">
                    {s.value}
                  </div>
                  <div className="mt-2 mono-label text-tinto-deep/60 text-[0.65rem]">
                    {s.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/mi-historia"
              className="inline-block mt-10 mono-label text-tinto hover:text-tinto-deep editorial-underline"
              style={{ letterSpacing: "0.2em" }}
            >
              LEE MI HISTORIA COMPLETA →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          ABOUT — "Si llegaste hasta aquí" rediseñado
          ============================================================ */}
      <section className="bg-ivory py-28 md:py-36 relative overflow-hidden">
        {/* Decoración tipográfica de fondo */}
        <div aria-hidden className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04] overflow-hidden whitespace-nowrap">
          <p className="font-display italic text-[30vw] leading-none text-tinto">volver</p>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 md:gap-20 items-start">

          {/* Lado izquierdo: cita editorial grande */}
          <Reveal className="md:col-span-7">
            <p className="font-display italic text-3xl md:text-4xl text-tinto-soft mb-8 leading-tight">
              Si llegaste hasta aquí,
            </p>

            <h2 className="font-display text-4xl md:text-6xl text-tinto-deep leading-[1.0] mb-12">
              es probable que sepas
              <br />
              exactamente <span className="italic text-tinto">quién eres</span>
              <br />
              por dentro.
            </h2>

            {/* Línea decorativa */}
            <div className="flex items-center gap-6 mb-12 max-w-md">
              <div className="flex-1 h-px bg-tinto/30" />
              <p className="mono-label text-tinto-soft">SOLO QUE</p>
              <div className="flex-1 h-px bg-tinto/30" />
            </div>

            <h3 className="font-display text-3xl md:text-5xl text-tinto-deep leading-[1.05] mb-12">
              no sabes cómo
              <br />
              mostrarlo <span className="italic text-tinto">por fuera.</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-beige">
              <div>
                <p className="mono-label text-tinto mb-3">LO QUE VEO TODOS LOS DÍAS</p>
                <p className="text-tinto-deep/80 leading-relaxed">
                  Mujeres brillantes, exitosas, queridas. Que sienten que su imagen no las
                  representa. Que se visten <em>"como deben"</em> pero no como son.
                </p>
              </div>
              <div>
                <p className="mono-label text-tinto mb-3">LO QUE HAGO CON ELLAS</p>
                <p className="text-tinto-deep/80 leading-relaxed">
                  Las acompaño a alinear quién son por dentro con quién muestran por fuera.
                  En un proceso real, sin atajos, sin fórmulas mágicas.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Lado derecho: Polaroid GRANDE */}
          <Reveal delay={300} className="md:col-span-5">
            <div className="polaroid relative max-w-[440px] mx-auto">
              <div className="polaroid-tape" />
              <div className="aspect-[3/4] relative overflow-hidden bg-ivory-warm">
                <Image
                  src="/images/sarahi/sarahi-about.jpg"
                  alt="Sarahi Haro — momento informal"
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
          PILARES — 4 cajas con buen contraste
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
                <article className="bg-tinto text-ivory p-10 md:p-12 h-full border-2 border-tinto">
                  <p className="font-display text-7xl italic text-beige mb-4 leading-none">0{i + 1}</p>
                  <h3 className="font-display text-2xl md:text-3xl text-ivory mb-5 leading-tight font-medium">
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
          MI COMUNIDAD (antes MVMA Tribe)
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
            <h2 className="font-display text-4xl md:text-6xl text-ivory mb-6 leading-[1.0]">
              <span className="italic">Seis meses.</span><br />
              Siete módulos.<br />
              <span className="italic text-beige">Una comunidad</span><br />
              de mujeres reales.
            </h2>
            <p className="text-ivory/85 leading-relaxed text-lg mb-6">
              Mi programa digital para mujeres que no quieren una sesión aislada — quieren
              un proceso completo. Clases quincenales en vivo, comunidad cerrada, y todo el método MVMA
              estructurado en 7 módulos de transformación.
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
              CONOCER MI COMUNIDAD
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          LIBRO — Historia REAL corregida + Amazon
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
            <p className="text-tinto-deep/70 max-w-2xl mx-auto mb-16">
              Los números importan menos que las historias detrás. Cada mujer que llega a MVMA
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
          CTA FINAL — Llamada gratis
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
              No es una venta. No es un <em>pitch</em>. Es una conversación honesta donde te digo
              si puedo acompañarte y cómo — o si necesitas algo distinto.
              Si después quieres trabajar juntas, te muestro cuál de mis servicios
              o mi comunidad es el indicado para tu momento.
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
