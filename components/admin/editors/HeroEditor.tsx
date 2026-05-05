"use client";

import type { SiteContent } from "@/lib/admin/defaults";
import { TextField, TextArea } from "./inputs";

type Hero = SiteContent["hero"];

export function HeroEditor({
  value,
  onChange,
}: {
  value: Hero;
  onChange: (v: Hero) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          label="Surtitre (en haut, format mono)"
          value={value.eyebrow}
          onChange={(v) => onChange({ ...value, eyebrow: v })}
          placeholder="Conseil SAP · depuis 2007"
        />
        <TextField
          label="Devise"
          value={value.tagline}
          onChange={(v) => onChange({ ...value, tagline: v })}
          placeholder="Human First Build Success"
        />
      </div>

      <div className="rounded-sm border border-hairline bg-bone p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-kicker text-ash">
          Titre principal — découpé en 5 morceaux
        </p>
        <p className="mb-3 text-xs text-ash-light">
          Affiché : <span className="text-ink">[gauche]</span>
          <span className="text-oxblood font-semibold"> [accent rouge] </span>
          <span className="text-ink">[milieu]</span>
          <span className="text-oxblood font-semibold"> [accent rouge] </span>
          <span className="text-ink">[fin]</span>
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <TextField label="1. Gauche (texte normal)" value={value.titleLeft} onChange={(v) => onChange({ ...value, titleLeft: v })} placeholder="Architecte, " />
          <TextField label="2. Accent rouge n°1" value={value.titleAccent} onChange={(v) => onChange({ ...value, titleAccent: v })} placeholder="chef d'orchestre" />
          <TextField label="3. Milieu" value={value.titleMiddle} onChange={(v) => onChange({ ...value, titleMiddle: v })} placeholder=" et gardien de vos projets " />
          <TextField label="4. Accent rouge n°2" value={value.titleEnd} onChange={(v) => onChange({ ...value, titleEnd: v })} placeholder="SAP" />
          <TextField label="5. Fin (ponctuation)" value={value.titleRight} onChange={(v) => onChange({ ...value, titleRight: v })} placeholder="." />
        </div>
      </div>

      <TextArea
        label="Sous-titre / lede"
        rows={4}
        value={value.lede}
        onChange={(v) => onChange({ ...value, lede: v })}
      />
      <TextArea
        label="Citation"
        rows={3}
        value={value.quote}
        onChange={(v) => onChange({ ...value, quote: v })}
      />
      <TextField
        label="Auteur de la citation"
        value={value.quoteAuthor}
        onChange={(v) => onChange({ ...value, quoteAuthor: v })}
      />
    </div>
  );
}
