"use client";

import type { SiteContent } from "@/lib/admin/defaults";
import { TextField } from "./inputs";

type Contact = SiteContent["contact"];

export function ContactEditor({
  value,
  onChange,
}: {
  value: Contact;
  onChange: (v: Contact) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <TextField
          label="Téléphone (format E.164)"
          value={value.phone}
          onChange={(v) => onChange({ ...value, phone: v })}
          placeholder="+33630156331"
        />
        <TextField
          label="Téléphone (affichage)"
          value={value.phoneDisplay}
          onChange={(v) => onChange({ ...value, phoneDisplay: v })}
          placeholder="+33 6 30 15 63 31"
        />
      </div>
      <TextField
        label="Email"
        value={value.email}
        onChange={(v) => onChange({ ...value, email: v })}
      />
      <TextField
        label="Localisation"
        value={value.location}
        onChange={(v) => onChange({ ...value, location: v })}
      />
      <TextField
        label="Délai de réponse"
        value={value.responseTime}
        onChange={(v) => onChange({ ...value, responseTime: v })}
      />
    </div>
  );
}
