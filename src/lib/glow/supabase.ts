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
  created_at: string;
};

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
