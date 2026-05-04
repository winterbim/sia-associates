"use client";

import { Compass, Route, Wrench, Cloud, ShieldCheck, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Expertise blueprint — a five-pillar visual map.
// Architecture → Pilotage → Exploitation → Cloud run horizontally as the
// project timeline. Cybersécurité sits as a transverse layer because it
// cuts across every phase of the SAP lifecycle.
// Hover a pillar to highlight it; the timeline animates a pulse.

type Pillar = {
  id: string;
  num: string;
  title: string;
  short: string;
  href: string;
  icon: LucideIcon;
};

const TIMELINE: Pillar[] = [
  {
    id: "architecture",
    num: "01",
    title: "Architecture",
    short: "Concevoir le paysage cible",
    href: "/expertise#architecture",
    icon: Compass,
  },
  {
    id: "pilotage",
    num: "02",
    title: "Pilotage",
    short: "Du cadrage au Go-Live",
    href: "/expertise#pilotage",
    icon: Route,
  },
  {
    id: "exploitation",
    num: "03",
    title: "Exploitation",
    short: "Run ops, N2/N3",
    href: "/expertise#exploitation",
    icon: Wrench,
  },
  {
    id: "cloud",
    num: "04",
    title: "Cloud",
    short: "RISE, Grow, IaaS souverain",
    href: "/expertise#cloud",
    icon: Cloud,
  },
];

const CYBER: Pillar = {
  id: "cybersecurite",
  num: "05",
  title: "Cybersécurité",
  short: "Transverse à tous les piliers",
  href: "/expertise#cybersecurite",
  icon: ShieldCheck,
};

export function ExpertiseBlueprint() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-2 md:flex-row md:items-end">
        <div>
          <p className="kicker">Blueprint · cycle de vie SAP</p>
          <h2 className="display-heading mt-2 text-2xl text-ink md:text-[32px]">
            Comment les cinq piliers{" "}
            <em className="not-italic text-oxblood">s&apos;articulent</em>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-graphite">
          Le cœur du projet suit une trajectoire linéaire. La
          cybersécurité, elle, traverse chaque étape — de la conception
          à la production.
        </p>
      </div>

      {/* Desktop blueprint */}
      <div className="hidden lg:block">
        <svg
          viewBox="0 0 1100 360"
          className="w-full"
          role="img"
          aria-label="Diagramme des cinq piliers d'expertise SAP"
        >
          <defs>
            <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C8A24B" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#C8A24B" stopOpacity="1" />
              <stop offset="100%" stopColor="#6B1F2A" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6B1F2A" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#6B1F2A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6B1F2A" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Background grid — blueprint paper */}
          <g opacity="0.08">
            {Array.from({ length: 22 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 50}
                y1={0}
                x2={i * 50}
                y2={360}
                stroke="#0F1318"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={i * 45}
                x2={1100}
                y2={i * 45}
                stroke="#0F1318"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* Client start node */}
          <g>
            <circle cx="50" cy="160" r="5" fill="#0F1318" />
            <text
              x="50"
              y="140"
              fontSize="10"
              fontFamily="var(--font-mono), monospace"
              fill="#6E6A62"
              textAnchor="middle"
              style={{ letterSpacing: "0.14em" }}
            >
              BESOIN CLIENT
            </text>
          </g>

          {/* Main horizontal flow line */}
          <path
            d="M55,160 L1040,160"
            stroke="url(#flow-grad)"
            strokeWidth="2"
            fill="none"
          />

          {/* Outcome node */}
          <g>
            <circle cx="1050" cy="160" r="6" fill="#6B1F2A" />
            <circle cx="1050" cy="160" r="11" fill="none" stroke="#6B1F2A" strokeOpacity="0.3" strokeWidth="1" />
            <text
              x="1050"
              y="140"
              fontSize="10"
              fontFamily="var(--font-mono), monospace"
              fill="#6B1F2A"
              textAnchor="middle"
              fontWeight="600"
              style={{ letterSpacing: "0.14em" }}
            >
              VOTRE SAP
            </text>
          </g>

          {/* Four linear pillars */}
          {TIMELINE.map((p, i) => {
            const x = 180 + i * 210;
            const isActive = hovered === p.id;
            return (
              <g
                key={p.id}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {/* connector from timeline up to block */}
                <line
                  x1={x}
                  y1={160}
                  x2={x}
                  y2={100}
                  stroke={isActive ? "#6B1F2A" : "#C8A24B"}
                  strokeWidth={isActive ? 2 : 1}
                  opacity={isActive ? 0.9 : 0.55}
                  style={{ transition: "all .25s ease" }}
                />
                {/* block */}
                <rect
                  x={x - 75}
                  y={40}
                  width={150}
                  height={60}
                  rx={2}
                  fill="#FFFFFF"
                  stroke={isActive ? "#6B1F2A" : "#E5DED0"}
                  strokeWidth={isActive ? 1.5 : 1}
                  style={{ transition: "stroke .25s ease" }}
                />
                {/* num */}
                <text
                  x={x - 64}
                  y={58}
                  fontSize="9"
                  fontFamily="var(--font-mono), monospace"
                  fill={isActive ? "#6B1F2A" : "#C8A24B"}
                  style={{ letterSpacing: "0.14em", transition: "fill .25s ease" }}
                >
                  {p.num}
                </text>
                {/* title */}
                <text
                  x={x - 64}
                  y={76}
                  fontSize="15"
                  fontFamily="var(--font-display), sans-serif"
                  fontWeight="600"
                  fill="#0F1318"
                >
                  {p.title}
                </text>
                {/* short */}
                <text
                  x={x - 64}
                  y={92}
                  fontSize="10.5"
                  fontFamily="var(--font-sans), sans-serif"
                  fill="#6E6A62"
                >
                  {p.short}
                </text>
                {/* tick on timeline */}
                <circle
                  cx={x}
                  cy={160}
                  r={isActive ? 6 : 4}
                  fill={isActive ? "#6B1F2A" : "#C8A24B"}
                  style={{ transition: "all .25s ease" }}
                />
              </g>
            );
          })}

          {/* Transverse cybersecurity layer */}
          <g
            onMouseEnter={() => setHovered(CYBER.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          >
            {/* Transverse horizontal band label */}
            <text
              x="30"
              y="240"
              fontSize="10"
              fontFamily="var(--font-mono), monospace"
              fill="#6B1F2A"
              style={{ letterSpacing: "0.14em" }}
            >
              05 · TRANSVERSE
            </text>
            {/* Transverse band */}
            <rect
              x="50"
              y="250"
              width="1000"
              height="52"
              fill="#6B1F2A"
              fillOpacity={hovered === CYBER.id ? "0.08" : "0.04"}
              stroke="url(#cyber-grad)"
              strokeWidth="1"
              style={{ transition: "fill-opacity .25s ease" }}
            />
            {/* Dashed connectors from each pillar down to the band */}
            {TIMELINE.map((_, i) => {
              const x = 180 + i * 210;
              return (
                <line
                  key={`cyber-${i}`}
                  x1={x}
                  y1={164}
                  x2={x}
                  y2={250}
                  stroke="#6B1F2A"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                  opacity={hovered === CYBER.id ? 0.8 : 0.3}
                  style={{ transition: "opacity .25s ease" }}
                />
              );
            })}
            {/* Cyber content */}
            <g transform="translate(70, 276)">
              <rect x="0" y="-8" width="28" height="28" rx="2" fill="#6B1F2A" />
              <g transform="translate(6, -2)" stroke="#F4EFE6" strokeWidth="1.5" fill="none">
                <path d="M8,0 L8,4 L14,4 C14,12 10,15 8,16 C6,15 2,12 2,4 L8,4 Z" />
              </g>
              <text
                x="44"
                y="2"
                fontSize="15"
                fontFamily="var(--font-display), sans-serif"
                fontWeight="600"
                fill="#0F1318"
              >
                Cybersécurité SAP
              </text>
              <text
                x="44"
                y="18"
                fontSize="11"
                fontFamily="var(--font-sans), sans-serif"
                fill="#6E6A62"
              >
                SSO · IAM · Security Notes · Audit RGPD · durcissement interfaces
              </text>
            </g>
            <text
              x="1040"
              y="282"
              fontSize="10"
              fontFamily="var(--font-mono), monospace"
              fill="#6B1F2A"
              textAnchor="end"
              style={{ letterSpacing: "0.1em" }}
            >
              INTÉGRITÉ · CONFIDENTIALITÉ · CONFORMITÉ
            </text>
          </g>
        </svg>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ash">
          <span className="flex items-center gap-2">
            <span className="h-px w-5 bg-gold" />
            flux projet
          </span>
          <span className="flex items-center gap-2">
            <span className="h-px w-5 border-t border-dashed border-oxblood" />
            couverture cybersécurité
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-oxblood" />
            cible
          </span>
        </div>
      </div>

      {/* Mobile fallback — compact list */}
      <ul className="flex flex-col gap-3 lg:hidden">
        {[...TIMELINE, CYBER].map((p) => {
          const Icon = p.icon;
          return (
            <li key={p.id}>
              <Link
                href={p.href}
                className="group flex items-start gap-4 border border-hairline bg-white p-4 transition-colors duration-200 hover:border-oxblood"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-ink text-bone">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-oxblood">
                      {p.num}
                    </p>
                  </div>
                  <h3 className="mt-1 font-display text-base font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-graphite">{p.short}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
