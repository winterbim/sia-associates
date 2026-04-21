import type { Metadata } from "next";
import { Compass, Route, Wrench, Cloud, ShieldCheck } from "lucide-react";
import { ExpertiseBlueprint } from "@/components/ExpertiseBlueprint";

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
    lead: "RISE with SAP, Grow with SAP, Azure, AWS, OVHcloud souverain. Choisir la bonne infrastructure selon vos contraintes de souverainete et budgetaires.",
    tags: ["RISE", "Azure", "AWS", "OVHcloud"],
    details: [
      "Audit cloud-readiness du paysage existant",
      "Comparatif RISE / Grow / IaaS souverain",
      "Migration vers le cloud (planning, execution, validation)",
      "Optimisation des couts cloud",
      "Conformite et souverainete des donnees",
    ],
  },
  {
    id: "cybersecurite",
    num: "05",
    icon: ShieldCheck,
    title: "Cybersecurite SAP",
    lead: "Dans l'ecosysteme SAP, la cybersecurite consiste a proteger les donnees, les acces et les processus critiques de l'entreprise contre toute menace, en garantissant integrite, confidentialite et conformite. Cela prevaut a tous les domaines de l'entreprise. Un enjeu global en termes de securite et surtout de Business.",
    tags: ["SSO", "IAM", "Security Notes", "RGPD", "Audit"],
    details: [
      "Securisation des acces et authentification — SSO (Azure AD, IAS), MFA, Identity Providers (IAS, AD, S/4, BTP)",
      "Securisation des paysages SAP — analyse de surface d'attaque, Security Notes, patching, durcissement",
      "Securisation des interfaces — OData, RFC, API, Cloud Connectors",
      "Audit de securite SAP — S/4, ECC, BTP, HANA",
      "Verification conformite RGPD / ISO / audit interne, recommandations et plan d'action priorises",
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
            Cinq piliers pour couvrir{" "}
            <em className="not-italic text-oxblood">l&apos;ensemble du cycle</em> SAP
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ash-light md:text-lg">
            De la conception a l&apos;exploitation quotidienne, en passant par le
            pilotage de projet, la strategie cloud et la cybersecurite.
          </p>
        </div>
      </section>

      {/* Expertise blueprint — 5-pillar visual map */}
      <section className="border-b border-hairline bg-bone py-16 md:py-20">
        <div className="section-container">
          <ExpertiseBlueprint />
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
