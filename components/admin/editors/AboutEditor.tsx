"use client";

import type { SiteContent } from "@/lib/admin/defaults";
import { TextField, TextArea, ImageField } from "./inputs";

type About = SiteContent["about"];

export function AboutEditor({
  value,
  onChange,
}: {
  value: About;
  onChange: (v: About) => void;
}) {
  return (
    <div className="space-y-5">
      <ImageField
        label="Portrait"
        value={value.portraitUrl}
        onChange={(v) => onChange({ ...value, portraitUrl: v })}
      />
      <TextArea
        label="1er paragraphe"
        rows={3}
        value={value.paragraph1}
        onChange={(v) => onChange({ ...value, paragraph1: v })}
      />
      <TextArea
        label="2e paragraphe"
        rows={3}
        value={value.paragraph2}
        onChange={(v) => onChange({ ...value, paragraph2: v })}
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
      <TextArea
        label="3e paragraphe"
        rows={3}
        value={value.paragraph3}
        onChange={(v) => onChange({ ...value, paragraph3: v })}
      />
    </div>
  );
}
