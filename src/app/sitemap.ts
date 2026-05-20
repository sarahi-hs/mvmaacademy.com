import type { MetadataRoute } from "next";
import { SITE, BOOKS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/sobre-mi",
    "/conferencias",
    "/libros",
    "/comunidad",
    "/blog",
    "/contacto",
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

  return [...main, ...books];
}
