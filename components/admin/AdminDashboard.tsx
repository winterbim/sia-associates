"use client";

// Admin dashboard. State is initialised from the server-rendered KV
// snapshot, then each section saves independently — saving one section
// doesn't reset edits in another. The Save button per section sends a
// PUT to /api/admin/content with { section, value } and triggers an
// ISR revalidation so the public site reflects the change immediately.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Save, Lock, Loader2, Check } from "lucide-react";
import type { SiteContent } from "@/lib/admin/defaults";
import { HeroEditor } from "./editors/HeroEditor";
import { AboutEditor } from "./editors/AboutEditor";
import { PillarsEditor } from "./editors/PillarsEditor";
import { ClientsEditor } from "./editors/ClientsEditor";
import { CasesEditor } from "./editors/CasesEditor";
import { ApprocheEditor } from "./editors/ApprocheEditor";
import { ContactEditor } from "./editors/ContactEditor";
import { PasswordPanel } from "./PasswordPanel";

type Section = keyof SiteContent;

type Tab = Section | "password";

const TABS: Array<{ id: Tab; label: string }> = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "À propos" },
  { id: "pillars", label: "Expertise" },
  { id: "cases", label: "Cas" },
  { id: "clients", label: "Clients" },
  { id: "approche", label: "Approche" },
  { id: "contact", label: "Coordonnées" },
  { id: "password", label: "Mot de passe" },
];

export function AdminDashboard({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [tab, setTab] = useState<Tab>("hero");
  const [saving, setSaving] = useState<Section | null>(null);
  const [savedFlash, setSavedFlash] = useState<Section | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function saveSection<S extends Section>(section: S, value: SiteContent[S]) {
    setError(null);
    setSaving(section);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, value }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Erreur de sauvegarde");
        return;
      }
      setContent((prev) => ({ ...prev, [section]: value }));
      setSavedFlash(section);
      setTimeout(() => setSavedFlash(null), 1800);
    } catch {
      setError("Erreur réseau");
    } finally {
      setSaving(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <div className="section-container py-10">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-6">
        <div>
          <p className="kicker mb-2">Espace admin</p>
          <h1 className="display-heading text-3xl text-ink md:text-4xl">
            Édition du <em className="not-italic text-oxblood">site</em>
          </h1>
          <p className="mt-2 text-sm text-ash">
            Les modifications sont publiées en quelques secondes — pas de redéploiement.
          </p>
        </div>
        <button
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-sm border border-hairline bg-white px-4 py-2 text-sm text-ash transition-colors hover:border-oxblood/40 hover:text-oxblood"
        >
          <LogOut size={14} strokeWidth={1.5} />
          Déconnexion
        </button>
      </header>

      <div className="mb-6 flex flex-wrap gap-1 border-b border-hairline">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-t-sm px-4 py-2.5 font-mono text-xs uppercase tracking-kicker transition-colors ${
              tab === t.id
                ? "border-b-2 border-oxblood text-ink"
                : "text-ash hover:text-ink"
            }`}
          >
            {t.id === "password" && <Lock size={12} className="mr-1.5 inline" strokeWidth={1.5} />}
            {t.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-sm border border-oxblood/30 bg-oxblood/10 px-4 py-3 text-sm text-oxblood">
          {error}
        </div>
      )}

      <div className="rounded-lg border border-hairline bg-white p-6 md:p-8">
        {tab === "hero" && (
          <SectionWrapper
            label="Section d'accueil"
            saving={saving === "hero"}
            saved={savedFlash === "hero"}
            onSave={() => saveSection("hero", content.hero)}
          >
            <HeroEditor
              value={content.hero}
              onChange={(v) => setContent((c) => ({ ...c, hero: v }))}
            />
          </SectionWrapper>
        )}
        {tab === "about" && (
          <SectionWrapper
            label="Section À propos"
            saving={saving === "about"}
            saved={savedFlash === "about"}
            onSave={() => saveSection("about", content.about)}
          >
            <AboutEditor
              value={content.about}
              onChange={(v) => setContent((c) => ({ ...c, about: v }))}
            />
          </SectionWrapper>
        )}
        {tab === "pillars" && (
          <SectionWrapper
            label="Piliers d'expertise"
            saving={saving === "pillars"}
            saved={savedFlash === "pillars"}
            onSave={() => saveSection("pillars", content.pillars)}
          >
            <PillarsEditor
              value={content.pillars}
              onChange={(v) => setContent((c) => ({ ...c, pillars: v }))}
            />
          </SectionWrapper>
        )}
        {tab === "cases" && (
          <SectionWrapper
            label="Cas phares"
            saving={saving === "cases"}
            saved={savedFlash === "cases"}
            onSave={() => saveSection("cases", content.cases)}
          >
            <CasesEditor
              value={content.cases}
              onChange={(v) => setContent((c) => ({ ...c, cases: v }))}
            />
          </SectionWrapper>
        )}
        {tab === "clients" && (
          <SectionWrapper
            label="Liste des clients"
            saving={saving === "clients"}
            saved={savedFlash === "clients"}
            onSave={() => saveSection("clients", content.clients)}
          >
            <ClientsEditor
              value={content.clients}
              onChange={(v) => setContent((c) => ({ ...c, clients: v }))}
            />
          </SectionWrapper>
        )}
        {tab === "approche" && (
          <SectionWrapper
            label="Phases de l'approche"
            saving={saving === "approche"}
            saved={savedFlash === "approche"}
            onSave={() => saveSection("approche", content.approche)}
          >
            <ApprocheEditor
              value={content.approche}
              onChange={(v) => setContent((c) => ({ ...c, approche: v }))}
            />
          </SectionWrapper>
        )}
        {tab === "contact" && (
          <SectionWrapper
            label="Coordonnées"
            saving={saving === "contact"}
            saved={savedFlash === "contact"}
            onSave={() => saveSection("contact", content.contact)}
          >
            <ContactEditor
              value={content.contact}
              onChange={(v) => setContent((c) => ({ ...c, contact: v }))}
            />
          </SectionWrapper>
        )}
        {tab === "password" && <PasswordPanel />}
      </div>
    </div>
  );
}

function SectionWrapper({
  label,
  saving,
  saved,
  onSave,
  children,
}: {
  label: string;
  saving: boolean;
  saved: boolean;
  onSave: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-medium text-ink">{label}</h2>
        <button
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-sm bg-ink px-4 py-2 text-sm font-medium text-bone transition-colors hover:bg-ink/90 disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Sauvegarde…
            </>
          ) : saved ? (
            <>
              <Check size={14} strokeWidth={2} />
              Enregistré
            </>
          ) : (
            <>
              <Save size={14} strokeWidth={1.5} />
              Sauvegarder
            </>
          )}
        </button>
      </div>
      {children}
    </div>
  );
}
