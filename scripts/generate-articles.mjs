#!/usr/bin/env node

/**
 * Script to generate blog articles using Groq API
 * Usage: GROQ_API_KEY=xxx node scripts/generate-articles.mjs [slug1] [slug2] ...
 * Without slugs, generates this week's article
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content", "blog");
const COVERS_DIR = path.join(ROOT, "public", "blog");

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = process.env.GROQ_API_KEY;

if (!API_KEY) {
  console.error("Error: GROQ_API_KEY env var is required");
  process.exit(1);
}

const TOPICS = [
  { slug: "clean-core-strategie-s4hana-2026", topic: "Clean Core : comment preparer votre strategie S/4HANA en 2026 sans accumuler de dette technique", category: "architecture" },
  { slug: "architecture-sap-hybride-on-premise-cloud", topic: "Architecture SAP hybride : quand garder du on-premise et quand basculer dans le cloud", category: "architecture" },
  { slug: "migration-ecc6-s4hana-erreurs-eviter", topic: "Migration ECC6 vers S/4HANA : les 7 erreurs que je vois systematiquement chez mes clients", category: "migration" },
  { slug: "rise-with-sap-retour-experience", topic: "RISE with SAP : retour d'experience apres 2 ans de deployments en France", category: "cloud" },
  { slug: "chiffrage-projet-sap-erreurs", topic: "Chiffrage de projet SAP : pourquoi 80% des estimations derapent et comment l'eviter", category: "methodology" },
  { slug: "fin-maintenance-ecc6-2027-plan-action", topic: "Fin de maintenance ECC6 en 2027 : plan d'action realiste pour les retardataires", category: "trends" },
  { slug: "sap-basis-best-practices-2026", topic: "SAP Basis en 2026 : les best practices que tout administrateur devrait connaitre", category: "basis" },
  { slug: "consultant-sap-independant-vs-esn", topic: "Consultant SAP independant vs ESN : pourquoi le modele change en 2026", category: "trends" },
  { slug: "souverainete-donnees-sap-cloud", topic: "Souverainete des donnees et SAP Cloud : OVHcloud, Azure France, AWS Paris — quel choix pour un grand compte ?", category: "cloud" },
];

async function callGroq(topic) {
  const systemPrompt = `Tu es un expert SAP senior avec 20+ ans d'experience. Tu rediges des articles techniques approfondis pour le blog de SIA Associates, cabinet de conseil SAP independant fonde par Amine Silemane.

Regles de redaction :
- Ton professionnel mais accessible, pas de jargon inutile
- Exemples concrets issus de projets reels (energie, industrie, construction)
- Structure claire avec des sous-titres H2 et H3
- Minimum 1500 mots, maximum 2500 mots
- Inclure des conseils pratiques et des retours d'experience
- Mentionner les modules SAP pertinents (Basis, S/4HANA, BTP, etc.)
- Ne pas utiliser de bullet points excessifs, privilegier la prose
- Ecrire en francais, sans accents (encodage simplifie)

Format de sortie STRICTEMENT en JSON :
{
  "title": "Titre accrocheur de l'article",
  "excerpt": "Resume en 2 phrases maximum (150 caracteres max)",
  "content": "Contenu complet en Markdown (H2 avec ##, H3 avec ###, **gras**, *italique*)",
  "tags": ["tag1", "tag2", "tag3"],
  "readingTime": 8
}`;

  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Redige un article de blog technique sur le sujet suivant : "${topic}". L'article doit etre utile pour un DSI ou directeur de programme SAP. Reponds UNIQUEMENT en JSON valide.` },
      ],
      max_tokens: 3000,
      temperature: 0.75,
    }),
  });

  if (!res.ok) {
    throw new Error(`Groq API error: ${res.status} — ${await res.text()}`);
  }

  const data = await res.json();
  let content = data.choices[0]?.message?.content?.trim();
  if (!content) throw new Error("Empty response from Groq");

  if (content.startsWith("```json")) content = content.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  else if (content.startsWith("```")) content = content.replace(/^```\s*/, "").replace(/\s*```$/, "");

  // Fix control characters in JSON strings (common with LLM outputs)
  content = content.replace(/[\x00-\x1f]/g, (match) => {
    if (match === '\n') return '\\n';
    if (match === '\r') return '\\r';
    if (match === '\t') return '\\t';
    return '';
  });

  return JSON.parse(content);
}

function generateCoverSvg(title, pattern) {
  const gold = "#C8A24B";
  const ink = "#0A0E12";
  const displayTitle = title.length > 50 ? title.substring(0, 47) + "..." : title;
  const escaped = displayTitle.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

  const patterns = {
    circuit: `<path d="M100,50 L200,50 L200,150 L300,150" stroke="${gold}" stroke-width="2" fill="none" opacity="0.3"/><path d="M400,80 L500,80 L500,200 L600,200" stroke="${gold}" stroke-width="1.5" fill="none" opacity="0.2"/><circle cx="200" cy="50" r="4" fill="${gold}" opacity="0.5"/><circle cx="300" cy="150" r="4" fill="${gold}" opacity="0.5"/><circle cx="600" cy="200" r="3" fill="${gold}" opacity="0.4"/>`,
    flow: `<path d="M0,150 C150,100 300,200 450,150 C600,100 750,200 900,150" stroke="${gold}" stroke-width="2" fill="none" opacity="0.2" stroke-dasharray="8 4"/><path d="M0,200 C200,150 400,250 600,200" stroke="${gold}" stroke-width="1.5" fill="none" opacity="0.15"/>`,
    grid: `<line x1="150" y1="50" x2="150" y2="280" stroke="${gold}" stroke-width="0.5" opacity="0.15"/><line x1="300" y1="50" x2="300" y2="280" stroke="${gold}" stroke-width="0.5" opacity="0.15"/><line x1="450" y1="50" x2="450" y2="280" stroke="${gold}" stroke-width="0.5" opacity="0.15"/><line x1="50" y1="100" x2="750" y2="100" stroke="${gold}" stroke-width="0.5" opacity="0.15"/><line x1="50" y1="200" x2="750" y2="200" stroke="${gold}" stroke-width="0.5" opacity="0.15"/><rect x="145" y="95" width="10" height="10" fill="${gold}" opacity="0.3" rx="2"/>`,
    nodes: `<circle cx="200" cy="100" r="30" stroke="${gold}" stroke-width="1" fill="none" opacity="0.2"/><circle cx="500" cy="150" r="25" stroke="${gold}" stroke-width="1" fill="none" opacity="0.15"/><circle cx="350" cy="250" r="20" stroke="${gold}" stroke-width="1" fill="none" opacity="0.2"/><line x1="230" y1="100" x2="475" y2="150" stroke="${gold}" stroke-width="0.8" opacity="0.15"/><circle cx="200" cy="100" r="4" fill="${gold}" opacity="0.4"/><circle cx="500" cy="150" r="4" fill="${gold}" opacity="0.4"/>`,
    layers: `<rect x="100" y="80" width="200" height="60" rx="4" stroke="${gold}" stroke-width="1" fill="none" opacity="0.2"/><rect x="400" y="120" width="200" height="60" rx="4" stroke="${gold}" stroke-width="1" fill="none" opacity="0.15"/><rect x="250" y="200" width="200" height="60" rx="4" stroke="${gold}" stroke-width="1" fill="none" opacity="0.2"/><path d="M300,110 L400,150" stroke="${gold}" stroke-width="1" opacity="0.2"/>`,
  };

  const patternNames = Object.keys(patterns);
  const pIdx = Math.abs(title.split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0)) % patternNames.length;
  const patternSvg = patterns[patternNames[pIdx]];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" fill="none">
  <rect width="800" height="320" fill="${ink}"/>
  ${patternSvg}
  <text x="400" y="290" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="${gold}" opacity="0.5">SIA ASSOCIATES · BLOG</text>
  <text x="400" y="160" text-anchor="middle" font-family="Georgia, serif" font-size="16" fill="#F4EFE6" opacity="0.8">${escaped}</text>
</svg>`;
}

async function generateOneArticle(topicObj) {
  const articlePath = path.join(CONTENT_DIR, `${topicObj.slug}.json`);

  // Check if already exists
  try {
    await fs.access(articlePath);
    console.log(`  [SKIP] ${topicObj.slug} (already exists)`);
    return;
  } catch {}

  console.log(`  [GEN] ${topicObj.slug}...`);

  const article = await callGroq(topicObj.topic);
  const coverSvg = generateCoverSvg(article.title);

  const data = {
    slug: topicObj.slug,
    ...article,
    coverSvg,
    publishedAt: new Date().toISOString(),
    author: "Amine Silemane",
  };

  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(articlePath, JSON.stringify(data, null, 2));

  await fs.mkdir(COVERS_DIR, { recursive: true });
  await fs.writeFile(path.join(COVERS_DIR, `${topicObj.slug}.svg`), coverSvg);

  console.log(`  [OK] "${article.title}" (${article.readingTime} min)`);
}

async function main() {
  const args = process.argv.slice(2);

  let topicsToGenerate;
  if (args.length > 0) {
    topicsToGenerate = TOPICS.filter((t) => args.includes(t.slug));
    if (topicsToGenerate.length === 0) {
      console.error("No matching slugs found. Available:", TOPICS.map((t) => t.slug).join(", "));
      process.exit(1);
    }
  } else {
    // Default: generate first 3 articles
    topicsToGenerate = TOPICS.slice(0, 3);
  }

  console.log(`Generating ${topicsToGenerate.length} article(s)...\n`);

  for (const topic of topicsToGenerate) {
    try {
      await generateOneArticle(topic);
      // Delay between API calls to avoid rate limits
      if (topicsToGenerate.indexOf(topic) < topicsToGenerate.length - 1) {
        console.log("  [WAIT] 45s before next article...");
        await new Promise((r) => setTimeout(r, 45000));
      }
    } catch (err) {
      console.error(`  [ERROR] ${topic.slug}: ${err.message}`);
    }
  }

  console.log("\nDone! Don't forget to commit and redeploy.");
}

main();
