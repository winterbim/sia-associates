import Link from "next/link";
import { Compass, Route, Wrench, Cloud, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SankeyWorkflow } from "@/components/SankeyWorkflow";

const PILLARS = [
  {
    num: "01",
    title: "Architecture SAP",
    href: "/expertise#architecture",
    icon: Compass,
    description:
      "Concevoir un paysage SAP qui tient dans le temps — choix technologiques, integration, Clean Core, strategie cloud.",
    tags: ["SAP Basis", "S/4HANA", "BTP", "Clean Core", "Integration"],
  },
  {
    num: "02",
    title: "Pilotage de projet SAP",
    href: "/expertise#pilotage",
    icon: Route,
    description:
      "Du cadrage au Go-Live. Gouvernance, conduite du changement, coordination d'equipes on-shore / near-shore / off-shore.",
    tags: ["SAP Activate", "PMO", "Change", "Gouvernance"],
  },
  {
    num: "03",
    title: "Exploitation applicative",
    href: "/expertise#exploitation",
    icon: Wrench,
    description:
      "Maintenance corrective et evolutive (TMA), support N2/N3, run ops optimise. Un projet ne s'arrete pas a la mise en production.",
    tags: ["TMA", "N2/N3", "Run Ops", "Monitoring"],
  },
  {
    num: "04",
    title: "Cloud SAP",
    href: "/expertise#cloud",
    icon: Cloud,
    description:
      "RISE with SAP, Grow with SAP, Azure, AWS, OVHcloud souverain. La bonne infrastructure selon vos contraintes.",
    tags: ["RISE", "Azure", "AWS", "OVHcloud"],
  },
] as const;

const SANKEY_NODES = [
  { id: "need", label: "BESOIN CLIENT", x: 20, y: 70, width: 130, height: 36, color: "#1a1f27" },
  { id: "archi", label: "01 Architecture", x: 240, y: 10, width: 140, height: 32, color: "#1a1f27" },
  { id: "pilot", label: "02 Pilotage", x: 240, y: 55, width: 140, height: 32, color: "#1a1f27" },
  { id: "exploit", label: "03 Exploitation", x: 240, y: 100, width: 140, height: 32, color: "#1a1f27" },
  { id: "cloud", label: "04 Cloud", x: 240, y: 145, width: 140, height: 32, color: "#1a1f27" },
  { id: "result", label: "VOTRE SAP, MAÎTRISÉ", x: 480, y: 70, width: 140, height: 36, color: "#1a1f27" },
];

const SANKEY_LINKS = [
  { source: "need", target: "archi", value: 6 },
  { source: "need", target: "pilot", value: 5 },
  { source: "need", target: "exploit", value: 5 },
  { source: "need", target: "cloud", value: 4 },
  { source: "archi", target: "result", value: 6 },
  { source: "pilot", target: "result", value: 5 },
  { source: "exploit", target: "result", value: 5 },
  { source: "cloud", target: "result", value: 4 },
];

export function Pillars() {
  return (
    <section className="bg-bone py-20 md:py-28" aria-labelledby="pillars-heading">
      <div className="section-container">
        <ScrollReveal animation="fade-up">
          <p className="kicker mb-4">Expertise</p>
          <h2
            id="pillars-heading"
            className="display-heading mb-4 text-2xl md:text-4xl"
          >
            Quatre piliers, <em>un seul objectif</em>
          </h2>
          <p className="mb-12 max-w-xl text-ash">
            Couvrir l&apos;ensemble du cycle de vie SAP — de la conception a
            l&apos;exploitation quotidienne.
          </p>
        </ScrollReveal>

        {/* Interactive Sankey flow diagram */}
        <ScrollReveal animation="scale" className="mb-16 hidden lg:block">
          <SankeyWorkflow
            nodes={SANKEY_NODES}
            links={SANKEY_LINKS}
            width={630}
            height={190}
            className="mx-auto w-full max-w-3xl"
            title="Flux d'expertise SIA Associates"
          />
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* Card Hero — Architecture SAP (spans 2 rows) */}
          <ScrollReveal animation="fade-left" className="md:row-span-2">
            <Link
              href={PILLARS[0].href}
              className="bento-card group relative flex h-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-ink to-[#141A22] p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-gold/10 md:p-8"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/[0.08] blur-[60px] transition-all duration-700 group-hover:bg-gold/[0.15]" />
              <div className="relative flex flex-1 flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                    <Compass size={24} strokeWidth={1.5} className="text-gold" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-kicker text-gold/60">
                    01 · Pilier principal
                  </span>
                </div>
                <h3 className="font-display text-2xl font-medium text-bone md:text-3xl">
                  {PILLARS[0].title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ash-light">
                  {PILLARS[0].description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {PILLARS[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-gold/10 px-3 py-1 font-mono text-[11px] text-gold/80 transition-colors duration-300 group-hover:bg-gold/15 group-hover:text-gold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 font-mono text-xs text-gold/60 transition-colors duration-300 group-hover:text-gold">
                  Explorer
                  <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Card — Pilotage */}
          <ScrollReveal animation="fade-right" delay={100}>
            <Link
              href={PILLARS[1].href}
              className="bento-card group relative block overflow-hidden rounded-xl border border-hairline bg-white p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/5 transition-all duration-700 group-hover:scale-[2.5] group-hover:bg-gold/10" />
              <div className="relative">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5 transition-colors duration-300 group-hover:bg-gold/10">
                    <Route size={20} strokeWidth={1.5} className="text-ink transition-colors duration-300 group-hover:text-gold" />
                  </div>
                  <span className="font-mono text-xs text-ash">{PILLARS[1].num}</span>
                </div>
                <h3 className="font-display text-lg font-medium text-ink">{PILLARS[1].title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{PILLARS[1].description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {PILLARS[1].tags.map((tag) => (
                    <span key={tag} className="rounded-lg bg-ink/5 px-2 py-0.5 font-mono text-[11px] text-ash transition-colors duration-300 group-hover:bg-gold/10 group-hover:text-ink">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Card — Exploitation */}
          <ScrollReveal animation="fade-right" delay={200}>
            <Link
              href={PILLARS[2].href}
              className="bento-card group relative block overflow-hidden rounded-xl border border-hairline bg-white p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/5 transition-all duration-700 group-hover:scale-[2.5] group-hover:bg-gold/10" />
              <div className="relative">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5 transition-colors duration-300 group-hover:bg-gold/10">
                    <Wrench size={20} strokeWidth={1.5} className="text-ink transition-colors duration-300 group-hover:text-gold" />
                  </div>
                  <span className="font-mono text-xs text-ash">{PILLARS[2].num}</span>
                </div>
                <h3 className="font-display text-lg font-medium text-ink">{PILLARS[2].title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{PILLARS[2].description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {PILLARS[2].tags.map((tag) => (
                    <span key={tag} className="rounded-lg bg-ink/5 px-2 py-0.5 font-mono text-[11px] text-ash transition-colors duration-300 group-hover:bg-gold/10 group-hover:text-ink">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>

        {/* Cloud SAP — Full width bottom card */}
        <ScrollReveal animation="fade-up" delay={300}>
          <Link
            href={PILLARS[3].href}
            className="bento-card group mt-4 flex items-center justify-between gap-6 overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-r from-gold/[0.06] to-transparent p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 transition-colors duration-300 group-hover:bg-gold/20">
                <Cloud size={20} strokeWidth={1.5} className="text-gold" />
              </div>
              <div>
                <span className="font-mono text-xs text-ash">{PILLARS[3].num}</span>
                <h3 className="font-display text-lg font-medium text-ink">{PILLARS[3].title}</h3>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden flex-wrap gap-2 sm:flex">
                {PILLARS[3].tags.map((tag) => (
                  <span key={tag} className="rounded-lg bg-gold/10 px-3 py-1 font-mono text-[11px] text-ash transition-colors duration-300 group-hover:text-ink">
                    {tag}
                  </span>
                ))}
              </div>
              <ArrowUpRight size={18} strokeWidth={1.5} className="shrink-0 text-ash transition-all duration-300 group-hover:text-gold" />
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
