"use client";

import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";

export function PasswordPanel() {
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (pwd.length < 10) {
      setError("Le mot de passe doit faire au moins 10 caractères.");
      return;
    }
    if (pwd !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: pwd }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      setMessage(data.message ?? "Email envoyé.");
      setPwd("");
      setConfirm("");
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h2 className="font-display text-xl font-medium text-ink">Changer le mot de passe</h2>
      <p className="mt-2 text-sm text-ash">
        Le nouveau mot de passe ainsi que le hash à coller dans Vercel (variable
        <code className="mx-1 rounded bg-ink/5 px-1.5 py-0.5 font-mono text-xs">ADMIN_PASSWORD_HASH</code>)
        seront envoyés par email avec la procédure complète.
      </p>

      <div className="mt-4 rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Tant que le hash n&apos;est pas remplacé dans Vercel et le projet redéployé, l&apos;ancien mot de passe reste actif.
      </div>

      {error && (
        <div className="mt-4 rounded-sm border border-oxblood/30 bg-oxblood/10 px-3 py-2 text-sm text-oxblood">
          {error}
        </div>
      )}
      {message && (
        <div className="mt-4 rounded-sm border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          {message}
        </div>
      )}

      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-kicker text-ash">
            <Lock size={12} strokeWidth={1.5} />
            Nouveau mot de passe
          </span>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            minLength={10}
            required
            className="w-full rounded-sm border border-hairline bg-white px-3 py-2.5 text-sm text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-kicker text-ash">
            Confirmer
          </span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            minLength={10}
            required
            className="w-full rounded-sm border border-hairline bg-white px-3 py-2.5 text-sm text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-sm bg-ink px-4 py-2.5 text-sm font-medium text-bone transition-colors hover:bg-ink/90 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Génération…
            </>
          ) : (
            "Générer le nouveau hash"
          )}
        </button>
      </form>
    </div>
  );
}
