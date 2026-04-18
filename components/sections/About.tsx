import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

// Three editorial vignettes that illustrate "Human First Build Success":
// a whiteboard sketch, a workshop table, a real Fiori launchpad view.
// They replace the generic dark+glow halo and give the section warmth.
const SCENES = [
  {
    src: "/scenes/whiteboard.svg",
    caption: "Atelier d'architecture",
    sub: "ECC → S/4HANA, tableau blanc au premier jour",
  },
  {
    src: "/scenes/workshop.svg",
    caption: "Sprint Fit-to-Standard",
    sub: "L'équipe projet, les sticky notes, le café",
  },
  {
    src: "/scenes/sap-screen.svg",
    caption: "Fiori en production",
    sub: "La cible — utilisable, adoptée, mesurable",
  },
] as const;

export function About() {
  return (
    <section className="bg-bone py-20 md:py-28" aria-labelledby="about-heading">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — portrait, editorial crop, no glow */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-up">
              <figure className="relative">
                <div className="relative overflow-hidden rounded-sm border border-hairline">
                  <Image
                    src="/amine-portrait.png"
                    alt="Amine Silemane — Fondateur de SIA Associates"
                    width={560}
                    height={720}
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                  <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-gold/70" />
                  <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-gold/70" />
                  <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-gold/70" />
                  <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-gold/70" />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-kicker text-ash">
                  <span>Amine Silemane</span>
                  <span>Bretigny-sur-Orge · FR</span>
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>

          {/* RIGHT — bio, quote, editorial scene strip */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-up">
              <p className="kicker mb-4">À propos</p>
              <h2
                id="about-heading"
                className="display-heading mb-6 text-3xl md:text-4xl lg:text-[44px]"
              >
                Derrière chaque projet,
                <br />
                <span className="text-oxblood">un interlocuteur unique.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-base leading-[1.7] text-graphite md:text-[17px]">
                Je suis <strong className="text-ink">Amine Silemane</strong>,
                consultant SAP indépendant depuis 2007. Mon parcours m&apos;a
                conduit des grandes ESN aux directions informatiques de groupes
                comme Safran, VINCI Construction, ENGIE, GRDF et RTE.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <p className="mt-5 text-base leading-[1.7] text-graphite md:text-[17px]">
                Ce que je retiens de ces 19 années&nbsp;: les meilleurs projets
                SAP ne sont pas ceux qui ont le plus de budget — ce sont ceux où
                un interlocuteur senior comprend à la fois la technique et le
                métier, et reste engagé du début à la fin.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <blockquote className="mt-8 border-l-2 border-gold pl-5">
                <p className="font-display text-lg leading-relaxed text-ink md:text-xl">
                  «&nbsp;Quand vous travaillez avec SIA Associates, vous
                  travaillez avec moi. Pas avec un junior envoyé à ma place.&nbsp;»
                </p>
                <footer className="mt-3 font-mono text-[11px] uppercase tracking-kicker text-ash">
                  — A.S., fondateur
                </footer>
              </blockquote>
            </ScrollReveal>

            {/* Editorial scene strip — warmth, human, no glow.
                TODO: replace with real photos. */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {SCENES.map((s) => (
                  <figure
                    key={s.src}
                    className="group overflow-hidden rounded-sm border border-hairline bg-white/50 transition-all duration-300 hover:border-gold/40"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.src}
                      alt={s.caption}
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <figcaption className="border-t border-hairline/60 px-3 py-3">
                      <p className="font-display text-sm font-semibold text-ink">
                        {s.caption}
                      </p>
                      <p className="mt-0.5 text-xs leading-snug text-ash">
                        {s.sub}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-kicker text-ash-light">
                Illustrations éditoriales · à remplacer par photos terrain
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
