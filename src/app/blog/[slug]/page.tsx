import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { POSTS, getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog";
import { SITE, PERSON } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [PERSON.name],
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function articleSchema(post: ReturnType<typeof getPostBySlug>) {
  if (!post) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    keywords: post.keywords.join(", "),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: "es",
    author: { "@id": `${SITE.url}/#person` },
    publisher: { "@id": `${SITE.url}/#person` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/${post.slug}` },
    articleSection: post.category,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);
  const html = await marked.parse(post.body);

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post)!,
          breadcrumbSchema([
            { name: "Inicio", url: SITE.url },
            { name: "Blog", url: `${SITE.url}/blog` },
            { name: post.title, url: `${SITE.url}/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-tinto-soft mb-6">
          <span>{post.category}</span>
          <span>·</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("es-MX", {
              day: "numeric", month: "long", year: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{post.readMinutes} min de lectura</span>
        </div>

        <h1 className="font-display text-4xl md:text-6xl text-tinto-deep leading-[1.05] mb-8">
          {post.title}
        </h1>
        <p className="text-xl text-tinto-deep/75 leading-relaxed mb-12 font-light">
          {post.description}
        </p>

        <div
          className="prose-mvma text-tinto-deep/85 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-20 pt-12 border-t border-rosita/60 text-center">
          <p className="text-xs uppercase tracking-widest text-tinto-soft mb-3">Sobre la autora</p>
          <p className="font-display text-2xl text-tinto-deep mb-4">Sarahi Haro</p>
          <p className="text-tinto-deep/75 max-w-xl mx-auto">{PERSON.bioShortEs}</p>
          <Link
            href="/contacto"
            className="inline-block mt-8 px-8 py-4 bg-tinto text-hueso hover:bg-tinto-deep transition-colors"
          >
            Trabajemos juntas
          </Link>
        </div>

        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-rosita/60">
            <h2 className="font-display text-2xl text-tinto-deep mb-8">Continuá leyendo</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group block p-6 bg-rosita/20 hover:bg-rosita/40 transition-colors"
                >
                  <p className="text-xs uppercase tracking-widest text-tinto-soft mb-2">
                    {r.category}
                  </p>
                  <h3 className="font-display text-lg text-tinto-deep group-hover:text-tinto leading-tight">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/blog" className="text-tinto hover:text-tinto-deep">
            ← Volver al blog
          </Link>
        </div>
      </article>
    </>
  );
}
