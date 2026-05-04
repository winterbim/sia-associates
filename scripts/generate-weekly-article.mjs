#!/usr/bin/env node
// Standalone article generator. Picks the next ungenerated topic from
// the catalog, calls Groq, writes the JSON + cover SVG into content/blog/
// and public/blog/, and exits. Designed to run from a weekly GitHub
// Action — the new files are then committed back to the repo, which
// triggers a Vercel deploy. That way the article is permanently
// versioned in Git rather than living in ephemeral storage.
//
// Required env: GROQ_API_KEY
// Optional env: SLUG (force a specific topic by slug)

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

// Inline the topics catalog so this script has no TS build step.
// Keep in sync with lib/blog-topics.ts when editing.
const BLOG_TOPICS = [
  { slug: "clean-core-stratégie-s4hana-2026", topic: "Clean Core : comment préparer votre stratégie S/4HANA en 2026 sans accumuler de dette technique", category: "architecture" },
  { slug: "architecture-sap-hybride-on-premise-cloud", topic: "Architecture SAP hybride : quand garder du on-premise et quand basculer dans le cloud", category: "architecture" },
  { slug: "sap-btp-cas-usage-concrets", topic: "SAP BTP en pratique : 5 cas d'usage concrets pour les grands comptes français", category: "architecture" },
  { slug: "intégration-sap-cpi-api-management", topic: "Intégration SAP : CPI vs API Management, comment choisir pour votre paysage applicatif", category: "architecture" },
  { slug: "migration-ecc6-s4hana-erreurs-eviter", topic: "Migration ECC6 vers S/4HANA : les 7 erreurs que je vois systématiquement chez mes clients", category: "migration" },
  { slug: "brownfield-greenfield-bluefield-guide", topic: "Brownfield, Greenfield ou Bluefield : guide pratique pour choisir votre approche de migration S/4HANA", category: "migration" },
  { slug: "sap-activate-méthodologie-projet", topic: "SAP Activate démystifié : comment appliquer cette méthodologie sur un vrai projet de migration", category: "migration" },
  { slug: "conduite-changement-projet-sap", topic: "La conduite du changement dans un projet SAP : ce que les consultants techniques oublient trop souvent", category: "migration" },
  { slug: "rise-with-sap-retour-expérience", topic: "RISE with SAP : retour d'expérience après 2 ans de déploiements en France", category: "cloud" },
  { slug: "souveraineté-données-sap-cloud", topic: "Souveraineté des données et SAP Cloud : OVHcloud, Azure France, AWS Paris — quel choix pour un grand compte ?", category: "cloud" },
  { slug: "coût-reel-migration-cloud-sap", topic: "Le coût réel d'une migration cloud SAP : au-delà des promesses commerciales des éditeurs", category: "cloud" },
  { slug: "grow-with-sap-pme-eti", topic: "Grow with SAP : est-ce vraiment adapté aux ETI françaises ?", category: "cloud" },
  { slug: "audit-sap-methodology-indépendant", topic: "Comment mener un audit SAP indépendant : méthodologie et livrables concrets", category: "methodology" },
  { slug: "gouvernance-sap-multi-entites", topic: "Gouvernance SAP multi-entités : organiser la décision technique dans un groupe international", category: "methodology" },
  { slug: "chiffrage-projet-sap-erreurs", topic: "Chiffrage de projet SAP : pourquoi 80% des estimations dérapent et comment l'éviter", category: "methodology" },
  { slug: "transfert-competences-sap-équipes-internes", topic: "Transfert de compétences SAP : comment rendre vos équipes internes autonomes après un projet", category: "methodology" },
  { slug: "ia-generative-sap-joule-impact", topic: "IA générative et SAP : Joule, copilots et impact concret sur les projets en 2026", category: "trends" },
  { slug: "sap-datasphere-analytics-cloud-bi", topic: "SAP Datasphere et Analytics Cloud : la BI SAP rattrape-t-elle enfin son retard ?", category: "trends" },
  { slug: "fin-maintenance-ecc6-2027-plan-action", topic: "Fin de maintenance ECC6 en 2027 : plan d'action réaliste pour les retardataires", category: "trends" },
  { slug: "consultant-sap-indépendant-vs-esn", topic: "Consultant SAP indépendant vs ESN : pourquoi le modèle change en 2026", category: "trends" },
  { slug: "sap-basis-best-practices-2026", topic: "SAP Basis en 2026 : les best practices que tout administrateur devrait connaître", category: "basis" },
  { slug: "monitoring-sap-proactif-solution-manager", topic: "Monitoring SAP proactif : au-delà de Solution Manager, les outils et pratiques qui changent la donne", category: "basis" },
  { slug: "gestion-transports-sap-devops", topic: "Gestion des transports SAP à l'ère du DevOps : CTS+, gCTS et intégration continue", category: "basis" },
  { slug: "sécurité-sap-audit-autorisations", topic: "Sécurité SAP : comment auditer vos autorisations et corriger les failles les plus courantes", category: "basis" },
];

const SYSTEM_PROMPT = `Tu es un expert SAP senior avec 19+ ans d'expérience. Tu rédiges des articles techniques approfondis pour le blog de SIA Associates, cabinet de conseil SAP indépendant fondé par Amine Silemane.

Règles de rédaction :
- Ton professionnel mais accessible, pas de jargon inutile
- Exemples concrets issus de projets réels (énergie, industrie, construction)
- Structure claire avec des sous-titres H2 et H3
- Minimum 1500 mots, maximum 2500 mots
- Inclure des conseils pratiques et des retours d'expérience
- Mentionner les modules SAP pertinents (Basis, S/4HANA, BTP, etc.)
- Ne pas utiliser de bullet points excessifs, privilégier la prose
- Écrire en français correct et complet, avec tous les accents (é, è, ê, à, â, î, ï, ô, û, ù, ç). L'encodage est UTF-8, jamais d'accents omis ni de simplifications du type « francais » ou « developpe ».

Format de sortie STRICTEMENT en JSON :
{
  "title": "Titre accrocheur de l'article (avec tous les accents)",
  "excerpt": "Résumé en 2 phrases maximum (150 caractères max, accents inclus)",
  "content": "Contenu complet en Markdown (H2 avec ##, H3 avec ###, **gras**, *italique*) — tout le texte doit être en français correct avec accents",
  "tags": ["tag1", "tag2", "tag3"],
  "readingTime": 8
}`;

async function callGroq(topic) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY missing");

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Rédige un article de blog technique sur le sujet suivant : « ${topic} ». L'article doit être utile pour un DSI ou directeur de programme SAP. Réponds UNIQUEMENT en JSON valide, en français avec tous les accents.`,
        },
      ],
      max_tokens: 4000,
      temperature: 0.75,
    }),
  });

  if (!res.ok) {
    throw new Error(`Groq ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  let raw = data.choices[0]?.message?.content?.trim();
  if (!raw) throw new Error("Empty Groq response");
  if (raw.startsWith("```json")) raw = raw.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  else if (raw.startsWith("```")) raw = raw.replace(/^```\s*/, "").replace(/\s*```$/, "");
  return JSON.parse(raw);
}

function generateCoverSvg(title) {
  const hash = [...title].reduce((acc, ch) => ((acc << 5) - acc + ch.charCodeAt(0)) | 0, 0);
  const patterns = ["circuit", "flow", "grid", "nodes", "layers"];
  const pattern = patterns[Math.abs(hash) % patterns.length];
  const gold = "#C8A24B";
  const ink = "#0A0E12";
  let body = "";
  if (pattern === "circuit") {
    body = `<path d="M100,50 L200,50 L200,150 L300,150" stroke="${gold}" stroke-width="2" fill="none" opacity="0.3"/><circle cx="200" cy="50" r="4" fill="${gold}" opacity="0.5"/><circle cx="300" cy="150" r="4" fill="${gold}" opacity="0.5"/>`;
  } else if (pattern === "flow") {
    body = `<path d="M0,150 C150,100 300,200 450,150 C600,100 750,200 900,150" stroke="${gold}" stroke-width="2" fill="none" opacity="0.2" stroke-dasharray="8 4"/>`;
  } else if (pattern === "grid") {
    body = `<line x1="150" y1="50" x2="150" y2="280" stroke="${gold}" stroke-width="0.5" opacity="0.15"/><line x1="300" y1="50" x2="300" y2="280" stroke="${gold}" stroke-width="0.5" opacity="0.15"/>`;
  } else if (pattern === "nodes") {
    body = `<circle cx="200" cy="100" r="30" stroke="${gold}" stroke-width="1" fill="none" opacity="0.2"/><circle cx="500" cy="150" r="25" stroke="${gold}" stroke-width="1" fill="none" opacity="0.15"/>`;
  } else {
    body = `<rect x="100" y="80" width="200" height="60" rx="4" stroke="${gold}" stroke-width="1" fill="none" opacity="0.2"/>`;
  }
  const display = title.length > 50 ? title.slice(0, 47) + "..." : title;
  const escape = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" fill="none">
  <rect width="800" height="320" fill="${ink}"/>
  ${body}
  <text x="400" y="290" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="${gold}" opacity="0.5">SIA ASSOCIATES · BLOG</text>
  <text x="400" y="160" text-anchor="middle" font-family="Georgia, serif" font-size="16" fill="#F4EFE6" opacity="0.8">${escape(display)}</text>
</svg>`;
}

async function main() {
  const blogDir = path.join(root, "content", "blog");
  await fs.mkdir(blogDir, { recursive: true });
  const existing = new Set(
    (await fs.readdir(blogDir)).filter((f) => f.endsWith(".json")).map((f) => f.replace(".json", ""))
  );

  let target;
  if (process.env.SLUG) {
    target = BLOG_TOPICS.find((t) => t.slug === process.env.SLUG);
    if (!target) {
      console.error(`Slug not found: ${process.env.SLUG}`);
      process.exit(1);
    }
  } else {
    target = BLOG_TOPICS.find((t) => !existing.has(t.slug));
    if (!target) {
      console.log("All catalog topics already generated. Nothing to do.");
      return;
    }
  }

  console.log(`Generating: ${target.slug} (${target.category})`);
  console.log(`  Topic: ${target.topic}`);

  const article = await callGroq(target.topic);
  const coverSvg = generateCoverSvg(article.title);

  const data = {
    slug: target.slug,
    ...article,
    coverSvg,
    category: target.category,
    publishedAt: new Date().toISOString(),
    author: "Amine Silemane",
  };

  await fs.writeFile(path.join(blogDir, `${target.slug}.json`), JSON.stringify(data, null, 2) + "\n", "utf-8");

  const coversDir = path.join(root, "public", "blog");
  await fs.mkdir(coversDir, { recursive: true });
  await fs.writeFile(path.join(coversDir, `${target.slug}.svg`), coverSvg, "utf-8");

  console.log(`✓ Article generated: ${target.slug}`);
  console.log(`  Title: ${article.title}`);
  console.log(`  Reading time: ${article.readingTime} min`);
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
