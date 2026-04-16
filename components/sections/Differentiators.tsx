import { Layers, Globe, Shield } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

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
        <ScrollReveal animation="fade-up">
          <p className="kicker mb-4">Differenciation</p>
          <h2
            id="diff-heading"
            className="display-heading mb-12 text-2xl md:text-4xl"
          >
            Ce que j&apos;apporte <em>de plus</em>
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {DIFFS.map((diff, i) => {
            const Icon = diff.icon;
            return (
              <ScrollReveal key={diff.num} animation="fade-up" delay={i * 150}>
                <div className="group relative h-full overflow-hidden rounded-lg border border-hairline bg-bone p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 md:p-8">
                  {/* Animated corner accent */}
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/5 transition-all duration-700 group-hover:scale-[3] group-hover:bg-gold/10" />
                  {/* Bottom glow on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold/50 to-gold/0 transition-transform duration-500 group-hover:scale-x-100" />

                  <div className="relative">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 transition-all duration-300 group-hover:bg-gold/20 group-hover:shadow-md group-hover:shadow-gold/10">
                        <Icon
                          size={22}
                          strokeWidth={1.5}
                          className="text-gold"
                        />
                      </div>
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
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
