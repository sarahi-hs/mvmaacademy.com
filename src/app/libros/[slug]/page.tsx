import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BOOKS, SITE, FAQS_LIBRO } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { bookSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BOOKS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = BOOKS.find((b) => b.slug === slug);
  if (!book) return {};
  return {
    title: book.title,
    description: book.descriptionEs,
    alternates: { canonical: `/libros/${book.slug}` },
    openGraph: {
      title: book.title,
      description: book.descriptionEs,
      type: "book",
    },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = BOOKS.find((b) => b.slug === slug);
  if (!book) notFound();

  return (
    <>
      <JsonLd
        data={[
          bookSchema(book, "es"),
          faqSchema(FAQS_LIBRO),
          breadcrumbSchema([
            { name: "Inicio", url: SITE.url },
            { name: "Libros", url: `${SITE.url}/libros` },
            { name: book.title, url: `${SITE.url}/libros/${book.slug}` },
          ]),
        ]}
      />

      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-16 items-start">
        <div className="aspect-[2/3] bg-gradient-to-br from-tinto-deep to-tinto flex items-center justify-center sticky top-24">
          <div className="text-center px-8">
            <p className="font-display text-4xl text-hueso italic">Volver a mí</p>
            <p className="font-display text-2xl text-rosita mt-3">y no irme nunca más</p>
            <p className="mt-8 text-xs uppercase tracking-widest text-rosita">Sarahi Haro</p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-tinto-soft mb-4">Libro</p>
          <h1 className="font-display text-4xl md:text-6xl text-tinto-deep mb-6 leading-[1.05]">
            {book.title}
          </h1>
          <p className="text-tinto-deep/70 italic mb-8">por Sarahi Haro</p>

          <div className="prose text-tinto-deep/80 leading-relaxed space-y-4">
            <p>{book.descriptionEs}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {book.amazonUrl && (
              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-tinto text-ivory hover:bg-tinto-deep transition-colors mono-label"
                style={{ letterSpacing: "0.2em" }}
              >
                COMPRAR EN AMAZON →
              </a>
            )}
          </div>

          <div className="mt-16 pt-12 border-t border-rosita/60">
            <h2 className="font-display text-2xl text-tinto-deep mb-6">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {FAQS_LIBRO.map((f) => (
                <details key={f.q} className="group border-b border-rosita/60 pb-3">
                  <summary className="cursor-pointer font-medium text-tinto-deep py-2 list-none flex justify-between items-center">
                    {f.q}
                    <span className="text-tinto group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-tinto-deep/70 leading-relaxed pb-2 text-sm">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <Link href="/libros" className="inline-block mt-12 text-tinto hover:text-tinto-deep">
            ← Ver todos los libros
          </Link>
        </div>
      </section>
    </>
  );
}
