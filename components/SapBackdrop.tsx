"use client";

import { useEffect, useRef, useState } from "react";

// A semantic, low-noise backdrop for dark SAP-themed sections.
// Three layers, each carrying meaning:
//   1. A slow column of real SAP transaction codes / technical artifacts
//      drifting upward — reads as a monitoring terminal behind glass.
//   2. A tiny node-graph evoking a SAP landscape, nodes pulsing in sequence.
//   3. A bottom-right command line that types a real basis command every
//      few seconds, then clears.
// All three are strictly decorative, aria-hidden, and honor reduced-motion.

const TX_LINES = [
  "SM50  · WORK PROCESSES",
  "ST02  · TUNE BUFFER",
  "ST04  · HANA OVERVIEW",
  "DB02  · SPACE ANALYSIS",
  "RZ20  · CCMS MONITOR",
  "SMLG  · LOGON GROUPS",
  "STMS  · TRANSPORT MGMT",
  "SE80  · OBJECT NAVIGATOR",
  "CDS   · I_SALESORDER",
  "RAP   · BO BEHAVIOR",
  "BTP   · CF SPACE DEV",
  "FIORI · LAUNCHPAD GW",
  "HANA  · CS_SERVICE_REPL",
  "ATC   · CLOUD READINESS",
  "ADT   · ECLIPSE 2025-03",
  "SOLMAN· CHARM Q-GATE",
  "RISE  · SUBSCRIPTION TIER",
  "ABAP  · CLOUD TIER 1",
  "IDOC  · HRMD_A07",
  "XSUAA · ROLE COLLECTION",
  "JOULE · CO-PILOT READY",
  "GCTS  · BRANCH MAIN",
];

const NODES: Array<{ x: number; y: number; label: string }> = [
  { x: 12, y: 40, label: "ECC" },
  { x: 38, y: 22, label: "BW" },
  { x: 38, y: 62, label: "PI" },
  { x: 68, y: 30, label: "S/4" },
  { x: 68, y: 70, label: "BTP" },
  { x: 90, y: 50, label: "RISE" },
];

const EDGES: Array<[number, number]> = [
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5],
];

const COMMANDS = [
  "basis@prod:~$ sapcontrol -nr 00 -function GetProcessList",
  "basis@prod:~$ hdbsql -i 90 -u SYSTEM 'SELECT * FROM M_SERVICES'",
  "basis@prod:~$ cf login -a https://api.cf.eu10.hana.ondemand.com",
  "abap@s4h:~$ atc run -o check_variant=SAP_CLOUD_PLATFORM_DEFAULT",
  "basis@prod:~$ tp import ALL DEV client=100 u1",
];

export function SapBackdrop({ className = "" }: { className?: string }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cmd, setCmd] = useState("");
  const [pulseIdx, setPulseIdx] = useState(0);
  const driftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Terminal typing animation
  useEffect(() => {
    if (reducedMotion) {
      setCmd(COMMANDS[0] ?? "");
      return;
    }
    let cancelled = false;
    let t: ReturnType<typeof setTimeout>;

    const run = async (which: number) => {
      const full = COMMANDS[which % COMMANDS.length] ?? "";
      setCmd("");
      // type
      for (let i = 1; i <= full.length; i++) {
        if (cancelled) return;
        setCmd(full.slice(0, i));
        await new Promise((r) => {
          t = setTimeout(r, 28 + Math.random() * 35);
        });
      }
      // hold, then clear
      await new Promise((r) => {
        t = setTimeout(r, 2800);
      });
      if (cancelled) return;
      // erase
      for (let i = full.length; i >= 0; i--) {
        if (cancelled) return;
        setCmd(full.slice(0, i));
        await new Promise((r) => {
          t = setTimeout(r, 10);
        });
      }
      await new Promise((r) => {
        t = setTimeout(r, 500);
      });
      if (!cancelled) run(which + 1);
    };

    run(0);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [reducedMotion]);

  // Landscape node pulse
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      setPulseIdx((i) => (i + 1) % NODES.length);
    }, 1400);
    return () => clearInterval(id);
  }, [reducedMotion]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Layer 1 — drifting transaction-code column, right side */}
      <div
        ref={driftRef}
        className="absolute inset-y-0 right-0 hidden w-[22rem] select-none overflow-hidden md:block"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        }}
      >
        <div
          className="flex flex-col gap-3 pl-10 pr-6 font-mono text-[11px] uppercase tracking-[0.18em] text-gold/25"
          style={{
            animation: reducedMotion
              ? "none"
              : "sap-backdrop-drift 65s linear infinite",
          }}
        >
          {[...TX_LINES, ...TX_LINES].map((l, i) => (
            <span key={`${l}-${i}`} className="whitespace-nowrap">
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Layer 2 — mini SAP landscape node-graph, left side */}
      <svg
        className="absolute left-0 top-1/2 hidden h-[300px] w-[420px] -translate-y-1/2 opacity-[0.22] lg:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {EDGES.map(([a, b], i) => {
          const na = NODES[a];
          const nb = NODES[b];
          if (!na || !nb) return null;
          const active = pulseIdx === a || pulseIdx === b;
          return (
            <line
              key={`e-${i}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="#C8A24B"
              strokeWidth={active ? 0.35 : 0.18}
              opacity={active ? 0.85 : 0.4}
              style={{ transition: "all .6s ease" }}
            />
          );
        })}
        {NODES.map((n, i) => {
          const active = pulseIdx === i;
          return (
            <g key={`n-${i}`}>
              <circle
                cx={n.x}
                cy={n.y}
                r={active ? 1.8 : 1.1}
                fill="#C8A24B"
                opacity={active ? 1 : 0.55}
                style={{ transition: "all .6s ease" }}
              />
              {active && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={3.2}
                  fill="none"
                  stroke="#C8A24B"
                  strokeWidth={0.18}
                  opacity={0.6}
                >
                  <animate
                    attributeName="r"
                    values="1.5;5;1.5"
                    dur="1.4s"
                    repeatCount="1"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.7;0;0.7"
                    dur="1.4s"
                    repeatCount="1"
                  />
                </circle>
              )}
              <text
                x={n.x + 2.8}
                y={n.y + 0.8}
                fontSize={2.2}
                fontFamily="var(--font-mono), monospace"
                fill="#C8A24B"
                opacity={active ? 0.95 : 0.55}
                style={{ transition: "opacity .6s ease" }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Layer 3 — terminal line, bottom-right */}
      <div className="absolute bottom-6 right-6 hidden max-w-[90vw] md:block">
        <div className="flex items-baseline gap-2 font-mono text-[11px] text-gold/50">
          <span className="text-gold/80">▍</span>
          <span className="whitespace-nowrap">{cmd}</span>
          <span
            className="inline-block w-[6px] bg-gold/70"
            style={{
              height: "12px",
              animation: reducedMotion
                ? "none"
                : "sap-backdrop-blink 1.1s steps(2) infinite",
            }}
          />
        </div>
      </div>

      {/* scoped keyframes */}
      <style jsx>{`
        @keyframes sap-backdrop-drift {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes sap-backdrop-blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
