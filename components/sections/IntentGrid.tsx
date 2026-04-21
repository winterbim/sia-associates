import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const INTENTS = [
  {
    num: "01",
    text: "Un architecte pour concevoir votre futur paysage S/4HANA",
    href: "/expertise#architecture",
  },
  {
    num: "02",
    text: "Un chef de projet expérimenté pour une migration SAP",
    href: "/expertise#pilotage",
  },
  {
    num: "03",
    text: "Un expert Basis/TMA indépendant pour sécuriser votre run",
    href: "/expertise#exploitation",
  },
  {
    num: "04",
    text: "Un conseil neutre pour votre stratégie cloud SAP",
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
        <ScrollReveal animation="fade-up">
          <p className="kicker mb-4">Vos besoins</p>
          <h2
            id="intent-heading"
            className="display-heading mb-12 text-2xl md:text-4xl"
          >
            Vous cherchez&hellip;
          </h2>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTENTS.map((intent, i) => (
            <ScrollReveal key={intent.num} animation="fade-up" delay={i * 80}>
              <Link
                href={intent.href}
                className="group flex h-full items-start gap-4 rounded-lg border border-hairline bg-bone p-5 transition-all duration-300 hover:border-transparent hover:bg-ink hover:shadow-xl hover:shadow-ink/10"
              >
                <span className="shrink-0 font-mono text-xs text-gold transition-transform duration-300 group-hover:scale-110">
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
                  className="mt-0.5 shrink-0 text-ash transition-all duration-300 group-hover:-rotate-[45deg] group-hover:text-gold"
                />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
