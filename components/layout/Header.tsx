"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/expertise", label: "Expertise" },
  { href: "/clients", label: "Clients" },
  { href: "/approche", label: "Approche" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out-expo",
        scrolled
          ? "border-b border-hairline bg-bone/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav
        className="section-container flex h-16 items-center justify-between md:h-20"
        aria-label="Navigation principale"
      >
        <Link href="/" className="shrink-0">
          <Image
            src="/logo-sia.svg"
            alt="SIA Associates"
            width={160}
            height={57}
            className="h-10 w-auto md:h-12"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "font-mono text-xs uppercase tracking-kicker transition-colors duration-200",
                  pathname === item.href
                    ? "text-ink underline decoration-oxblood decoration-2 underline-offset-[6px]"
                    : "text-ash hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X size={22} strokeWidth={1.5} className="text-ink" />
          ) : (
            <Menu size={22} strokeWidth={1.5} className="text-ink" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-hairline bg-bone px-6 pb-8 pt-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block font-mono text-sm uppercase tracking-kicker transition-colors",
                    pathname === item.href
                      ? "text-gold"
                      : "text-ash hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
