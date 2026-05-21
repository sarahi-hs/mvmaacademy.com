import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
              <div className="aspect-[2/3] relative overflow-hidden mb-6 group-hover:scale-[1.02] transition-transform">
                <Image
                  src="/books/volver-a-mi.jpg"
                  alt={`Portada del libro ${book.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
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
