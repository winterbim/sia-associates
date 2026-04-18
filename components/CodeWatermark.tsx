"use client";

import { useEffect, useRef, useState } from "react";

// HUD-style live ABAP panel — the hero's dynamic backdrop.
// Desktop-only (>=1280px). Framed with corner marks, label bar,
// record dot, CRT scan line, and IDE gutter line numbers.

const LINES: Array<Array<{ tone: "comment" | "keyword" | "ident" | "string" | "default"; text: string }>> = [
  [{ tone: "comment", text: "* Clean Core audit — only released APIs called here" }],
  [
    { tone: "keyword", text: "CLASS" },
    { tone: "default", text: " " },
    { tone: "ident", text: "zcl_migration_runner" },
    { tone: "default", text: " " },
    { tone: "keyword", text: "DEFINITION" },
    { tone: "default", text: " " },
    { tone: "keyword", text: "FINAL" },
    { tone: "default", text: "." },
  ],
  [
    { tone: "default", text: "  " },
    { tone: "keyword", text: "PUBLIC SECTION" },
    { tone: "default", text: "." },
  ],
  [
    { tone: "default", text: "    " },
    { tone: "keyword", text: "INTERFACES" },
    { tone: "default", text: " if_oo_adt_classrun." },
  ],
  [
    { tone: "default", text: "    " },
    { tone: "keyword", text: "METHODS" },
    { tone: "default", text: " run_check " },
    { tone: "keyword", text: "IMPORTING" },
    { tone: "default", text: " iv_system " },
    { tone: "keyword", text: "TYPE" },
    { tone: "default", text: " sy-sysid." },
  ],
  [{ tone: "keyword", text: "ENDCLASS" }, { tone: "default", text: "." }],
  [],
  [{ tone: "comment", text: "-- CDS view: sales orders since cutoff" }],
  [
    { tone: "keyword", text: "SELECT" },
    { tone: "default", text: " so_id, currency_code, total_amount" },
  ],
  [
    { tone: "default", text: "  " },
    { tone: "keyword", text: "FROM" },
    { tone: "default", text: " " },
    { tone: "ident", text: "I_SalesOrder" },
  ],
  [
    { tone: "default", text: "  " },
    { tone: "keyword", text: "WHERE" },
    { tone: "default", text: " creation_date >= " },
    { tone: "string", text: "@iv_cutoff" },
  ],
  [
    { tone: "default", text: "  " },
    { tone: "keyword", text: "INTO TABLE" },
    { tone: "default", text: " @" },
    { tone: "ident", text: "DATA" },
    { tone: "default", text: "(lt_orders)." },
  ],
  [],
  [{ tone: "comment", text: "# btp.yaml — side-by-side extension manifest" }],
  [{ tone: "ident", text: "service" }, { tone: "default", text: ": xsuaa" }],
  [{ tone: "ident", text: "plan" }, { tone: "default", text: ": application" }],
  [{ tone: "ident", text: "parameters" }, { tone: "default", text: ":" }],
  [
    { tone: "default", text: "  " },
    { tone: "ident", text: "tenant-mode" },
    { tone: "default", text: ": shared" },
  ],
  [],
  [{ tone: "comment", text: "** Work process tuning — production SAP Basis" }],
  [{ tone: "keyword", text: "PARAMETERS" }, { tone: "default", text: " rdisp/wp_no_dia = 24" }],
  [{ tone: "keyword", text: "PARAMETERS" }, { tone: "default", text: " rdisp/wp_no_btc = 12" }],
  [{ tone: "keyword", text: "PARAMETERS" }, { tone: "default", text: " abap/heap_area_total = 8G" }],
];

const TONE_COLOR: Record<"comment" | "keyword" | "ident" | "string" | "default", string> = {
  comment: "#6E6A62",
  keyword: "#C8A24B",
  ident: "#D8CFBF",
  string: "#6B1F2A",
  default: "#A8A29A",
};

type Segment = { tone: keyof typeof TONE_COLOR; text: string };
type TypedLine = { full: Segment[]; typedChars: number };

function segmentsUpTo(full: Segment[], upto: number): Segment[] {
  const out: Segment[] = [];
  let remaining = upto;
  for (const seg of full) {
    if (remaining <= 0) break;
    if (seg.text.length <= remaining) {
      out.push(seg);
      remaining -= seg.text.length;
    } else {
      out.push({ tone: seg.tone, text: seg.text.slice(0, remaining) });
      remaining = 0;
    }
  }
  return out;
}

function lineLen(segs: Segment[]) {
  return segs.reduce((n, s) => n + s.text.length, 0);
}

const VISIBLE = 13;
const TYPE_MS = 30;
const LINE_PAUSE = 420;
const LOOP_PAUSE = 1800;

export function CodeWatermark({ className = "" }: { className?: string }) {
  const [lines, setLines] = useState<TypedLine[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (!reducedMotion) return;
    setLines(
      LINES.slice(0, VISIBLE).map((l) => ({ full: l, typedChars: lineLen(l) }))
    );
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let idx = 0;
    let state: TypedLine[] = [];

    const setSafe = (next: TypedLine[]) => {
      if (!cancelled) setLines(next);
    };
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    async function run() {
      while (!cancelled) {
        const template = LINES[idx % LINES.length] ?? [];
        const total = lineLen(template);

        state = [...state, { full: template, typedChars: 0 }];
        if (state.length > VISIBLE) state = state.slice(-VISIBLE);
        setSafe(state);

        for (let c = 1; c <= total; c++) {
          if (cancelled) return;
          state = [
            ...state.slice(0, -1),
            { full: template, typedChars: c },
          ];
          setSafe(state);
          await sleep(TYPE_MS + Math.random() * 20);
        }
        await sleep(total === 0 ? 160 : LINE_PAUSE);
        idx++;
        if (idx % LINES.length === 0) await sleep(LOOP_PAUSE);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  const activeIdx = lines.length - 1;
  const startLineNumber = 1 + Math.max(0, lines.length - VISIBLE);

  return (
    <div
      aria-hidden
      className={`pointer-events-none relative mx-auto hidden w-full max-w-[52rem] select-none lg:block ${className}`}
    >
      {/* HUD frame */}
      <div className="relative border border-gold/35 bg-gradient-to-br from-ink/60 to-graphite/30 backdrop-blur-[1px]">
        {/* Corner marks */}
        <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-gold" />
        <span className="absolute -right-px -top-px h-2 w-2 border-r border-t border-gold" />
        <span className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-gold" />
        <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-gold" />

        {/* Label bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ash-light">
          <span>session://sap/adt · zcl_migration_runner</span>
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-oxblood"
              style={{ animation: reducedMotion ? undefined : "rec-pulse 1.6s ease-in-out infinite" }}
            />
            <span className="text-oxblood">REC</span>
          </span>
        </div>

        {/* CRT horizontal scan lines texture */}
        <div
          className="pointer-events-none absolute inset-x-0 top-8 bottom-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, #C8A24B 2px, #C8A24B 3px)",
          }}
        />

        {/* Slow vertical scan line */}
        {!reducedMotion && (
          <div
            className="pointer-events-none absolute inset-x-0 top-8 h-8"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(200,162,75,0.08) 50%, transparent 100%)",
              animation: "scan-move 6s linear infinite",
            }}
          />
        )}

        {/* Code body with gutter */}
        <div className="relative flex font-mono text-[12px] leading-[1.85]">
          {/* Line number gutter */}
          <div className="min-w-[2.4rem] select-none border-r border-white/8 bg-black/20 px-2 py-4 text-right text-[10px] text-ash/55">
            {lines.map((_, i) => (
              <div key={i}>
                {String(startLineNumber + i).padStart(2, "0")}
              </div>
            ))}
            {lines.length === 0 &&
              Array.from({ length: VISIBLE }).map((_, i) => (
                <div key={i} className="text-transparent">
                  00
                </div>
              ))}
          </div>

          {/* Code content */}
          <div className="flex-1 overflow-hidden px-4 py-4 text-[12px]">
            {lines.length === 0
              ? Array.from({ length: VISIBLE }).map((_, i) => (
                  <div key={i}>&nbsp;</div>
                ))
              : lines.map((ln, i) => {
                  const segs = segmentsUpTo(ln.full, ln.typedChars);
                  const isActive = i === activeIdx;
                  const isEmpty = ln.full.length === 0;
                  return (
                    <div key={i} className="whitespace-pre">
                      {segs.map((s, j) => (
                        <span key={j} style={{ color: TONE_COLOR[s.tone] }}>
                          {s.text}
                        </span>
                      ))}
                      {isActive && !reducedMotion && !isEmpty && (
                        <span
                          className="inline-block align-[-1px]"
                          style={{
                            width: "0.55em",
                            height: "1.05em",
                            background: "#C8A24B",
                            marginLeft: "1px",
                            animation: "code-caret 1.05s steps(2) infinite",
                          }}
                        />
                      )}
                      {isEmpty && "\u00A0"}
                    </div>
                  );
                })}
          </div>
        </div>

        {/* Footer bar */}
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-ash-light/70">
          <span>sap s/4hana · cloud tier 1</span>
          <span>abap ▸ cds ▸ btp</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes code-caret {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes rec-pulse {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes scan-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(420px); }
        }
      `}</style>
    </div>
  );
}
