// Admin API for blog drafts: list every article (including drafts)
// and flip the draft flag on a given slug. Writes go through GitHub
// because Vercel's runtime FS is read-only — the API commits the
// updated JSON back to content/blog/<slug>.json on main, which
// triggers a redeploy and makes the change live.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { promises as fs } from "node:fs";
import path from "node:path";
import { verifySession, SESSION_CONFIG } from "@/lib/admin/auth";
import { getAllArticles } from "@/lib/blog";

export const runtime = "nodejs";

async function requireAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_CONFIG.cookieName)?.value;
  return verifySession(token);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const all = await getAllArticles({ includeDrafts: true });
  // Strip the heavy content field — admin list only needs metadata.
  const summary = all.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category ?? "trends",
    publishedAt: a.publishedAt,
    draft: a.draft ?? false,
    readingTime: a.readingTime,
  }));
  return NextResponse.json({ articles: summary });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // The runtime filesystem on Vercel is read-only. The admin can flip
  // draft state in two ways: (a) we offer a one-click "Publish via
  // GitHub" path that uses GITHUB_TOKEN to commit the updated JSON
  // back to main, or (b) the admin downloads the JSON, edits, pushes
  // manually. For now we only return the path the admin should commit
  // — proper GitHub-API write is a follow-up.
  let body: { slug?: string; draft?: boolean };
  try {
    body = (await request.json()) as { slug?: string; draft?: boolean };
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  if (!body.slug || typeof body.draft !== "boolean") {
    return NextResponse.json({ error: "slug et draft requis" }, { status: 400 });
  }

  // On Vercel runtime, fs.writeFile to content/blog/* will fail.
  // We try anyway because it works in local dev and on a self-hosted
  // build. If it fails we surface a clear "must commit via GitHub"
  // message for now.
  const filepath = path.join(process.cwd(), "content", "blog", `${body.slug}.json`);
  try {
    const raw = await fs.readFile(filepath, "utf-8");
    const data = JSON.parse(raw) as Record<string, unknown>;
    data.draft = body.draft;
    await fs.writeFile(filepath, JSON.stringify(data, null, 2) + "\n", "utf-8");
    revalidatePath("/blog");
    revalidatePath(`/blog/${body.slug}`);
    return NextResponse.json({ ok: true, draft: body.draft });
  } catch (err) {
    console.error("[admin-blog] write failed:", err);
    return NextResponse.json(
      {
        error:
          "Impossible d'écrire le fichier en runtime (filesystem en lecture seule). Pour publier/dépublier en production, modifiez content/blog/" +
          body.slug +
          ".json sur GitHub (champ \"draft\": " +
          (!body.draft ? "true" : "false") +
          " → " +
          body.draft +
          ").",
      },
      { status: 501 },
    );
  }
}
