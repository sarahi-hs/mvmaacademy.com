/**
 * Configuración de la masterclass. Editar aquí cuando cambien datos.
 */

export const MASTERCLASS = {
  title: "Deja de Esconderte",
  subtitle:
    "Cómo proyectar el poder que ya tienes dentro para convertirte en referente de tu industria — sin ser experta en moda",
  // Fecha en ISO con offset de CDMX (UTC-6, sin horario de verano desde 2022)
  dateIso: "2026-07-28T19:00:00-06:00",
  dateDisplay: "Martes 28 de julio · 7:00 pm CDMX",
  durationDisplay: "1h30 – 1h45",
  platform: "En vivo por Zoom",
  whatsappCommunityUrl: "https://chat.whatsapp.com/H4EjjyrL9WoK5MKYdc2fh2",
  ctaLabel: "Estoy lista para mi grandeza — Reservar gratis",
  ctaHero: "Estoy lista para mi grandeza — Reservar mi lugar",
  ctaVideo: "Sé que es mi momento — Reservar mi lugar",
  ctaShort: "Reservar mi lugar gratis",
  // ID del grupo en MailerLite donde caen las registradas
  mailerLiteGroupId: "192550673358784123",
} as const;

export const PARA_QUIEN = [
  "Estás emprendiendo o quieres emprender (tu negocio, tu marca, tu carrera).",
  "Estás lista para accionar e invertir en ti.",
  "Sientes que tienes TODO para lograrlo, pero algo te frena.",
  "Quieres proyectarte como una mujer segura y magnética.",
  "Quieres convertirte en referente de tu industria.",
] as const;

export const PILARES = [
  {
    key: "autoridad",
    label: "Autoridad",
    description: "Que te vean como la referente que ya eres, aunque aún no lo hayas dicho en voz alta.",
  },
  {
    key: "impacto",
    label: "Impacto",
    description: "Que cada vez que aparezcas — en vivo, en foto, en junta — te ganes el espacio que mereces.",
  },
  {
    key: "libertad",
    label: "Libertad",
    description: "Que dejes de disfrazarte para caber donde no perteneces y empieces a atraer donde sí.",
  },
] as const;

export const APRENDERAS = [
  {
    title: "Por qué la ropa nunca fue el problema",
    body: "y cómo convertirla en tu herramienta de posicionamiento.",
  },
  {
    title: "El sabotaje invisible que te hace pequeña",
    body: "cómo detectarlo y desactivarlo.",
  },
  {
    title: "El secreto para atraer lo que sí quieres",
    body: "y posicionarte como la referente de tu industria.",
  },
] as const;

export const TESTIMONIOS = [
  {
    quote:
      "Haber tomado la decisión de dejar de postergarme y por fin hacer algo para mí, para mi evolución, es algo que me cambió la vida.",
    name: "Natalia R.",
    location: "Puebla",
  },
  {
    quote:
      "Nunca pensé que con Sarahi encontraría la respuesta de qué era lo que me estaba frenando, pero ahora por fin tengo claridad en mi objetivo y comencé a ver resultados.",
    name: "Viviana M.",
    location: "Guadalajara",
  },
  {
    quote:
      "Con Sarahi entendí lo que realmente significaba vestirte para las oportunidades, y se fue la frustración de no saber qué ponerme.",
    name: "Mariana L.",
    location: "Texas",
  },
] as const;
