import Link from "next/link";
import { ArrowRight } from "lucide-react";

const INTENTS = [
  {
    num: "01",
    text: "Un architecte pour concevoir votre futur paysage S/4HANA",
    href: "/expertise#architecture",
  },
  {
    num: "02",
    text: "Un chef de projet experimente pour une migration SAP",
    href: "/expertise#pilotage",
  },
  {
    num: "03",
    text: "Un expert Basis/TMA independant pour securiser votre run",
    href: "/expertise#exploitation",
  },
  {
    num: "04",
    text: "Un conseil neutre pour votre strategie cloud SAP",
    href: "/expertise#cloud",
  },
  {
    num: "05",
    text: "Un second regard sur un projet en difficulte",
    href: "/approche#audit",
  },
  {
    num: "06",
    text: "Un renfort ponctuel d'expertise sur un sujet precis",
    href: "/contact",
  },
] as const;

export function IntentGrid() {
  return (
    <section
      className="border-y border-hairline bg-bone py-20 md:py-28"
      aria-labelledby="intent-heading"
    >
      <div className="section-container">
        <p className="kicker mb-4">Vos besoins</p>
        <h2
          id="intent-heading"
          className="display-heading mb-12 text-2xl md:text-4xl"
        >
          Vous cherchez&hellip;
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTENTS.map((intent) => (
            <Link
              key={intent.num}
              href={intent.href}
              className="group flex items-start gap-4 rounded-lg border border-hairline bg-bone p-5 transition-all duration-300 hover:border-transparent hover:bg-ink hover:shadow-lg hover:shadow-ink/10"
            >
              <span className="shrink-0 font-mono text-xs text-gold">
                {intent.num}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-bone">
                  {intent.text}
                </p>
              </div>
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-ash transition-all duration-300 group-hover:rotate-[-12deg] group-hover:text-gold"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
