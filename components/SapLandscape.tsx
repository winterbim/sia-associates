"use client";

import { useState } from "react";

// A real, explanatory SAP landscape diagram.
// Left column = legacy / on-prem origin. Middle = the SIA methodology path
// (4 Activate phases). Right = the target state: S/4HANA + BTP + Fiori + RISE.
// Hover any block to read what it means in plain language.

type Block = {
  id: string;
  row: 0 | 1 | 2 | 3;
  col: 0 | 1 | 2;
  label: string;
  sub: string;
  tooltip: string;
  tone: "legacy" | "method" | "target" | "runtime";
};

const BLOCKS: Block[] = [
  // LEFT — état initial
  {
    id: "ecc",
    row: 0,
    col: 0,
    label: "SAP ECC 6.0",
    sub: "EHP 6 → 8",
    tooltip:
      "Votre ERP historique. Support SAP standard jusqu'à fin 2027, étendu payant jusqu'en 2030.",
    tone: "legacy",
  },
  {
    id: "zcode",
    row: 1,
    col: 0,
    label: "Code Z custom",
    sub: "BAdI, user exits, mods",
    tooltip:
      "Le patrimoine spécifique accumulé en 10–15 ans. Doit être audité, classé, et migré vers des extensions propres.",
    tone: "legacy",
  },
  {
    id: "interfaces",
    row: 2,
    col: 0,
    label: "Interfaces héritées",
    sub: "IDoc, RFC, flat files",
    tooltip:
      "Connexions vers les systèmes satellites (CRM, WMS, BI, paie…). À rationaliser via Integration Suite.",
    tone: "legacy",
  },

  // MIDDLE — méthodologie (SAP Activate adapté)
  {
    id: "discover",
    row: 0,
    col: 1,
    label: "01 · Discover",
    sub: "Audit & Readiness Check",
    tooltip:
      "Cartographie complète : code custom, interfaces, processus, écarts standard. Livrable : plan de remédiation chiffré.",
    tone: "method",
  },
  {
    id: "prepare",
    row: 1,
    col: 1,
    label: "02 · Prepare",
    sub: "Clean Core & sandbox",
    tooltip:
      "Élimination des obsolètes, mise en place d'un bac à sable S/4HANA, préparation des équipes. Quick wins sur 3 mois.",
    tone: "method",
  },
  {
    id: "explore",
    row: 2,
    col: 1,
    label: "03 · Explore",
    sub: "Fit-to-Standard",
    tooltip:
      "Chaque écart métier est arbitré : standard, extension BTP, ou Key User. Gouvernance partagée métier / IT.",
    tone: "method",
  },
  {
    id: "realize",
    row: 3,
    col: 1,
    label: "04 · Realize / Deploy",
    sub: "Build · Test · Go-Live",
    tooltip:
      "Conversion ou greenfield, tests de non-régression, bascule, hypercare. Pilotage jusqu'à stabilisation N+90j.",
    tone: "method",
  },

  // RIGHT — cible
  {
    id: "s4core",
    row: 0,
    col: 2,
    label: "S/4HANA Core",
    sub: "Clean, sans mods",
    tooltip:
      "Le nouveau noyau ERP. Aucune modification directe du standard : la clé pour bénéficier des mises à jour trimestrielles.",
    tone: "target",
  },
  {
    id: "btp",
    row: 1,
    col: 2,
    label: "SAP BTP",
    sub: "Extensions side-by-side",
    tooltip:
      "La plateforme pour tous les développements spécifiques. RAP, CAP, Build, Integration Suite, IA Joule.",
    tone: "target",
  },
  {
    id: "fiori",
    row: 2,
    col: 2,
    label: "Fiori / UX",
    sub: "Launchpad & rôles",
    tooltip:
      "L'expérience utilisateur moderne. Applications orientées tâche, adoption mesurable, moins de formation.",
    tone: "target",
  },
  {
    id: "rise",
    row: 3,
    col: 2,
    label: "RISE / Grow",
    sub: "Cloud souverain ou hyperscaler",
    tooltip:
      "Le modèle d'exploitation : RISE (managed), Grow (cloud public), ou hybride selon contraintes réglementaires et souveraineté.",
    tone: "target",
  },
];

const LINKS: Array<{ from: string; to: string; strength: 1 | 2 | 3 }> = [
  // legacy → method
  { from: "ecc", to: "discover", strength: 3 },
  { from: "zcode", to: "discover", strength: 2 },
  { from: "zcode", to: "prepare", strength: 3 },
  { from: "interfaces", to: "explore", strength: 2 },
  // method → method (flux interne)
  { from: "discover", to: "prepare", strength: 3 },
  { from: "prepare", to: "explore", strength: 3 },
  { from: "explore", to: "realize", strength: 3 },
  // method → target
  { from: "realize", to: "s4core", strength: 3 },
  { from: "realize", to: "btp", strength: 2 },
  { from: "realize", to: "fiori", strength: 2 },
  { from: "realize", to: "rise", strength: 2 },
];

// Grid geometry
const COL_X: readonly [number, number, number] = [40, 340, 640];
const ROW_Y: readonly [number, number, number, number] = [40, 130, 220, 310];
const BLOCK_W = 220;
const BLOCK_H = 64;
const VIEW_W = 900;
const VIEW_H = 420;

function blockAt(id: string) {
  return BLOCKS.find((b) => b.id === id);
}

function linkPath(fromId: string, toId: string): string {
  const a = blockAt(fromId);
  const b = blockAt(toId);
  if (!a || !b) return "";
  const sx = COL_X[a.col] + BLOCK_W;
  const sy = ROW_Y[a.row] + BLOCK_H / 2;
  const tx = COL_X[b.col];
  const ty = ROW_Y[b.row] + BLOCK_H / 2;
  const mx = (sx + tx) / 2;
  return `M${sx},${sy} C${mx},${sy} ${mx},${ty} ${tx},${ty}`;
}

const TONE_STYLE = {
  legacy: {
    fill: "#1a1f27",
    stroke: "rgba(168,162,154,0.35)",
    label: "#D8CFBF",
    sub: "#8F8A80",
  },
  method: {
    fill: "#12161c",
    stroke: "rgba(200,162,75,0.55)",
    label: "#F4EFE6",
    sub: "#C8A24B",
  },
  target: {
    fill: "#1a1f27",
    stroke: "rgba(200,162,75,0.35)",
    label: "#F4EFE6",
    sub: "#B8923B",
  },
  runtime: {
    fill: "#1a1f27",
    stroke: "rgba(107,31,42,0.55)",
    label: "#F4EFE6",
    sub: "#6B1F2A",
  },
} as const;

export function SapLandscape({ className }: { className?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredBlock = hovered ? blockAt(hovered) : null;

  return (
    <div className={className}>
      {/* Column legends */}
      <div className="mb-4 grid grid-cols-3 gap-4 px-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-kicker text-ash-light">
            01 · Point de départ
          </p>
          <p className="mt-1 text-sm text-ink/70">
            Ce que vous avez aujourd&apos;hui
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-kicker text-gold">
            02 · Méthode SIA
          </p>
          <p className="mt-1 text-sm text-ink/70">
            Les 4 phases, jalonnées, mesurables
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-kicker text-ash-light">
            03 · Cible 2027+
          </p>
          <p className="mt-1 text-sm text-ink/70">
            Un paysage SAP propre et évolutif
          </p>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full"
        role="img"
        aria-label="Landscape SAP : transition ECC vers S/4HANA via la méthode SIA Associates"
      >
        <defs>
          <linearGradient id="link-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8A24B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C8A24B" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Links */}
        {LINKS.map((l, i) => {
          const isActive =
            hovered && (hovered === l.from || hovered === l.to);
          return (
            <path
              key={`${l.from}-${l.to}-${i}`}
              d={linkPath(l.from, l.to)}
              fill="none"
              stroke={isActive ? "#C8A24B" : "url(#link-grad)"}
              strokeWidth={l.strength}
              opacity={hovered ? (isActive ? 0.9 : 0.15) : 0.4}
              style={{ transition: "opacity .25s ease, stroke .25s ease" }}
            />
          );
        })}

        {/* Blocks */}
        {BLOCKS.map((b) => {
          const x = COL_X[b.col];
          const y = ROW_Y[b.row];
          const style = TONE_STYLE[b.tone];
          const isHovered = hovered === b.id;
          return (
            <g
              key={b.id}
              onMouseEnter={() => setHovered(b.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(b.id)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              style={{ cursor: "pointer", outline: "none" }}
            >
              <rect
                x={x}
                y={y}
                width={BLOCK_W}
                height={BLOCK_H}
                rx={4}
                fill={style.fill}
                stroke={isHovered ? "#C8A24B" : style.stroke}
                strokeWidth={isHovered ? 1.5 : 1}
                style={{ transition: "stroke .2s ease, stroke-width .2s ease" }}
              />
              <text
                x={x + 16}
                y={y + 26}
                fill={style.label}
                fontSize={13}
                fontWeight={600}
                fontFamily="var(--font-sans), sans-serif"
              >
                {b.label}
              </text>
              <text
                x={x + 16}
                y={y + 46}
                fill={style.sub}
                fontSize={10.5}
                fontFamily="var(--font-mono), monospace"
                letterSpacing="0.03em"
              >
                {b.sub}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Live tooltip — readable, not decorative */}
      <div className="mt-4 min-h-[72px] rounded-sm border border-hairline bg-white/60 p-4">
        {hoveredBlock ? (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-kicker text-gold">
              {hoveredBlock.label} · {hoveredBlock.sub}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink/85">
              {hoveredBlock.tooltip}
            </p>
          </div>
        ) : (
          <p className="font-mono text-xs text-ash">
            Survolez un bloc pour lire ce qu&apos;il signifie dans votre
            contexte SAP.
          </p>
        )}
      </div>
    </div>
  );
}
