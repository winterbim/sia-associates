import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const STATS = [
  { value: 19, suffix: "+", label: "Années SAP" },
  { value: 8, suffix: "", label: "Grands comptes servis" },
  { value: 27, suffix: "", label: "Projets" },
  { value: 100, suffix: "%", label: "Transparence" },
] as const;

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-ink"
      aria-labelledby="hero-heading"
    >
      {/* Editorial hairline above the fold */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-24 h-px bg-white/10" />

      <div className="section-container relative grid gap-10 pb-16 pt-32 md:pb-20 md:pt-40 lg:grid-cols-12 lg:gap-20">
        {/* Left column — masthead + H1 + lede */}
        <div className="lg:col-span-7">
          <ScrollReveal animation="fade-up" duration={700}>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-bone/75">
                Conseil SAP &middot; depuis 2007
              </p>
            </div>
            <p className="mb-8 font-display text-lg font-medium tracking-wide text-gold md:text-xl">
              Human First Build Success
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100} duration={900}>
            <h1
              id="hero-heading"
              className="display-heading max-w-3xl text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-bone sm:text-5xl md:text-[56px] lg:text-[60px]"
            >
              Architecte,{" "}
              <em className="not-italic font-bold text-oxblood">
                chef d&apos;orchestre
              </em>{" "}
              et gardien de vos projets <span className="text-gold">SAP</span>.
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={250} duration={900}>
            <p className="mt-8 max-w-xl text-[17px] leading-[1.7] text-bone/75">
              19+ ans à bâtir, piloter et exploiter des paysages SAP pour des
              entreprises qui ne peuvent pas se permettre
              d&apos;approximations. De{" "}
              <span className="font-semibold text-bone">Safran</span> à{" "}
              <span className="font-semibold text-bone">VINCI Construction</span>
              , en passant par{" "}
              <span className="font-semibold text-bone">GRDF</span>,{" "}
              <span className="font-semibold text-bone">RTE</span> et{" "}
              <span className="font-semibold text-bone">ENGIE</span>.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={350}>
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-bone px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:bg-gold"
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
                className="group inline-flex items-center gap-2 px-3 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-bone underline decoration-gold decoration-2 underline-offset-[6px] transition-colors duration-200 hover:text-gold"
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
            <p className="mt-12 max-w-md border-l-2 border-oxblood pl-4 text-[15px] italic leading-relaxed text-bone/80">
              «&nbsp;Un projet SAP reussi, c&apos;est d&apos;abord une equipe
              qui comprend ce qu&apos;elle construit. La technique vient
              apres.&nbsp;»
              <span className="mt-2 block font-mono text-[10px] not-italic uppercase tracking-[0.2em] text-ash-light">
                — Amine Silemane, fondateur
              </span>
            </p>
          </ScrollReveal>
        </div>

        {/* Right column — editorial portrait */}
        <div className="relative lg:col-span-5">
          <ScrollReveal animation="fade-up" delay={200} duration={1000}>
            <figure className="relative">
              <div className="relative overflow-hidden border border-white/10 bg-graphite">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/amine-portrait.png"
                  alt="Amine Silemane — fondateur de SIA Associates"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="font-display text-lg font-semibold text-bone">
                    Amine Silemane
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ash-light">
                    Fondateur · Architecte SAP Senior
                  </p>
                </div>
                <p className="font-mono text-[10px] tracking-[0.15em] text-ash-light">
                  EST. 2007
                </p>
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </div>

      {/* Proof strip */}
      <div className="section-container relative pb-24 md:pb-32">
        <div className="grid divide-y divide-white/10 border-y border-white/10 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              animation="fade-up"
              delay={200 + i * 100}
            >
              <div className="px-6 py-8 md:px-8 md:py-10">
                <p className="font-display text-5xl font-bold leading-none tracking-[-0.03em] text-bone tabular">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={1500 + i * 200}
                  />
                </p>
                <p className="mt-4 text-sm leading-[1.55] text-bone/60">
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
