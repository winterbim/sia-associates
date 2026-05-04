// One-shot script to add the missing `category` field on legacy blog
// posts that were generated before the route persisted it. Maps each
// existing slug to a category drawn from BLOG_TOPICS, with a sensible
// fallback for slugs that don't appear there.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const blogDir = path.join(root, "content", "blog");

// Slug -> category. Hand-curated for the 12 legacy articles. Slugs
// that don't appear in BLOG_TOPICS (auto-generated from a custom
// topic) are mapped by inspecting tags + title.
const SLUG_CATEGORIES = {
  "abap-cloud-development-modele-2026": "architecture",
  "btp-extensions-cuid-guide-architecte": "architecture",
  "clean-core-strategie-s4hana-2026": "architecture",
  "conseil-sap-independant-choisir-partenaire": "methodology",
  "consultant-sap-independant-vs-esn": "trends",
  "cybersecurite-sap-protection-production-2026": "basis",
  "fin-support-ecc-2027-plan-action": "trends",
  "fiori-adoption-reussir-ux-sap": "methodology",
  "integration-suite-vs-mulesoft-boomi-sap": "architecture",
  "migration-ecc6-s4hana-erreurs-eviter": "migration",
  "rise-with-sap-pricing-reel-2026": "cloud",
  "sap-basis-tuning-performance-production": "basis",
};

const files = await fs.readdir(blogDir);
let touched = 0;

for (const file of files.filter((f) => f.endsWith(".json"))) {
  const slug = file.replace(".json", "");
  const filepath = path.join(blogDir, file);
  const data = JSON.parse(await fs.readFile(filepath, "utf-8"));
  if (data.category) continue;
  const category = SLUG_CATEGORIES[slug] ?? "trends";
  data.category = category;
  await fs.writeFile(filepath, JSON.stringify(data, null, 2) + "\n", "utf-8");
  console.log(`  ${slug}: category=${category}`);
  touched++;
}
console.log(`\nBackfilled ${touched} articles`);
