import { NextResponse } from "next/server";
import { consumeChallenge, mintSession, SESSION_CONFIG } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { challengeId?: string; code?: string };
  try {
    body = (await request.json()) as { challengeId?: string; code?: string };
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { challengeId, code } = body;
  if (!challengeId || !code) {
    return NextResponse.json({ error: "Code et challenge requis" }, { status: 400 });
  }

  const valid = await consumeChallenge(challengeId, code);
  if (!valid) {
    return NextResponse.json({ error: "Code invalide ou expiré" }, { status: 401 });
  }

  const token = await mintSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_CONFIG.cookieName, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_CONFIG.ttlSeconds,
  });
  return response;
}
