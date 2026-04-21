import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions legales",
  description: "Mentions legales et politique de confidentialite de SIA Associates.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="pt-20 md:pt-24">
      <section className="bg-bone py-16 md:py-24">
        <div className="section-container max-w-3xl">
          <h1 className="display-heading mb-12 text-3xl md:text-4xl">
            Mentions legales
          </h1>

          <div className="prose-sm space-y-10 text-ash [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-ink [&_h2]:mb-4 [&_p]:leading-relaxed [&_p]:mb-3">
            <section>
              <h2>Editeur du site</h2>
              <p>
                <strong className="text-ink">SIA ASSOCIATES</strong> · Societe par Actions Simplifiee (SAS)
              </p>
              <p>
                Siege social : 11 avenue Maryse Bastie, 91220 Bretigny-sur-Orge
                <br />
                SIREN : 930 478 151
                <br />
                SIRET : 930 478 151 00010
              </p>
              <p>
                President : Amine SILEMANE
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
              <h2>Hebergement</h2>
              <p>
                Vercel Inc.
                <br />
                440 N Barranca Ave #4133, Covina, CA 91723, USA
                <br />
                <span className="text-gold">vercel.com</span>
              </p>
            </section>

            <section>
              <h2>Propriete intellectuelle</h2>
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, structure)
                est la propriete exclusive de SIA ASSOCIATES, sauf mention
                contraire. Toute reproduction, meme partielle, est interdite sans
                autorisation ecrite prealable.
              </p>
            </section>

            <section>
              <h2>Politique de confidentialite</h2>
              <p>
                <strong className="text-ink">Donnees collectees :</strong> nom, email, entreprise, sujet et message via le
                formulaire de contact. Ces donnees sont traitees uniquement pour
                repondre a votre demande.
              </p>
              <p>
                <strong className="text-ink">Base legale :</strong> consentement explicite (case a cocher du formulaire).
              </p>
              <p>
                <strong className="text-ink">Duree de conservation :</strong> 12 mois apres le dernier echange, puis
                suppression.
              </p>
              <p>
                <strong className="text-ink">Sous-traitant technique :</strong> Resend (envoi d&apos;emails). Aucune
                donnee n&apos;est transmise a des tiers a des fins commerciales.
              </p>
              <p>
                <strong className="text-ink">Cookies :</strong> ce site n&apos;utilise aucun cookie tiers. Les seuls cookies
                eventuels sont techniques (session, preferences) et strictement
                necessaires.
              </p>
              <p>
                <strong className="text-ink">Vos droits :</strong> conformement au RGPD, vous disposez d&apos;un droit
                d&apos;acces, de rectification, de suppression et de portabilite de
                vos donnees. Pour exercer ces droits, ecrivez a{" "}
                <a href="mailto:siamanagement75@gmail.com" className="text-gold hover:text-gold-hover">
                  siamanagement75@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2>Credits</h2>
              <p>
                Site concu et developpe avec Next.js. Typographies : Fraunces,
                Inter Tight, JetBrains Mono (Google Fonts, licences libres).
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
