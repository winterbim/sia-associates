"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Mail, Lock, Loader2 } from "lucide-react";

type Step = "password" | "code";

export function LoginModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("password");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });
      const data = (await res.json()) as { challengeId?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Erreur de connexion");
        return;
      }
      setChallengeId(data.challengeId ?? null);
      setStep("code");
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  async function submitCode(e: React.FormEvent) {
    e.preventDefault();
    if (!challengeId) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, code }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Code incorrect");
        return;
      }
      onClose();
      router.push("/admin");
    } catch {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Connexion administrateur"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-md rounded-lg border border-hairline bg-bone p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm p-1.5 text-ash transition-colors hover:bg-ink/5 hover:text-ink"
          aria-label="Fermer"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <div className="mb-6">
          <p className="kicker mb-2">Espace administrateur</p>
          <h2 className="display-heading text-2xl text-ink">
            {step === "password" ? "Connexion" : "Vérification"}
          </h2>
          <p className="mt-2 text-sm text-ash">
            {step === "password"
              ? "Saisissez votre mot de passe pour recevoir un code de vérification par email."
              : "Un code à 6 chiffres a été envoyé par email. Saisissez-le pour terminer la connexion."}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-sm border border-oxblood/30 bg-oxblood/10 px-3 py-2 text-sm text-oxblood">
            {error}
          </div>
        )}

        {step === "password" ? (
          <form onSubmit={submitPassword} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-kicker text-ash">
                <Lock size={12} strokeWidth={1.5} />
                Mot de passe
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
                className="w-full rounded-sm border border-hairline bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ash-light focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="••••••••••••"
              />
            </label>
            <button
              type="submit"
              disabled={loading || !password}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-ink px-4 py-3 text-sm font-medium text-bone transition-colors hover:bg-ink/90 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Envoi du code…
                </>
              ) : (
                <>
                  <Mail size={16} strokeWidth={1.5} />
                  Recevoir un code par email
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={submitCode} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-kicker text-ash">
                Code à 6 chiffres
              </span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
                autoFocus
                required
                className="w-full rounded-sm border border-hairline bg-white px-3 py-2.5 text-center font-mono text-2xl tracking-[0.5em] text-ink focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="000000"
              />
            </label>
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-ink px-4 py-3 text-sm font-medium text-bone transition-colors hover:bg-ink/90 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Vérification…
                </>
              ) : (
                "Valider"
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("password");
                setCode("");
                setChallengeId(null);
              }}
              className="block w-full text-center text-xs text-ash transition-colors hover:text-ink"
            >
              ← Recommencer
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
