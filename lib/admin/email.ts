// Admin-related transactional emails sent via Resend (already wired
// for the contact form). Two messages: 2FA code at login, and a
// password-rotation confirmation that includes the new bcrypt hash
// the user must paste into Vercel env vars.

import { Resend } from "resend";

function getClient(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY missing");
  return new Resend(key);
}

function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL ?? "siamanagement75@gmail.com";
}

function getFromEmail(): string {
  // Resend requires the from address to be on a verified domain. We
  // reuse the same sender that the contact form already uses so no
  // extra DNS work is needed; falling back to onboarding@resend.dev
  // makes local dev work without DNS but mails will land in spam.
  return process.env.RESEND_FROM ?? "SIA Associates <noreply@sia-associates.com>";
}

export async function sendLoginCode(code: string): Promise<void> {
  const resend = getClient();
  const to = getAdminEmail();
  await resend.emails.send({
    from: getFromEmail(),
    to,
    subject: `Code admin SIA Associates : ${code}`,
    text: `Bonjour Amine,

Votre code de connexion à l'admin du site SIA Associates est :

  ${code}

Ce code est valable 10 minutes et ne peut être utilisé qu'une seule fois. Si vous n'êtes pas à l'origine de cette demande, ignorez ce message — votre mot de passe reste protégé.

— SIA Associates`,
    html: `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#0F1318;">
  <p style="margin:0 0 16px 0;">Bonjour Amine,</p>
  <p style="margin:0 0 24px 0;">Votre code de connexion à l'admin du site SIA Associates est&nbsp;:</p>
  <p style="font-size:32px;font-weight:600;letter-spacing:8px;text-align:center;background:#F4EFE6;padding:20px;border-radius:8px;margin:0 0 24px 0;">${code}</p>
  <p style="margin:0 0 8px 0;font-size:14px;color:#6E6A62;">Valable 10 minutes, à usage unique.</p>
  <p style="margin:0;font-size:14px;color:#6E6A62;">Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.</p>
  <hr style="border:none;border-top:1px solid #E5DED0;margin:32px 0 16px 0;">
  <p style="margin:0;font-size:12px;color:#A8A29A;">— SIA Associates</p>
</div>`,
  });
}

export async function sendNewPasswordHash(plaintext: string, newHash: string): Promise<void> {
  // The user just changed their password from the admin UI. We can't
  // write Vercel env vars from runtime code, so we send them the new
  // hash by email — they paste it into Vercel manually and redeploy.
  // Until they do that, the OLD password keeps working. We send the
  // plaintext too so they remember what they typed.
  const resend = getClient();
  const to = getAdminEmail();
  await resend.emails.send({
    from: getFromEmail(),
    to,
    subject: "Nouveau mot de passe admin — action requise",
    text: `Bonjour Amine,

Vous avez demandé à changer le mot de passe de l'admin SIA Associates.

NOUVEAU MOT DE PASSE :
  ${plaintext}

POUR L'ACTIVER (étape unique, 30 secondes) :

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez le projet sia-associates
3. Onglet Settings → Environment Variables
4. Trouvez la variable ADMIN_PASSWORD_HASH
5. Cliquez Edit, remplacez la valeur par :

${newHash}

6. Cliquez Save, puis Redeploy le dernier déploiement.

Tant que vous n'avez pas fait l'étape 5, l'ancien mot de passe reste actif. Une fois remplacé, seul le nouveau fonctionnera.

— SIA Associates`,
    html: `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0F1318;">
  <h2 style="margin:0 0 16px 0;font-size:20px;">Nouveau mot de passe admin</h2>
  <p style="margin:0 0 16px 0;">Vous avez demandé à changer le mot de passe de l'admin du site SIA Associates.</p>
  <p style="margin:0 0 8px 0;font-size:14px;color:#6E6A62;">Nouveau mot de passe&nbsp;:</p>
  <p style="font-family:'SF Mono',Menlo,monospace;font-size:18px;background:#F4EFE6;padding:12px 16px;border-radius:6px;margin:0 0 24px 0;">${plaintext}</p>
  <h3 style="margin:32px 0 12px 0;font-size:16px;color:#6B1F2A;">Pour l'activer (étape unique, 30 s)</h3>
  <ol style="padding-left:20px;line-height:1.6;font-size:14px;">
    <li>Allez sur <a href="https://vercel.com/dashboard" style="color:#6B1F2A;">vercel.com/dashboard</a></li>
    <li>Sélectionnez le projet <strong>sia-associates</strong></li>
    <li>Onglet <strong>Settings → Environment Variables</strong></li>
    <li>Trouvez la variable <code>ADMIN_PASSWORD_HASH</code></li>
    <li>Cliquez <strong>Edit</strong> et remplacez la valeur par&nbsp;:
      <pre style="background:#0F1318;color:#F4EFE6;padding:12px;border-radius:6px;overflow-x:auto;font-size:12px;margin:8px 0;">${newHash}</pre>
    </li>
    <li>Cliquez <strong>Save</strong>, puis <strong>Redeploy</strong> le dernier déploiement.</li>
  </ol>
  <p style="margin:24px 0 0 0;font-size:13px;color:#6E6A62;background:#FEF3C7;padding:12px;border-radius:6px;">⚠️ Tant que vous n'avez pas fait l'étape 5, l'ancien mot de passe reste actif.</p>
</div>`,
  });
}
