import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  rotatePassword,
  verifySession,
  SESSION_CONFIG,
} from "@/lib/admin/auth";
import { sendNewPasswordHash } from "@/lib/admin/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_CONFIG.cookieName)?.value;
  if (!(await verifySession(token))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  let body: { newPassword?: string };
  try {
    body = (await request.json()) as { newPassword?: string };
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const newPassword = body.newPassword;
  if (!newPassword || newPassword.length < 10) {
    return NextResponse.json(
      { error: "Le mot de passe doit faire au moins 10 caractères" },
      { status: 400 },
    );
  }

  const newHash = await rotatePassword(newPassword);
  await sendNewPasswordHash(newPassword, newHash);

  return NextResponse.json({
    ok: true,
    message:
      "Le nouveau hash a été envoyé par email. Mettez-le dans Vercel env vars (ADMIN_PASSWORD_HASH) puis redéployez.",
  });
}
