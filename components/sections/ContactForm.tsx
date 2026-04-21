"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validators";
import { cn } from "@/lib/utils";

const SUBJECTS = [
  { value: "architecture", label: "Architecture SAP" },
  { value: "pilotage", label: "Pilotage de projet" },
  { value: "exploitation", label: "Exploitation / TMA" },
  { value: "cloud", label: "Cloud SAP" },
  { value: "audit", label: "Audit / second regard" },
  { value: "autre", label: "Autre" },
] as const;

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? "Erreur serveur");
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-gold/30 bg-gold/5 p-8 text-center">
        <CheckCircle2 size={32} strokeWidth={1.5} className="mx-auto mb-4 text-gold" />
        <h3 className="font-display text-xl font-medium text-ink">
          Message envoye
        </h3>
        <p className="mt-2 text-sm text-ash">
          Merci pour votre message. Je reviens vers vous sous 48 heures.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
    >
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir</label>
        <input
          type="text"
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldWrapper label="Nom complet" error={errors.name?.message} id="name">
          <input
            type="text"
            id="name"
            autoComplete="name"
            className={fieldClass(!!errors.name)}
            {...register("name")}
          />
        </FieldWrapper>

        <FieldWrapper label="Email" error={errors.email?.message} id="email">
          <input
            type="email"
            id="email"
            autoComplete="email"
            className={fieldClass(!!errors.email)}
            {...register("email")}
          />
        </FieldWrapper>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldWrapper label="Entreprise" error={errors.company?.message} id="company">
          <input
            type="text"
            id="company"
            autoComplete="organization"
            className={fieldClass(!!errors.company)}
            {...register("company")}
          />
        </FieldWrapper>

        <FieldWrapper label="Sujet" error={errors.subject?.message} id="subject">
          <select
            id="subject"
            className={cn(fieldClass(!!errors.subject), "appearance-none")}
            defaultValue=""
            {...register("subject")}
          >
            <option value="" disabled>
              Selectionnez un sujet
            </option>
            {SUBJECTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </FieldWrapper>
      </div>

      <FieldWrapper label="Message" error={errors.message?.message} id="message">
        <textarea
          id="message"
          rows={5}
          className={cn(fieldClass(!!errors.message), "resize-none")}
          {...register("message")}
        />
      </FieldWrapper>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 rounded border-hairline accent-gold"
            {...register("consent")}
          />
          <span className="text-sm text-ash">
            J&apos;accepte que mes données soient traitees pour répondre a ma demande,
            conformement a la{" "}
            <a href="/mentions-legales" className="text-gold underline">
              politique de confidentialité
            </a>
            .
          </span>
        </label>
        {errors.consent?.message && (
          <p className="mt-1 text-xs text-oxblood" role="alert">
            {errors.consent.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-oxblood/30 bg-oxblood/5 p-4">
          <AlertCircle size={18} strokeWidth={1.5} className="shrink-0 text-oxblood" />
          <p className="text-sm text-oxblood">
            Une erreur est survenue. Veuillez reessayer ou écrire directement a
            siamanagement75@gmail.com.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-4 font-mono text-xs uppercase tracking-kicker text-ink transition-all duration-200 hover:bg-gold-hover disabled:opacity-50"
      >
        {status === "submitting" ? "Envoi en cours..." : "Envoyer le message"}
        <Send size={16} strokeWidth={1.5} />
      </button>
    </form>
  );
}

function fieldClass(hasError: boolean) {
  return cn(
    "w-full rounded-sm border bg-bone px-4 py-3 text-sm text-ink placeholder:text-ash-light transition-colors duration-200",
    hasError
      ? "border-oxblood focus:border-oxblood"
      : "border-hairline focus:border-gold"
  );
}

function FieldWrapper({
  label,
  error,
  id,
  children,
}: {
  label: string;
  error?: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p
          className="mt-1 text-xs text-oxblood"
          id={`${id}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
