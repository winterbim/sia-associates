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
  const ok = await rateLimitOk(ip);
  if (!ok) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans 15 minutes." },
      { status: 429 },
    );
  }

  const valid = await checkPassword(password);
  if (!valid) {
    return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
  }

  const { challengeId, code } = await createChallenge();
  await sendLoginCode(code);

  return NextResponse.json({ challengeId });
}
