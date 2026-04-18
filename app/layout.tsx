import type { Metadata } from "next";
import { Lexend, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Typography per UI/UX Pro Max recommendation for Enterprise / Trust & Authority:
// Lexend for display (corporate, accessibility-focused readability),
// Source Sans 3 for body (professional, clean, WCAG AAA-friendly),
// JetBrains Mono kept for technical/monospace labels (SAP transaction codes).
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sia-associates.fr"),
  title: {
    default: "SIA Associates — Conseil SAP Independant",
    template: "%s · SIA Associates",
  },
  description:
    "Cabinet de conseil SAP independant. Architecture, pilotage, exploitation et cloud SAP. 19+ ans d'experience, de Safran a VINCI Construction.",
  keywords: [
    "SAP",
    "conseil SAP",
    "consultant SAP",
    "architecture SAP",
    "S/4HANA",
    "SAP Basis",
    "migration SAP",
    "BTP SAP",
    "Clean Core",
    "RISE with SAP",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://sia-associates.fr",
    siteName: "SIA Associates",
    title: "SIA Associates — Conseil SAP Independant",
    description:
      "Architecture, pilotage, exploitation et cloud SAP. 19+ ans d'experience au service des grands comptes francais.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIA Associates — Conseil SAP Independant",
    description:
      "Architecture, pilotage, exploitation et cloud SAP. 19+ ans d'experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "SIA Associates",
      url: "https://sia-associates.fr",
      description:
        "Cabinet de conseil SAP independant — architecture, pilotage, exploitation et cloud.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "11 avenue Maryse Bastie",
        addressLocality: "Bretigny-sur-Orge",
        postalCode: "91220",
        addressCountry: "FR",
      },
      founder: {
        "@type": "Person",
        name: "Amine Silemane",
        jobTitle: "Consultant SAP Senior & Architecte",
        knowsAbout: [
          "SAP Basis",
          "S/4HANA",
          "SAP BTP",
          "RISE with SAP",
          "SAP Activate",
          "Clean Core",
        ],
      },
      areaServed: "FR",
      serviceType: [
        "Conseil SAP",
        "Architecture SAP",
        "Pilotage de projet SAP",
        "Exploitation applicative SAP",
        "Cloud SAP",
      ],
    },
    {
      "@type": "Person",
      name: "Amine Silemane",
      jobTitle: "Fondateur & Consultant SAP Senior",
      worksFor: {
        "@type": "Organization",
        name: "SIA Associates",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Universite d'Evry",
      },
      knowsAbout: [
        "SAP Basis",
        "S/4HANA",
        "SAP BTP",
        "RISE with SAP",
        "SAP Activate",
        "ABAP",
        "Fiori",
        "Clean Core",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${lexend.variable} ${sourceSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <a href="#main" className="skip-link">
          Aller au contenu principal
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
