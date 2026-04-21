import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "De VINCI Construction à GRDF, en passant par Safran, RTE et ENGIE — découvrez les grands comptes qui ont fait confiance à SIA Associates.",
};

const CLIENTS = [
  { name: "VINCI Construction", src: "/clients/vinci.png", period: "2022 – aujourd'hui" },
  { name: "GRDF", src: "/clients/grdf.svg", period: "2016 – 2018, 2021 – 2022" },
  { name: "RTE", src: "/clients/rte.svg", period: "2020 – 2021" },
  { name: "Safran", src: "/clients/safran.png", period: "2018 – 2019" },
  { name: "ENGIE", src: "/clients/engie.png", period: "2015 – 2016" },
  { name: "Applium", src: "/clients/applium.svg", period: "2012 – 2015" },
] as const;

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
      "SAP Senior BC Consultant intégré au groupe : référent technique sur le paysage SAP en production, support à l'architecture applicative, optimisation du run, cadrage des évolutions, accompagnement et montée en compétence des équipes internes. Mission longue, toujours en cours.",
    tags: ["Senior BC", "Run Ops", "Architecture", "Montée en compétence"],
  },
] as const;

export default function ClientsPage() {
  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="bg-ink py-16 md:py-24">
        <div className="section-container">
          <p className="kicker mb-4">Clients</p>
          <h1 className="display-heading max-w-3xl text-3xl text-bone md:text-5xl">
            Des grands comptes,{" "}
            <em className="not-italic text-oxblood">des missions réelles</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ash-light md:text-lg">
            Chaque logo représente des mois de collaboration, des systèmes
            sécurisés, des équipes accompagnées.
          </p>
        </div>
      </section>

      {/* Timeline Sankey */}
      <section className="border-b border-hairline bg-bone py-12">
        <div className="section-container">
          <p className="kicker mb-6 text-center">Parcours chronologique</p>
          <svg viewBox="0 0 1000 100" className="w-full" aria-label="Frise chronologique des missions">
            {/* Timeline base */}
            <line x1="50" y1="80" x2="950" y2="80" stroke="#E5DED0" strokeWidth="2" />

            {/* Year markers */}
            {[2007, 2012, 2015, 2016, 2018, 2020, 2021, 2022, 2026].map((year, i) => {
              const x = 50 + (i / 8) * 900;
              return (
                <g key={year}>
                  <line x1={x} y1="75" x2={x} y2="85" stroke="#A8A29A" strokeWidth="1" />
                  <text x={x} y="95" fill="#A8A29A" fontSize="8" fontFamily="monospace" textAnchor="middle">{year}</text>
                </g>
              );
            })}

            {/* Mission blocks */}
            {/* UAKO 2007-2012 */}
            <rect x="50" y="55" width={50 + (4/8)*900 - 50} height="8" rx="2" fill="#C8A24B" opacity="0.15" />
            {/* Applium 2012-2015 */}
            <rect x={50 + (1/8)*900} y="45" width={(2/8)*900} height="8" rx="2" fill="#C8A24B" opacity="0.25" />
            {/* ENGIE 2015-2016 */}
            <rect x={50 + (2/8)*900} y="35" width={(1/8)*900} height="8" rx="2" fill="#C8A24B" opacity="0.35" />
            {/* GRDF 2016-2018 */}
            <rect x={50 + (3/8)*900} y="25" width={(1/8)*900} height="8" rx="2" fill="#C8A24B" opacity="0.45" />
            {/* Safran 2018-2019 */}
            <rect x={50 + (4/8)*900} y="35" width={(0.5/8)*900} height="8" rx="2" fill="#C8A24B" opacity="0.5" />
            {/* RTE 2020-2021 */}
            <rect x={50 + (5/8)*900} y="25" width={(1/8)*900} height="8" rx="2" fill="#C8A24B" opacity="0.55" />
            {/* GRDF 2 2021-2022 */}
            <rect x={50 + (6/8)*900} y="15" width={(0.5/8)*900} height="8" rx="2" fill="#C8A24B" opacity="0.6" />
            {/* VINCI 2022-now */}
            <rect x={50 + (7/8)*900} y="15" width={(1/8)*900} height="8" rx="2" fill="#C8A24B" opacity="0.8" />

            {/* Active pulse on VINCI */}
            <circle cx={50 + (7.5/8)*900} cy="19" r="3" fill="#C8A24B" className="animate-pulse-gold" />

            {/* Labels */}
            <text x={50 + (0.5/8)*900} y="52" fill="#6E6A62" fontSize="7" fontFamily="monospace" textAnchor="middle">UAKO</text>
            <text x={50 + (1.5/8)*900} y="42" fill="#6E6A62" fontSize="7" fontFamily="monospace" textAnchor="middle">Applium</text>
            <text x={50 + (2.5/8)*900} y="32" fill="#6E6A62" fontSize="7" fontFamily="monospace" textAnchor="middle">ENGIE</text>
            <text x={50 + (3.5/8)*900} y="22" fill="#6E6A62" fontSize="7" fontFamily="monospace" textAnchor="middle">GRDF</text>
            <text x={50 + (4.25/8)*900} y="32" fill="#6E6A62" fontSize="7" fontFamily="monospace" textAnchor="middle">Safran</text>
            <text x={50 + (5.5/8)*900} y="22" fill="#6E6A62" fontSize="7" fontFamily="monospace" textAnchor="middle">RTE</text>
            <text x={50 + (6.25/8)*900} y="12" fill="#6E6A62" fontSize="7" fontFamily="monospace" textAnchor="middle">GRDF</text>
            <text x={50 + (7.5/8)*900} y="12" fill="#C8A24B" fontSize="7" fontFamily="monospace" textAnchor="middle">VINCI</text>
          </svg>
        </div>
      </section>

      {/* Logo wall */}
      <section className="bg-bone py-16 md:py-24" aria-labelledby="logos-heading">
        <div className="section-container">
          <h2 id="logos-heading" className="display-heading mb-12 text-center text-2xl md:text-3xl">
            Ils m&apos;ont fait confiance
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="group flex flex-col items-center gap-3 rounded-lg border border-hairline bg-bone p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
              >
                <Image
                  src={client.src}
                  alt={`Logo ${client.name}`}
                  width={200}
                  height={80}
                  className="h-12 w-auto opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
                <p className="font-mono text-[10px] text-ash">{client.period}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-ink py-16 md:py-24" aria-labelledby="cases-heading">
        <div className="section-container">
          <p className="kicker mb-4">Cas phares · exemples concrets</p>
          <h2
            id="cases-heading"
            className="display-heading mb-4 text-2xl text-bone md:text-4xl"
          >
            Trois secteurs, <em className="not-italic text-oxblood">trois missions</em>
          </h2>
          <p className="mb-12 max-w-xl text-sm leading-relaxed text-ash-light">
            Trois contextes très différents, trois postures complémentaires —
            pilote, architecte, consultant senior en mission longue.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {CASES.map((c) => (
              <article
                key={c.sector}
                className="rounded-lg border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-gold/20 hover:bg-white/[0.08] md:p-8"
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
    </div>
  );
}
