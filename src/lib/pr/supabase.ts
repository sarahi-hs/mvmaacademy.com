import { createClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase con la "secret key" (service role).
 * Solo se usa del lado del servidor — nunca exponer al navegador.
 * Bypassa RLS, por eso las tablas tienen RLS activado y solo este
 * cliente puede leerlas/escribirlas.
 */
export function prSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("Faltan SUPABASE_URL o SUPABASE_SECRET_KEY en env vars");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type PrUser = {
  id: string;
  email: string;
  password_hash: string;
  role: "owner" | "editor" | "viewer";
  created_at: string;
};
