import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et politique de confidentialité de SIA Associates.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-bone py-16 md:py-24">
        <div className="section-container max-w-3xl">
          <h1 className="display-heading mb-12 text-3xl md:text-4xl">
            Mentions légales
          </h1>

          <div className="prose-sm space-y-10 text-ash [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-ink [&_h2]:mb-4 [&_p]:leading-relaxed [&_p]:mb-3">
            <section>
              <h2>Éditeur du site</h2>
              <p>
                <strong className="text-ink">SIA ASSOCIATES</strong> · Société par Actions Simplifiée (SAS)
              </p>
              <p>
                Siège social : 11 avenue Maryse Bastié, 91220 Brétigny-sur-Orge
                <br />
                SIREN : 930 478 151
                <br />
                SIRET : 930 478 151 00010
              </p>
              <p>
                Président : Amine SILEMANE
                <br />
                Directeur de publication : Amine SILEMANE
                <br />
                Contact :{" "}
                <a href="mailto:siamanagement75@gmail.com" className="text-gold hover:text-gold-hover">
                  siamanagement75@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2>Hébergement</h2>
              <p>
                Vercel Inc.
                <br />
                440 N Barranca Ave #4133, Covina, CA 91723, USA
                <br />
                <span className="text-gold">vercel.com</span>
              </p>
            </section>

            <section>
              <h2>Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, structure)
                est la propriété exclusive de SIA ASSOCIATES, sauf mention
                contraire. Toute reproduction, même partielle, est interdite sans
                autorisation écrite préalable.
              </p>
            </section>

            <section>
              <h2>Politique de confidentialité</h2>
              <p>
                <strong className="text-ink">Données collectées :</strong> nom, email, entreprise, sujet et message via le
                formulaire de contact. Ces données sont traitées uniquement pour
                répondre à votre demande.
              </p>
              <p>
                <strong className="text-ink">Base légale :</strong> consentement explicite (case à cocher du formulaire).
              </p>
              <p>
                <strong className="text-ink">Durée de conservation :</strong> 12 mois après le dernier échange, puis
                suppression.
              </p>
              <p>
                <strong className="text-ink">Sous-traitant technique :</strong> Resend (envoi d&apos;emails). Aucune
                donnée n&apos;est transmise à des tiers à des fins commerciales.
              </p>
              <p>
                <strong className="text-ink">Cookies :</strong> ce site n&apos;utilise aucun cookie tiers. Les seuls cookies
                éventuels sont techniques (session, préférences) et strictement
                nécessaires.
              </p>
              <p>
                <strong className="text-ink">Vos droits :</strong> conformément au RGPD, vous disposez d&apos;un droit
                d&apos;accès, de rectification, de suppression et de portabilité de
                vos données. Pour exercer ces droits, écrivez à{" "}
                <a href="mailto:siamanagement75@gmail.com" className="text-gold hover:text-gold-hover">
                  siamanagement75@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2>Crédits</h2>
              <p>
                Site conçu et développé avec Next.js. Typographies : Fraunces,
                Inter Tight, JetBrains Mono (Google Fonts, licences libres).
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
