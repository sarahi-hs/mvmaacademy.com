/**
 * Configuración central del sitio. Editar aquí cuando cambien datos.
 */

export const SITE = {
  url: "https://mvmaacademy.com",
  name: "Sarahi Haro — MVMA Academy",
  shortName: "MVMA Academy",
  description:
    "Sarahi Haro: asesora de imagen, coach de marca personal y autora. Creadora del programa MVMA — Mi Versión Más Auténtica.",
  descriptionEn:
    "Sarahi Haro: image consultant, personal brand coach, and author. Creator of the MVMA program — My Most Authentic Self.",
  locale: "es-MX",
  alternateLocale: "en-US",
  twitterHandle: "@sarahiharo", // TODO confirmar handle
} as const;

export const PERSON = {
  name: "Sarahi Haro",
  givenName: "Sarahi",
  familyName: "Haro",
  jobTitle: "Asesora de Imagen, Coach de Marca Personal y Speaker",
  nationality: "Mexicana",
  gender: "Female",
  age: 25,
  bioShortEs:
    "Asesora de imagen certificada, coach de marca personal y de vida, speaker y autora. Fundadora de MVMA (Mi Versión Más Auténtica). Ha trabajado con más de 200 mujeres y suma más de 400,000 seguidores en redes sociales.",
  bioShortEn:
    "Certified image consultant, personal brand coach, life coach, speaker and author. Founder of MVMA (My Most Authentic Self). Has worked with over 200 women and has a community of 400,000+ followers across social media.",
  bioLongEs: `Sarahi Haro es asesora de imagen certificada, personal shopper y coach de marca personal. Con un máster en asesoría de imagen, estilismo, producción y marketing de moda, ha acompañado a más de 200 mujeres a través de talleres, asesorías individuales y su programa insignia MVMA — Mi Versión Más Auténtica, donde integra el trabajo de imagen exterior con la mentalidad y la marca personal.

Speaker en México y Estados Unidos para comunidades de emprendedoras y empresarias, es autora del libro "Volver a mí y no irme nunca más" y fundadora de MVMA Tribe, una comunidad de mujeres con clases mensuales en vivo.

Con más de 5 años en el mercado de la imagen y más de 400,000 seguidores en sus redes, Sarahi se ha consolidado como una voz referente para mujeres que buscan construir una marca personal auténtica desde adentro hacia afuera.`,
  bioLongEn: `Sarahi Haro is a certified image consultant, personal shopper, and personal brand coach. With a master's in image consulting, styling, production and fashion marketing, she has guided over 200 women through workshops, one-on-one consulting, and her flagship program MVMA — My Most Authentic Self, which integrates outer image work with mindset and personal branding.

A speaker in Mexico and the United States for communities of women entrepreneurs and business owners, she is the author of "Volver a mí y no irme nunca más" (Coming Back to Myself and Never Leaving Again) and founder of MVMA Tribe, a women's community with monthly live classes.

With over 5 years in the image industry and more than 400,000 followers across her platforms, Sarahi has become a leading voice for women building authentic personal brands from the inside out.`,
  email: "sarahiharoequipo@gmail.com",
  whatsapp: "+523324956118",
  whatsappDisplay: "+52 33 2495 6118",
} as const;

export const SOCIALS = {
  // TODO confirmar handles exactos con Sarahi
  instagram: { url: "https://www.instagram.com/sarahiharo/", followers: 60000, label: "Instagram" },
  tiktok: { url: "https://www.tiktok.com/@sarahiharo", followers: 200000, label: "TikTok" },
  facebook: { url: "https://www.facebook.com/sarahiharo", followers: 100000, label: "Facebook" },
  youtube: { url: "https://www.youtube.com/@sarahiharo", followers: 30000, label: "YouTube" },
} as const;

export const STATS = [
  { value: "200+", label: "Mujeres asesoradas", labelEn: "Women coached" },
  { value: "400K+", label: "Comunidad en redes", labelEn: "Social media community" },
  { value: "5+", label: "Años de experiencia", labelEn: "Years of experience" },
  { value: "2", label: "Países donde he hablado", labelEn: "Countries I've spoken in" },
] as const;

export const CREDENTIALS = [
  "Máster en Asesoría de Imagen, Estilismo, Producción y Marketing de Moda",
  "Certificada como Asesora de Imagen Profesional",
  "Certificada como Personal Shopper",
  "Mercadóloga",
  "Coach de Marca Personal",
  "Coach de Vida",
] as const;

export const BOOKS = [
  {
    slug: "volver-a-mi-y-no-irme-nunca-mas",
    title: "Volver a mí y no irme nunca más",
    titleEn: "Coming Back to Myself and Never Leaving Again",
    year: 2024, // TODO confirmar año real
    descriptionEs:
      "Un viaje íntimo de regreso a la versión más auténtica de ti misma. A través de este libro, Sarahi acompaña a mujeres en el proceso de reencontrarse, soltar las versiones que ya no las representan y comprometerse con su verdad.",
    descriptionEn:
      "An intimate journey back to your most authentic self. Through this book, Sarahi guides women in the process of reconnecting with themselves, releasing the versions they have outgrown, and committing to their truth.",
    cover: "/books/volver-a-mi.jpg", // TODO subir portada real
    // TODO links Amazon, Goodreads, HarperCollins, etc.
    amazonUrl: null,
    goodreadsUrl: null,
  },
] as const;

export const FAQS_CONFERENCIAS = [
  {
    q: "¿Sobre qué temas das conferencias?",
    a: "Marca personal auténtica, asesoría de imagen estratégica, mentalidad para mujeres emprendedoras, construcción de comunidad digital, y el método MVMA — Mi Versión Más Auténtica.",
  },
  {
    q: "¿En qué países has presentado?",
    a: "He dado conferencias presenciales en México y en Estados Unidos para comunidades de mujeres emprendedoras, empresarias y líderes de equipos.",
  },
  {
    q: "¿Cómo contrato una conferencia o keynote?",
    a: "A través del formulario de contacto seleccionando 'Conferencia / Keynote' o escribiendo directamente a sarahiharoequipo@gmail.com. Mi asistente coordina disponibilidad, propuesta y honorarios.",
  },
  {
    q: "¿Ofreces formatos virtuales además de presenciales?",
    a: "Sí. Realizo keynotes presenciales, workshops híbridos y sesiones 100% virtuales para eventos corporativos y comunidades.",
  },
];

export const FAQS_LIBRO = [
  {
    q: "¿Dónde puedo comprar 'Volver a mí y no irme nunca más'?",
    a: "Está disponible en formato digital y físico. Próximamente se publicarán los enlaces directos a Amazon y librerías aliadas.",
  },
  {
    q: "¿De qué trata el libro?",
    a: "Es una guía y a la vez un manifiesto para mujeres que sienten que se perdieron en versiones que no las representan. Sarahi comparte herramientas concretas para regresar a la versión más auténtica de una misma.",
  },
  {
    q: "¿Para quién es este libro?",
    a: "Para cualquier mujer que esté en un proceso de reencuentro consigo misma, especialmente emprendedoras, profesionales y mujeres que sienten que su imagen exterior no refleja quiénes son por dentro.",
  },
];
