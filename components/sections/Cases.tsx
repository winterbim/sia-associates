import { ScrollReveal } from "@/components/ScrollReveal";
import { SankeyWorkflow } from "@/components/SankeyWorkflow";

const CASES = [
  {
    sector: "Énergie",
    title: "Pilotage technique",
    description:
      "Pilotage technique SAP sur paysage critique d'un opérateur énergétique français. Coordination migration, fiabilisation des interfaces, sécurisation des flux métiers. Zéro incident majeur post-migration.",
    tags: ["Pilotage", "Basis", "Migration"],
  },
  {
    sector: "Industrie",
    title: "Architecture technique",
    description:
      "Architecture SAP technique pour un groupe industriel de défense. Cadrage de la trajectoire cloud, stratégie Basis, gouvernance des environnements. Paysage sécurisé et maintenable.",
    tags: ["Architecture", "Basis", "Cloud"],
  },
  {
    sector: "Construction",
    title: "Consulting senior",
    description:
      "SAP Senior BC Consultant au sein du groupe. Support à l'architecture applicative, optimisation du run, accompagnement des équipes internes. Mission en cours.",
    tags: ["Senior BC", "Run Ops", "Architecture"],
  },
] as const;

const TIMELINE_NODES = [
  { id: "energy", label: "ÉNERGIE", x: 30, y: 20, width: 120, height: 30, color: "#1a1f27" },
  { id: "industry", label: "INDUSTRIE", x: 220, y: 20, width: 120, height: 30, color: "#1a1f27" },
  { id: "construction", label: "CONSTRUCTION", x: 410, y: 20, width: 140, height: 30, color: "#1a1f27" },
];

const TIMELINE_LINKS = [
  { source: "energy", target: "industry", value: 4 },
  { source: "industry", target: "construction", value: 4 },
];

export function Cases() {
  return (
    <section
      className="bg-ink py-20 md:py-28"
      aria-labelledby="cases-heading"
    >
      <div className="section-container">
        <ScrollReveal animation="fade-up">
          <p className="kicker mb-4">Réalisations</p>
          <h2
            id="cases-heading"
            className="display-heading mb-12 text-2xl text-bone md:text-4xl"
          >
            Des missions, <em className="text-oxblood">des résultats</em>
          </h2>
        </ScrollReveal>

        {/* Animated timeline flow */}
        <ScrollReveal animation="scale" className="mb-12 hidden lg:block">
          <SankeyWorkflow
            nodes={TIMELINE_NODES}
            links={TIMELINE_LINKS}
            width={580}
            height={70}
            className="mx-auto w-full max-w-2xl"
            title="Parcours sectoriel"
          />
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {CASES.map((c, i) => (
            <ScrollReveal key={c.sector} animation="fade-up" delay={i * 150}>
              <article className="group h-full overflow-hidden rounded-lg border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-gold/20 hover:bg-white/[0.08] md:p-8">
                {/* Top accent line */}
                <div className="mb-4 h-0.5 w-8 bg-gold/40 transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />

                <p className="kicker mb-3">{c.sector}</p>
                <h3 className="font-display text-xl font-medium text-bone">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash-light">
                  {c.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm bg-white/10 px-2 py-0.5 font-mono text-[11px] text-ash-light transition-colors duration-300 group-hover:bg-gold/10 group-hover:text-gold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
