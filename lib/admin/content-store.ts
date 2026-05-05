// Read/write the editable site content. Source of truth is Vercel KV
// at the key `site:content`. If KV isn't configured (e.g. during local
// dev without env vars, or as a graceful fallback when the store is
// unreachable), reads return DEFAULT_CONTENT so the public site never
// breaks. Writes throw — admin actions must hit a real KV.

import { kv } from "@vercel/kv";
import { DEFAULT_CONTENT, type SiteContent } from "./defaults";

const KEY = "site:content";

function isKvConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!isKvConfigured()) return DEFAULT_CONTENT;
  try {
    const stored = await kv.get<Partial<SiteContent>>(KEY);
    if (!stored) return DEFAULT_CONTENT;
    // Merge stored values onto defaults so any missing section
    // (e.g. a new section added in code after KV was populated)
    // still renders. Shallow merge is enough — each top-level key
    // is replaced atomically by the admin.
    return { ...DEFAULT_CONTENT, ...stored } as SiteContent;
  } catch (err) {
    console.error("[content-store] KV read failed, using defaults:", err);
    return DEFAULT_CONTENT;
  }
}

export async function updateSiteSection<K extends keyof SiteContent>(
  section: K,
  value: SiteContent[K],
): Promise<void> {
  if (!isKvConfigured()) {
    throw new Error("KV is not configured on this environment");
  }
  const current = await getSiteContent();
  const next = { ...current, [section]: value };
  await kv.set(KEY, next);
}

export async function replaceSiteContent(value: SiteContent): Promise<void> {
  if (!isKvConfigured()) {
    throw new Error("KV is not configured on this environment");
  }
  await kv.set(KEY, value);
}
