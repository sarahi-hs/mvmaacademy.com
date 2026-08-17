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
  member_type: "monthly" | "annual";
  status: "active" | "paused" | "canceled";
  access_expires_at: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
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
 * - monthly: mientras status = 'active'
 * - annual : mientras access_expires_at esté en el futuro
 */
export function hasActiveAccess(m: Pick<GlowMember, "status" | "member_type" | "access_expires_at">): boolean {
  if (m.status !== "active") return false;
  if (m.member_type === "monthly") return true;
  if (m.member_type === "annual") {
    if (!m.access_expires_at) return false;
    return new Date(m.access_expires_at).getTime() > Date.now();
  }
  return false;
}
