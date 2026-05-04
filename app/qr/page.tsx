"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, User, Building, Phone, Mail, Globe, Palette, Image as ImageIcon } from "lucide-react";

export default function QRCodeGenerator() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organization, setOrganization] = useState("Sia Associates");
  const [title, setTitle] = useState("Consultant SAP Indépendant");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("https://sia-associates.com");
  
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const qrRef = useRef<HTMLDivElement>(null);

  const generateVCard = () => {
    return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${organization}
TITLE:${title}
TEL;TYPE=WORK,VOICE:${phone}
EMAIL:${email}
URL:${website}
END:VCARD`;
  };

  const qrValue = generateVCard();

  const downloadQR = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "sia-associates-qr.png";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Générateur de QR Code
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Créez un QR code personnalisé pour vos cartes de visite, flyers ou supports commerciaux. 
            Redirigez facilement vos clients vers votre site web ou page de contact.
          </p>
        </div>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-zinc-900">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Colonne de configuration */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100 dark:border-zinc-800">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Paramètres</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <User className="mr-2 h-4 w-4" />
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <User className="mr-2 h-4 w-4" />
                      Nom
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      placeholder="Dupont"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Phone className="mr-2 h-4 w-4" />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      placeholder="contact@sia-associates.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Building className="mr-2 h-4 w-4" />
                      Entreprise
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      placeholder="Sia Associates"
                    />
                  </div>
                  <div>
                    <label className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <User className="mr-2 h-4 w-4" />
                      Titre
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      placeholder="Consultant SAP"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Globe className="mr-2 h-4 w-4" />
                    Site Web
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                    placeholder="https://sia-associates.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Palette className="mr-2 h-4 w-4" />
                      Couleur du code
                    </label>
                    <div className="flex h-10 w-full overflow-hidden rounded-lg border border-gray-300 dark:border-zinc-700">
                      <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="h-full w-full cursor-pointer bg-transparent border-0 p-0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Couleur de fond
                    </label>
                    <div className="flex h-10 w-full overflow-hidden rounded-lg border border-gray-300 dark:border-zinc-700">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-full w-full cursor-pointer bg-transparent border-0 p-0"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Taille de l&apos;image (px) : {size}x{size}
                  </label>
                  <input
                    type="range"
                    min="128"
                    max="1024"
                    step="32"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Colonne de prévisualisation */}
            <div className="flex flex-col items-center justify-center bg-gray-50 p-8 dark:bg-zinc-950/50">
              <h2 className="mb-8 text-xl font-semibold text-gray-900 dark:text-white">Aperçu</h2>
              
              <div 
                ref={qrRef}
                className="mb-8 overflow-hidden rounded-xl bg-white p-4 shadow-sm"
                style={{ backgroundColor: bgColor }}
              >
                <QRCodeSVG
                  value={qrValue}
                  size={Math.min(size, 250)} // Max size for preview display
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="Q"
                  includeMargin={false}
                />
              </div>

              <button
                onClick={downloadQR}
                className="flex w-full max-w-xs items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-blue-500"
              >
                <Download className="mr-2 h-5 w-5" />
                Télécharger le QR Code
              </button>
              
              <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                Format PNG haute qualité idéal pour l&apos;impression.<br/>
                Taille générée : {size} x {size} pixels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
