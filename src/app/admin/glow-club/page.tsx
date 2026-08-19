import { redirect } from "next/navigation";
import { getSession } from "@/lib/pr/auth";
import { glowSupabase } from "@/lib/glow/supabase";
import { getCurrentChallenge, getMonthlyRanking } from "@/lib/glow/data";
import GlowAdminClient from "./GlowAdminClient";

export const dynamic = "force-dynamic";

export default async function GlowClubAdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const supa = glowSupabase();
  const [membersRes, challenge, ranking] = await Promise.all([
    supa
      .from("glow_members")
      .select("id, email, full_name, initials, status, must_change_password, created_at")
      .order("created_at", { ascending: false }),
    getCurrentChallenge(),
    getMonthlyRanking(),
  ]);

  const members = (membersRes.data || []) as Array<{
    id: string;
    email: string;
    full_name: string;
    initials: string | null;
    status: "active" | "paused";
    must_change_password: boolean;
    created_at: string;
  }>;

  return (
    <GlowAdminClient
      members={members}
      challenge={challenge}
      ranking={ranking}
    />
  );
}
