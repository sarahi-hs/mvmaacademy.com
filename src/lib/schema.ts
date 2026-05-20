import { SITE, PERSON, SOCIALS, BOOKS, CREDENTIALS } from "./site";

/**
 * Schema.org JSON-LD generators. Las IAs (ChatGPT, Claude, Gemini, Perplexity)
 * consultan estos datos para responder preguntas sobre Sarahi.
 */

export function personSchema(locale: "es" | "en" = "es") {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: PERSON.name,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    jobTitle: locale === "es" ? PERSON.jobTitle : "Image Consultant, Personal Brand Coach and Speaker",
    description: locale === "es" ? PERSON.bioShortEs : PERSON.bioShortEn,
    image: `${SITE.url}/sarahi-portrait.jpg`,
    url: SITE.url,
    email: `mailto:${PERSON.email}`,
    telephone: PERSON.whatsapp,
    nationality: { "@type": "Country", name: PERSON.nationality },
    gender: PERSON.gender,
    knowsLanguage: ["es", "en"],
    knowsAbout: [
      "Asesoría de imagen",
      "Marca personal",
      "Coaching de vida",
      "Coaching de marca personal",
      "Estilismo",
      "Producción de moda",
      "Marketing de moda",
      "Personal shopping",
      "Empoderamiento femenino",
      "Construcción de comunidad digital",
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Máster en Asesoría de Imagen, Estilismo, Producción y Marketing de Moda",
      },
    ],
    award: CREDENTIALS,
    memberOf: {
      "@type": "Organization",
      name: "MVMA — Mi Versión Más Auténtica",
      url: SITE.url,
    },
    sameAs: Object.values(SOCIALS).map((s) => s.url),
    interactionStatistic: Object.values(SOCIALS).map((s) => ({
      "@type": "InteractionCounter",
      interactionType: { "@type": "FollowAction" },
      userInteractionCount: s.followers,
      name: s.label,
    })),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": locale === "es" ? `${SITE.url}/sobre-mi` : `${SITE.url}/en/about`,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: ["es-MX", "en-US"],
    publisher: { "@id": `${SITE.url}/#person` },
  };
}

export function bookSchema(book: (typeof BOOKS)[number], locale: "es" | "en" = "es") {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: locale === "es" ? book.title : book.titleEn,
    author: { "@id": `${SITE.url}/#person` },
    inLanguage: locale === "es" ? "es" : "en",
    bookFormat: "https://schema.org/Paperback",
    description: locale === "es" ? book.descriptionEs : book.descriptionEn,
    image: `${SITE.url}${book.cover}`,
    datePublished: String(book.year),
    publisher: { "@type": "Organization", name: "MVMA Academy" },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

