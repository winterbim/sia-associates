# SIA Associates — Site vitrine

Site vitrine de **SIA ASSOCIATES**, cabinet de conseil SAP independant fonde par Amine Silemane.

## Stack

- **Next.js 14** App Router + TypeScript strict
- **Tailwind CSS 3.4** avec theme "Obsidian SAP"
- **Resend** pour le formulaire de contact
- Deploiement **Vercel**

## Developpement local

```bash
npm install
cp .env.example .env.local  # Remplir RESEND_API_KEY si disponible
npm run dev                  # http://localhost:3000
```

Le formulaire de contact fonctionne sans RESEND_API_KEY (log en console).

## Commandes

```bash
npm run dev        # Serveur de developpement
npm run build      # Build production
npm run start      # Serveur production
npm run lint       # ESLint
npm run typecheck  # Verification TypeScript
```

## Deploiement Vercel

### 1. Creer le repository GitHub

```bash
git init
git add .
git commit -m "feat: initial SIA Associates site"
git remote add origin https://github.com/<user>/sia-associates.git
git branch -M main
git push -u origin main
```

### 2. Importer sur Vercel

1. Aller sur [vercel.com/new](https://vercel.com/new)
2. **Import Git Repository** → selectionner `sia-associates`
3. **Framework** : Next.js (auto-detecte)
4. **Environment Variables** :
   - `RESEND_API_KEY` = `re_xxx` (obtenu sur resend.com)
   - `CONTACT_EMAIL` = `contact@sia-associates.fr`
   - `FROM_EMAIL` = `no-reply@sia-associates.fr`
5. Cliquer **Deploy**

### 3. Configurer le domaine

1. Vercel → Settings → Domains → Add `sia-associates.fr`
2. Configurer les DNS chez votre registrar (OVH recommande) selon les instructions Vercel :
   - Record A : `76.76.21.21`
   - Record CNAME `www` : `cname.vercel-dns.com`

### 4. Configurer Resend

1. Creer un compte sur [resend.com](https://resend.com)
2. Ajouter et verifier le domaine `sia-associates.fr` (DKIM + SPF)
3. Generer une API key et la renseigner dans les variables Vercel

## Structure du projet

```
sia-associates/
├── app/               # Pages (App Router)
├── components/
│   ├── layout/        # Header, Footer
│   └── sections/      # Sections de la home
├── lib/               # Utilitaires, validateurs
└── public/
    └── clients/       # Logos SVG clients
```

## Post-livraison

Amine Silemane doit fournir :
- [ ] Compte Resend + domaine verifie
- [ ] Logos SVG officiels des 6 clients (si accord)
- [ ] Validation juridique des textes cas clients
- [ ] Domaine `sia-associates.fr`
