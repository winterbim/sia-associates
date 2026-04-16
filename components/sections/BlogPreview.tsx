import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { getAllArticles, formatDate } from "@/lib/blog";
import { BLOG_TOPICS } from "@/lib/blog-topics";
import { ScrollReveal } from "@/components/ScrollReveal";

export async function BlogPreview() {
  const articles = await getAllArticles();
  const hasArticles = articles.length > 0;

  return (
    <section className="border-t border-hairline bg-bone py-20 md:py-28" aria-labelledby="blog-heading">
      <div className="section-container">
        <ScrollReveal animation="fade-up">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="kicker mb-4">Blog</p>
              <h2
                id="blog-heading"
                className="display-heading text-2xl md:text-4xl"
              >
                Derniers <em>articles</em>
              </h2>
            </div>
            <Link
              href="/blog"
              className="group hidden items-center gap-2 font-mono text-xs uppercase tracking-kicker text-ash transition-colors hover:text-ink md:flex"
            >
              Voir tous les articles
              <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        {hasArticles ? (
          <div className="grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((article, i) => (
              <ScrollReveal key={article.slug} animation="fade-up" delay={i * 120}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-bone transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
                >
                  <div className="relative aspect-[5/2] overflow-hidden bg-ink">
                    <div
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                      dangerouslySetInnerHTML={{ __html: article.coverSvg }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm bg-ink/5 px-2 py-0.5 font-mono text-[10px] text-ash"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display text-lg font-medium leading-snug text-ink transition-colors group-hover:text-gold">
                      {article.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-ash">{article.excerpt}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-ash">
                      <span>{formatDate(article.publishedAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} strokeWidth={1.5} />
                        {article.readingTime} min
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_TOPICS.slice(0, 3).map((topic, i) => (
              <ScrollReveal key={topic.slug} animation="fade-up" delay={i * 100}>
                <div className="group rounded-lg border border-hairline bg-bone p-5 transition-all duration-300 hover:border-gold/30">
                  <span className="inline-block rounded-sm bg-ink/5 px-2 py-0.5 font-mono text-[10px] uppercase text-ash">
                    {topic.category}
                  </span>
                  <p className="mt-3 text-sm font-medium leading-snug text-ink">
                    {topic.topic}
                  </p>
                  <p className="mt-2 text-xs text-ash">A venir</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal animation="fade-up" delay={400}>
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-kicker text-ash transition-colors hover:text-ink"
            >
              Voir tous les articles
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
