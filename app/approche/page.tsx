import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Approche",
  description:
    "Méthodologie, principes et phases de mission. Transparence, transfert de compétences, rigueur du chiffrage et indépendance.",
};

const PRINCIPLES = [
  {
    num: "01",
    title: "La vérité, toujours",
    description:
      "Un projet mal engagé vaut mieux reconnu tôt qu'enterré sous six mois de comités. Je dis ce que je vois — même quand c'est inconfortable — et je le dis clairement, à chaque étape.",
  },
  {
    num: "02",
    title: "Le transfert de compétences",
    description:
      "Je ne construis pas votre dépendance à moi. Chaque mission inclut de la documentation, de la formation, et une trajectoire vers l'autonomie de vos équipes.",
  },
  {
    num: "03",
    title: "La rigueur du chiffrage",
    description:
      "Un devis serré qui dérape de 40% n'est pas un devis, c'est un piège. Je m'engage sur un chiffrage honnête — même plus élevé — que je respecte et que je livre. Pas d'effet de seuil en cours de route.",
  },
  {
    num: "04",
    title: "L'indépendance revendiquée",
    description:
      "Aucun partenariat commercial ne m'engage à pousser telle ou telle solution. Le choix technique sert votre intérêt, pas des commissions. Et cette indépendance tient dans le temps, mission après mission.",
  },
] as const;

const PHASES = [
  {
    num: "01",
    title: "Premier échange",
    duration: "1 h · offert",
    description:
      "Comprendre votre contexte, votre besoin, vos contraintes. Objectif : déterminer si je suis la bonne personne pour votre sujet.",
  },
  {
    num: "02",
    title: "Cadrage",
    duration: "2–5 jours",
    description:
      "Livrable écrit, chiffrage ferme. Vous ressortez avec une proposition structurée, lisible, défendable en comité.",
  },
  {
    num: "03",
    title: "Exécution",
    duration: "Selon périmètre",
    description:
      "Points hebdomadaires, reporting mensuel, escalade immédiate en cas de difficulté. Aucune surprise en cours de route.",
  },
  {
    num: "04",
    title: "Clôture & passation",
    duration: "1–2 semaines",
    description:
      "Documentation complète, transfert aux équipes internes, bilan de mission. Je ne pars pas avant que vous soyez autonome.",
  },
] as const;

export default function ApprochePage() {
  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="bg-ink py-16 md:py-24">
        <div className="section-container">
          <p className="kicker mb-4">Approche</p>
          <h1 className="display-heading max-w-3xl text-3xl text-bone md:text-5xl">
            Une méthode,{" "}
            <em className="not-italic text-oxblood">pas un discours commercial</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ash-light md:text-lg">
            Quatre principes non négociables et un processus en quatre phases.
            Transparence totale sur la façon dont je travaille.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-bone py-16 md:py-24" aria-labelledby="principles-heading">
        <div className="section-container">
          <p className="kicker mb-4">Principes</p>
          <h2
            id="principles-heading"
            className="display-heading mb-12 text-2xl md:text-4xl"
          >
            Quatre engagements <em>non négociables</em>
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div
                key={p.num}
                className="group rounded-lg border border-hairline bg-bone p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 md:p-8"
              >
                <span className="font-mono text-xs text-gold">{p.num}</span>
                <h3 className="mt-2 font-display text-xl font-medium text-ink md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phases with Sankey flow */}
      <section
        id="audit"
        className="bg-ink py-16 md:py-24"
        aria-labelledby="phases-heading"
      >
        <div className="section-container">
          <p className="kicker mb-4">Processus</p>
          <h2
            id="phases-heading"
            className="display-heading mb-6 text-2xl text-bone md:text-4xl"
          >
            Quatre phases, <em className="not-italic text-oxblood">zéro surprise</em>
          </h2>
          <p className="mb-12 max-w-xl text-ash-light">
            Chaque mission suit le même déroulement. Vous savez où vous en êtes à
            chaque instant.
          </p>

          {/* Phase flow visualization */}
          <div className="mb-12 hidden lg:block">
            <svg viewBox="0 0 1000 80" className="w-full" aria-hidden="true">
              {/* Phase nodes */}
              {PHASES.map((phase, i) => {
                const x = 50 + i * 240;
                const width = 180;
                return (
                  <g key={phase.num}>
                    <rect x={x} y="20" width={width} height="40" rx="4" fill="none" stroke="#C8A24B" strokeWidth="1" opacity="0.4" />
                    <text x={x + width / 2} y="38" fill="#F4EFE6" fontSize="9" fontFamily="monospace" textAnchor="middle">{phase.num} · {phase.title}</text>
                    <text x={x + width / 2} y="52" fill="#A8A29A" fontSize="8" fontFamily="monospace" textAnchor="middle">{phase.duration}</text>
                    {i < 3 && (
                      <path
                        d={`M${x + width},40 L${x + width + 60},40`}
                        stroke="#C8A24B"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        opacity="0.3"
                        className="animate-flow-path"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />
                    )}
                    <circle cx={x + width / 2} cy="40" r="2" fill="#C8A24B" className="animate-pulse-gold" style={{ animationDelay: `${i * 0.4}s` }} />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PHASES.map((phase) => (
              <div
                key={phase.num}
                className="group relative rounded-lg border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-gold/20 hover:bg-white/[0.08]"
              >
                {/* Connecting line indicator */}
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gold/20 lg:block last:lg:hidden" />
                <span className="font-mono text-xs text-gold">
                  {phase.num}
                </span>
                <h3 className="mt-2 font-display text-lg font-medium text-bone">
                  {phase.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-ash-light">
                  {phase.duration}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ash-light">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-4 font-mono text-xs uppercase tracking-kicker text-ink transition-all duration-200 hover:bg-gold-hover"
            >
              Planifier un premier échange
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
