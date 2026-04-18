"use client";

import { useEffect, useRef, useState } from "react";

// Live-typing ABAP / CDS / BTP code panel — the hero's dynamic backdrop.
// Real SAP snippets are typed out line by line like an ADT Eclipse
// session, with a blinking caret at the cursor. Static under
// prefers-reduced-motion.

const LINES: Array<Array<{ tone: "comment" | "keyword" | "ident" | "string" | "default"; text: string }>> = [
  [
    { tone: "comment", text: "* Clean Core audit — only released APIs called here" },
  ],
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
  [
    { tone: "keyword", text: "ENDCLASS" },
    { tone: "default", text: "." },
  ],
  [],
  [
    { tone: "comment", text: "-- CDS view: sales orders since cutoff" },
  ],
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
  [
    { tone: "comment", text: "# btp.yaml — side-by-side extension manifest" },
  ],
  [
    { tone: "ident", text: "service" },
    { tone: "default", text: ": xsuaa" },
  ],
  [
    { tone: "ident", text: "plan" },
    { tone: "default", text: ": application" },
  ],
  [
    { tone: "ident", text: "parameters" },
    { tone: "default", text: ":" },
  ],
  [
    { tone: "default", text: "  " },
    { tone: "ident", text: "tenant-mode" },
    { tone: "default", text: ": shared" },
  ],
  [],
  [
    { tone: "comment", text: "** Work process tuning — production SAP Basis" },
  ],
  [
    { tone: "keyword", text: "PARAMETERS" },
    { tone: "default", text: " rdisp/wp_no_dia = 24" },
  ],
  [
    { tone: "keyword", text: "PARAMETERS" },
    { tone: "default", text: " rdisp/wp_no_btc = 12" },
  ],
  [
    { tone: "keyword", text: "PARAMETERS" },
    { tone: "default", text: " abap/heap_area_total = 8G" },
  ],
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

// How many total chars so far → which segment + which char inside it
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

const VISIBLE = 14; // number of lines shown at once
const TYPE_MS = 28; // per char
const LINE_PAUSE = 420; // after a finished line
const LOOP_PAUSE = 1800; // when we finish the script

export function CodeWatermark({ className = "" }: { className?: string }) {
  const [lines, setLines] = useState<TypedLine[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Static fallback
  useEffect(() => {
    if (!reducedMotion) return;
    setLines(
      LINES.slice(0, VISIBLE).map((l) => ({ full: l, typedChars: lineLen(l) }))
    );
  }, [reducedMotion]);

  // Typing engine
  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let idx = 0;
    let state: TypedLine[] = [];

    const setSafe = (next: TypedLine[]) => {
      if (!cancelled) setLines(next);
    };

    const sleep = (ms: number) =>
      new Promise<void>((r) => setTimeout(r, ms));

    async function run() {
      while (!cancelled) {
        const template = LINES[idx % LINES.length] ?? [];
        const total = lineLen(template);

        // push empty line
        state = [...state, { full: template, typedChars: 0 }];
        if (state.length > VISIBLE) state = state.slice(-VISIBLE);
        setSafe(state);

        // type char by char
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

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[min(52rem,62%)] overflow-hidden opacity-[0.55] md:block ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 18%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 18%, black 92%, transparent 100%)",
      }}
    >
      <div
        ref={scrollRef}
        className="h-full overflow-hidden px-10 py-14 font-mono text-[13px] leading-[1.8] md:text-[14px] md:leading-[1.85]"
      >
        {lines.map((ln, i) => {
          const segs = segmentsUpTo(ln.full, ln.typedChars);
          const isActive = i === activeIdx;
          const isEmptyPlaceholder = ln.full.length === 0;
          return (
            <div key={i} className="whitespace-pre">
              {segs.map((s, j) => (
                <span key={j} style={{ color: TONE_COLOR[s.tone] }}>
                  {s.text}
                </span>
              ))}
              {isActive && !reducedMotion && !isEmptyPlaceholder && (
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
              {isEmptyPlaceholder && "\u00A0"}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @keyframes code-caret {
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
