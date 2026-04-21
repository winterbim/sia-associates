import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";

// In-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600_000 });
    return false;
  }

  entry.count++;
  return entry.count > 5;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Trop de messages. Réessayez dans une heure." },
        { status: 429 }
      );
    }

    const body: unknown = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", détails: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, company, subject, message, website } = result.data;

    // Honeypot check
    if (website && website.length > 0) {
      // Silently succeed for bots
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL ?? "contact@sia-associates.fr";
    const fromEmail = process.env.FROM_EMAIL ?? "no-reply@sia-associates.fr";

    if (!apiKey) {
      // Dev mode: log to console
      console.log("=== CONTACT FORM SUBMISSION (dev mode) ===");
      console.log({ name, email, company, subject, message });
      console.log("==========================================");
      return NextResponse.json({ ok: true });
    }

    // Production: send via Resend
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const SUBJECT_LABELS: Record<string, string> = {
      architecture: "Architecture SAP",
      pilotage: "Pilotage de projet",
      exploitation: "Exploitation / TMA",
      cloud: "Cloud SAP",
      audit: "Audit / second regard",
      autre: "Autre",
    };

    await resend.emails.send({
      from: `SIA Associates <${fromEmail}>`,
      to: contactEmail,
      replyTo: email,
      subject: `[SIA] ${SUBJECT_LABELS[subject] ?? subject} — ${company}`,
      text: [
        `Nom : ${name}`,
        `Email : ${email}`,
        `Entreprise : ${company}`,
        `Sujet : ${SUBJECT_LABELS[subject] ?? subject}`,
        "",
        "Message :",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Erreur serveur. Reessayez plus tard." },
      { status: 500 }
    );
  }
}
