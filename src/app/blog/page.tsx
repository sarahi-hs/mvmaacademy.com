import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos de Sarahi Haro sobre asesoría de imagen, marca personal y mentalidad.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <p className="text-xs uppercase tracking-[0.3em] text-tinto-soft mb-6">Blog</p>
      <h1 className="font-display text-5xl md:text-7xl text-tinto-deep mb-12">
        Próximamente <span className="italic text-tinto">en el blog.</span>
      </h1>
      <p className="text-lg text-tinto-deep/75 leading-relaxed max-w-2xl">
        Estoy preparando 15-20 artículos sobre asesoría de imagen, construcción de marca
        personal auténtica, mentalidad para mujeres líderes y el método MVMA. Vuelve pronto.
      </p>
    </section>
  );
}
