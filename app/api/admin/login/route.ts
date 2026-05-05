import { NextResponse } from "next/server";
import {
  checkPassword,
  createChallenge,
  rateLimitOk,
} from "@/lib/admin/auth";
import { sendLoginCode } from "@/lib/admin/email";

export const runtime = "nodejs";

function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const password = body.password;
  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "Mot de passe requis" }, { status: 400 });
  }

  const ip = getClientIp(request);
  try {
    const ok = await rateLimitOk(ip);
    if (!ok) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans 15 minutes." },
        { status: 429 },
      );
    }
  } catch (err) {
    console.error("[admin-login] rate-limit error (non-fatal):", err);
  }

  // checkPassword can throw if ADMIN_PASSWORD_HASH is missing — surface
  // a clear configuration error rather than a generic 500.
  let valid: boolean;
  try {
    valid = await checkPassword(password);
  } catch (err) {
    console.error("[admin-login] password check failed:", err);
    return NextResponse.json(
      { error: "Configuration incomplète : ADMIN_PASSWORD_HASH manquant sur Vercel." },
      { status: 500 },
    );
  }
  if (!valid) {
    return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
  }

  let challengeId: string;
  let code: string;
  try {
    const challenge = await createChallenge();
    challengeId = challenge.challengeId;
    code = challenge.code;
  } catch (err) {
    console.error("[admin-login] challenge generation failed:", err);
    return NextResponse.json(
      { error: "Configuration incomplète : ADMIN_JWT_SECRET manquant sur Vercel." },
      { status: 500 },
    );
  }

  try {
    await sendLoginCode(code);
  } catch (err) {
    console.error("[admin-login] email send failed:", err);
    const message = err instanceof Error ? err.message : "Échec de l'envoi du code";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ challengeId });
}
