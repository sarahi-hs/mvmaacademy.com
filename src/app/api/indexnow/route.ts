import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { POSTS } from "@/lib/blog";

/**
 * GET /api/indexnow
 * Notifica a Bing y Yandex de TODAS las URLs del sitio.
 * Útil después de un deploy con cambios significativos.
 *
 * Endpoint público — Microsoft/Yandex validan via el archivo /[key].txt
 */

const INDEXNOW_KEY = "ce73e14313b97c5774471943223f048952eab2bb61ebfb9b2b162788d1ea3d2e";
const HOST = "mvmaacademy.com";

function getAllUrls(): string[] {
  const main = [
    "",
    "/sobre-mi",
    "/conferencias",
    "/libros",
    "/libros/volver-a-mi-y-no-irme-nunca-mas",
    "/comunidad",
    "/blog",
    "/contacto",
  ];
  const posts = POSTS.map((p) => `/blog/${p.slug}`);
  return [...main, ...posts].map((path) => `${SITE.url}${path}`);
}

export async function GET(_req: NextRequest) {
  const urlList = getAllUrls();

  const body = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE.url}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  const results: Record<string, unknown> = {};

  // Notify Bing (also forwards to other IndexNow participants)
  try {
    const bingRes = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    results.indexnow = { status: bingRes.status, ok: bingRes.ok };
  } catch (e) {
    results.indexnow = { error: String(e) };
  }

  // Also notify Yandex directly
  try {
    const yandexRes = await fetch("https://yandex.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    results.yandex = { status: yandexRes.status, ok: yandexRes.ok };
  } catch (e) {
    results.yandex = { error: String(e) };
  }

  return NextResponse.json({ submitted: urlList.length, results });
}
