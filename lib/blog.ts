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
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function getAllArticles(): Promise<BlogArticle[]> {
  try {
    const files = await fs.readdir(BLOG_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));

    const articles = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await fs.readFile(path.join(BLOG_DIR, file), "utf-8");
        return JSON.parse(content) as BlogArticle;
      })
    );

    // Sort by publishedAt descending
    return articles.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch {
    return [];
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<BlogArticle | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.json`);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as BlogArticle;
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
  methodology: "Methodologie",
  trends: "Tendances",
  basis: "Basis",
};

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}
