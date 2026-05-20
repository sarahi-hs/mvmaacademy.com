import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/blog";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Blog — Marca Personal, Imagen y MVMA",
  description:
    "Artículos de Sarahi Haro sobre asesoría de imagen, marca personal femenina, mentalidad y el método MVMA. Para mujeres emprendedoras, profesionales y en busca de su versión más auténtica.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const sortedPosts = [...POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: SITE.url },
          { name: "Blog", url: `${SITE.url}/blog` },
        ])}
      />

      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <p className="text-xs uppercase tracking-[0.3em] text-tinto-soft mb-6">Blog</p>
        <h1 className="font-display text-5xl md:text-7xl text-tinto-deep mb-8 leading-[1.05]">
          Ideas <span className="italic text-tinto">para volver a ti.</span>
        </h1>
        <p className="text-lg text-tinto-deep/75 max-w-2xl leading-relaxed mb-16">
          Reflexiones, métodos y herramientas sobre asesoría de imagen, marca personal,
          mentalidad y el camino a tu versión más auténtica.
        </p>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="aspect-[3/2] bg-gradient-to-br from-rosita/60 to-rosita-deep/40 mb-4 flex items-center justify-center px-8 group-hover:from-rosita group-hover:to-rosita-deep transition-colors">
                <p className="font-display text-3xl text-tinto-deep/70 text-center italic leading-tight">
                  {post.title.split(" ").slice(0, 4).join(" ")}...
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-tinto-soft mb-3">
                <span>{post.category}</span>
                <span>·</span>
                <span>{post.readMinutes} min</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-tinto-deep group-hover:text-tinto leading-tight mb-3">
                {post.title}
              </h2>
              <p className="text-tinto-deep/70 leading-relaxed text-sm">
                {post.description}
              </p>
              <p className="mt-4 text-tinto text-sm group-hover:text-tinto-deep">
                Leer artículo →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
