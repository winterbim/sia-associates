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
      {/* Animated network lines background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
          {/* Network nodes and connections */}
          <circle cx="100" cy="80" r="2" fill="#C8A24B" className="animate-pulse-gold" />
          <circle cx="300" cy="120" r="3" fill="#C8A24B" className="animate-pulse-gold" style={{ animationDelay: "0.5s" }} />
          <circle cx="500" cy="60" r="2" fill="#C8A24B" className="animate-pulse-gold" style={{ animationDelay: "1s" }} />
          <circle cx="700" cy="150" r="2.5" fill="#C8A24B" className="animate-pulse-gold" style={{ animationDelay: "1.5s" }} />
          <circle cx="200" cy="250" r="2" fill="#C8A24B" className="animate-pulse-gold" style={{ animationDelay: "0.3s" }} />
          <circle cx="600" cy="300" r="3" fill="#C8A24B" className="animate-pulse-gold" style={{ animationDelay: "0.8s" }} />
          <circle cx="400" cy="350" r="2" fill="#C8A24B" className="animate-pulse-gold" style={{ animationDelay: "1.2s" }} />
          {/* Connection lines */}
          <line x1="100" y1="80" x2="300" y2="120" stroke="#C8A24B" strokeWidth="0.5" strokeDasharray="4 4" className="animate-flow-path" />
          <line x1="300" y1="120" x2="500" y2="60" stroke="#C8A24B" strokeWidth="0.5" strokeDasharray="4 4" className="animate-flow-path" style={{ animationDelay: "0.3s" }} />
          <line x1="500" y1="60" x2="700" y2="150" stroke="#C8A24B" strokeWidth="0.5" strokeDasharray="4 4" className="animate-flow-path" style={{ animationDelay: "0.6s" }} />
          <line x1="200" y1="250" x2="400" y2="350" stroke="#C8A24B" strokeWidth="0.5" strokeDasharray="4 4" className="animate-flow-path" style={{ animationDelay: "0.9s" }} />
          <line x1="400" y1="350" x2="600" y2="300" stroke="#C8A24B" strokeWidth="0.5" strokeDasharray="4 4" className="animate-flow-path" style={{ animationDelay: "1.1s" }} />
        </svg>
      </div>

      <div className="section-container relative">
        <p className="kicker mb-4">Competences</p>
        <h2
          id="keywords-heading"
          className="display-heading mb-12 text-2xl text-bone md:text-4xl"
        >
          L&apos;ecosysteme SAP, <em className="text-gold">maitrise</em>
        </h2>

        {/* Keyword cloud */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-8 md:gap-y-5"
          aria-label="Nuage de competences SAP"
        >
          {KEYWORDS.xl.map((kw) => (
            <span
              key={kw}
              className="font-display text-3xl font-medium text-bone md:text-[40px]"
            >
              {kw}
            </span>
          ))}
          {KEYWORDS.lg.map((kw) => (
            <span
              key={kw}
              className="text-lg text-ash-light md:text-2xl"
            >
              {kw}
            </span>
          ))}
          {KEYWORDS.md.map((kw) => (
            <span
              key={kw}
              className="text-sm text-ash-light/70 md:text-lg"
            >
              {kw}
            </span>
          ))}
          {KEYWORDS.sm.map((kw) => (
            <span
              key={kw}
              className="font-mono text-xs text-ash-light/50 md:text-[15px]"
            >
              {kw}
            </span>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-ash-light md:text-base">
          Au-dela des mots-cles : une comprehension transverse des corps de
          metier SAP. Finance, logistique, achats, production, RH, BI — chacun a
          ses regles, ses contraintes, ses non-dits. Je parle la langue de
          chacun.
        </p>
      </div>
    </section>
  );
}
