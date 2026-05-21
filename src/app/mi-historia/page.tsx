import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE, PERSON, CREDENTIALS } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Mi Historia — Sarahi Haro",
  description:
    "La historia detrás de la asesora de imagen, coach y speaker que acompaña a mujeres a construir su versión más auténtica.",
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
      <section className="bg-ivory py-20 md:py-24 border-b border-beige">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <p className="mono-label text-tinto mb-6">— MI HISTORIA —</p>
            <h1 className="font-display text-5xl md:text-7xl text-tinto-deep leading-[1.0] mb-8">
              <span className="italic">No nací</span><br />
              asesora de imagen.
              <br />
              <span className="italic text-tinto">Me convertí</span><br />
              en ella.
            </h1>
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
              <div className="absolute inset-3 border border-tinto/10 pointer-events-none" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTENIDO — Placeholder hasta que Sarahi pase su historia */}
      <section className="max-w-3xl mx-auto px-6 pb-24 md:pb-32">
        <Reveal>
          <div className="prose-mvma text-tinto-deep/85 leading-relaxed text-lg space-y-6">
            <p className="editorial-dropcap">
              {PERSON.bioLongEs.split("\n\n")[0]}
            </p>
            {PERSON.bioLongEs.split("\n\n").slice(1).map((p, i) => (
              <p key={i}>{p.trim()}</p>
            ))}
          </div>

          <div className="mt-16 p-8 bg-ivory-warm/40 border border-beige text-center">
            <p className="editorial-eyebrow mb-3 text-tinto-soft">Próximamente</p>
            <p className="text-tinto-deep/70 italic">
              Sarahi está preparando su historia completa — el proceso personal que la llevó a crear MVMA.
              Mientras tanto, podés conocer su trabajo en{" "}
              <Link href="/servicios" className="text-tinto editorial-underline">servicios</Link>,{" "}
              <Link href="/conferencias" className="text-tinto editorial-underline">conferencias</Link>{" "}
              y <Link href="/libros" className="text-tinto editorial-underline">su libro</Link>.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-20 pt-16 border-t border-beige">
            <p className="editorial-eyebrow mb-6 text-center">Formación</p>
            <ul className="space-y-3 max-w-2xl mx-auto">
              {CREDENTIALS.map((c) => (
                <li key={c} className="flex gap-3 text-tinto-deep/80 leading-relaxed">
                  <span className="text-tinto mt-1">·</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-16 text-center">
            <Link
              href="/contacto?tipo=Conferencia+%2F+Keynote"
              className="inline-block px-10 py-4 bg-tinto text-ivory hover:bg-tinto-deep transition-colors"
            >
              Contratar conferencia
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
