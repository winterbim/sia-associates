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
  { id: "need", label: "VOTRE BESOIN", x: 20, y: 70, width: 130, height: 36, color: "#1a1f27" },
  { id: "archi", label: "01 Architecture", x: 240, y: 10, width: 140, height: 32, color: "#1a1f27" },
  { id: "pilot", label: "02 Pilotage", x: 240, y: 55, width: 140, height: 32, color: "#1a1f27" },
  { id: "exploit", label: "03 Exploitation", x: 240, y: 100, width: 140, height: 32, color: "#1a1f27" },
  { id: "cloud", label: "04 Cloud", x: 240, y: 145, width: 140, height: 32, color: "#1a1f27" },
  { id: "result", label: "SAP MAITRISE", x: 480, y: 70, width: 130, height: 36, color: "#1a1f27" },
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

        <div className="grid gap-6 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal
                key={pillar.num}
                animation={i % 2 === 0 ? "fade-left" : "fade-right"}
                delay={i * 100}
              >
                <Link
                  href={pillar.href}
                  className="group relative block rounded-lg border border-hairline bg-bone p-6 transition-all duration-300 hover:border-gold/30 hover:bg-white hover:shadow-lg hover:shadow-gold/5 md:p-8"
                >
                  {/* Hover glow effect */}
                  <div className="pointer-events-none absolute -inset-px rounded-lg bg-gradient-to-br from-gold/0 to-gold/0 opacity-0 transition-opacity duration-500 group-hover:from-gold/5 group-hover:to-transparent group-hover:opacity-100" />

                  <div className="relative">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink/5 transition-colors duration-300 group-hover:bg-gold/10">
                          <Icon
                            size={22}
                            strokeWidth={1.5}
                            className="text-ink transition-colors duration-300 group-hover:text-gold"
                          />
                        </div>
                        <span className="font-mono text-xs text-ash">
                          {pillar.num}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.5}
                        className="translate-x-1 translate-y-1 text-ash opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-gold group-hover:opacity-100"
                      />
                    </div>

                    <h3 className="font-display text-xl font-medium text-ink md:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ash">
                      {pillar.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {pillar.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm bg-ink/5 px-2 py-0.5 font-mono text-[11px] text-ash transition-colors duration-300 group-hover:bg-gold/10 group-hover:text-ink"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
