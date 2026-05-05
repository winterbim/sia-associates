import type { Metadata } from "next";
import { Compass, Route, Wrench, Cloud, ShieldCheck, type LucideIcon } from "lucide-react";
import { ExpertiseBlueprint } from "@/components/ExpertiseBlueprint";
import { getSiteContent } from "@/lib/admin/content-store";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Architecture SAP, pilotage de projet, exploitation applicative et cloud. 19+ ans d'expérience SAP au service des grands comptes.",
};

const ICONS_BY_ID: Record<string, LucideIcon> = {
  architecture: Compass,
  pilotage: Route,
  exploitation: Wrench,
  cloud: Cloud,
  cybersecurite: ShieldCheck,
};

export default async function ExpertisePage() {
  const { pillars } = await getSiteContent();
  const PILLARS = pillars.map((p) => ({
    ...p,
    icon: ICONS_BY_ID[p.id] ?? Compass,
  }));
  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="bg-ink py-16 md:py-24">
        <div className="section-container">
          <p className="kicker mb-4">Expertise</p>
          <h1 className="display-heading max-w-3xl text-3xl text-bone md:text-5xl">
            Cinq piliers pour couvrir{" "}
            <em className="not-italic text-oxblood">l&apos;ensemble du cycle</em> SAP
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ash-light md:text-lg">
            De la conception à l&apos;exploitation quotidienne, en passant par le
            pilotage de projet, la stratégie cloud et la cybersécurité.
          </p>
        </div>
      </section>

      {/* Expertise blueprint — 5-pillar visual map */}
      <section className="border-b border-hairline bg-bone py-16 md:py-20">
        <div className="section-container">
          <ExpertiseBlueprint />
        </div>
      </section>

      {/* Pillars detail */}
      {PILLARS.map((pillar, index) => {
        const Icon = pillar.icon;
        const isEven = index % 2 === 0;
        return (
          <section
            key={pillar.id}
            id={pillar.id}
            className={isEven ? "bg-bone py-16 md:py-24" : "bg-white py-16 md:py-24"}
            aria-labelledby={`heading-${pillar.id}`}
          >
            <div className="section-container">
              <div className="grid items-start gap-12 lg:grid-cols-2">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <Icon
                      size={32}
                      strokeWidth={1.5}
                      className="text-gold"
                    />
                    <span className="font-mono text-xs text-ash">
                      {pillar.num}
                    </span>
                  </div>
                  <h2
                    id={`heading-${pillar.id}`}
                    className="display-heading mb-4 text-2xl md:text-4xl"
                  >
                    {pillar.title}
                  </h2>
                  <p className="text-base leading-relaxed text-ash md:text-lg">
                    {pillar.lead}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-ink/5 px-3 py-1 font-mono text-xs text-ash"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-hairline bg-bone p-6 md:p-8">
                  <p className="kicker mb-4">Ce que je délivre</p>
                  <ul className="space-y-3">
                    {pillar.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-sm text-graphite"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
