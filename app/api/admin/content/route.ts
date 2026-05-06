import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { verifySession, SESSION_CONFIG } from "@/lib/admin/auth";
import {
  getSiteContent,
  updateSiteSection,
} from "@/lib/admin/content-store";
import type { SiteContent } from "@/lib/admin/defaults";

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
  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  let body: { section?: keyof SiteContent; value?: unknown };
  try {
    body = (await request.json()) as { section?: keyof SiteContent; value?: unknown };
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { section, value } = body;
  const allowed: Array<keyof SiteContent> = [
    "hero",
    "about",
    "pillars",
    "cases",
    "clients",
    "approche",
    "contact",
  ];
  if (!section || !allowed.includes(section)) {
    return NextResponse.json({ error: "Section invalide" }, { status: 400 });
  }
  if (value === undefined || value === null) {
    return NextResponse.json({ error: "Valeur requise" }, { status: 400 });
  }

  try {
    await updateSiteSection(section, value as SiteContent[typeof section]);
  } catch (err) {
    console.error("[admin-content] save failed:", err);
    const message = err instanceof Error ? err.message : "Échec de la sauvegarde";
    const isKvIssue = message.toLowerCase().includes("kv");
    return NextResponse.json(
      {
        error: isKvIssue
          ? "Vercel KV n'est pas activé. Va sur Vercel → Storage → Create Database → KV → Connect ce projet, puis redéploie."
          : message,
      },
      { status: 500 },
    );
  }

  // Force every page that reads site content to refresh on the next
  // request — this is what makes the admin feel instant. The list is
  // narrow on purpose; expand it if a new editable section starts
  // showing on additional routes.
  revalidatePath("/");
  revalidatePath("/expertise");
  revalidatePath("/clients");
  revalidatePath("/approche");
  revalidatePath("/contact");

  return NextResponse.json({ ok: true });
}
