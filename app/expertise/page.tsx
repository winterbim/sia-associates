import type { Metadata } from "next";
import { Compass, Route, Wrench, Cloud } from "lucide-react";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Architecture SAP, pilotage de projet, exploitation applicative et cloud. 19+ ans d'experience SAP au service des grands comptes.",
};

const PILLARS = [
  {
    id: "architecture",
    num: "01",
    icon: Compass,
    title: "Architecture SAP",
    lead: "Concevoir un paysage SAP qui tient dans le temps — choix technologiques, integration, Clean Core, strategie cloud. Pas de dette technique cachee, pas de surprise en production.",
    tags: ["SAP Basis", "S/4HANA", "BTP", "Clean Core", "Integration"],
    details: [
      "Audit d'architecture existante et recommandations",
      "Design du paysage cible (dev, QA, prod, sandbox)",
      "Strategie d'integration (PI/PO, CPI, API Management)",
      "Trajectoire Clean Core et roadmap S/4HANA",
      "Dimensionnement et choix d'infrastructure",
    ],
  },
  {
    id: "pilotage",
    num: "02",
    icon: Route,
    title: "Pilotage de projet SAP",
    lead: "Du cadrage au Go-Live. Gouvernance, conduite du changement, coordination d'equipes on-shore / near-shore / off-shore. Methodologie SAP Activate eprouvee sur des projets Safran, GRDF et RTE.",
    tags: ["SAP Activate", "PMO", "Change", "Gouvernance"],
    details: [
      "Cadrage de projet et chiffrage ferme",
      "Mise en place de la gouvernance projet",
      "Coordination des equipes multi-sites",
      "Conduite du changement et formation",
      "Reporting et escalade proactive",
    ],
  },
  {
    id: "exploitation",
    num: "03",
    icon: Wrench,
    title: "Exploitation applicative",
    lead: "Maintenance corrective et evolutive (TMA), support N2/N3, run ops optimise. Parce qu'un projet ne s'arrete pas a la mise en production.",
    tags: ["TMA", "N2/N3", "Run Ops", "Monitoring"],
    details: [
      "Support Basis N2/N3 et resolution d'incidents",
      "Maintenance corrective et evolutive (TMA)",
      "Optimisation des performances systeme",
      "Gestion des transports et des releases",
      "Monitoring et alerting proactif",
    ],
  },
  {
    id: "cloud",
    num: "04",
    icon: Cloud,
    title: "Cloud SAP",
    lead: "RISE with SAP, Grow with SAP, Azure, AWS, OVHcloud souverain. Choisir la bonne infrastructure selon vos contraintes reglementaires, de souverainete et budgetaires.",
    tags: ["RISE", "Azure", "AWS", "OVHcloud"],
    details: [
      "Audit cloud-readiness du paysage existant",
      "Comparatif RISE / Grow / IaaS souverain",
      "Migration vers le cloud (planning, execution, validation)",
      "Optimisation des couts cloud",
      "Conformite et souverainete des donnees",
    ],
  },
] as const;

export default function ExpertisePage() {
  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="bg-ink py-16 md:py-24">
        <div className="section-container">
          <p className="kicker mb-4">Expertise</p>
          <h1 className="display-heading max-w-3xl text-3xl text-bone md:text-5xl">
            Quatre piliers pour couvrir{" "}
            <em className="text-gold">l&apos;ensemble du cycle</em> SAP
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ash-light md:text-lg">
            De la conception a l&apos;exploitation quotidienne, en passant par le
            pilotage de projet et la strategie cloud.
          </p>
        </div>
      </section>

      {/* Sankey workflow overview */}
      <section className="border-b border-hairline bg-bone py-12">
        <div className="section-container">
          <svg viewBox="0 0 1000 80" className="w-full" aria-hidden="true">
            {/* Main flow */}
            <text x="20" y="15" fill="#6E6A62" fontSize="9" fontFamily="monospace">BESOIN CLIENT</text>
            <path d="M20,30 L120,30" stroke="#C8A24B" strokeWidth="2" strokeDasharray="4 4" className="animate-flow-path" />

            {/* Branch flows */}
            <path d="M120,30 C180,30 180,15 250,15 L400,15" stroke="#C8A24B" strokeWidth="6" opacity="0.25" />
            <path d="M120,30 C180,30 180,30 250,30 L400,30" stroke="#C8A24B" strokeWidth="5" opacity="0.2" />
            <path d="M120,30 C180,30 180,45 250,45 L400,45" stroke="#C8A24B" strokeWidth="5" opacity="0.2" />
            <path d="M120,30 C180,30 180,60 250,60 L400,60" stroke="#C8A24B" strokeWidth="4" opacity="0.15" />

            {/* Labels */}
            <text x="310" y="18" fill="#2A2F38" fontSize="9" fontFamily="monospace" textAnchor="middle">01 Architecture</text>
            <text x="310" y="33" fill="#2A2F38" fontSize="9" fontFamily="monospace" textAnchor="middle">02 Pilotage</text>
            <text x="310" y="48" fill="#2A2F38" fontSize="9" fontFamily="monospace" textAnchor="middle">03 Exploitation</text>
            <text x="310" y="63" fill="#2A2F38" fontSize="9" fontFamily="monospace" textAnchor="middle">04 Cloud</text>

            {/* Convergence */}
            <path d="M400,15 C480,15 480,37 550,37" stroke="#C8A24B" strokeWidth="2" opacity="0.15" />
            <path d="M400,30 C480,30 480,37 550,37" stroke="#C8A24B" strokeWidth="2" opacity="0.15" />
            <path d="M400,45 C480,45 480,37 550,37" stroke="#C8A24B" strokeWidth="2" opacity="0.15" />
            <path d="M400,60 C480,60 480,37 550,37" stroke="#C8A24B" strokeWidth="2" opacity="0.15" />

            <circle cx="550" cy="37" r="4" fill="#C8A24B" className="animate-pulse-gold" />
            <path d="M554,37 L980,37" stroke="#C8A24B" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" className="animate-flow-path" />
            <text x="770" y="35" fill="#6E6A62" fontSize="9" fontFamily="monospace" textAnchor="middle">VOTRE SAP, MAITRISE</text>
          </svg>
        </div>
      </section>

      {/* Pillars detail */}
      {PILLARS.map((pillar, index) => {
        const Icon = pillar.icon;
        const isEven = index % 2 === 0;
        return (
          <section
            key={pillar.id}
            id={pillar.id}
            className={isEven ? "bg-bone py-16 md:py-24" : "bg-white py-16 md:py-24"}
            aria-labelledby={`heading-${pillar.id}`}
          >
            <div className="section-container">
              <div className="grid items-start gap-12 lg:grid-cols-2">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <Icon
                      size={32}
                      strokeWidth={1.5}
                      className="text-gold"
                    />
                    <span className="font-mono text-xs text-ash">
                      {pillar.num}
                    </span>
                  </div>
                  <h2
                    id={`heading-${pillar.id}`}
                    className="display-heading mb-4 text-2xl md:text-4xl"
                  >
                    {pillar.title}
                  </h2>
                  <p className="text-base leading-relaxed text-ash md:text-lg">
                    {pillar.lead}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-ink/5 px-3 py-1 font-mono text-xs text-ash"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-hairline bg-bone p-6 md:p-8">
                  <p className="kicker mb-4">Ce que je delivre</p>
                  <ul className="space-y-3">
                    {pillar.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-sm text-graphite"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
