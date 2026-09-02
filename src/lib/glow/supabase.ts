import { createClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase para el módulo Glow Club.
 * Usa la "secret key" (service_role): bypassa RLS, solo servidor.
 * Nunca importar este archivo desde componentes cliente.
 */
export function glowSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("Faltan SUPABASE_URL o SUPABASE_SECRET_KEY en env vars");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// ------ Tipos que reflejan las tablas de glow_* ------

export type GlowMember = {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  initials: string | null;
  status: "active" | "paused";
  must_change_password: boolean;
  created_at: string;
  updated_at: string;
};

export type GlowChallenge = {
  id: string;
  month: string; // 'YYYY-MM-01'
  title: string;
  description: string | null;
  points_per_day: number;
  prize: string | null;
  closing_phrase: string | null; // frase corta al cerrar el check + reflexión
  created_at: string;
};

/** Frase por defecto si Sarahi no configura una en el admin del reto. */
export const DEFAULT_CLOSING_PHRASE =
  "Cada día que te eliges, te construyes.";

export type GlowCheckin = {
  id: string;
  member_id: string;
  challenge_id: string;
  checkin_date: string; // 'YYYY-MM-DD'
  points_earned: number;
  created_at: string;
};

export type GlowRankingRow = {
  member_id: string;
  full_name: string;
  initials: string | null;
  challenge_id: string;
  challenge_month: string;
  days_completed: number;
  total_points: number;
  last_checkin: string | null;
};

export type GlowReflection = {
  id: string;
  member_id: string;
  challenge_id: string;
  reflection_date: string; // 'YYYY-MM-DD'
  text: string;
  created_at: string;
};

// Respuesta al hilo de una reflexión (cualquier chica puede responder)
export type GlowReflectionReply = {
  id: string;
  reflection_id: string;
  member_id: string;
  text: string;
  created_at: string;
  author_name: string;
  author_initials: string | null;
};

// Reflexión enriquecida con datos de la chica que la escribió y su hilo
// de respuestas, para pintar el feed del "Diario de la comunidad" sin
// joins extra en el cliente.
export type GlowReflectionWithAuthor = GlowReflection & {
  author_name: string;
  author_initials: string | null;
  replies: GlowReflectionReply[];
};

// ------ Reglas de acceso ------

/**
 * Devuelve true si la chica tiene acceso vigente al Glow Club.
 * Simple: mientras el status sea 'active'.
 * Si en el futuro Sarahi deja de cobrar a alguien, cambia el status a 'paused'
 * desde su panel admin y esa chica pierde acceso.
 */
export function hasActiveAccess(m: Pick<GlowMember, "status">): boolean {
  return m.status === "active";
}
