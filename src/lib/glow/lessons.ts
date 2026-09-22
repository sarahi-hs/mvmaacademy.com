import { glowSupabase } from "./supabase";
import type { GlowLesson } from "./video";

export type { GlowLesson } from "./video";

export async function getLessons(opts: { includeUnpublished?: boolean } = {}): Promise<GlowLesson[]> {
  const supa = glowSupabase();
  let q = supa.from("glow_lessons").select("*").order("created_at", { ascending: false });
  if (!opts.includeUnpublished) q = q.eq("published", true);
  const { data, error } = await q;
  if (error) {
    console.error("[glow lessons] list", error);
    return [];
  }
  return (data || []) as GlowLesson[];
}

export async function getLesson(id: string): Promise<GlowLesson | null> {
  const supa = glowSupabase();
  const { data, error } = await supa
    .from("glow_lessons")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("[glow lessons] get", error);
    return null;
  }
  return (data as GlowLesson) || null;
}
