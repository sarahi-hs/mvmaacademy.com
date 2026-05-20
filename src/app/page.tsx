import Link from "next/link";
import { PERSON, STATS, BOOKS, CREDENTIALS, SOCIALS } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rosita/30 via-hueso to-hueso-warm" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-32 md:pt-32 md:pb-40">
          <p className="text-xs uppercase tracking-[0.3em] text-tinto-soft mb-6 animate-fade-in">
            Sarahi Haro · MVMA Academy
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-tinto-deep max-w-4xl animate-slide-up">
            Volver a ti.<br />
            <span className="italic text-tinto">Y no irte nunca más.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-tinto-deep/75 max-w-2xl leading-relaxed">
            Asesora de imagen, coach de marca personal y autora. Acompaño a mujeres a construir
            una versión auténtica de sí mismas — desde adentro hacia afuera.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contacto"
              className="px-8 py-4 bg-tinto text-hueso font-medium hover:bg-tinto-deep transition-colors"
            >
              Trabajemos juntas
            </Link>
            <Link
              href="/libros/volver-a-mi-y-no-irme-nunca-mas"
              className="px-8 py-4 border border-tinto text-tinto hover:bg-tinto hover:text-hueso transition-colors"
            >
              Conoce mi libro
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-rosita/40 bg-hueso-warm/50">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="font-display text-5xl md:text-6xl text-tinto">{s.value}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-tinto-deep/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-tinto-soft mb-4">Sobre mí</p>
          <h2 className="font-display text-4xl md:text-5xl text-tinto-deep mb-6">
            Detrás de cada mujer que se viste con intención,<br />
            <span className="italic">hay una historia.</span>
          </h2>
          <p className="text-tinto-deep/75 leading-relaxed mb-4">{PERSON.bioShortEs}</p>
          <ul className="mt-6 space-y-2 text-sm text-tinto-deep/70">
            {CREDENTIALS.slice(0, 4).map((c) => (
              <li key={c} className="flex gap-2">
                <span className="text-tinto">·</span> {c}
              </li>
            ))}
          </ul>
          <Link href="/sobre-mi" className="inline-block mt-8 text-tinto hover:text-tinto-deep underline underline-offset-4">
            Conoce mi historia completa →
          </Link>
        </div>
        <div className="aspect-[3/4] bg-gradient-to-br from-rosita to-rosita-deep rounded-sm flex items-center justify-center">
          {/* TODO: reemplazar con foto profesional de Sarahi */}
          <p className="text-tinto-deep/40 text-sm italic">Foto profesional pendiente</p>
        </div>
      </section>

      {/* FILOSOFÍA / MVMA */}
      <section className="bg-tinto text-hueso py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-rosita mb-6">MVMA · Mi Versión Más Auténtica</p>
          <h2 className="font-display text-4xl md:text-6xl mb-8 text-hueso">
            La imagen exterior es el reflejo<br />
            <span className="italic">de una mujer que ya se eligió.</span>
          </h2>
          <p className="text-lg text-hueso/85 leading-relaxed max-w-2xl mx-auto">
            MVMA no es solo un programa de imagen. Es un proceso integral donde trabajamos
            simultáneamente tu estilo personal, tu mentalidad y la marca que comunicas al mundo.
          </p>
          <Link
            href="/comunidad"
            className="inline-block mt-10 px-8 py-4 bg-hueso text-tinto hover:bg-rosita transition-colors"
          >
            Conoce MVMA Tribe
          </Link>
        </div>
      </section>

      {/* LIBRO */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="aspect-[2/3] bg-gradient-to-br from-tinto-deep to-tinto rounded-sm flex items-center justify-center order-2 md:order-1">
          {/* TODO: portada real del libro */}
          <div className="text-center px-8">
            <p className="font-display text-3xl text-hueso italic">Volver a mí</p>
            <p className="font-display text-xl text-rosita mt-2">y no irme nunca más</p>
            <p className="mt-6 text-xs uppercase tracking-widest text-rosita">Sarahi Haro</p>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <p className="text-xs uppercase tracking-[0.3em] text-tinto-soft mb-4">Libro</p>
          <h2 className="font-display text-4xl md:text-5xl text-tinto-deep mb-6">
            {BOOKS[0].title}
          </h2>
          <p className="text-tinto-deep/75 leading-relaxed">{BOOKS[0].descriptionEs}</p>
          <Link
            href={`/libros/${BOOKS[0].slug}`}
            className="inline-block mt-8 px-8 py-4 border border-tinto text-tinto hover:bg-tinto hover:text-hueso transition-colors"
          >
            Más sobre el libro
          </Link>
        </div>
      </section>

      {/* SPEAKING / CONFERENCIAS */}
      <section className="bg-rosita/30 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-tinto-soft mb-4">Speaker</p>
          <h2 className="font-display text-4xl md:text-5xl text-tinto-deep mb-6">
            En el escenario.<br />
            <span className="italic">México · Estados Unidos.</span>
          </h2>
          <p className="text-tinto-deep/75 max-w-2xl mx-auto leading-relaxed">
            He compartido escenario con comunidades de emprendedoras, empresarias y líderes
            en ambos países. Disponible para conferencias, keynotes corporativos y workshops.
          </p>
          <Link
            href="/conferencias"
            className="inline-block mt-10 px-8 py-4 bg-tinto text-hueso hover:bg-tinto-deep transition-colors"
          >
            Contrata una conferencia
          </Link>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-tinto-soft mb-4">Comunidad</p>
        <h2 className="font-display text-4xl md:text-5xl text-tinto-deep mb-12">
          400,000+ mujeres<br />
          <span className="italic">que ya empezaron el camino.</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {Object.values(SOCIALS).map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 border border-rosita hover:border-tinto hover:bg-rosita/20 transition-all group"
            >
              <div className="font-display text-3xl text-tinto group-hover:text-tinto-deep">
                {(s.followers / 1000).toFixed(0)}K
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-tinto-deep/60">
                {s.label}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
        <h2 className="font-display text-4xl md:text-6xl text-tinto-deep mb-8">
          ¿Lista para volver<br />
          <span className="italic text-tinto">a tu versión más auténtica?</span>
        </h2>
        <Link
          href="/contacto"
          className="inline-block mt-6 px-10 py-5 bg-tinto text-hueso text-lg hover:bg-tinto-deep transition-colors"
        >
          Hablemos
        </Link>
      </section>
    </>
  );
}
