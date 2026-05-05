"use client";

import type { SiteContent } from "@/lib/admin/defaults";
import { TextField, ImageField } from "./inputs";
import { Plus, Trash2, GripVertical } from "lucide-react";

type Clients = SiteContent["clients"];

export function ClientsEditor({
  value,
  onChange,
}: {
  value: Clients;
  onChange: (v: Clients) => void;
}) {
  function update<K extends keyof Clients[number]>(idx: number, key: K, v: Clients[number][K]) {
    onChange(value.map((c, i) => (i === idx ? { ...c, [key]: v } : c)));
  }
  function move(idx: number, dir: -1 | 1) {
    const next = [...value];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j]!, next[idx]!];
    onChange(next);
  }
  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }
  function add() {
    onChange([...value, { name: "", period: "" }]);
  }

  return (
    <div className="space-y-4">
      {value.map((client, idx) => (
        <div key={idx} className="flex flex-col gap-3 rounded-sm border border-hairline bg-bone p-4 md:flex-row md:items-start">
          <div className="flex flex-row gap-1 md:flex-col">
            <button
              type="button"
              onClick={() => move(idx, -1)}
              disabled={idx === 0}
              className="rounded-sm border border-hairline bg-white px-2 py-1 text-xs text-ash transition-colors hover:text-ink disabled:opacity-30"
              aria-label="Monter"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(idx, 1)}
              disabled={idx === value.length - 1}
              className="rounded-sm border border-hairline bg-white px-2 py-1 text-xs text-ash transition-colors hover:text-ink disabled:opacity-30"
              aria-label="Descendre"
            >
              ↓
            </button>
          </div>
          <div className="grid flex-1 gap-3 md:grid-cols-2">
            <TextField label="Nom" value={client.name} onChange={(v) => update(idx, "name", v)} />
            <TextField
              label="Période"
              value={client.period}
              onChange={(v) => update(idx, "period", v)}
              placeholder="2022 – 2024"
            />
          </div>
          <div className="md:w-72">
            <ImageField
              label="Logo"
              value={client.src ?? ""}
              onChange={(v) => update(idx, "src", v || undefined)}
            />
          </div>
          <button
            type="button"
            onClick={() => remove(idx)}
            className="self-start rounded-sm border border-hairline bg-white p-2 text-ash transition-colors hover:border-oxblood/40 hover:text-oxblood"
            aria-label="Supprimer"
          >
            <Trash2 size={14} strokeWidth={1.5} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-2 rounded-sm border border-dashed border-hairline bg-white px-4 py-2 text-sm text-ash transition-colors hover:border-gold hover:text-ink"
      >
        <Plus size={14} strokeWidth={1.5} />
        Ajouter un client
      </button>
    </div>
  );
}
