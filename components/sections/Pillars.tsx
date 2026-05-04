import { Compass, Route, Wrench, Cloud, ShieldCheck, ArrowUpRight } from "lucide-react";
import { SapLandscape } from "@/components/SapLandscape";
import { ScrollReveal } from "@/components/ScrollReveal";
import Link from "next/link";


const PILLARS = [
  {
    num: "01",
    title: "Architecture SAP",
    href: "/expertise#architecture",
    icon: Compass,
    description:
      "Concevoir un paysage SAP qui tient dans le temps — choix technologiques, intégration, stratégie cloud.",
    tags: ["SAP Basis", "S/4HANA", "BTP", "Intégration"],
  },
  {
    num: "02",
    title: "Pilotage de projet SAP",
    href: "/expertise#pilotage",
    icon: Route,
    description:
      "Du cadrage au Go-Live. Gouvernance, conduite du changement, coordination d'équipes on-shore / near-shore / off-shore.",
    tags: ["SAP Activate", "PMO", "Change", "Gouvernance"],
  },
  {
    num: "03",
    title: "Exploitation applicative",
    href: "/expertise#exploitation",
    icon: Wrench,
    description:
      "Support N2/N3, run ops optimisé. Un projet ne s'arrête pas à la mise en production.",
    tags: ["N2/N3", "Run Ops", "Monitoring"],
  },
  {
    num: "04",
    title: "Cloud SAP",
    href: "/expertise#cloud",
    icon: Cloud,
    description:
      "RISE with SAP, Grow with SAP, Azure, AWS, OVHcloud souverain. Choisir la bonne infrastructure selon vos contraintes de souveraineté et budgétaires.",
    tags: ["RISE", "Azure", "AWS", "OVHcloud"],
  },
  {
    num: "05",
    title: "Cybersécurité SAP",
    href: "/expertise#cybersecurite",
    icon: ShieldCheck,
    description:
      "Protéger les données, les accès et les processus critiques de l'entreprise contre toute menace. Intégrité, confidentialité, conformité — un enjeu global.",
    tags: ["SSO", "IAM", "Security Notes", "RGPD"],
  },
] as const;

export function Pillars() {
  return (
    <section className="bg-bone py-20 md:py-28" aria-labelledby="pillars-heading">
      <div className="section-container">
        <ScrollReveal animation="fade-up">
          <p className="kicker mb-4">Expertise</p>
          <h2
            id="pillars-heading"
            className="display-heading mb-4 text-2xl md:text-4xl"
          >
            Quatre piliers, <em>un seul objectif</em>
          </h2>
          <p className="mb-12 max-w-xl text-ash">
            Couvrir l&apos;ensemble du cycle de vie SAP — de la conception à
            l&apos;exploitation quotidienne.
          </p>
        </ScrollReveal>

        {/* Pedagogical SAP landscape — the real thing: legacy → method → target,
            with hoverable blocks that explain each component in plain words. */}
        <ScrollReveal animation="fade-up" className="mb-20 hidden lg:block">
          <div className="rounded-sm border border-hairline bg-white/40 p-8">
            <div className="mb-6 flex items-baseline justify-between">
              <div>
                <p className="kicker">Méthode · Landscape SAP</p>
                <h3 className="display-heading mt-2 text-2xl text-ink">
                  De votre ECC d&apos;aujourd&apos;hui
                  <br />
                  à votre S/4HANA de 2027.
                </h3>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-ash">
                Chaque bloc est cliquable : survolez pour comprendre ce
                qu&apos;il signifie techniquement et ce qu&apos;il
                implique pour votre projet.
              </p>
            </div>
            <SapLandscape />
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal
                key={pillar.num}
                animation={i % 2 === 0 ? "fade-left" : "fade-right"}
                delay={i * 100}
              >
                <Link
                  href={pillar.href}
                  className="group relative block rounded-lg border border-hairline bg-bone p-6 transition-all duration-300 hover:border-gold/30 hover:bg-white hover:shadow-lg hover:shadow-gold/5 md:p-8"
                >
                  {/* Hover glow effect */}
                  <div className="pointer-events-none absolute -inset-px rounded-lg bg-gradient-to-br from-gold/0 to-gold/0 opacity-0 transition-opacity duration-500 group-hover:from-gold/5 group-hover:to-transparent group-hover:opacity-100" />

                  <div className="relative">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink/5 transition-colors duration-300 group-hover:bg-gold/10">
                          <Icon
                            size={22}
                            strokeWidth={1.5}
                            className="text-ink transition-colors duration-300 group-hover:text-gold"
                          />
                        </div>
                        <span className="font-mono text-xs text-ash">
                          {pillar.num}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.5}
                        className="translate-x-1 translate-y-1 text-ash opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-gold group-hover:opacity-100"
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
                          className="rounded-sm bg-ink/5 px-2 py-0.5 font-mono text-[11px] text-ash transition-colors duration-300 group-hover:bg-gold/10 group-hover:text-ink"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
