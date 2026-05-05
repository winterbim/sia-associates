"use client";

import type { SiteContent } from "@/lib/admin/defaults";
import { TextField, TextArea, TagsField } from "./inputs";

type Cases = SiteContent["cases"];

export function CasesEditor({
  value,
  onChange,
}: {
  value: Cases;
  onChange: (v: Cases) => void;
}) {
  function update<K extends keyof Cases[number]>(idx: number, key: K, v: Cases[number][K]) {
    onChange(value.map((c, i) => (i === idx ? { ...c, [key]: v } : c)));
  }

  return (
    <div className="space-y-6">
      {value.map((c, idx) => (
        <fieldset key={idx} className="rounded-sm border border-hairline bg-bone p-5">
          <legend className="px-2 font-mono text-xs uppercase tracking-kicker text-oxblood">
            Cas {idx + 1} · {c.sector}
          </legend>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Secteur" value={c.sector} onChange={(v) => update(idx, "sector", v)} />
              <TextField label="Titre" value={c.title} onChange={(v) => update(idx, "title", v)} />
            </div>
            <TextArea
              label="Description"
              rows={4}
              value={c.description}
              onChange={(v) => update(idx, "description", v)}
            />
            <TagsField label="Tags" value={c.tags} onChange={(v) => update(idx, "tags", v)} />
          </div>
        </fieldset>
      ))}
    </div>
  );
}
