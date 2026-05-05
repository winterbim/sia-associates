"use client";

import type { SiteContent } from "@/lib/admin/defaults";
import { TextField, TextArea } from "./inputs";

type Approche = SiteContent["approche"];

export function ApprocheEditor({
  value,
  onChange,
}: {
  value: Approche;
  onChange: (v: Approche) => void;
}) {
  function update<K extends keyof Approche["phases"][number]>(
    idx: number,
    key: K,
    v: Approche["phases"][number][K],
  ) {
    onChange({
      ...value,
      phases: value.phases.map((p, i) => (i === idx ? { ...p, [key]: v } : p)),
    });
  }

  return (
    <div className="space-y-6">
      {value.phases.map((phase, idx) => (
        <fieldset key={idx} className="rounded-sm border border-hairline bg-bone p-5">
          <legend className="px-2 font-mono text-xs uppercase tracking-kicker text-oxblood">
            Phase {phase.num} — {phase.title}
          </legend>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <TextField label="Numéro" value={phase.num} onChange={(v) => update(idx, "num", v)} />
              <TextField label="Titre" value={phase.title} onChange={(v) => update(idx, "title", v)} />
              <TextField
                label="Durée"
                value={phase.duration}
                onChange={(v) => update(idx, "duration", v)}
                placeholder="15 min · offert"
              />
            </div>
            <TextArea
              label="Description"
              rows={3}
              value={phase.description}
              onChange={(v) => update(idx, "description", v)}
            />
          </div>
        </fieldset>
      ))}
    </div>
  );
}
