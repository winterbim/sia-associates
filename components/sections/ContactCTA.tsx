import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ParticleField } from "@/components/ParticleField";

export function ContactCTA() {
  return (
    <section
      className="relative overflow-hidden bg-ink py-20 md:py-28"
      aria-labelledby="cta-heading"
    >
      {/* Particle background */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <ParticleField particleCount={25} color="#C8A24B" />
      </div>

      <div className="section-container relative text-center">
        <ScrollReveal animation="fade-up">
          <p className="kicker mb-4">Demarrer une conversation</p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          <h2
            id="cta-heading"
            className="display-heading mx-auto mb-6 max-w-2xl text-2xl text-bone md:text-4xl lg:text-5xl"
          >
            Un projet SAP qui merite{" "}
            <em className="text-gold">un regard senior</em> ?
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-ash-light md:text-base">
            Cadrage initial, second avis, renfort ponctuel, mission longue —
            parlons-en. Un premier echange d&apos;une heure ne coute rien et
            clarifie souvent beaucoup.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="scale" delay={350}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-4 font-mono text-xs uppercase tracking-kicker text-ink transition-all duration-200 hover:bg-gold-hover hover:shadow-lg hover:shadow-gold/20"
            >
              Prendre contact
              <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a
              href="mailto:contact@sia-associates.fr"
              className="inline-flex items-center gap-2 rounded-sm border border-ash-light/30 px-8 py-4 font-mono text-xs uppercase tracking-kicker text-bone transition-all duration-200 hover:border-bone hover:shadow-lg hover:shadow-white/5"
            >
              contact@sia-associates.fr
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
