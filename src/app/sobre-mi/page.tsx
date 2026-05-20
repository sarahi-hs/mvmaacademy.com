import type { Metadata } from "next";
import { PERSON, CREDENTIALS, SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Sobre mí — Sarahi Haro",
  description: PERSON.bioShortEs,
  alternates: { canonical: "/sobre-mi", languages: { "en-US": "/en/about" } },
  openGraph: { title: "Sobre Sarahi Haro", description: PERSON.bioShortEs },
};

export default function SobreMiPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: SITE.url },
          { name: "Sobre mí", url: `${SITE.url}/sobre-mi` },
        ])}
      />

      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <p className="text-xs uppercase tracking-[0.3em] text-tinto-soft mb-6">Sobre mí</p>
        <h1 className="font-display text-5xl md:text-7xl text-tinto-deep mb-12 leading-[1.05]">
          Sarahi Haro
        </h1>

        <div className="prose prose-lg max-w-none space-y-6 text-tinto-deep/80 leading-relaxed">
          {PERSON.bioLongEs.split("\n\n").map((p, i) => (
            <p key={i}>{p.trim()}</p>
          ))}
        </div>

        <div className="mt-16 pt-16 border-t border-rosita/60">
          <h2 className="font-display text-3xl text-tinto-deep mb-8">Formación y credenciales</h2>
          <ul className="space-y-3">
            {CREDENTIALS.map((c) => (
              <li key={c} className="flex gap-3 text-tinto-deep/80">
                <span className="text-tinto mt-1">·</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 pt-16 border-t border-rosita/60">
          <h2 className="font-display text-3xl text-tinto-deep mb-8">Datos personales</h2>
          <dl className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="uppercase tracking-widest text-tinto-soft text-xs mb-1">Edad</dt>
              <dd className="text-tinto-deep">{PERSON.age} años</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-tinto-soft text-xs mb-1">Nacionalidad</dt>
              <dd className="text-tinto-deep">{PERSON.nationality}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-tinto-soft text-xs mb-1">Idiomas</dt>
              <dd className="text-tinto-deep">Español · Inglés</dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-tinto-soft text-xs mb-1">Base</dt>
              <dd className="text-tinto-deep">México</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
