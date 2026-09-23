export type GlowLesson = {
  id: string;
  title: string;
  description: string | null;
  topic: string | null;
  provider: "youtube" | "vimeo";
  video_id: string;
  video_url: string;
  published: boolean;
  created_at: string;
};

export type ParsedVideo = { provider: "youtube" | "vimeo"; videoId: string };

export function parseVideoUrl(raw: string): ParsedVideo | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\.|^m\./, "");

  if (host === "youtu.be") {
    const id = url.pathname.slice(1).split("/")[0];
    return id ? { provider: "youtube", videoId: id } : null;
  }
  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const v = url.searchParams.get("v");
    if (v) return { provider: "youtube", videoId: v };
    const m = url.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/);
    return m ? { provider: "youtube", videoId: m[1]! } : null;
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    // vimeo.com/123456789 o vimeo.com/123456789/abcdef (links privados con hash)
    const m = url.pathname.match(/(?:\/video)?\/(\d+)(?:\/([\w]+))?/);
    if (!m) return null;
    const hash = m[2] ?? url.searchParams.get("h");
    return { provider: "vimeo", videoId: hash ? `${m[1]}?h=${hash}` : m[1]! };
  }
  return null;
}

export function embedUrl(l: Pick<GlowLesson, "provider" | "video_id">): string {
  if (l.provider === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${l.video_id}?rel=0&modestbranding=1`;
  }
  const [id, query] = l.video_id.split("?");
  return `https://player.vimeo.com/video/${id}${query ? `?${query}&` : "?"}title=0&byline=0&portrait=0`;
}

export function thumbnailUrl(
  l: Pick<GlowLesson, "provider" | "video_id">,
  quality: "hd" | "sd" = "hd"
): string | null {
  if (l.provider !== "youtube") return null;
  return `https://i.ytimg.com/vi/${l.video_id}/${quality === "hd" ? "maxresdefault" : "hqdefault"}.jpg`;
}
