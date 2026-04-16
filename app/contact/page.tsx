import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discutons de votre projet SAP. Premier echange d'une heure offert — cadrage, audit, renfort ponctuel ou mission longue.",
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
            <em className="text-gold">projet SAP</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ash-light md:text-lg">
            Premier echange d&apos;une heure offert. Cadrage initial, second avis,
            renfort ponctuel ou mission longue — decrivez votre besoin.
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
                  Coordonnees
                </h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start gap-3 text-sm text-ash">
                    <Mail size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                    <a
                      href="mailto:contact@sia-associates.fr"
                      className="transition-colors hover:text-ink"
                    >
                      contact@sia-associates.fr
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-ash">
                    <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                    <span>
                      11 avenue Maryse Bastie
                      <br />
                      91220 Bretigny-sur-Orge
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-ash">
                    <Clock size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                    <span>Reponse sous 48 h ouvrables</span>
                  </li>
                </ul>
              </div>

              {/* ESN block */}
              <div className="rounded-lg border border-gold/20 bg-gold/5 p-6">
                <p className="kicker mb-2">Vous etes une ESN ?</p>
                <p className="text-sm leading-relaxed text-ash">
                  Je collabore regulierement en sous-traitance avec des
                  integrateurs et des ESN. Si vous cherchez un expert SAP BC /
                  Basis senior pour renforcer une equipe projet, contactez-moi
                  avec le contexte de la mission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
