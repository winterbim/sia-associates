import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ParticleField } from "@/components/ParticleField";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ScrollReveal } from "@/components/ScrollReveal";

const STATS = [
  { value: 20, suffix: "+", label: "Annees SAP" },
  { value: 8, suffix: "", label: "Grands comptes servis" },
  { value: 2024, suffix: "", label: "Annee de creation" },
  { value: 100, suffix: "%", label: "Independance" },
] as const;

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-ink"
      aria-labelledby="hero-heading"
    >
      {/* Particle network background */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <ParticleField particleCount={50} color="#C8A24B" />
      </div>

      {/* Animated grid overlay */}
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

      {/* Animated flow lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="absolute left-0 top-1/4 h-64 w-full opacity-[0.08]" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path
            d="M0,100 C200,50 400,150 600,100 C800,50 1000,150 1200,100"
            fill="none"
            stroke="#C8A24B"
            strokeWidth="1.5"
            strokeDasharray="8 4"
            className="animate-flow-path"
          />
          <path
            d="M0,140 C300,80 500,180 700,120 C900,60 1100,160 1200,120"
            fill="none"
            stroke="#C8A24B"
            strokeWidth="0.8"
            strokeDasharray="6 6"
            className="animate-flow-path"
            style={{ animationDelay: "0.5s" }}
          />
          <path
            d="M0,60 C150,120 350,20 550,80 C750,140 950,30 1200,70"
            fill="none"
            stroke="#C8A24B"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            className="animate-flow-path"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>

      <div className="section-container relative pb-16 pt-32 md:pb-24 md:pt-44">
        <ScrollReveal animation="fade-up" duration={800}>
          <p className="kicker mb-6">
            Conseil SAP independant &middot; depuis 2024
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150} duration={900}>
          <h1
            id="hero-heading"
            className="display-heading max-w-3xl text-3xl leading-tight text-bone sm:text-4xl md:text-5xl lg:text-[60px]"
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
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ash-light md:text-lg">
            20+ ans a batir, piloter et exploiter des paysages SAP pour des
            entreprises qui ne peuvent pas se permettre d&apos;approximations. De
            Safran a VINCI Construction, en passant par GRDF, RTE et ENGIE.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={450}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 font-mono text-xs uppercase tracking-kicker text-ink transition-all duration-200 hover:bg-gold-hover hover:shadow-lg hover:shadow-gold/20"
            >
              Discuter d&apos;un projet
              <ArrowRight size={16} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/expertise"
              className="group inline-flex items-center gap-2 rounded-sm border border-ash-light/30 px-6 py-3 font-mono text-xs uppercase tracking-kicker text-bone transition-all duration-200 hover:border-bone hover:text-bone"
            >
              Voir l&apos;expertise
              <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Animated Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} animation="fade-up" delay={600 + i * 100}>
              <div>
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
