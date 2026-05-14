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
                Siège social : 11 avenue Maryse Bastié, Paris
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
                <a href="mailto:business@sia-associates.com" className="text-gold hover:text-gold-hover">
                  business@sia-associates.com
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
                <a href="mailto:business@sia-associates.com" className="text-gold hover:text-gold-hover">
                  business@sia-associates.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2>Limitation de responsabilité — contenu éditorial</h2>
              <p>
                Les articles publiés sur le blog de ce site reflètent
                l&apos;opinion personnelle de leur auteur, fondée sur son
                expérience générale du conseil SAP et sur des observations
                publiquement disponibles. Ils sont fournis à titre informatif
                uniquement et ne constituent ni un conseil professionnel
                opposable, ni une recommandation d&apos;investissement, ni
                une garantie sur des choix techniques, contractuels ou
                financiers.
              </p>
              <p>
                SIA ASSOCIATES ne saurait être tenu responsable des
                conséquences résultant d&apos;une décision prise sur la
                seule base d&apos;un article du blog. Toute décision
                opérationnelle, technique ou contractuelle doit faire
                l&apos;objet d&apos;une analyse spécifique au contexte du
                lecteur, idéalement validée par un professionnel sous
                contrat.
              </p>
              <p>
                Les références à des clients ou à des missions le sont à
                titre de portfolio professionnel, sans divulgation
                d&apos;information confidentielle ou couverte par un accord
                de confidentialité (NDA). Les exemples techniques cités
                sont anonymisés ou présentés à un niveau de généralité ne
                permettant aucune identification d&apos;un système ou d&apos;une
                organisation spécifique.
              </p>
            </section>

            <section>
              <h2>Marques et propriété intellectuelle tierce</h2>
              <p>
                SAP®, S/4HANA®, RISE with SAP®, GROW with SAP®, Joule®,
                Fiori®, BTP®, ABAP®, HANA®, Datasphere®, Analytics Cloud®,
                Solution Manager®, Activate® et toutes les autres marques
                SAP citées sur ce site sont la propriété exclusive de
                SAP SE et/ou de ses filiales.
              </p>
              <p>
                Les marques tierces citées (notamment Microsoft Azure®,
                Amazon Web Services®, OVHcloud®, MuleSoft®, Boomi®,
                Salesforce®, Workday®, Concur®, Ariba®, SecurityBridge®,
                ainsi que les noms de clients de SIA ASSOCIATES) sont
                la propriété de leurs détenteurs respectifs et ne sont
                citées qu&apos;à titre de référence factuelle ou
                d&apos;exemple.
              </p>
              <p>
                SIA ASSOCIATES n&apos;est ni affilié, ni partenaire
                commercial, ni distributeur, ni revendeur de licences SAP
                SE ou de l&apos;un de ses partenaires. SIA ASSOCIATES
                conserve une indépendance commerciale totale dans ses
                recommandations techniques.
              </p>
            </section>

            <section>
              <h2>Génération assistée par IA</h2>
              <p>
                Une partie des articles du blog est rédigée avec
                l&apos;assistance d&apos;outils d&apos;intelligence
                artificielle générative, sur la base de sujets définis par
                Amine SILEMANE et reflétant son expertise. Chaque article
                publié est validé par l&apos;auteur avant mise en ligne,
                qui en assume la responsabilité éditoriale au titre du
                directeur de publication.
              </p>
            </section>

            <section>
              <h2>Droit applicable et juridiction compétente</h2>
              <p>
                Les présentes mentions légales et l&apos;ensemble du
                contenu du site sont régis par le droit français. Tout
                litige relatif à l&apos;utilisation de ce site relève de
                la compétence exclusive des tribunaux du ressort du siège
                social de SIA ASSOCIATES, sous réserve des dispositions
                impératives applicables aux consommateurs.
              </p>
            </section>

            <section>
              <h2>Crédits</h2>
              <p>
                Site conçu et développé avec Next.js. Typographies&nbsp;:
                Instrument Sans, Inter, JetBrains Mono (Google Fonts,
                licences libres).
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
