import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

export function About() {
  return (
    <section className="bg-bone py-20 md:py-28" aria-labelledby="about-heading">
      <div className="section-container">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          {/* Photo */}
          <ScrollReveal animation="fade-left" className="shrink-0">
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 blur-xl" />
              <div className="relative h-72 w-56 overflow-hidden rounded-2xl border border-hairline shadow-xl md:h-96 md:w-72">
                <Image
                  src="/amine-portrait.png"
                  alt="Amine — Fondateur de SIA Associates"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Bio */}
          <div className="flex-1">
            <ScrollReveal animation="fade-right">
              <p className="kicker mb-4">À propos</p>
              <h2
                id="about-heading"
                className="display-heading mb-6 text-2xl md:text-4xl"
              >
                Derrière chaque projet,{" "}
                <em>un interlocuteur unique</em>
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={100}>
              <p className="text-base leading-relaxed text-ash md:text-lg">
                Je suis Amine, consultant SAP indépendant depuis 2007. Mon parcours
                m&apos;a conduit des grandes ESN aux directions informatiques de
                groupes comme Safran, VINCI Construction, ENGIE, GRDF et RTE.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={200}>
              <p className="mt-4 text-base leading-relaxed text-ash md:text-lg">
                Ce que je retiens de ces 19 années : les meilleurs projets SAP ne
                sont pas ceux qui ont le plus de budget — ce sont ceux où un
                interlocuteur senior comprend à la fois la technique et le métier,
                et reste engagé du début à la fin.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={300}>
              <blockquote className="mt-6 border-l-2 border-gold pl-4 font-display text-lg italic text-ink md:text-xl">
                &ldquo;Quand vous travaillez avec SIA Associates, vous travaillez
                avec moi. Pas avec un junior envoyé à ma place.&rdquo;
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
