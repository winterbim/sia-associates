import Link from "next/link";
import { Compass, Route, Wrench, Cloud, ArrowUpRight } from "lucide-react";

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

export function Pillars() {
  return (
    <section className="bg-bone py-20 md:py-28" aria-labelledby="pillars-heading">
      <div className="section-container">
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

        {/* Sankey-inspired flow diagram */}
        <div className="mb-16 hidden lg:block">
          <svg viewBox="0 0 1000 120" className="w-full" aria-hidden="true">
            {/* Central flow line */}
            <path
              d="M0,60 L200,60"
              stroke="#C8A24B"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              className="animate-flow-path"
            />
            {/* Branch to Architecture */}
            <path
              d="M200,60 C280,60 280,20 360,20 L480,20"
              stroke="#C8A24B"
              strokeWidth="8"
              fill="none"
              opacity="0.3"
            />
            {/* Branch to Pilotage */}
            <path
              d="M200,60 C280,60 280,45 360,45 L480,45"
              stroke="#C8A24B"
              strokeWidth="6"
              fill="none"
              opacity="0.25"
            />
            {/* Branch to Exploitation */}
            <path
              d="M200,60 C280,60 280,75 360,75 L480,75"
              stroke="#C8A24B"
              strokeWidth="6"
              fill="none"
              opacity="0.25"
            />
            {/* Branch to Cloud */}
            <path
              d="M200,60 C280,60 280,100 360,100 L480,100"
              stroke="#C8A24B"
              strokeWidth="5"
              fill="none"
              opacity="0.2"
            />
            {/* Convergence */}
            <path
              d="M480,20 C560,20 560,60 640,60 L1000,60"
              stroke="#C8A24B"
              strokeWidth="2"
              fill="none"
              opacity="0.2"
            />
            <path
              d="M480,45 C560,45 560,60 640,60"
              stroke="#C8A24B"
              strokeWidth="2"
              fill="none"
              opacity="0.2"
            />
            <path
              d="M480,75 C560,75 560,60 640,60"
              stroke="#C8A24B"
              strokeWidth="2"
              fill="none"
              opacity="0.2"
            />
            <path
              d="M480,100 C560,100 560,60 640,60"
              stroke="#C8A24B"
              strokeWidth="2"
              fill="none"
              opacity="0.2"
            />
            {/* Labels */}
            <text x="100" y="55" fill="#6E6A62" fontSize="10" fontFamily="monospace" textAnchor="middle">VOTRE BESOIN</text>
            <text x="420" y="17" fill="#2A2F38" fontSize="10" fontFamily="monospace" textAnchor="middle">Architecture</text>
            <text x="420" y="42" fill="#2A2F38" fontSize="10" fontFamily="monospace" textAnchor="middle">Pilotage</text>
            <text x="420" y="72" fill="#2A2F38" fontSize="10" fontFamily="monospace" textAnchor="middle">Exploitation</text>
            <text x="420" y="97" fill="#2A2F38" fontSize="10" fontFamily="monospace" textAnchor="middle">Cloud</text>
            <text x="820" y="55" fill="#6E6A62" fontSize="10" fontFamily="monospace" textAnchor="middle">VOTRE SAP, MAITRISE</text>
            {/* Gold dot at convergence */}
            <circle cx="640" cy="60" r="4" fill="#C8A24B" className="animate-pulse-gold" />
          </svg>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.num}
                href={pillar.href}
                className="group relative rounded-lg border border-hairline bg-bone p-6 transition-all duration-300 hover:border-gold/30 hover:bg-white hover:shadow-lg hover:shadow-gold/5 md:p-8"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      className="text-ink transition-colors duration-300 group-hover:text-gold"
                    />
                    <span className="font-mono text-xs text-ash">
                      {pillar.num}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="translate-y-1 text-ash opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-gold group-hover:opacity-100"
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
                      className="rounded-sm bg-ink/5 px-2 py-0.5 font-mono text-[11px] text-ash"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
