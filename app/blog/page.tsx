import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import {
  getAllArticles,
  formatDate,
  getCategoryLabel,
  CATEGORY_ORDER,
  type BlogArticle,
} from "@/lib/blog";
import { BLOG_TOPICS } from "@/lib/blog-topics";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles techniques SAP : architecture S/4HANA, migration, cloud, méthodologie. Retours d'expérience concrets par Amine Silemane.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const articles = await getAllArticles();

  // Group articles by category, in the canonical category order so the
  // page reads as a stable rubric index — Architecture first, Tendances
  // last — instead of shuffling whenever a new article lands.
  const grouped = new Map<string, BlogArticle[]>();
  for (const a of articles) {
    const cat = a.category ?? "trends";
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(a);
  }
  const orderedCategories = CATEGORY_ORDER.filter((c) => grouped.has(c)).concat(
    [...grouped.keys()].filter((c) => !CATEGORY_ORDER.includes(c))
  );

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="bg-ink py-16 md:py-24">
        <div className="section-container">
          <p className="kicker mb-4">Blog</p>
          <h1 className="display-heading max-w-3xl text-3xl text-bone md:text-5xl">
            Retours d&apos;expérience,{" "}
            <em className="text-gold">sans langue de bois</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ash-light md:text-lg">
            Articles techniques SAP : architecture, migration, cloud,
            méthodologie. Des insights concrets, issus de 19+ ans de terrain.
          </p>
        </div>
      </section>

      {/* Rubric index — quick jump links so visitors can skim by category */}
      {articles.length > 0 && (
        <nav
          aria-label="Rubriques"
          className="border-b border-hairline bg-bone"
        >
          <div className="section-container flex flex-wrap items-center gap-x-6 gap-y-2 py-4 font-mono text-[11px] uppercase tracking-kicker text-ash">
            <span className="text-ash-light">Rubriques&nbsp;:</span>
            {orderedCategories.map((cat) => (
              <a
                key={cat}
                href={`#${cat}`}
                className="transition-colors hover:text-ink"
              >
                {getCategoryLabel(cat)}
                <span className="ml-1 text-ash-light">
                  ({grouped.get(cat)!.length})
                </span>
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Articles grouped by rubric */}
      <section className="bg-bone py-16 md:py-24">
        <div className="section-container">
          {articles.length > 0 ? (
            <div className="space-y-20">
              {orderedCategories.map((cat) => (
                <section
                  key={cat}
                  id={cat}
                  className="scroll-mt-24"
                  aria-labelledby={`heading-${cat}`}
                >
                  <ScrollReveal animation="fade-up">
                    <div className="mb-8 flex items-end justify-between border-b border-hairline pb-4">
                      <h2
                        id={`heading-${cat}`}
                        className="display-heading text-2xl md:text-3xl"
                      >
                        {getCategoryLabel(cat)}
                      </h2>
                      <span className="font-mono text-[11px] uppercase tracking-kicker text-ash">
                        {grouped.get(cat)!.length} article
                        {grouped.get(cat)!.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </ScrollReveal>

                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {grouped.get(cat)!.map((article, i) => (
                      <ScrollReveal
                        key={article.slug}
                        animation="fade-up"
                        delay={i * 80}
                      >
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
                            <div className="mb-3 flex flex-wrap gap-2">
                              {article.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-sm bg-ink/5 px-2 py-0.5 font-mono text-[10px] text-ash"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <h3 className="font-display text-lg font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-gold">
                              {article.title}
                            </h3>

                            <p className="mt-2 flex-1 text-sm leading-relaxed text-ash">
                              {article.excerpt}
                            </p>

                            <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3">
                              <div className="flex items-center gap-3 text-xs text-ash">
                                <time dateTime={article.publishedAt}>
                                  {formatDate(article.publishedAt)}
                                </time>
                                <span className="flex items-center gap-1">
                                  <Clock size={12} strokeWidth={1.5} />
                                  {article.readingTime} min
                                </span>
                              </div>
                              <ArrowRight
                                size={14}
                                strokeWidth={1.5}
                                className="text-ash transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold"
                              />
                            </div>
                          </div>
                        </Link>
                      </ScrollReveal>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            /* Empty state with upcoming topics */
            <div>
              <div className="mb-12 rounded-lg border border-gold/20 bg-gold/5 p-8 text-center">
                <Tag size={32} strokeWidth={1.5} className="mx-auto mb-4 text-gold" />
                <h2 className="font-display text-xl font-medium text-ink">
                  Le blog arrive bientôt
                </h2>
                <p className="mt-2 text-sm text-ash">
                  Les articles sont générés automatiquement chaque semaine.
                  Voici les sujets à venir.
                </p>
              </div>

              <h3 className="kicker mb-6">Prochains sujets</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {BLOG_TOPICS.slice(0, 9).map((topic, i) => (
                  <ScrollReveal key={topic.slug} animation="fade-up" delay={i * 60}>
                    <div className="group rounded-lg border border-hairline bg-bone p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5">
                      <span className="inline-block rounded-sm bg-ink/5 px-2 py-0.5 font-mono text-[10px] uppercase text-ash">
                        {topic.category}
                      </span>
                      <p className="mt-2 text-sm font-medium leading-snug text-ink">
                        {topic.topic}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
