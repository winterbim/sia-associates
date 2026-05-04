import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Linkedin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink" role="contentinfo">
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/logo-sia-white.svg"
                alt="SIA Associates"
                width={160}
                height={57}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-ash-light">
              Cabinet de conseil SAP indépendant.
              <br />
              Architecture, pilotage, exploitation, cloud.
            </p>
            <p className="mt-2 text-xs italic text-oxblood">Human First Build Success</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="kicker mb-4">Navigation</p>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/expertise", label: "Expertise" },
                { href: "/clients", label: "Clients" },
                { href: "/approche", label: "Approche" },
                { href: "/blog", label: "Blog" },
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
                <Phone size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <a
                  href="tel:+33630156331"
                  className="transition-colors hover:text-bone"
                >
                  +33 6 30 15 63 31
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-ash-light">
                <Mail size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <a
                  href="mailto:siamanagement75@gmail.com"
                  className="transition-colors hover:text-bone"
                >
                  siamanagement75@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-ash-light">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <span>Paris &amp; International</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-ash-light">
                <Linkedin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" />
                <a
                  href="https://linkedin.com/in/consultant75"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-bone"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-ash-light md:flex-row">
          <p>&copy; {new Date().getFullYear()} SIA Associates. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/mentions-legales"
              className="transition-colors hover:text-bone"
            >
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
