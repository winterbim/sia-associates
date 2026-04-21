import { ScrollReveal } from "@/components/ScrollReveal";
import { ParticleField } from "@/components/ParticleField";

const KEYWORDS = {
  xl: ["SAP Basis", "S/4HANA", "BTP", "RISE"],
  lg: [
    "SAP Activate",
    "ABAP",
    "Fiori",
    "ECC6",
    "EWM",
    "Clean Core",
    "Azure",
    "AWS",
  ],
  md: [
    "FI/CO",
    "MM",
    "SD",
    "PP",
    "WM",
    "HR",
    "Grow with SAP",
    "OVHcloud",
    "Datasphere",
    "Analytics Cloud",
    "BW/4HANA",
  ],
  sm: ["SolMan", "Signavio", "CPI", "IDoc", "BAPI", "OData"],
} as const;

export function Keywords() {
  return (
    <section
      className="relative overflow-hidden bg-ink py-20 md:py-28"
      aria-labelledby="keywords-heading"
    >
      {/* Particle network background */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <ParticleField particleCount={30} color="#C8A24B" />
      </div>

      <div className="section-container relative">
        <ScrollReveal animation="fade-up">
          <p className="kicker mb-4">Competences</p>
          <h2
            id="keywords-heading"
            className="display-heading mb-12 text-2xl text-bone md:text-4xl"
          >
            L&apos;écosystème SAP, <em className="text-oxblood">maîtrise</em>
          </h2>
        </ScrollReveal>

        {/* Keyword cloud with staggered reveals */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-8 md:gap-y-5"
          aria-label="Nuage de competences SAP"
        >
          {KEYWORDS.xl.map((kw, i) => (
            <ScrollReveal key={kw} animation="blur" delay={i * 80}>
              <span className="font-display text-3xl font-medium text-bone transition-colors duration-300 hover:text-gold md:text-[40px]">
                {kw}
              </span>
            </ScrollReveal>
          ))}
          {KEYWORDS.lg.map((kw, i) => (
            <ScrollReveal key={kw} animation="blur" delay={320 + i * 60}>
              <span className="text-lg text-ash-light transition-colors duration-300 hover:text-bone md:text-2xl">
                {kw}
              </span>
            </ScrollReveal>
          ))}
          {KEYWORDS.md.map((kw, i) => (
            <ScrollReveal key={kw} animation="blur" delay={800 + i * 40}>
              <span className="text-sm text-ash-light/70 transition-colors duration-300 hover:text-ash-light md:text-lg">
                {kw}
              </span>
            </ScrollReveal>
          ))}
          {KEYWORDS.sm.map((kw, i) => (
            <ScrollReveal key={kw} animation="blur" delay={1240 + i * 40}>
              <span className="font-mono text-xs text-ash-light/50 transition-colors duration-300 hover:text-ash-light md:text-[15px]">
                {kw}
              </span>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fade-up" delay={1500}>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-ash-light md:text-base">
            Au-dela des mots-clés : une comprehension transverse des corps de
            metier SAP. Finance, logistique, achats, production, RH, BI — chacun a
            ses règles, ses contraintes, ses non-dits. Je parle la langue de
            chacun.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
