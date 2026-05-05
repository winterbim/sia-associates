"use client";

import { useState } from "react";
import { Upload, Loader2, X } from "lucide-react";

const fieldClass =
  "w-full rounded-sm border border-hairline bg-white px-3 py-2 text-sm text-ink placeholder:text-ash-light focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-kicker text-ash">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={fieldClass}
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-kicker text-ash">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={`${fieldClass} font-sans leading-relaxed`}
      />
    </label>
  );
}

export function TagsField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-kicker text-ash">
        {label} <span className="text-ash-light normal-case tracking-normal">(séparés par des virgules)</span>
      </span>
      <input
        type="text"
        value={value.join(", ")}
        onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
        className={fieldClass}
      />
    </label>
  );
}

export function ListField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-kicker text-ash">
        {label} <span className="text-ash-light normal-case tracking-normal">(une ligne par entrée)</span>
      </span>
      <textarea
        value={value.join("\n")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
        rows={Math.max(value.length, 3)}
        placeholder={placeholder}
        className={`${fieldClass} font-sans leading-relaxed`}
      />
    </label>
  );
}

export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Échec de l'envoi");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Erreur réseau");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-kicker text-ash">
        {label}
      </span>
      <div className="flex items-start gap-4">
        {value ? (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm border border-hairline bg-bone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute right-1 top-1 rounded-full bg-ink/80 p-1 text-bone transition-colors hover:bg-ink"
              aria-label="Retirer"
            >
              <X size={12} strokeWidth={2} />
            </button>
          </div>
        ) : (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-sm border border-dashed border-hairline bg-bone text-xs text-ash-light">
            Aucune
          </div>
        )}
        <div className="flex-1">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-hairline bg-white px-3 py-2 text-sm text-ink transition-colors hover:border-gold">
            {uploading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Upload size={14} strokeWidth={1.5} />
            )}
            {uploading ? "Envoi…" : "Choisir un fichier"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void upload(f);
                e.target.value = "";
              }}
            />
          </label>
          <p className="mt-2 text-xs text-ash-light">PNG, JPG, WebP ou SVG · max 8 Mo</p>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="ou collez une URL d'image"
            className={`${fieldClass} mt-2 font-mono text-xs`}
          />
          {error && <p className="mt-2 text-xs text-oxblood">{error}</p>}
        </div>
      </div>
    </div>
  );
}
