import type { Metadata } from "next";
import Link from "next/link";
import { BOOKS, SITE } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Libros",
  description: "Libros publicados por Sarahi Haro.",
  alternates: { canonical: "/libros" },
};

export default function LibrosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", url: SITE.url },
          { name: "Libros", url: `${SITE.url}/libros` },
        ])}
      />

      <section className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <p className="text-xs uppercase tracking-[0.3em] text-tinto-soft mb-6">Publicaciones</p>
        <h1 className="font-display text-5xl md:text-7xl text-tinto-deep mb-16">Libros</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {BOOKS.map((book) => (
            <Link
              key={book.slug}
              href={`/libros/${book.slug}`}
              className="group block"
            >
              <div className="aspect-[2/3] bg-gradient-to-br from-tinto-deep to-tinto flex items-center justify-center mb-6 group-hover:scale-[1.02] transition-transform">
                <div className="text-center px-6">
                  <p className="font-display text-3xl text-hueso italic">Volver a mí</p>
                  <p className="font-display text-xl text-rosita mt-2">y no irme nunca más</p>
                  <p className="mt-6 text-xs uppercase tracking-widest text-rosita">Sarahi Haro</p>
                </div>
              </div>
              <h2 className="font-display text-2xl text-tinto-deep group-hover:text-tinto">
                {book.title}
              </h2>
              <p className="text-sm text-tinto-deep/60 mt-2">{book.year}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
