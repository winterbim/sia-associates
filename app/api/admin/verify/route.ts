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
    // Diagnostic: tell the client whether the challengeId itself is
    // unknown to KV (almost always means the modal is reusing a stale
    // challenge from a previous login attempt) vs. challenge found but
    // code didn't match. Never echo the stored code.
    let reason: "unknown_challenge" | "wrong_code" | "kv_error" = "wrong_code";
    try {
      const { kv } = await import("@vercel/kv");
      const stored = await kv.get<string>(`admin:challenge:${challengeId}`);
      reason = stored === null || stored === undefined ? "unknown_challenge" : "wrong_code";
    } catch {
      reason = "kv_error";
    }
    return NextResponse.json(
      {
        error:
          reason === "unknown_challenge"
            ? "Challenge expiré ou inconnu — clique « Recommencer » et refais une demande de code."
            : reason === "kv_error"
              ? "Erreur stockage code — réessaie dans quelques secondes."
              : "Code incorrect.",
      },
      { status: 401 },
    );
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
