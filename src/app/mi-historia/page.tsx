import type { Metadata } from "next";
import Link from "next/link";
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

      {/* HERO */}
      <section className="bg-ivory py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="editorial-eyebrow mb-6">Mi Historia</p>
            <h1 className="font-display text-5xl md:text-7xl text-tinto-deep leading-[1.05] mb-8">
              <span className="italic">No nací</span> asesora de imagen.
              <br />
              <span className="italic text-tinto">Me convertí en ella.</span>
            </h1>
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
