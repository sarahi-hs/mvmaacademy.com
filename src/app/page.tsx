import Link from "next/link";
import { PERSON, STATS, BOOKS, CREDENTIALS, SOCIALS, HERO } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          HERO — Editorial Vogue · frase declarativa potente
          ============================================================ */}
      <section className="relative overflow-hidden bg-ivory">
        <div className="absolute inset-0 bg-gradient-to-br from-beige-light via-ivory to-ivory-warm opacity-70" aria-hidden />

        {/* Decoración editorial — número de edición tipo revista */}
        <div className="absolute top-12 right-12 hidden md:block text-tinto/30 font-display italic text-sm tracking-widest">
          N° 01 · MMXXVI
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-32 md:pt-40 md:pb-48">
          <p className="editorial-eyebrow mb-8 animate-fade-in">
            {HERO.eyebrow}
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] text-tinto-deep max-w-5xl animate-slide-up">
            <span className="italic font-light text-tinto">L</span>a mujer que serás
            <br />
            <span className="italic">en cinco años</span> empieza
            <br />
            por <span className="italic">cómo te ves</span>
            <br />
            hoy <span className="italic text-tinto">en el espejo.</span>
          </h1>

          <Reveal delay={300}>
            <div className="mt-12 max-w-2xl">
              <p className="text-lg md:text-xl text-tinto-deep/80 leading-relaxed">
                {HERO.subheadline}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/servicios"
                  className="px-10 py-4 bg-tinto text-ivory font-medium hover:bg-tinto-deep transition-colors tracking-wide"
                >
                  Ver mis servicios
                </Link>
                <Link
                  href="/mi-historia"
                  className="px-10 py-4 border border-tinto text-tinto hover:bg-tinto hover:text-ivory transition-colors tracking-wide"
                >
                  Conoce mi historia
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          STATS — Estilo revista editorial
          ============================================================ */}
      <section className="border-y border-beige bg-ivory-warm/40">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <p className="editorial-eyebrow text-center mb-12">En números</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="text-center">
                  <div className="font-display text-6xl md:text-7xl text-tinto leading-none">
                    {s.value}
                  </div>
                  <div className="mt-4 text-xs uppercase tracking-[0.2em] text-tinto-deep/60 max-w-[180px] mx-auto">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          ABOUT — Editorial split con drop cap
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <Reveal>
            <p className="editorial-eyebrow mb-6">Sobre mí</p>
            <h2 className="font-display text-4xl md:text-6xl text-tinto-deep mb-8 leading-[1.05]">
              Detrás de cada mujer
              <br />
              <span className="italic text-tinto">que se viste con intención,</span>
              <br />
              hay una historia.
            </h2>
            <p className="editorial-dropcap text-tinto-deep/85 leading-relaxed text-lg">
              {PERSON.bioShortEs}
            </p>
            <Link href="/mi-historia" className="inline-block mt-8 text-tinto hover:text-tinto-deep editorial-underline">
              Lee mi historia completa →
            </Link>
          </Reveal>

          <Reveal delay={200}>
            <div className="aspect-[3/4] bg-gradient-to-br from-beige via-beige-light to-ivory-warm flex items-center justify-center relative">
              {/* TODO: foto profesional de Sarahi */}
              <div className="absolute inset-4 border border-tinto/20" />
              <p className="text-tinto-deep/40 text-sm italic">Foto editorial pendiente</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          SERVICIOS — Quick preview con CTA fuerte
          ============================================================ */}
      <section className="bg-tinto text-ivory py-28 md:py-36">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <p className="editorial-eyebrow text-beige mb-8" style={{ color: "#D6C7AE" }}>
              Servicios personalizados
            </p>
            <h2 className="font-display text-4xl md:text-6xl mb-10 text-ivory leading-[1.05]">
              <span className="italic">Cinco caminos</span>
              <br />
              para volver a ti.
            </h2>
            <p className="text-lg md:text-xl text-ivory/85 leading-relaxed max-w-2xl mx-auto mb-12">
              Desde el estudio de color básico hasta mentoría 1:1 integral.
              Cada servicio diseñado para una etapa distinta de tu proceso.
            </p>
            <Link
              href="/servicios"
              className="inline-block px-12 py-5 bg-ivory text-tinto hover:bg-beige transition-colors tracking-wide"
            >
              Conoce los 5 servicios
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          MVMA TRIBE — Comunidad
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-40">
        <div className="grid md:grid-cols-5 gap-16 items-center">
          <Reveal className="md:col-span-2">
            <div className="aspect-[4/5] bg-gradient-to-br from-beige-light to-beige flex items-center justify-center">
              <div className="text-center px-8">
                <p className="font-display text-5xl text-tinto-deep italic">MVMA</p>
                <p className="font-display text-2xl text-tinto mt-2">Tribe</p>
                <div className="mt-6 mx-auto w-16 h-px bg-tinto" />
                <p className="mt-6 text-xs uppercase tracking-widest text-tinto-deep/60">
                  Comunidad de mujeres
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="md:col-span-3">
            <p className="editorial-eyebrow mb-6">Únete a mi comunidad</p>
            <h2 className="font-display text-4xl md:text-5xl text-tinto-deep mb-6 leading-[1.05]">
              <span className="italic text-tinto">MVMA Tribe.</span>
              <br />
              Mi Versión Más Auténtica.
            </h2>
            <p className="text-tinto-deep/80 leading-relaxed text-lg mb-6">
              Una comunidad cerrada de mujeres comprometidas con su transformación.
              Acompañamiento mensual, herramientas concretas y un espacio donde podés
              ser vos sin filtros.
            </p>
            <ul className="space-y-2 text-tinto-deep/70 mb-8">
              <li className="flex gap-2"><span className="text-tinto">·</span> 2 clases mensuales en vivo conmigo</li>
              <li className="flex gap-2"><span className="text-tinto">·</span> Contenido exclusivo de imagen + marca personal + mentalidad</li>
              <li className="flex gap-2"><span className="text-tinto">·</span> Comunidad activa de apoyo entre miembros</li>
              <li className="flex gap-2"><span className="text-tinto">·</span> Acceso a workshops trimestrales</li>
            </ul>
            <Link
              href="/comunidad"
              className="inline-block px-10 py-4 bg-tinto text-ivory hover:bg-tinto-deep transition-colors"
            >
              Unirme a MVMA Tribe
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          SPEAKER — Editorial autoridad
          ============================================================ */}
      <section className="bg-ivory-warm/50 py-28 md:py-36 border-y border-beige">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal>
            <p className="editorial-eyebrow mb-6">Speaker internacional</p>
            <h2 className="font-display text-4xl md:text-6xl text-tinto-deep mb-8 leading-[1.05]">
              <span className="italic">En el escenario.</span>
              <br />
              En la <span className="italic text-tinto">televisión.</span>
              <br />
              En tu próximo evento.
            </h2>
            <div className="editorial-divider my-12 max-w-md mx-auto">
              <span className="font-display italic text-tinto">·</span>
            </div>
            <p className="text-lg text-tinto-deep/80 leading-relaxed max-w-2xl mx-auto mb-10">
              Speaker en México y Estados Unidos para comunidades de emprendedoras,
              empresarias y líderes. Disponible para conferencias corporativas,
              TEDx y eventos de comunidad.
            </p>
            <Link
              href="/conferencias"
              className="inline-block px-12 py-5 bg-tinto text-ivory hover:bg-tinto-deep transition-colors tracking-wide"
            >
              Contratar conferencia
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
            <div className="aspect-[2/3] bg-gradient-to-br from-tinto-deep via-tinto to-tinto-soft flex items-center justify-center relative">
              <div className="absolute inset-3 border border-beige/30" />
              <div className="text-center px-8 relative">
                <p className="font-display text-4xl text-ivory italic">Volver a mí</p>
                <div className="mt-3 mx-auto w-12 h-px bg-beige" />
                <p className="font-display text-xl text-beige mt-3">y no irme nunca más</p>
                <p className="mt-10 editorial-eyebrow text-beige" style={{ color: "#E8DFCB" }}>Sarahi Haro</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} className="order-1 md:order-2">
            <p className="editorial-eyebrow mb-6">El libro</p>
            <h2 className="font-display text-4xl md:text-6xl text-tinto-deep mb-8 leading-[1.05]">
              <span className="italic">Volver a mí.</span>
              <br />
              Y no irme nunca más.
            </h2>
            <p className="text-tinto-deep/80 leading-relaxed text-lg mb-8">
              {BOOKS[0].descriptionEs}
            </p>
            <Link
              href={`/libros/${BOOKS[0].slug}`}
              className="inline-block px-10 py-4 border border-tinto text-tinto hover:bg-tinto hover:text-ivory transition-colors"
            >
              Más sobre el libro →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          SOCIAL PROOF — Comunidad en redes
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 py-28 md:py-36 text-center">
        <Reveal>
          <p className="editorial-eyebrow mb-6">Comunidad</p>
          <h2 className="font-display text-4xl md:text-6xl text-tinto-deep mb-4 leading-[1.05]">
            <span className="italic">400,000+</span> mujeres
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
                className="block p-10 border border-beige hover:border-tinto hover:bg-beige-light/40 transition-all group"
              >
                <div className="font-display text-4xl text-tinto group-hover:text-tinto-deep">
                  {(s.followers / 1000).toFixed(0)}K
                </div>
                <div className="mt-3 editorial-eyebrow text-tinto-deep/60">
                  {s.label}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================
          CTA FINAL — Manifiesto declarativo
          ============================================================ */}
      <section className="bg-tinto-deep text-ivory py-32 md:py-40">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p className="editorial-eyebrow text-beige mb-8" style={{ color: "#D6C7AE" }}>
            Empezá hoy
          </p>
          <h2 className="font-display text-4xl md:text-7xl text-ivory mb-12 leading-[1.05]">
            <span className="italic">¿Lista para volver</span>
            <br />
            a tu versión más auténtica?
          </h2>
          <Link
            href="/contacto"
            className="inline-block px-14 py-5 bg-ivory text-tinto-deep hover:bg-beige transition-colors tracking-wide text-lg"
          >
            Hablemos
          </Link>
        </Reveal>
      </section>
    </>
  );
}
