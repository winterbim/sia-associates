import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const STATS = [
  { value: "20+", label: "Annees SAP" },
  { value: "8", label: "Grands comptes servis" },
  { value: "2024", label: "Annee de creation" },
  { value: "100%", label: "Independance" },
] as const;

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-ink"
      aria-labelledby="hero-heading"
    >
      {/* Animated background grid */}
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
        <svg className="absolute left-0 top-1/4 h-64 w-full opacity-[0.06]" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path
            d="M0,100 C200,50 400,150 600,100 C800,50 1000,150 1200,100"
            fill="none"
            stroke="#C8A24B"
            strokeWidth="1"
            strokeDasharray="8 4"
            className="animate-flow-path"
          />
          <path
            d="M0,140 C300,80 500,180 700,120 C900,60 1100,160 1200,120"
            fill="none"
            stroke="#C8A24B"
            strokeWidth="0.5"
            strokeDasharray="6 6"
            className="animate-flow-path"
            style={{ animationDelay: "0.5s" }}
          />
        </svg>
      </div>

      <div className="section-container relative pb-16 pt-32 md:pb-24 md:pt-44">
        <p className="kicker mb-6">
          Conseil SAP independant &middot; depuis 2024
        </p>

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

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ash-light md:text-lg">
          20+ ans a batir, piloter et exploiter des paysages SAP pour des
          entreprises qui ne peuvent pas se permettre d&apos;approximations. De
          Safran a VINCI Construction, en passant par GRDF, RTE et ENGIE.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 font-mono text-xs uppercase tracking-kicker text-ink transition-all duration-200 hover:bg-gold-hover"
          >
            Discuter d&apos;un projet
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
          <Link
            href="/expertise"
            className="inline-flex items-center gap-2 rounded-sm border border-ash-light/30 px-6 py-3 font-mono text-xs uppercase tracking-kicker text-bone transition-all duration-200 hover:border-bone hover:text-bone"
          >
            Voir l&apos;expertise
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-3xl font-medium text-gold md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-ash-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
