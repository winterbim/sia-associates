import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { getAllArticles, formatDate } from "@/lib/blog";
import { BLOG_TOPICS } from "@/lib/blog-topics";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles techniques SAP : architecture S/4HANA, migration, cloud, methodologie. Retours d'experience concrets par Amine Silemane.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const articles = await getAllArticles();

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="bg-ink py-16 md:py-24">
        <div className="section-container">
          <p className="kicker mb-4">Blog</p>
          <h1 className="display-heading max-w-3xl text-3xl text-bone md:text-5xl">
            Retours d&apos;experience,{" "}
            <em className="text-gold">sans langue de bois</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ash-light md:text-lg">
            Articles techniques SAP : architecture, migration, cloud,
            methodologie. Des insights concrets, issus de 20+ ans de terrain.
          </p>
        </div>
      </section>

      {/* Articles list */}
      <section className="bg-bone py-16 md:py-24">
        <div className="section-container">
          {articles.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <ScrollReveal key={article.slug} animation="fade-up" delay={i * 100}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-bone transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
                  >
                    {/* Cover */}
                    <div className="relative aspect-[5/2] overflow-hidden bg-ink">
                      <div
                        className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                        dangerouslySetInnerHTML={{
                          __html: article.coverSvg,
                        }}
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      {/* Tags */}
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

                      <h2 className="font-display text-lg font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-gold">
                        {article.title}
                      </h2>

                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ash">
                        {article.excerpt}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3">
                        <div className="flex items-center gap-3 text-xs text-ash">
                          <span>{formatDate(article.publishedAt)}</span>
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
          ) : (
            /* Empty state with upcoming topics */
            <div>
              <div className="mb-12 rounded-lg border border-gold/20 bg-gold/5 p-8 text-center">
                <Tag size={32} strokeWidth={1.5} className="mx-auto mb-4 text-gold" />
                <h2 className="font-display text-xl font-medium text-ink">
                  Le blog arrive bientot
                </h2>
                <p className="mt-2 text-sm text-ash">
                  Les articles sont generes automatiquement chaque semaine.
                  Voici les sujets a venir.
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
