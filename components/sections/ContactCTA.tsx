import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section
      className="relative overflow-hidden bg-ink py-20 md:py-28"
      aria-labelledby="cta-heading"
    >
      {/* Decorative accent line */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="h-full w-full opacity-[0.04]" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path
            d="M-100,200 C100,100 300,300 500,200 C700,100 900,300 1100,200 C1300,100 1500,300 1700,200"
            stroke="#C8A24B"
            strokeWidth="2"
            fill="none"
            className="animate-flow-path"
          />
        </svg>
      </div>

      <div className="section-container relative text-center">
        <p className="kicker mb-4">Demarrer une conversation</p>
        <h2
          id="cta-heading"
          className="display-heading mx-auto mb-6 max-w-2xl text-2xl text-bone md:text-4xl lg:text-5xl"
        >
          Un projet SAP qui merite{" "}
          <em className="text-gold">un regard senior</em> ?
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-ash-light md:text-base">
          Cadrage initial, second avis, renfort ponctuel, mission longue —
          parlons-en. Un premier echange d&apos;une heure ne coute rien et
          clarifie souvent beaucoup.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-4 font-mono text-xs uppercase tracking-kicker text-ink transition-all duration-200 hover:bg-gold-hover"
          >
            Prendre contact
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
          <a
            href="mailto:contact@sia-associates.fr"
            className="inline-flex items-center gap-2 rounded-sm border border-ash-light/30 px-8 py-4 font-mono text-xs uppercase tracking-kicker text-bone transition-all duration-200 hover:border-bone"
          >
            contact@sia-associates.fr
          </a>
        </div>
      </div>
    </section>
  );
}
