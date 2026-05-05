"use client";

import type { SiteContent } from "@/lib/admin/defaults";
import { TextField, TextArea, TagsField, ListField } from "./inputs";

type Pillars = SiteContent["pillars"];

export function PillarsEditor({
  value,
  onChange,
}: {
  value: Pillars;
  onChange: (v: Pillars) => void;
}) {
  function update<K extends keyof Pillars[number]>(idx: number, key: K, v: Pillars[number][K]) {
    onChange(value.map((p, i) => (i === idx ? { ...p, [key]: v } : p)));
  }

  return (
    <div className="space-y-8">
      {value.map((pillar, idx) => (
        <fieldset
          key={pillar.id}
          className="rounded-sm border border-hairline bg-bone p-5"
        >
          <legend className="px-2 font-mono text-xs uppercase tracking-kicker text-oxblood">
            {pillar.num} · {pillar.title}
          </legend>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[120px_1fr]">
              <TextField
                label="Numéro"
                value={pillar.num}
                onChange={(v) => update(idx, "num", v)}
              />
              <TextField
                label="Titre"
                value={pillar.title}
                onChange={(v) => update(idx, "title", v)}
              />
            </div>
            <TextArea
              label="Description (lead)"
              rows={3}
              value={pillar.lead}
              onChange={(v) => update(idx, "lead", v)}
            />
            <TagsField
              label="Tags"
              value={pillar.tags}
              onChange={(v) => update(idx, "tags", v)}
            />
            <ListField
              label="Ce que je délivre"
              value={pillar.details}
              onChange={(v) => update(idx, "details", v)}
            />
          </div>
        </fieldset>
      ))}
    </div>
  );
}
