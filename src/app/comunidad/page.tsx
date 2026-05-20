import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "MVMA Tribe — La comunidad",
  description:
    "MVMA Tribe es la comunidad de mujeres de Sarahi Haro: 2 clases mensuales en vivo, contenido exclusivo y acompañamiento en el camino a tu versión más auténtica.",
  alternates: { canonical: "/comunidad" },
};

const BENEFITS = [
  { title: "2 clases mensuales en vivo", desc: "Sesiones temáticas dirigidas por Sarahi sobre imagen, marca personal y mentalidad." },
  { title: "Comunidad cerrada de mujeres", desc: "Un espacio seguro para compartir procesos, dudas y celebraciones." },
  { title: "Contenido exclusivo", desc: "Material complementario, ejercicios y recursos solo para miembros." },
  { title: "Acompañamiento continuo", desc: "Forma parte de un proceso colectivo, no de un curso aislado." },
];

export default function ComunidadPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: SITE.url },
          { name: "MVMA Tribe", url: `${SITE.url}/comunidad` },
        ])}
      />

      <section className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-tinto-soft mb-6">MVMA · Mi Versión Más Auténtica</p>
        <h1 className="font-display text-5xl md:text-7xl text-tinto-deep mb-8 leading-[1.05]">
          MVMA <span className="italic text-tinto">Tribe.</span>
        </h1>
        <p className="text-lg md:text-xl text-tinto-deep/75 max-w-2xl mx-auto leading-relaxed">
          Una comunidad de mujeres que decidieron volver a sí mismas y no irse nunca más.
          Aprendemos juntas, crecemos juntas.
        </p>

        <div className="mt-20 grid md:grid-cols-2 gap-6 text-left">
          {BENEFITS.map((b) => (
            <div key={b.title} className="p-8 bg-rosita/30 border border-rosita">
              <h3 className="font-display text-2xl text-tinto-deep mb-3">{b.title}</h3>
              <p className="text-tinto-deep/70 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-tinto text-hueso">
          <h2 className="font-display text-3xl md:text-4xl text-hueso mb-6">
            ¿Lista para unirte?
          </h2>
          <p className="text-hueso/85 max-w-xl mx-auto mb-8">
            Escríbenos para conocer la inversión actual, el calendario y cómo formar parte de la próxima generación de MVMA Tribe.
          </p>
          <Link
            href="/contacto?tipo=comunidad"
            className="inline-block px-10 py-4 bg-hueso text-tinto hover:bg-rosita transition-colors"
          >
            Quiero unirme
          </Link>
        </div>
      </section>
    </>
  );
}
