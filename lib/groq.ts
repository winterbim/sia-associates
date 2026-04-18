const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function generateWithGroq(
  messages: GroqMessage[],
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: options?.maxTokens ?? 4000,
      temperature: options?.temperature ?? 0.7,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Groq API error: ${res.status} — ${error}`);
  }

  const data = (await res.json()) as GroqResponse;
  const content = data.choices[0]?.message.content;
  if (!content) throw new Error("Empty response from Groq");
  return content;
}

export async function generateArticle(topic: string): Promise<{
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  readingTime: number;
}> {
  const systemPrompt = `Tu es un expert SAP senior avec 19+ ans d'experience. Tu rediges des articles techniques approfondis pour le blog de SIA Associates, cabinet de conseil SAP independant fonde par Amine Silemane.

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

  const content = await generateWithGroq([
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content: `Redige un article de blog technique sur le sujet suivant : "${topic}". L'article doit etre utile pour un DSI ou directeur de programme SAP. Reponds UNIQUEMENT en JSON valide.`,
    },
  ], { maxTokens: 4000, temperature: 0.75 });

  // Parse JSON from response (handle potential markdown wrapping)
  let jsonStr = content.trim();
  if (jsonStr.startsWith("```json")) {
    jsonStr = jsonStr.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  const parsed = JSON.parse(jsonStr) as {
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    readingTime: number;
  };

  return parsed;
}

export async function generateArticleImage(title: string): Promise<string> {
  // Generate an SVG illustration based on the article title
  // Uses deterministic colors from the title hash for consistency
  const hash = title.split("").reduce((acc, char) => {
    return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
  }, 0);

  const hue = Math.abs(hash % 40) + 30; // Gold range
  const patterns = [
    "circuit", "flow", "grid", "nodes", "layers",
  ];
  const pattern = patterns[Math.abs(hash) % patterns.length] ?? "circuit";

  return generateSvgCover(pattern, hue, title);
}

function generateSvgCover(pattern: string, _hue: number, title: string): string {
  const gold = "#C8A24B";
  const ink = "#0A0E12";

  let patternSvg = "";

  if (pattern === "circuit") {
    patternSvg = `
      <path d="M100,50 L200,50 L200,150 L300,150" stroke="${gold}" stroke-width="2" fill="none" opacity="0.3"/>
      <path d="M400,80 L500,80 L500,200 L600,200" stroke="${gold}" stroke-width="1.5" fill="none" opacity="0.2"/>
      <path d="M150,250 L250,250 L250,180 L400,180" stroke="${gold}" stroke-width="1" fill="none" opacity="0.25"/>
      <circle cx="200" cy="50" r="4" fill="${gold}" opacity="0.5"/>
      <circle cx="300" cy="150" r="4" fill="${gold}" opacity="0.5"/>
      <circle cx="500" cy="80" r="3" fill="${gold}" opacity="0.4"/>
      <circle cx="600" cy="200" r="3" fill="${gold}" opacity="0.4"/>
      <circle cx="250" cy="250" r="3" fill="${gold}" opacity="0.3"/>
    `;
  } else if (pattern === "flow") {
    patternSvg = `
      <path d="M0,150 C150,100 300,200 450,150 C600,100 750,200 900,150" stroke="${gold}" stroke-width="2" fill="none" opacity="0.2" stroke-dasharray="8 4"/>
      <path d="M0,200 C200,150 400,250 600,200 C800,150 900,250 900,200" stroke="${gold}" stroke-width="1.5" fill="none" opacity="0.15"/>
      <path d="M50,100 C200,50 350,150 500,100" stroke="${gold}" stroke-width="1" fill="none" opacity="0.2"/>
    `;
  } else if (pattern === "grid") {
    patternSvg = `
      <line x1="150" y1="50" x2="150" y2="280" stroke="${gold}" stroke-width="0.5" opacity="0.15"/>
      <line x1="300" y1="50" x2="300" y2="280" stroke="${gold}" stroke-width="0.5" opacity="0.15"/>
      <line x1="450" y1="50" x2="450" y2="280" stroke="${gold}" stroke-width="0.5" opacity="0.15"/>
      <line x1="600" y1="50" x2="600" y2="280" stroke="${gold}" stroke-width="0.5" opacity="0.15"/>
      <line x1="50" y1="100" x2="750" y2="100" stroke="${gold}" stroke-width="0.5" opacity="0.15"/>
      <line x1="50" y1="200" x2="750" y2="200" stroke="${gold}" stroke-width="0.5" opacity="0.15"/>
      <rect x="145" y="95" width="10" height="10" fill="${gold}" opacity="0.3" rx="2"/>
      <rect x="295" y="195" width="10" height="10" fill="${gold}" opacity="0.3" rx="2"/>
      <rect x="445" y="95" width="10" height="10" fill="${gold}" opacity="0.3" rx="2"/>
    `;
  } else if (pattern === "nodes") {
    patternSvg = `
      <circle cx="200" cy="100" r="30" stroke="${gold}" stroke-width="1" fill="none" opacity="0.2"/>
      <circle cx="500" cy="150" r="25" stroke="${gold}" stroke-width="1" fill="none" opacity="0.15"/>
      <circle cx="350" cy="250" r="20" stroke="${gold}" stroke-width="1" fill="none" opacity="0.2"/>
      <line x1="230" y1="100" x2="475" y2="150" stroke="${gold}" stroke-width="0.8" opacity="0.15"/>
      <line x1="500" y1="175" x2="370" y2="250" stroke="${gold}" stroke-width="0.8" opacity="0.15"/>
      <line x1="220" y1="125" x2="335" y2="235" stroke="${gold}" stroke-width="0.8" opacity="0.15"/>
      <circle cx="200" cy="100" r="4" fill="${gold}" opacity="0.4"/>
      <circle cx="500" cy="150" r="4" fill="${gold}" opacity="0.4"/>
      <circle cx="350" cy="250" r="4" fill="${gold}" opacity="0.4"/>
    `;
  } else {
    patternSvg = `
      <rect x="100" y="80" width="200" height="60" rx="4" stroke="${gold}" stroke-width="1" fill="none" opacity="0.2"/>
      <rect x="400" y="120" width="200" height="60" rx="4" stroke="${gold}" stroke-width="1" fill="none" opacity="0.15"/>
      <rect x="250" y="200" width="200" height="60" rx="4" stroke="${gold}" stroke-width="1" fill="none" opacity="0.2"/>
      <path d="M300,110 L400,150" stroke="${gold}" stroke-width="1" opacity="0.2"/>
      <path d="M450,180 L350,200" stroke="${gold}" stroke-width="1" opacity="0.2"/>
    `;
  }

  // Truncate title for SVG display
  const displayTitle = title.length > 50 ? title.substring(0, 47) + "..." : title;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" fill="none">
  <rect width="800" height="320" fill="${ink}"/>
  ${patternSvg}
  <text x="400" y="290" text-anchor="middle" font-family="Georgia, serif" font-size="12" fill="${gold}" opacity="0.5">SIA ASSOCIATES · BLOG</text>
  <text x="400" y="160" text-anchor="middle" font-family="Georgia, serif" font-size="16" fill="#F4EFE6" opacity="0.8">${escapeXml(displayTitle)}</text>
</svg>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
