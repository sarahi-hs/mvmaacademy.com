import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE, PERSON, CREDENTIALS, TV_APPEARANCES } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Mi Historia — Sarahi Haro",
  description:
    "La historia personal detrás de MVMA. De sentirme insuficiente a los 19 años a convertir mi proceso en propósito. Asesora de imagen, coach y speaker mexicana.",
  alternates: { canonical: "/mi-historia" },
};

export default function MiHistoriaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: SITE.url },
          { name: "Mi Historia", url: `${SITE.url}/mi-historia` },
        ])}
      />

      {/* HERO con foto */}
      <section className="bg-ivory py-20 md:py-28 border-b border-beige">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <p className="mono-label text-tinto mb-6">— MI HISTORIA —</p>
            <h1 className="font-display text-5xl md:text-7xl text-tinto-deep leading-[0.95] mb-10">
              <span className="italic">No nací</span><br />
              asesora de imagen.<br />
              <span className="italic text-tinto">Me convertí</span><br />
              en ella.
            </h1>
            <p className="text-lg md:text-xl text-tinto-deep/80 leading-relaxed italic font-display">
              "Porque yo sé lo que es sentirte insuficiente. Pero también sé lo que pasa
              cuando una mujer decide volver a sí misma y no irse nunca más."
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative aspect-[3/4] overflow-hidden bg-ivory-warm">
              <Image
                src="/images/sarahi/sarahi-historia.jpg"
                alt="Sarahi Haro — Mi historia"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-3 border border-tinto/15 pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAPÍTULO 1 — La herida temprana */}
      <section className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="flex items-center gap-4 mb-12">
            <p className="mono-label text-tinto">CAPÍTULO 01</p>
            <div className="flex-1 h-px bg-tinto/30" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-tinto-deep leading-[1.05] mb-12">
            <span className="italic">Por fuera</span> parecía segura.<br />
            Por dentro, me sentía
            <br />
            <span className="italic text-tinto">profundamente insuficiente.</span>
          </h2>

          <div className="prose-mvma text-tinto-deep/85 leading-relaxed text-lg space-y-6">
            <p className="editorial-dropcap">
              Hubo una etapa de mi vida donde, aunque por fuera parecía una mujer segura, por dentro
              me sentía profundamente insuficiente. Desde muy pequeña crecí sintiéndome juzgada por
              mi apariencia, comparándome constantemente y creyendo que necesitaba cambiar para ser
              aceptada, querida o suficiente.
            </p>
            <p>
              Durante mucho tiempo pensé que mi valor dependía de cómo me veía, de cómo me percibían
              los demás y de cuánto lograba encajar. Esa herida me acompañó por años.
            </p>
            <p>
              Y aunque siempre fui una mujer soñadora, emprendedora y con ganas de salir adelante,
              también había una parte de mí que vivía desde el rechazo hacia sí misma.
            </p>
          </div>
        </Reveal>
      </section>

      {/* PULL QUOTE 1 */}
      <section className="bg-tinto-deep text-ivory py-20 md:py-28">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p className="mono-label text-beige mb-8" style={{ color: "#D6C7AE" }}>— A LOS 19 AÑOS —</p>
          <p className="font-display text-3xl md:text-5xl italic text-ivory leading-tight">
            "Pensé que una cirugía plástica
            <br />
            me haría sentir más valiosa.
            <br />
            <span className="text-beige">Cambió mi físico.</span>
            <br />
            No cambió la manera en que
            <br />
            yo me veía por dentro."
          </p>
        </Reveal>
      </section>

      {/* CAPÍTULO 2 — La cirugía y el quiebre */}
      <section className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="flex items-center gap-4 mb-12">
            <p className="mono-label text-tinto">CAPÍTULO 02</p>
            <div className="flex-1 h-px bg-tinto/30" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-tinto-deep leading-[1.05] mb-12">
            El cuerpo cambió.<br />
            <span className="italic text-tinto">Yo no.</span>
          </h2>

          <div className="prose-mvma text-tinto-deep/85 leading-relaxed text-lg space-y-6">
            <p>
              A los 19 años tomé la decisión de hacerme una cirugía plástica pensando que eso me
              haría sentir más segura, más feliz y más valiosa. Y sí, cambió mi físico. Pero no
              cambió la manera en la que yo me veía por dentro.
            </p>
            <p>
              De hecho, <strong className="text-tinto">algo salió mal durante ese proceso</strong>.
              Después de mi cirugía estuve aproximadamente cuatro meses sin poder caminar bien,
              bajé más de 10 kilos y entré en una tristeza muy profunda.
            </p>
            <p>
              Fue un momento muy fuerte para mí, porque por primera vez entendí lo frágil que puede
              ser la vida y lo mucho que damos por sentado nuestro cuerpo, nuestra salud y nuestra
              paz mental.
            </p>
            <blockquote>
              Ahí entendí que cuando una mujer intenta transformarse desde el rechazo hacia sí misma,
              nunca va a ser suficiente. Ningún cambio externo puede llenar un vacío interno.
            </blockquote>
          </div>
        </Reveal>
      </section>

      {/* CAPÍTULO 3 — La reconstrucción */}
      <section className="bg-ivory-warm/40 py-24 md:py-32 border-y border-beige">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <p className="mono-label text-tinto">CAPÍTULO 03</p>
              <div className="flex-1 h-px bg-tinto/30" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-tinto-deep leading-[1.05] mb-12">
              <span className="italic">Dejé de buscar</span><br />
              afuera lo que solo<br />
              <span className="italic text-tinto">se encuentra adentro.</span>
            </h2>

            <div className="prose-mvma text-tinto-deep/85 leading-relaxed text-lg space-y-6">
              <p>
                Aunque fue uno de los momentos más dolorosos de mi vida, también fue uno de los más
                transformadores. Porque en lugar de seguir buscando respuestas afuera, empecé un
                proceso profundo de <strong className="text-tinto">reconstrucción personal</strong>.
              </p>
              <p>
                Fui a terapia. Empecé a cuestionar mis creencias. A sanar heridas. A perdonarme.
                Y a entender que muchas veces las opiniones, rechazos o acciones de los demás no
                hablan de nuestro valor, sino de las heridas de las otras personas.
              </p>
              <p>
                También hubo momentos difíciles emocionalmente, como perder amistades importantes
                y sentirme sola en etapas donde creía que ciertas personas estarían para siempre.
              </p>
              <p className="text-xl italic text-tinto">
                Pero incluso eso me enseñó algo valioso:
                aprender a soltar y entender que la única persona que realmente estará conmigo toda
                la vida soy yo.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAPÍTULO 4 — La transformación */}
      <section className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="flex items-center gap-4 mb-12">
            <p className="mono-label text-tinto">CAPÍTULO 04</p>
            <div className="flex-1 h-px bg-tinto/30" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-tinto-deep leading-[1.05] mb-12">
            Cuando mi imagen interna cambió,<br />
            mi vida externa <span className="italic text-tinto">también lo hizo.</span>
          </h2>

          <div className="prose-mvma text-tinto-deep/85 leading-relaxed text-lg space-y-6">
            <p>
              Con el tiempo empecé a transformar la relación conmigo misma. Dejé de hablarme desde
              el rechazo y empecé a construirme desde el amor, la disciplina y el merecimiento.
            </p>
            <p>
              Y algo muy interesante pasó: cuando mi imagen interna cambió, mi vida externa también
              empezó a cambiar. Empecé a atraer mejores relaciones, más oportunidades, abundancia
              y una relación mucho más sana conmigo misma y con los demás, incluyendo mi matrimonio.
            </p>
            <blockquote>
              Ahí entendí que la imagen personal va muchísimo más allá de la ropa o el maquillaje.
              La imagen es cómo te percibes, cómo te hablas, cómo entras a un lugar, cómo te
              permites ser vista y cómo decides presentarte ante el mundo.
            </blockquote>
            <p className="font-display italic text-2xl text-tinto-deep pt-4">
              Existe una relación muy fuerte entre tu ser y tu parecer.
            </p>
          </div>
        </Reveal>
      </section>

      {/* PULL QUOTE 2 */}
      <section className="bg-tinto text-ivory py-20 md:py-28">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p className="mono-label text-beige mb-8" style={{ color: "#D6C7AE" }}>— DE MI HISTORIA A MI PROPÓSITO —</p>
          <p className="font-display text-3xl md:text-5xl italic text-ivory leading-tight">
            "Decidí convertir mi historia
            <br />
            en propósito.
            <br />
            <span className="text-beige">Y así nació MVMA."</span>
          </p>
        </Reveal>
      </section>

      {/* CAPÍTULO 5 — MVMA */}
      <section className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="flex items-center gap-4 mb-12">
            <p className="mono-label text-tinto">CAPÍTULO 05</p>
            <div className="flex-1 h-px bg-tinto/30" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-tinto-deep leading-[1.05] mb-12">
            <span className="italic">MVMA Academy</span> nació<br />
            de mi propio camino.
          </h2>

          <div className="prose-mvma text-tinto-deep/85 leading-relaxed text-lg space-y-6">
            <p>
              A partir de mi propia transformación decidí convertir mi historia en propósito. Creé{" "}
              <strong className="text-tinto">MVMA Academy</strong>, una comunidad y programa donde
              ayudo a mujeres a fortalecer su autoestima, seguridad y proyección personal desde
              adentro hacia afuera.
            </p>
            <p>
              Desde entonces he trabajado con cientos de mujeres, impartido talleres y conferencias,
              y compartido herramientas sobre imagen, mentalidad y amor propio en México, Estados
              Unidos y mi comunidad digital de más de 400,000 mujeres.
            </p>
          </div>
        </Reveal>
      </section>

      {/* MI MISIÓN HOY */}
      <section className="bg-ivory-warm/40 py-24 md:py-32 border-y border-beige">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p className="mono-label text-tinto mb-8">— MI MISIÓN HOY —</p>
          <h2 className="font-display text-3xl md:text-5xl text-tinto-deep leading-[1.1] mb-12">
            Mi misión <span className="italic text-tinto">no es enseñarles</span><br />
            a las mujeres a verse perfectas.
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-tinto-deep/85 leading-relaxed">
            <p>
              Mi misión es enseñarles a <strong className="text-tinto">dejar de abandonarse</strong> a
              sí mismas. A reconocerse como valiosas. Y a construir una versión auténtica, segura y
              coherente con la vida que quieren crear.
            </p>
            <p className="font-display italic text-2xl md:text-3xl text-tinto pt-8">
              Porque yo sé lo que es sentirte insuficiente.<br />
              Pero también sé lo que pasa cuando una mujer decide<br />
              volver a sí misma y no irse nunca más.
            </p>
          </div>
        </Reveal>
      </section>

      {/* APARICIONES EN TV */}
      <section className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="text-center mb-12">
            <p className="mono-label text-tinto mb-4">— COMO ME VISTE EN TV —</p>
            <h2 className="font-display text-3xl md:text-5xl text-tinto-deep leading-[1.05]">
              <span className="italic">Cuatro apariciones</span> en televisión.
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden bg-ivory-warm">
              <Image
                src="/images/sarahi/sarahi-tv.jpg"
                alt="Sarahi Haro en Giros Guadalajara, Canal 13"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </Reveal>

          <Reveal delay={150} className="md:col-span-7">
            <ul className="space-y-6">
              {TV_APPEARANCES.map((tv, i) => (
                <li key={i} className="border-b border-beige pb-6 last:border-b-0">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-display text-2xl text-tinto-deep">{tv.program}</h3>
                    <p className="mono-label text-tinto-soft whitespace-nowrap">{tv.year}</p>
                  </div>
                  <p className="text-sm text-tinto-deep/70 mb-2">{tv.network}</p>
                  <p className="italic text-tinto-deep/80">{tv.topic}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FORMACIÓN */}
      <section className="bg-ivory-warm/40 border-y border-beige py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="mono-label text-tinto mb-6 text-center">— FORMACIÓN PROFESIONAL —</p>
            <h2 className="font-display text-3xl md:text-4xl text-tinto-deep mb-12 text-center leading-[1.05]">
              Mi historia personal <span className="italic text-tinto">se sostiene</span><br />
              con formación profesional.
            </h2>
            <ul className="space-y-3 max-w-2xl mx-auto">
              {CREDENTIALS.map((c) => (
                <li key={c} className="flex gap-3 text-tinto-deep/85 leading-relaxed text-lg">
                  <span className="text-tinto mt-1">·</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tinto-deep text-ivory py-24 md:py-32">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <p className="mono-label text-beige mb-6" style={{ color: "#D6C7AE" }}>— EMPEZÁ TU PROPIO CAPÍTULO —</p>
          <h2 className="font-display text-4xl md:text-6xl text-ivory mb-10 leading-[1.05]">
            ¿Y si tu historia <span className="italic text-beige">también</span><br />
            pudiera convertirse en propósito?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/comunidad"
              className="inline-block px-12 py-5 bg-ivory text-tinto-deep hover:bg-beige transition-colors mono-label text-lg"
              style={{ letterSpacing: "0.2em" }}
            >
              UNIRME A MI COMUNIDAD
            </Link>
            <Link
              href="/contacto?tipo=Conferencia+%2F+Keynote"
              className="inline-block px-12 py-5 border border-ivory text-ivory hover:bg-ivory hover:text-tinto-deep transition-colors mono-label text-lg"
              style={{ letterSpacing: "0.2em" }}
            >
              CONTRATAR CONFERENCIA
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
