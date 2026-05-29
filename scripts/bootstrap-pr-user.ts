/**
 * Crea (o actualiza) el primer usuario OWNER del PR Auto-Pilot.
 * Idempotente: si el email ya existe, le actualiza la contraseña/rol.
 *
 * Uso:
 *   1. Crea un archivo .env.local en la raíz con:
 *      SUPABASE_URL=...
 *      SUPABASE_SECRET_KEY=...
 *      PR_BOOTSTRAP_EMAIL=tu-correo
 *      PR_BOOTSTRAP_PASSWORD=tu-contraseña
 *   2. Corre:  npx tsx scripts/bootstrap-pr-user.ts
 */
import { readFileSync, existsSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

// Cargar .env.local manualmente (sin dependencias extra)
if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  const email = (process.env.PR_BOOTSTRAP_EMAIL || "").trim().toLowerCase();
  const password = process.env.PR_BOOTSTRAP_PASSWORD || "";

  if (!url || !key) throw new Error("Faltan SUPABASE_URL / SUPABASE_SECRET_KEY");
  if (!email || !password) throw new Error("Faltan PR_BOOTSTRAP_EMAIL / PR_BOOTSTRAP_PASSWORD");
  if (password.length < 8) throw new Error("La contraseña debe tener al menos 8 caracteres");

  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  });
  const password_hash = await bcrypt.hash(password, 12);

  const { data: existing } = await supabase
    .from("pr_users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("pr_users")
      .update({ password_hash, role: "owner" })
      .eq("id", existing.id);
    console.log(`✅ Usuario actualizado: ${email} (owner)`);
  } else {
    await supabase
      .from("pr_users")
      .insert({ email, password_hash, role: "owner" });
    console.log(`✅ Usuario creado: ${email} (owner)`);
  }
}

main().catch((e) => {
  console.error("❌ Error:", e.message);
  process.exit(1);
});
