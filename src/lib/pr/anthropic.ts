import Anthropic from "@anthropic-ai/sdk";

/**
 * Contexto sobre Sarahi para que la IA califique y redacte respuestas
 * con su voz y expertise. Editar aquí si su info cambia.
 */
const SARAHI_CONTEXT = `
Sarahi Haro es asesora de imagen, coach de marca personal, speaker y autora.
- 5 años de experiencia, +200 mujeres formadas.
- Creadora del método MVMA (Mi Versión Más Auténtica).
- Autora del libro "Volver a mí y no irme nunca más".
- Bases en Guadalajara (México) y McAllen, Texas (EE.UU.). Bilingüe (español/inglés).
- Temas de expertise: imagen personal, primeras impresiones, marca personal auténtica,
  imagen y autoestima, vestir para comunicar autoridad, empoderamiento femenino,
  imagen como activo de negocio, mujeres emprendedoras y líderes.
Tono de Sarahi: cálido, cercano, empoderador, profesional pero humano.
`.trim();

export type Scored = { score: number; draft: string };

export async function scoreAndDraft(query: {
  subject?: string | null;
  body?: string | null;
  source?: string | null;
}): Promise<Scored> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("Falta ANTHROPIC_API_KEY en env vars");

  const client = new Anthropic({ apiKey });

  const userContent = `
Eres el asistente de relaciones públicas de Sarahi Haro.

CONTEXTO SOBRE SARAHI:
${SARAHI_CONTEXT}

PETICIÓN DE UN PERIODISTA (recibida vía ${query.source ?? "plataforma PR"}):
Asunto: ${query.subject ?? "(sin asunto)"}
Contenido: ${query.body ?? "(sin contenido)"}

TU TAREA:
1. Califica del 0 al 100 qué tan relevante es esta petición para Sarahi
   (100 = encaja perfecto con su expertise; 0 = nada que ver, ej. cripto, deportes).
   También sube el score si es una oportunidad de speaker, podcast o evento femenino.
2. Si el score es 40 o más, redacta un borrador de respuesta corto (máx 150 palabras),
   en el idioma de la petición, con la voz de Sarahi, que responda concretamente lo
   que pide el periodista e incluya su credencial al final
   ("— Sarahi Haro, asesora de imagen y creadora del método MVMA").
   Si el score es menor a 40, deja el borrador vacío.

Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional, con este formato:
{"score": <número 0-100>, "draft": "<borrador o cadena vacía>"}
`.trim();

  const msg = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: userContent }],
  });

  const text = msg.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  // Extraer el JSON aunque venga con texto alrededor
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return { score: 0, draft: "" };
  try {
    const parsed = JSON.parse(match[0]);
    const score = Math.max(0, Math.min(100, Number(parsed.score) || 0));
    const draft = typeof parsed.draft === "string" ? parsed.draft : "";
    return { score, draft };
  } catch {
    return { score: 0, draft: "" };
  }
}
