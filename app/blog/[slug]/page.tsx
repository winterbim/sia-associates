import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User } from "lucide-react";
import { getArticleBySlug, getAllArticles, formatDate } from "@/lib/blog";
import { ScrollReveal } from "@/components/ScrollReveal";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "Article introuvable" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
  };
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

// Simple markdown to HTML (no external dependency)
function markdownToHtml(md: string): string {
  return md
    // H3 before H2
    .replace(/^### (.+)$/gm, '<h3 class="font-display text-xl font-medium text-ink mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-display text-2xl font-medium text-ink mt-12 mb-4 pb-2 border-b border-hairline">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-medium text-ink">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em class="text-oxblood">$1</em>')
    // Code inline
    .replace(/`(.+?)`/g, '<code class="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-sm text-graphite">$1</code>')
    // Paragraphs (lines not starting with < or empty)
    .replace(/^(?!<[h|u|o|l|b|p|d])(.+)$/gm, '<p class="mb-4 leading-relaxed text-graphite">$1</p>')
    // Remove empty paragraphs
    .replace(/<p class="[^"]*"><\/p>/g, "");
}

export default async function BlogArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const allArticles = await getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const htmlContent = markdownToHtml(article.content);

  return (
    <div className="pt-20 md:pt-24">
      {/* Article header */}
      <section className="bg-ink py-12 md:py-20">
        <div className="section-container max-w-4xl">
          <ScrollReveal animation="fade-up">
            <Link
              href="/blog"
              className="group mb-8 inline-flex items-center gap-2 text-sm text-ash-light transition-colors hover:text-bone"
            >
              <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" />
              Retour au blog
            </Link>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <div className="mb-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-white/10 px-2 py-0.5 font-mono text-[11px] text-gold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <h1 className="display-heading max-w-3xl text-2xl text-bone md:text-4xl lg:text-5xl">
              {article.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <div className="mt-6 flex items-center gap-6 text-sm text-ash-light">
              <span className="flex items-center gap-2">
                <User size={14} strokeWidth={1.5} className="text-gold" />
                {article.author}
              </span>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="flex items-center gap-1">
                <Clock size={14} strokeWidth={1.5} />
                {article.readingTime} min de lecture
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cover image */}
      <section className="bg-bone">
        <div className="section-container max-w-4xl -mt-4">
          <ScrollReveal animation="scale">
            <div
              className="overflow-hidden rounded-lg border border-hairline shadow-lg"
              dangerouslySetInnerHTML={{ __html: article.coverSvg }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Article content */}
      <section className="bg-bone py-12 md:py-16">
        <div className="section-container max-w-3xl">
          <ScrollReveal animation="fade-up">
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-hairline bg-bone py-12 md:py-16">
          <div className="section-container">
            <h2 className="display-heading mb-8 text-2xl">
              Articles <em>connexes</em>
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group rounded-lg border border-hairline bg-bone p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
                >
                  <div className="mb-2 flex flex-wrap gap-1">
                    {related.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-ink/5 px-1.5 py-0.5 font-mono text-[10px] text-ash"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-base font-medium leading-snug text-ink transition-colors group-hover:text-gold">
                    {related.title}
                  </h3>
                  <p className="mt-1 text-xs text-ash">
                    {formatDate(related.publishedAt)} · {related.readingTime} min
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-ink py-12 md:py-16">
        <div className="section-container text-center">
          <p className="kicker mb-4">Ce sujet vous concerne ?</p>
          <h2 className="display-heading mx-auto mb-6 max-w-xl text-2xl text-bone md:text-3xl">
            Discutons de votre <em className="text-gold">projet SAP</em>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-4 font-mono text-xs uppercase tracking-kicker text-ink transition-all duration-200 hover:bg-gold-hover hover:shadow-lg hover:shadow-gold/20"
          >
            Prendre contact
            <ArrowLeft size={16} strokeWidth={1.5} className="rotate-180 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
