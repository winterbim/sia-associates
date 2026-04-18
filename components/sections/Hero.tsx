import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ScrollReveal } from "@/components/ScrollReveal";

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
      {/* Warm gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-[#141A22]" />
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-gold/[0.07] blur-[120px]" />
        <div className="absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-gold/[0.04] blur-[100px]" />
      </div>

      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#C8A24B" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="section-container relative pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
          {/* Text side */}
          <div className="flex-1">
            <ScrollReveal animation="fade-up" duration={800}>
              <p className="kicker mb-4">
                Conseil SAP &middot; depuis 2007
              </p>
              <p className="font-display text-lg font-medium tracking-wide text-gold md:text-xl">
                Human First Build Success
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150} duration={900}>
              <h1
                id="hero-heading"
                className="display-heading mt-4 max-w-2xl text-3xl leading-tight text-bone sm:text-4xl md:text-5xl lg:text-[56px]"
              >
                Architecte,{" "}
                <em className="text-gold" style={{ fontVariationSettings: "'SOFT' 100" }}>
                  chef d&apos;orchestre
                </em>{" "}
                et gardien de vos projets{" "}
                <span className="text-gold">SAP</span>.
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300} duration={900}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ash-light md:text-lg">
                19+ ans à bâtir, piloter et exploiter des paysages SAP pour des
                entreprises qui ne peuvent pas se permettre d&apos;approximations. De
                Safran à VINCI Construction, en passant par GRDF, RTE et ENGIE.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={450}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-mono text-xs uppercase tracking-kicker text-ink transition-all duration-200 hover:bg-gold-hover hover:shadow-lg hover:shadow-gold/20"
                >
                  Discuter d&apos;un projet
                  <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/expertise"
                  className="group inline-flex items-center gap-2 rounded-lg border border-ash-light/30 px-6 py-3 font-mono text-xs uppercase tracking-kicker text-bone transition-all duration-200 hover:border-bone hover:text-bone"
                >
                  Voir l&apos;expertise
                  <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Portrait side */}
          <ScrollReveal animation="scale" delay={300} duration={1000}>
            <div className="flex shrink-0 flex-col items-center">
              <div className="relative">
                {/* Gold ring */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold to-gold-hover opacity-80 blur-[2px]" />
                <div className="relative h-44 w-44 overflow-hidden rounded-full border-[3px] border-gold/60 md:h-56 md:w-56">
                  <Image
                    src="/amine-portrait.png"
                    alt="Amine — Fondateur de SIA Associates"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <p className="mt-4 font-display text-lg font-medium text-bone">
                Amine
              </p>
              <p className="font-mono text-[10px] uppercase tracking-kicker text-gold">
                Fondateur &amp; Consultant Senior
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Animated Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 md:grid-cols-4 md:gap-6">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} animation="fade-up" delay={600 + i * 100}>
              <div className="rounded-xl bg-gold/[0.05] p-4 text-center backdrop-blur-sm">
                <p className="font-mono text-3xl font-medium text-gold md:text-4xl">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2000 + i * 300}
                  />
                </p>
                <p className="mt-1 text-sm text-ash-light">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
