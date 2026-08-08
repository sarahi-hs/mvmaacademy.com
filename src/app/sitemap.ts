import type { MetadataRoute } from "next";
import { SITE, BOOKS } from "@/lib/site";
import { POSTS } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/mi-historia",
    "/servicios",
    "/conferencias",
    "/libros",
    "/comunidad",
    "/blog",
    "/contacto",
    "/masterclass",
    "/glow-brunch",
    "/sobre-mi", // legacy, redirige a /mi-historia eventualmente
  ];

  const main: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${SITE.url}${r}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r === "" ? 1.0 : 0.8,
  }));

  const books: MetadataRoute.Sitemap = BOOKS.map((b) => ({
    url: `${SITE.url}/libros/${b.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const posts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...main, ...books, ...posts];
}
