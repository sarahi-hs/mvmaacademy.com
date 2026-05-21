import Link from "next/link";
import { PERSON, STATS, BOOKS, SOCIALS, HERO } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";

const VALORES = [
  {
    titulo: "Autenticidad",
    desc: "Tu marca personal no se construye performando. Se construye revelando quién sos cuando nadie te mira.",
  },
  {
    titulo: "Proceso",
    desc: "No vendo atajos ni fórmulas de 30 días. Vendo procesos sostenibles que se quedan con vos para siempre.",
  },
  {
    titulo: "Imagen Estratégica",
    desc: "Tu imagen exterior es un vehículo de tu identidad, no un disfraz. Comunica antes de que abras la boca.",
  },
  {
    titulo: "Comunidad",
    desc: "Las mujeres crecemos en red. Por eso MVMA Tribe no es un curso — es un círculo que sostiene.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          HERO — Mega tipográfico estilo editorial
          ============================================================ */}
      <section className="relative overflow-hidden bg-ivory min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-beige-light/40 via-ivory to-ivory-warm/60" aria-hidden />

        {/* Decoración top */}
        <div className="absolute top-8 right-12 hidden md:block mono-label text-tinto-soft">
          N° 01 / MMXXVI
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-24 grid md:grid-cols-12 gap-8 items-center w-full">

          {/* Columna izquierda — Texto mega */}
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
                <p className="text-lg text-tinto-deep/85 leading-relaxed italic font-display">
                  {HERO.headline}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/servicios"
                    className="px-10 py-4 bg-tinto text-ivory font-medium hover:bg-tinto-deep transition-colors mono-label"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    TRABAJÁ CONMIGO
                  </Link>
                  <Link
                    href="/comunidad"
                    className="px-10 py-4 border border-tinto text-tinto hover:bg-tinto hover:text-ivory transition-colors mono-label"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    MVMA TRIBE
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Columna derecha — Foto principal con decoraciones */}
          <div className="md:col-span-5 relative">
            <Reveal delay={200}>
              <div className="relative aspect-[3/4] bg-gradient-to-br from-beige via-beige-light to-rosita/50 flex items-center justify-center">
                <div className="absolute inset-4 border border-tinto/20" />
                {/* TODO: reemplazar con foto profesional de Sarahi */}
                <div className="text-center px-6">
                  <p className="font-display text-3xl italic text-tinto-deep/40">Tu foto aquí</p>
                  <p className="mono-label text-tinto-deep/30 mt-3">FORMATO RECOMENDADO 3:4 · ALTA RES</p>
                </div>

                {/* Etiqueta decorativa con flecha — tipo Tiara */}
                <div className="hidden md:flex absolute -left-32 top-12 items-end gap-2 max-w-[140px]">
                  <div>
                    <p className="mono-label text-tinto-deep/80 text-right">
                      ASESORA DE<br />IMAGEN<br />CERTIFICADA
                    </p>
                  </div>
                  <svg width="60" height="60" viewBox="0 0 60 60" className="text-tinto-soft -mb-3" fill="none">
                    <path d="M5 10 Q 30 5, 55 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M50 45 L 55 50 L 50 55" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>

                <div className="hidden md:flex absolute -right-32 bottom-12 items-start gap-2 max-w-[140px]">
                  <svg width="60" height="60" viewBox="0 0 60 60" className="text-tinto-soft -mt-3" fill="none">
                    <path d="M55 10 Q 30 5, 5 50" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M10 45 L 5 50 L 10 55" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                  <div>
                    <p className="mono-label text-tinto-deep/80">
                      400K+<br />MUJERES EN<br />REDES
                    </p>
                  </div>
                </div>

                {/* Etiqueta 3 abajo izquierda */}
                <div className="hidden lg:block absolute -bottom-8 -left-24 max-w-[140px]">
                  <p className="mono-label text-tinto-deep/80 text-center">
                    SPEAKER MX + USA<br />3× EN TV
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          MARQUEE — Mensaje declarativo estilo Tiara
          ============================================================ */}
      <section className="bg-ivory py-12 border-y border-beige overflow-hidden">
        <Marquee text="TU AUTENTICIDAD" />
      </section>

      {/* ============================================================
          STATS — Editorial números
          ============================================================ */}
      <section className="bg-ivory-warm/40">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <p className="mono-label text-tinto text-center mb-12">— EN NÚMEROS —</p>
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
          ABOUT — Editorial 2 columnas + polaroid + texto monospace
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="font-display italic text-2xl text-tinto-soft mb-4">Hola, soy Sarahi</p>
            <h2 className="font-display text-3xl md:text-5xl text-tinto-deep leading-[1.05] tracking-tight">
              ASESORA DE IMAGEN,<br />
              COACH DE MARCA PERSONAL,<br />
              <span className="italic text-tinto">Y TU CÓMPLICE</span><br />
              EN ESTE CAMINO.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="space-y-6">
              <p className="mono-label text-tinto-deep/80 leading-loose">
                RECUERDO EL MOMENTO EN QUE DECIDÍ DEJAR DE ESCONDERME DETRÁS DE LAS VERSIONES DE MÍ QUE YA NO ME REPRESENTABAN. ESA DECISIÓN ES LO QUE COMPARTO CONTIGO HOY.
              </p>
              <p className="text-tinto-deep/85 leading-relaxed">
                Acompaño a mujeres a construir su versión más auténtica desde adentro hacia afuera.
                A través de mis servicios 1:1, mi programa MVMA Tribe, conferencias y mi libro,
                trabajamos imagen, mentalidad y marca personal como un sistema integrado.
              </p>
              <p className="text-tinto-deep/85 leading-relaxed">
                Si sentís que tu imagen exterior no refleja a la mujer que sos por dentro, este es tu lugar.
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

        {/* Polaroid decoration */}
        <Reveal delay={400}>
          <div className="mt-20 flex justify-center md:justify-end">
            <div className="polaroid relative max-w-[280px]">
              <div className="polaroid-tape" />
              <div className="aspect-square bg-gradient-to-br from-tinto via-tinto-soft to-beige-light flex items-center justify-center">
                <p className="font-display italic text-ivory/60 text-sm">Foto en proceso</p>
              </div>
              <p className="font-display italic text-center text-tinto-deep mt-3 text-sm">Sarahi · 2026</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============================================================
          VALUES MARQUEE
          ============================================================ */}
      <section className="bg-tinto-deep py-12 overflow-hidden">
        <div className="overflow-hidden w-full">
          <div className="marquee-track">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-[18vw] md:text-[12vw] leading-[0.85] text-ivory whitespace-nowrap px-8"
              >
                MIS VALORES <span className="italic text-beige mx-4">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          VALORES — Grid 4 cards tinto
          ============================================================ */}
      <section className="bg-ivory-warm py-24 md:py-32 relative">
        {/* Textura sutil de fondo */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(45,11,17,0.3) 35px, rgba(45,11,17,0.3) 36px)`,
        }} aria-hidden />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {VALORES.map((v, i) => (
              <Reveal key={v.titulo} delay={(i % 2) * 100}>
                <article className="bg-tinto text-ivory p-10 md:p-12 h-full">
                  <p className="mono-label text-beige mb-4" style={{ color: "#D6C7AE" }}>0{i + 1}</p>
                  <h3 className="font-display text-3xl md:text-4xl text-ivory mb-6 uppercase tracking-tight">
                    {v.titulo}
                  </h3>
                  <p className="mono-label text-ivory/85 leading-loose">
                    {v.desc.toUpperCase()}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SERVICIOS — preview con CTA
          ============================================================ */}
      <section className="bg-ivory py-28 md:py-36">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <p className="mono-label text-tinto mb-8">— SERVICIOS PERSONALIZADOS —</p>
            <h2 className="font-display text-4xl md:text-7xl text-tinto-deep mb-10 leading-[0.95]">
              CINCO CAMINOS<br />
              <span className="italic text-tinto">para volver a ti.</span>
            </h2>
            <p className="text-lg md:text-xl text-tinto-deep/80 leading-relaxed max-w-2xl mx-auto mb-12">
              Desde el estudio de color básico hasta mentoría 1:1 integral.
              Cada servicio diseñado para una etapa distinta de tu proceso.
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
            <div className="aspect-[4/5] bg-gradient-to-br from-tinto-deep to-tinto-soft border border-beige/20 flex items-center justify-center">
              <div className="text-center px-8">
                <p className="font-display text-5xl text-ivory italic">MVMA</p>
                <p className="font-display text-2xl text-beige mt-2">Tribe</p>
                <div className="mt-6 mx-auto w-16 h-px bg-beige" />
                <p className="mt-6 mono-label text-beige/80" style={{ color: "rgba(214,199,174,0.8)" }}>
                  COMUNIDAD · 6 MESES
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="md:col-span-3">
            <p className="mono-label text-beige mb-6" style={{ color: "#D6C7AE" }}>
              — MI COMUNIDAD —
            </p>
            <h2 className="font-display text-4xl md:text-6xl text-ivory mb-6 leading-[1.0]">
              MVMA <span className="italic">Tribe.</span><br />
              <span className="italic text-beige">Mi versión</span><br />
              más auténtica.
            </h2>
            <p className="text-ivory/85 leading-relaxed text-lg mb-6">
              Mi programa digital de 6 meses con 7 módulos de transformación,
              clases quincenales en vivo y una comunidad cerrada de mujeres en proceso.
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
              QUIERO UNIRME
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
            <p className="mono-label text-tinto mb-6">— EL LIBRO —</p>
            <h2 className="font-display text-4xl md:text-6xl text-tinto-deep mb-8 leading-[1.0]">
              <span className="italic">Volver a mí.</span><br />
              Y no irme nunca más.
            </h2>
            <p className="text-tinto-deep/80 leading-relaxed text-lg mb-8">
              {BOOKS[0].descriptionEs}
            </p>
            <Link
              href={`/libros/${BOOKS[0].slug}`}
              className="inline-block px-10 py-4 border border-tinto text-tinto hover:bg-tinto hover:text-ivory transition-colors mono-label"
              style={{ letterSpacing: "0.2em" }}
            >
              MÁS SOBRE EL LIBRO →
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
            <p className="mono-label text-tinto mb-6">— COMUNIDAD —</p>
            <h2 className="font-display text-4xl md:text-7xl text-tinto-deep mb-4 leading-[0.95]">
              <span className="italic">400,000+</span> MUJERES
            </h2>
            <p className="font-display text-2xl md:text-3xl text-tinto italic mb-16">
              que ya empezaron el camino.
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
          CTA FINAL
          ============================================================ */}
      <section className="bg-tinto-deep text-ivory py-32 md:py-40">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p className="mono-label text-beige mb-8" style={{ color: "#D6C7AE" }}>
            — EMPEZÁ HOY —
          </p>
          <h2 className="font-display text-4xl md:text-8xl text-ivory mb-12 leading-[0.95]">
            <span className="italic">¿LISTA</span> PARA VOLVER<br />
            A TU VERSIÓN<br />
            <span className="italic text-beige">MÁS AUTÉNTICA?</span>
          </h2>
          <Link
            href="/contacto"
            className="inline-block px-14 py-5 bg-ivory text-tinto-deep hover:bg-beige transition-colors mono-label text-lg"
            style={{ letterSpacing: "0.2em" }}
          >
            HABLEMOS
          </Link>
        </Reveal>
      </section>
    </>
  );
}
