import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink" role="contentinfo">
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-display text-xl font-medium text-bone">
              SIA<span className="text-gold">.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ash-light">
              Cabinet de conseil SAP independant.
              <br />
              Architecture, pilotage, exploitation, cloud.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="kicker mb-4">Navigation</p>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/expertise", label: "Expertise" },
                { href: "/clients", label: "Clients" },
                { href: "/approche", label: "Approche" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ash-light transition-colors duration-200 hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="kicker mb-4">Contact</p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 text-sm text-ash-light">
                <Mail size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <a
                  href="mailto:contact@sia-associates.fr"
                  className="transition-colors hover:text-bone"
                >
                  contact@sia-associates.fr
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-ash-light">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  11 avenue Maryse Bastie
                  <br />
                  91220 Bretigny-sur-Orge
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-ash-light md:flex-row">
          <p>&copy; {new Date().getFullYear()} SIA Associates. Tous droits reserves.</p>
          <Link
            href="/mentions-legales"
            className="transition-colors hover:text-bone"
          >
            Mentions legales
          </Link>
        </div>
      </div>
    </footer>
  );
}
