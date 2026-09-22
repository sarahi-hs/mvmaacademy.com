import { redirect } from "next/navigation";
import { getSession } from "@/lib/pr/auth";
import { getLessons } from "@/lib/glow/lessons";
import LessonsAdminClient from "./LessonsAdminClient";

export const dynamic = "force-dynamic";

export default async function GlowLessonsAdminPage() {
  if (!(await getSession())) redirect("/admin/login");
  const lessons = await getLessons({ includeUnpublished: true });
  return <LessonsAdminClient lessons={lessons} />;
}
