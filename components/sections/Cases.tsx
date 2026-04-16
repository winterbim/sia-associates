const CASES = [
  {
    sector: "Energie",
    title: "Pilotage technique",
    description:
      "Pilotage technique SAP sur paysage critique d'un operateur energetique francais. Coordination migration, fiabilisation des interfaces, securisation des flux metiers. Zero incident majeur post-migration.",
    tags: ["Pilotage", "Basis", "Migration"],
    inspired: "RTE / GRDF",
  },
  {
    sector: "Industrie",
    title: "Architecture technique",
    description:
      "Architecture SAP technique pour un groupe industriel de defense. Cadrage de la trajectoire cloud, strategie Basis, gouvernance des environnements. Paysage securise et maintenable.",
    tags: ["Architecture", "Basis", "Cloud"],
    inspired: "Safran",
  },
  {
    sector: "Construction",
    title: "Consulting senior",
    description:
      "SAP Senior BC Consultant au sein du groupe. Support a l'architecture applicative, optimisation du run, accompagnement des equipes internes. Mission en cours.",
    tags: ["Senior BC", "Run Ops", "Architecture"],
    inspired: "VINCI Construction",
  },
] as const;

export function Cases() {
  return (
    <section
      className="bg-ink py-20 md:py-28"
      aria-labelledby="cases-heading"
    >
      <div className="section-container">
        <p className="kicker mb-4">Realisations</p>
        <h2
          id="cases-heading"
          className="display-heading mb-12 text-2xl text-bone md:text-4xl"
        >
          Des missions, <em className="text-gold">des resultats</em>
        </h2>

        {/* Sankey-style workflow connecting the cases */}
        <div className="mb-12 hidden lg:block">
          <svg viewBox="0 0 1000 60" className="w-full" aria-hidden="true">
            {/* Flow from left through 3 nodes to right */}
            <path d="M0,30 L150,30" stroke="#C8A24B" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" className="animate-flow-path" />
            {/* Node 1 */}
            <rect x="150" y="15" width="180" height="30" rx="4" fill="none" stroke="#C8A24B" strokeWidth="1" opacity="0.3" />
            <text x="240" y="34" fill="#A8A29A" fontSize="9" fontFamily="monospace" textAnchor="middle">ENERGIE</text>
            {/* Connection */}
            <path d="M330,30 L410,30" stroke="#C8A24B" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" className="animate-flow-path" style={{ animationDelay: "0.3s" }} />
            {/* Node 2 */}
            <rect x="410" y="15" width="180" height="30" rx="4" fill="none" stroke="#C8A24B" strokeWidth="1" opacity="0.3" />
            <text x="500" y="34" fill="#A8A29A" fontSize="9" fontFamily="monospace" textAnchor="middle">INDUSTRIE</text>
            {/* Connection */}
            <path d="M590,30 L670,30" stroke="#C8A24B" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" className="animate-flow-path" style={{ animationDelay: "0.6s" }} />
            {/* Node 3 */}
            <rect x="670" y="15" width="180" height="30" rx="4" fill="none" stroke="#C8A24B" strokeWidth="1" opacity="0.3" />
            <text x="760" y="34" fill="#A8A29A" fontSize="9" fontFamily="monospace" textAnchor="middle">CONSTRUCTION</text>
            {/* Trailing line */}
            <path d="M850,30 L1000,30" stroke="#C8A24B" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" className="animate-flow-path" style={{ animationDelay: "0.9s" }} />
            {/* Pulse dots */}
            <circle cx="240" cy="30" r="3" fill="#C8A24B" className="animate-pulse-gold" />
            <circle cx="500" cy="30" r="3" fill="#C8A24B" className="animate-pulse-gold" style={{ animationDelay: "0.3s" }} />
            <circle cx="760" cy="30" r="3" fill="#C8A24B" className="animate-pulse-gold" style={{ animationDelay: "0.6s" }} />
          </svg>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CASES.map((c) => (
            <article
              key={c.sector}
              className="group rounded-lg border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-gold/20 hover:bg-white/[0.08] md:p-8"
            >
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
                    className="rounded-sm bg-white/10 px-2 py-0.5 font-mono text-[11px] text-ash-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
