import { Layers, Globe, Shield } from "lucide-react";

const DIFFS = [
  {
    num: "01",
    title: "La vue transverse",
    icon: Layers,
    description:
      "Finance, logistique, achats, production, RH, BI — je parle le langage de chaque corps de metier SAP. Un architecte qui ne comprend qu'un seul module n'est pas un architecte.",
  },
  {
    num: "02",
    title: "L'experience multi-clients",
    icon: Globe,
    description:
      "Energie (GRDF, RTE, ENGIE), industrie (Safran, VINCI Construction), integration (Applium) — chaque secteur a ses contraintes. Je les ai vues, je les ai traitees.",
  },
  {
    num: "03",
    title: "L'independance",
    icon: Shield,
    description:
      "Pas d'obligation de revendre telle ou telle solution partenaire. Le meilleur choix technique pour votre contexte — pas celui qui remplit un quota commercial.",
  },
] as const;

export function Differentiators() {
  return (
    <section
      className="bg-bone py-20 md:py-28"
      aria-labelledby="diff-heading"
    >
      <div className="section-container">
        <p className="kicker mb-4">Differenciation</p>
        <h2
          id="diff-heading"
          className="display-heading mb-12 text-2xl md:text-4xl"
        >
          Ce que j&apos;apporte <em>de plus</em>
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {DIFFS.map((diff) => {
            const Icon = diff.icon;
            return (
              <div
                key={diff.num}
                className="group relative rounded-lg border border-hairline bg-bone p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 md:p-8"
              >
                {/* Decorative corner accent */}
                <div className="absolute right-4 top-4 h-8 w-8 rounded-full border border-gold/10 transition-all duration-500 group-hover:scale-150 group-hover:border-gold/20 group-hover:opacity-0" />

                <div className="mb-4 flex items-center gap-3">
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    className="text-gold"
                  />
                  <span className="font-mono text-xs text-ash">
                    {diff.num}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-ink">
                  {diff.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">
                  {diff.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
