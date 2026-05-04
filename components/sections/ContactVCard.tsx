"use client";

import { QRCodeSVG } from "qrcode.react";
import { UserPlus } from "lucide-react";

export function ContactVCard() {
  // vCard 3.0: N is "Family;Given;Additional;Prefix;Suffix". Most readers
  // display "Given Family" for personal contacts. Putting "Associates" as
  // family name and "SIA" as given name makes the contact appear as
  // "SIA Associates" once saved, instead of "Associates SIA".
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Associates;SIA;;;
FN:SIA Associates
ORG:SIA Associates
TITLE:Consultant SAP
TEL;TYPE=CELL,VOICE:+33630156331
EMAIL:siamanagement75@gmail.com
URL:https://sia-associates.com
END:VCARD`;

  return (
    <div className="rounded-lg border border-hairline bg-bone p-6 text-center">
      <h3 className="font-display flex items-center justify-center gap-2 text-lg font-medium text-ink mb-4">
        <UserPlus size={18} className="text-gold" />
        Ajouter aux contacts
      </h3>
      <div className="flex justify-center mb-4">
        <div className="rounded-xl bg-white p-2 shadow-sm border border-gray-100">
          <QRCodeSVG
            value={vcard}
            size={120}
            bgColor="#ffffff"
            fgColor="#000000"
            level="L"
            includeMargin={false}
          />
        </div>
      </div>
      <p className="text-xs text-ash">
        Scannez ce QR Code avec l&apos;appareil photo de votre smartphone pour enregistrer mes coordonnées.
      </p>
    </div>
  );
}
