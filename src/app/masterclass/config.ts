/**
 * Configuración de la masterclass evergreen "Conviértete en una mujer que se cumple".
 *
 * CADENCIA: cada jueves a las 7:30 pm CDMX.
 *
 * 🔁 CÓMO ACTUALIZAR LA FECHA CADA SEMANA (10 segundos):
 * 1. Cambia únicamente `nextSessionIso` (ISO con offset -06:00 de CDMX)
 * 2. Cambia `nextSessionDisplay` con la nueva fecha en español
 * El contador regresivo y el schema.org se actualizan solos.
 */

export const MASTERCLASS = {
  title: "Conviértete en una mujer que se cumple",
  subtitle: "Recupera tu confianza y alcanza tus objetivos",
  eyebrow: "Masterclass online — GRATIS",

  promise:
    "Descubre qué está haciendo que sigas postergando la mujer que sabes que puedes llegar a ser, y aprende a romper el ciclo que te hace empezar una y otra vez desde cero.",

  // 👇 Próxima sesión — actualizar cada semana
  nextSessionIso: "2026-10-15T19:30:00-06:00",
  nextSessionDisplay: "Jueves 15 de octubre · 7:30 pm CDMX",

  cadence: "Cada jueves · 7:30 pm CDMX",
  durationDisplay: "60 minutos exactos",
  platform: "En vivo por Zoom",

  // Comunidad de WhatsApp (misma que antes por decisión de Sarahi)
  whatsappCommunityUrl: "https://chat.whatsapp.com/H4EjjyrL9WoK5MKYdc2fh2",

  // 4 CTAs distintos para distintos puntos del scroll
  ctaHero: "Quiero mi lugar gratis",
  ctaSecretos: "Quiero descubrir los 3 secretos",
  ctaPara: "Reservar mi lugar gratis",
  ctaFinal: "Sí, quiero mi lugar gratis",
  ctaForm: "Vengo a cumplirme",

  // TODO: cambiar a nuevo grupo de MailerLite cuando Sarahi lo cree
  // ("Mujer que se cumple" — evergreen). Por ahora usa el mismo para no bloquear.
  mailerLiteGroupId: "192550673358784123",
} as const;

/**
 * 3 secretos que revela — copy escrito por Sarahi.
 * Formato curiosidad + promesa sin revelar.
 */
export const SECRETOS = [
  {
    key: "01",
    label: "SECRETO #1",
    body: "El error silencioso que cometes cada vez que intentas 'volver a empezar' — y que podría estar alejándote cada vez más de tus objetivos.",
  },
  {
    key: "02",
    label: "SECRETO #2",
    body: "La razón por la que puedes saber perfectamente qué tienes que hacer… y aun así seguir sin hacerlo.",
  },
  {
    key: "03",
    label: "SECRETO #3",
    body: "El factor que casi nadie considera cuando intenta cambiar su vida — y que puede determinar si esta vez realmente lo sostienes o vuelves al mismo lugar.",
  },
] as const;

/**
 * "Esta masterclass es para ti si…" — copy escrito por Sarahi.
 */
export const PARA_QUIEN = [
  "Te emocionas con nuevas metas, pero te cuesta mantenerlas.",
  "Sabes que tienes muchísimo potencial, pero sientes que no lo estás aprovechando al máximo.",
  "Has dejado tus necesidades, tus sueños o tus proyectos para después.",
  "Quieres recuperar la confianza en ti.",
  "Quieres sentirte orgullosa de la mujer en la que te estás convirtiendo.",
  "Sabes que estás hecha para más, y estás lista para tu siguiente nivel.",
] as const;

/**
 * Bio de la host — copy escrito por Sarahi (firma como "Sara Haro" aquí).
 */
export const HOST = {
  name: "Sarahi Haro",
  role: "Personal Branding Expert",
  credentials: "Creadora de MVMA ACADEMY® y The Glow Club",
  bio: [
    "Durante los últimos años he acompañado a cientos de mujeres a fortalecer su identidad, confianza, imagen y manera de mostrarse ante el mundo.",
    "Y algo que he comprobado una y otra vez es que tener potencial no siempre es suficiente.",
    "Por eso creé esta masterclass: para ayudarte a entender qué está interfiriendo entre la mujer que eres hoy y la mujer que sabes que puedes llegar a ser.",
  ],
  photo: "/images/sarahi/sarahi-tablet.jpg",
} as const;

/**
 * Testimonios — pendientes de que Sarahi mande screenshots.
 * Los transcribiré cuando lleguen. Por ahora dejo la sección oculta.
 */
export const TESTIMONIOS: ReadonlyArray<{
  quote: string;
  name: string;
  location?: string;
}> = [];
