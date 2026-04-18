import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const STATS = [
  { value: 20, suffix: "+", label: "Annees SAP" },
  { value: 8, suffix: "", label: "Grands comptes servis" },
  { value: 2024, suffix: "", label: "Annee de creation" },
  { value: 100, suffix: "%", label: "Independance" },
] as const;

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-bone"
      aria-labelledby="hero-heading"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 h-px bg-hairline" />

      <div className="section-container relative grid gap-10 pb-16 pt-32 md:pb-20 md:pt-40 lg:grid-cols-12 lg:gap-20">
        {/* Left — masthead + H1 + lede */}
        <div className="lg:col-span-7">
          <ScrollReveal animation="fade-up" duration={700}>
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-ink/60" />
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-ink/70">
                Conseil SAP independant &middot; depuis 2024
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100} duration={900}>
            <h1
              id="hero-heading"
              className="display-heading max-w-[18ch] text-[44px] font-bold leading-[1.02] tracking-[-0.025em] text-ink sm:text-5xl md:text-[60px] lg:text-[68px]"
            >
              Votre SAP, sans approximations.
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={250} duration={900}>
            <p className="mt-8 max-w-xl text-[17px] leading-[1.7] text-graphite">
              20+ ans a batir, piloter et exploiter des paysages SAP pour des
              entreprises qui ne peuvent pas se permettre
              d&apos;approximations&nbsp;— de{" "}
              <span className="font-semibold text-ink">Safran</span> a{" "}
              <span className="font-semibold text-ink">VINCI Construction</span>
              , en passant par{" "}
              <span className="font-semibold text-ink">GRDF</span>,{" "}
              <span className="font-semibold text-ink">RTE</span> et{" "}
              <span className="font-semibold text-ink">ENGIE</span>.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={350}>
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-ink px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-bone transition-colors duration-200 hover:bg-oxblood"
              >
                Discuter d&apos;un projet
                <ArrowRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/expertise"
                className="group inline-flex items-center gap-2 px-3 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink underline decoration-gold decoration-2 underline-offset-[6px] transition-colors duration-200 hover:text-oxblood hover:decoration-oxblood"
              >
                Voir l&apos;expertise
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={500}>
            <p className="mt-12 max-w-md border-l-2 border-oxblood pl-4 text-[15px] italic leading-relaxed text-graphite">
              «&nbsp;Un projet SAP reussi, c&apos;est d&apos;abord une equipe
              qui comprend ce qu&apos;elle construit. La technique vient
              apres.&nbsp;»
              <span className="mt-2 block font-mono text-[10px] not-italic uppercase tracking-[0.2em] text-ash">
                — Amine Silemane, fondateur
              </span>
            </p>
          </ScrollReveal>
        </div>

        {/* Right — editorial portrait */}
        <div className="relative lg:col-span-5">
          <ScrollReveal animation="fade-up" delay={200} duration={1000}>
            <figure className="relative">
              <div className="relative overflow-hidden bg-graphite">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/amine-portrait.png"
                  alt="Amine Silemane — fondateur de SIA Associates"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between border-t border-ink/15 pt-4">
                <div>
                  <p className="font-display text-lg font-semibold text-ink">
                    Amine Silemane
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
                    Fondateur · Architecte SAP Senior
                  </p>
                </div>
                <p className="font-mono text-[10px] tracking-[0.15em] text-ash">
                  EST. 2024
                </p>
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </div>

      {/* Proof strip — editorial hairlines, no cards, no glow */}
      <div className="section-container relative pb-24 md:pb-32">
        <div className="grid divide-y divide-hairline border-y border-hairline md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              animation="fade-up"
              delay={200 + i * 100}
            >
              <div className="px-6 py-8 md:px-8 md:py-10">
                <p className="font-display text-5xl font-bold leading-none tracking-[-0.03em] text-ink tabular">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={1500 + i * 200}
                  />
                </p>
                <p className="mt-4 text-sm leading-[1.55] text-graphite">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
