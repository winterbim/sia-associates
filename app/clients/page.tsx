import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "De VINCI Construction à GRDF, en passant par Safran, RTE et ENGIE — découvrez les grands comptes qui ont fait confiance à SIA Associates.",
};

type Client = {
  name: string;
  src?: string;
  period: string;
};

const CLIENTS: readonly Client[] = [
  { name: "UGAP", period: "2010 – 2011" },
  { name: "COFIROUTE", period: "2011 – 2012" },
  { name: "MONOPRIX", period: "2014" },
  { name: "MOTUL", period: "2014 – 2015" },
  { name: "ENGIE", src: "/clients/engie.png", period: "2015 – 2016" },
  { name: "GRDF", src: "/clients/grdf.svg", period: "2016 – 2018" },
  { name: "SAFRAN", src: "/clients/safran.png", period: "2018 – 2019" },
  { name: "RTE", src: "/clients/rte.svg", period: "2020 – 2021" },
  { name: "VINCI Construction", src: "/clients/vinci.png", period: "2022 – 2024" },
  { name: "FINANCIÈRE SNOP Dunois", period: "2024 – 2025" },
  { name: "EQUANS", period: "2025 – aujourd'hui" },
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
      "SAP Senior BC Consultant intégré au groupe : référent technique sur le paysage SAP en production, support à l'architecture applicative, optimisation du run, cadrage des évolutions, accompagnement et montée en compétence des équipes internes.",
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
          {(() => {
            const yearStart = 2010;
            const yearEnd = 2026;
            const xMin = 50;
            const xMax = 970;
            const xFor = (y: number) =>
              xMin + ((y - yearStart) / (yearEnd - yearStart)) * (xMax - xMin);
            const missions = [
              { name: "UGAP", start: 2010, end: 2011, lane: 0 },
              { name: "COFIROUTE", start: 2011, end: 2012, lane: 1 },
              { name: "MONOPRIX", start: 2014, end: 2014.5, lane: 0 },
              { name: "MOTUL", start: 2014.5, end: 2015, lane: 1 },
              { name: "ENGIE", start: 2015, end: 2016, lane: 0 },
              { name: "GRDF", start: 2016, end: 2018, lane: 1 },
              { name: "SAFRAN", start: 2018, end: 2019, lane: 0 },
              { name: "RTE", start: 2020, end: 2021, lane: 1 },
              { name: "VINCI", start: 2022, end: 2024, lane: 0 },
              { name: "SNOP", start: 2024, end: 2025, lane: 1 },
              { name: "EQUANS", start: 2025, end: 2026, lane: 0, active: true },
            ] as const;
            const laneY: [number, number] = [55, 25];
            const labelY: [number, number] = [52, 22];
            return (
              <svg
                viewBox="0 0 1000 100"
                className="w-full"
                aria-label="Frise chronologique des missions"
              >
                {/* Timeline base */}
                <line x1={xMin} y1="80" x2={xMax} y2="80" stroke="#E5DED0" strokeWidth="2" />

                {/* Year markers */}
                {[2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024, 2026].map((year) => {
                  const x = xFor(year);
                  return (
                    <g key={year}>
                      <line x1={x} y1="75" x2={x} y2="85" stroke="#A8A29A" strokeWidth="1" />
                      <text
                        x={x}
                        y="95"
                        fill="#A8A29A"
                        fontSize="8"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {year}
                      </text>
                    </g>
                  );
                })}

                {/* Mission blocks + labels */}
                {missions.map((m, i) => {
                  const x1 = xFor(m.start);
                  const x2 = xFor(m.end);
                  const y = laneY[m.lane];
                  const opacity = 0.25 + (i / missions.length) * 0.55;
                  return (
                    <g key={m.name}>
                      <rect
                        x={x1}
                        y={y}
                        width={Math.max(x2 - x1, 6)}
                        height={8}
                        rx={2}
                        fill="#C8A24B"
                        opacity={"active" in m && m.active ? 0.9 : opacity}
                      />
                      <text
                        x={(x1 + x2) / 2}
                        y={labelY[m.lane]}
                        fill={"active" in m && m.active ? "#C8A24B" : "#6E6A62"}
                        fontSize="7"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {m.name}
                      </text>
                    </g>
                  );
                })}

                {/* Active pulse on EQUANS */}
                <circle
                  cx={xFor(2025.5)}
                  cy={laneY[0] + 4}
                  r={3}
                  fill="#C8A24B"
                  className="animate-pulse-gold"
                />
              </svg>
            );
          })()}
        </div>
      </section>

      {/* Logo wall */}
      <section className="bg-bone py-16 md:py-24" aria-labelledby="logos-heading">
        <div className="section-container">
          <h2 id="logos-heading" className="display-heading mb-12 text-center text-2xl md:text-3xl">
            Ils m&apos;ont fait confiance
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="group flex flex-col items-center gap-3 rounded-lg border border-hairline bg-bone p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="flex h-12 items-center justify-center">
                  {client.src ? (
                    <Image
                      src={client.src}
                      alt={`Logo ${client.name}`}
                      width={200}
                      height={80}
                      className="h-12 w-auto opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  ) : (
                    <span className="font-display text-base font-semibold uppercase tracking-[0.18em] text-ink/70 transition-colors duration-300 group-hover:text-ink">
                      {client.name}
                    </span>
                  )}
                </div>
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
