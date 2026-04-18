import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export function ContactCTA() {
  return (
    <section
      className="relative overflow-hidden bg-ink py-20 md:py-28"
      aria-labelledby="cta-heading"
    >
      {/* Editorial backdrop — single hairline, no glow halo. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-8 h-px bg-gold/25" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-8 h-px bg-gold/25" />

      <div className="section-container relative text-center">
        {/* Portrait */}
        <ScrollReveal animation="scale">
          <div className="mx-auto mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-gold/40">
            <Image
              src="/amine-portrait.png"
              alt="Amine"
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up">
          <p className="kicker mb-4">Démarrer une conversation</p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          <h2
            id="cta-heading"
            className="display-heading mx-auto mb-6 max-w-2xl text-2xl text-bone md:text-4xl lg:text-5xl"
          >
            Un projet SAP qui mérite{" "}
            <em className="text-gold">un regard senior</em> ?
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <blockquote className="mx-auto mb-8 max-w-lg font-display text-base italic leading-relaxed text-ash-light md:text-lg">
            &ldquo;Un premier échange d&apos;une heure ne coûte rien et
            clarifie souvent beaucoup. Parlons de votre contexte.&rdquo;
          </blockquote>
        </ScrollReveal>

        <ScrollReveal animation="scale" delay={350}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-gold px-8 py-4 font-mono text-xs uppercase tracking-kicker text-ink transition-all duration-200 hover:bg-gold-hover hover:shadow-lg hover:shadow-gold/20"
            >
              Prendre contact
              <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a
              href="mailto:contact@sia-associates.fr"
              className="inline-flex items-center gap-2 rounded-xl border border-ash-light/30 px-8 py-4 font-mono text-xs uppercase tracking-kicker text-bone transition-all duration-200 hover:border-bone hover:shadow-lg hover:shadow-white/5"
            >
              contact@sia-associates.fr
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
