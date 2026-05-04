import { NextResponse } from "next/server";
import { generateArticle, generateArticleImage } from "@/lib/groq";
import { BLOG_TOPICS, getCurrentWeekNumber, getTopicForWeek } from "@/lib/blog-topics";
import * as fs from "fs/promises";
import * as path from "path";

// Simple auth token to protect generation endpoint
function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  const token = process.env.BLOG_GENERATE_TOKEN;
  // If no token configured, allow in dev
  if (!token) return process.env.NODE_ENV === "development";
  return authHeader === `Bearer ${token}`;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as { slug?: string; topic?: string };

    let topic: string;
    let slug: string;
    let category: string | undefined;

    if (body.slug) {
      // Generate specific article by slug
      const found = BLOG_TOPICS.find((t) => t.slug === body.slug);
      if (!found) {
        return NextResponse.json({ error: "Sujet introuvable" }, { status: 404 });
      }
      topic = found.topic;
      slug = found.slug;
      category = found.category;
    } else if (body.topic) {
      // Custom topic
      topic = body.topic;
      slug = topic
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .substring(0, 80);
    } else {
      // Auto: pick this week's topic, skipping ones already generated so a
      // weekly cron eventually fills the whole catalog instead of looping
      // back to articles we already have.
      const articlesDirCheck = path.join(process.cwd(), "content", "blog");
      let existing: Set<string>;
      try {
        const files = await fs.readdir(articlesDirCheck);
        existing = new Set(files.filter((f) => f.endsWith(".json")).map((f) => f.replace(".json", "")));
      } catch {
        existing = new Set();
      }
      const baseWeek = getCurrentWeekNumber();
      let weekTopic = getTopicForWeek(baseWeek);
      for (let i = 1; existing.has(weekTopic.slug) && i < BLOG_TOPICS.length; i++) {
        weekTopic = getTopicForWeek(baseWeek + i);
      }
      topic = weekTopic.topic;
      slug = weekTopic.slug;
      category = weekTopic.category;
    }

    // Check if article already exists
    const articlesDir = path.join(process.cwd(), "content", "blog");
    const articlePath = path.join(articlesDir, `${slug}.json`);

    try {
      await fs.access(articlePath);
      // File exists, return it
      const existing = JSON.parse(await fs.readFile(articlePath, "utf-8")) as Record<string, unknown>;
      return NextResponse.json({ article: existing, cached: true });
    } catch {
      // File doesn't exist, generate
    }

    // Generate article with Groq
    const article = await generateArticle(topic);

    // Generate cover image SVG
    const coverSvg = await generateArticleImage(article.title);

    // Save article
    await fs.mkdir(articlesDir, { recursive: true });

    const articleData = {
      slug,
      ...article,
      coverSvg,
      category: category ?? "trends",
      publishedAt: new Date().toISOString(),
      author: "Amine Silemane",
    };

    await fs.writeFile(articlePath, JSON.stringify(articleData, null, 2));

    // Save cover SVG
    const coversDir = path.join(process.cwd(), "public", "blog");
    await fs.mkdir(coversDir, { recursive: true });
    await fs.writeFile(path.join(coversDir, `${slug}.svg`), coverSvg);

    return NextResponse.json({ article: articleData, cached: false });
  } catch (error) {
    console.error("Blog generation error:", error);
    const message = error instanceof Error ? error.message : "Erreur serveur";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET: List available topics and generated articles
export async function GET() {
  const articlesDir = path.join(process.cwd(), "content", "blog");

  let generatedArticles: string[] = [];
  try {
    const files = await fs.readdir(articlesDir);
    generatedArticles = files
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));
  } catch {
    // No articles yet
  }

  const weekNum = getCurrentWeekNumber();
  const currentTopic = getTopicForWeek(weekNum);

  return NextResponse.json({
    currentWeek: weekNum,
    currentTopic,
    totalTopics: BLOG_TOPICS.length,
    generatedArticles,
    topics: BLOG_TOPICS.map((t) => ({
      slug: t.slug,
      category: t.category,
      generated: generatedArticles.includes(t.slug),
    })),
  });
}
