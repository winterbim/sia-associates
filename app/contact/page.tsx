import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discutons de votre projet SAP. Premier échange d'une heure offert — cadrage, audit, renfort ponctuel ou mission longue.",
};

export default function ContactPage() {
  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="bg-ink py-16 md:py-24">
        <div className="section-container">
          <p className="kicker mb-4">Contact</p>
          <h1 className="display-heading max-w-3xl text-3xl text-bone md:text-5xl">
            Parlons de votre{" "}
            <em className="not-italic text-oxblood">projet SAP</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ash-light md:text-lg">
            Premier échange d&apos;une heure offert. Cadrage initial, second avis,
            renfort ponctuel ou mission longue — décrivez votre besoin.
          </p>
        </div>
      </section>

      <section className="bg-bone py-16 md:py-24">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="display-heading mb-8 text-2xl md:text-3xl">
                Envoyez un message
              </h2>
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="rounded-lg border border-hairline bg-bone p-6">
                <h3 className="font-display text-lg font-medium text-ink">
                  Coordonnées
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start gap-3 text-sm text-ash">
                    <Mail size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                    <a
                      href="mailto:siamanagement75@gmail.com"
                      className="transition-colors hover:text-ink"
                    >
                      siamanagement75@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-ash">
                    <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                    <span>Paris &amp; International</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-ash">
                    <Clock size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                    <span>Réponse sous 72 h ouvrables</span>
                  </li>
                </ul>
              </div>

              {/* Qui êtes-vous block */}
              <div className="rounded-lg border border-gold/20 bg-gold/5 p-6">
                <p className="kicker mb-2">Qui êtes-vous ?</p>
                <p className="text-sm leading-relaxed text-ash">
                  Je collabore régulièrement en sous-traitance avec des clients
                  finaux, des intégrateurs ou des ESN. Si vous cherchez un
                  expert SAP pour renforcer ou créer de nouvelles équipes,
                  contactez-moi avec le contexte et l&apos;enjeu de la mission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
