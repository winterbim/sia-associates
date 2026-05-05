import * as fs from "fs/promises";
import * as path from "path";

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime: number;
  coverSvg: string;
  publishedAt: string;
  author: string;
  category: string;
  // Articles created by the weekly cron land with draft=true and stay
  // invisible to the public until reviewed and flipped to false.
  // Pre-existing articles without this field are treated as published.
  draft?: boolean;
}

export const CATEGORY_ORDER: readonly string[] = [
  "architecture",
  "migration",
  "cloud",
  "methodology",
  "basis",
  "trends",
] as const;

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function getAllArticles(opts?: { includeDrafts?: boolean }): Promise<BlogArticle[]> {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));

    const articles = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await fs.readFile(path.join(BLOG_DIR, file), "utf-8");
        return JSON.parse(content) as BlogArticle;
      })
    );

    // Drafts are filtered out by default — they only show up in the
    // admin where the caller passes includeDrafts:true.
    const visible = opts?.includeDrafts
      ? articles
      : articles.filter((a) => !a.draft);

    // Sort by publishedAt descending
    return visible.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch {
    return [];
  }
}

export async function getArticleBySlug(
  slug: string,
  opts?: { includeDrafts?: boolean },
): Promise<BlogArticle | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.json`);
    const content = await fs.readFile(filePath, "utf-8");
    const article = JSON.parse(content) as BlogArticle;
    // Drafts return 404 to public callers — only the admin (passing
    // includeDrafts:true) can read them.
    if (article.draft && !opts?.includeDrafts) return null;
    return article;
  } catch {
    return null;
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const CATEGORY_LABELS: Record<string, string> = {
  architecture: "Architecture",
  migration: "Migration",
  cloud: "Cloud",
  methodology: "Méthodologie",
  trends: "Tendances",
  basis: "Basis",
};

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}
