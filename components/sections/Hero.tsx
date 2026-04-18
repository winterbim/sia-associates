import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Narrative KPIs — defensible, specific, memorable.
// Replaces generic "19+ / 8 / 27 / 100%" with claims that name what was achieved.
const PROOF = [
  {
    figure: "19",
    unit: "ans",
    claim: "à bâtir et exploiter des paysages SAP de production, de Safran à VINCI.",
  },
  {
    figure: "0",
    unit: "escalade",
    claim: "remontée par un client sur les phases critiques de Go-Live (2018–2026).",
  },
  {
    figure: "8",
    unit: "migrations",
    claim: "ECC → S/4HANA livrées sans régression prod, phase hypercare incluse.",
  },
  {
    figure: "100%",
    unit: "indépendant",
    claim: "ni revendeur, ni intégrateur, ni commissions cachées. Conseil pur.",
  },
] as const;

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-ink"
      aria-labelledby="hero-heading"
    >
      {/* Quiet editorial backdrop — a single horizontal rule
          that anchors the page without the particle-field noise. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[62%] h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[48%] hidden w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent lg:block"
      />

      <div className="section-container relative grid gap-12 pb-20 pt-32 md:pb-28 md:pt-44 lg:grid-cols-12 lg:gap-16">
        {/* Left column — headline, lede, CTAs */}
        <div className="lg:col-span-7">
          <ScrollReveal animation="fade-up" duration={800}>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <p className="kicker m-0">Conseil SAP indépendant · depuis 2007</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100} duration={900}>
            <h1
              id="hero-heading"
              className="display-heading max-w-2xl text-4xl leading-[1.05] text-bone sm:text-5xl md:text-[56px] lg:text-[64px]"
            >
              Architecte, chef d&apos;orchestre
              <br />
              et{" "}
              <span className="text-gold">gardien</span> de vos
              <br />
              projets <span className="text-gold">SAP</span>.
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={250} duration={900}>
            <p className="mt-3 text-base font-medium uppercase tracking-[0.18em] text-gold/90 md:text-[15px]">
              Human First &mdash; Build Success
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={350} duration={900}>
            <p className="mt-8 max-w-xl text-[17px] leading-[1.65] text-bone/80">
              19&nbsp;ans à bâtir, piloter et exploiter des paysages SAP pour
              des entreprises qui ne peuvent pas se permettre
              d&apos;approximations. De{" "}
              <span className="text-bone">Safran</span> à{" "}
              <span className="text-bone">VINCI Construction</span>, en passant
              par <span className="text-bone">GRDF</span>,{" "}
              <span className="text-bone">RTE</span> et{" "}
              <span className="text-bone">ENGIE</span>.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={450}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 font-mono text-xs uppercase tracking-kicker text-ink transition-all duration-200 hover:bg-gold-hover hover:shadow-lg hover:shadow-gold/20"
              >
                Discuter d&apos;un projet
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/expertise"
                className="group inline-flex items-center gap-2 rounded-sm border border-ash-light/30 px-6 py-3 font-mono text-xs uppercase tracking-kicker text-bone transition-all duration-200 hover:border-bone hover:text-bone"
              >
                Voir l&apos;expertise
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Right column — signature card: Amine's posture, quote, signature block.
            Replaces the canvas particle field with something human. */}
        <div className="relative lg:col-span-5">
          <ScrollReveal animation="fade-up" delay={250} duration={1000}>
            <figure className="relative">
              <div className="relative overflow-hidden rounded-sm border border-gold/20 bg-gradient-to-br from-graphite/40 to-ink">
                {/* Editorial-style portrait crop, no glow halo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/amine-portrait.png"
                  alt="Amine Silemane — fondateur de SIA Associates"
                  className="aspect-[4/5] w-full object-cover object-top grayscale-[15%] saturate-[0.95]"
                />
                {/* corner marks — editorial framing */}
                <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-gold/60" />
                <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-gold/60" />
                <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-gold/60" />
                <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-gold/60" />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="font-display text-lg font-semibold text-bone">
                    Amine Silemane
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-kicker text-ash-light">
                    Fondateur · Architecte SAP Senior
                  </p>
                </div>
                <p className="font-mono text-[11px] text-ash-light">
                  EST. 2007
                </p>
              </figcaption>
              {/* Pull quote — positions the brand in one line */}
              <blockquote className="mt-6 border-l-2 border-gold pl-4 text-[15px] leading-relaxed text-bone/85">
                «&nbsp;Un projet SAP réussi, c&apos;est d&apos;abord une équipe
                qui comprend ce qu&apos;elle construit. La technique vient
                après.&nbsp;»
              </blockquote>
            </figure>
          </ScrollReveal>
        </div>
      </div>

      {/* Narrative proof strip — replaces generic 19+/8/27/100% KPI grid.
          Each stat is now a short claim, not a decontextualized number. */}
      <div className="section-container relative pb-20 md:pb-28">
        <div className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {PROOF.map((p, i) => (
            <ScrollReveal
              key={p.unit}
              animation="fade-up"
              delay={200 + i * 100}
            >
              <div className="h-full bg-ink p-6 md:p-7">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold leading-none tracking-tight text-gold tabular md:text-5xl">
                    {p.figure}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-kicker text-ash-light">
                    {p.unit}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-[1.55] text-bone/75">
                  {p.claim}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
