// A static, paper-thin watermark of real ABAP / CDS / YAML snippets.
// No animation, no parallax — just a background texture that signals
// SAP craft without shouting. Opacity ~4% over dark ink. Fully hidden
// on small screens; decorative (aria-hidden).

const LINES: Array<{ tone: "comment" | "keyword" | "ident" | "default"; text: string }[]> = [
  [
    { tone: "keyword", text: "CLASS" },
    { tone: "default", text: " " },
    { tone: "ident", text: "zcl_migration_runner" },
    { tone: "default", text: " " },
    { tone: "keyword", text: "DEFINITION" },
    { tone: "default", text: " " },
    { tone: "keyword", text: "PUBLIC" },
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
  [],
  [
    { tone: "comment", text: "* Clean Core audit — only released APIs are called here" },
  ],
  [
    { tone: "keyword", text: "SELECT" },
    { tone: "default", text: " so_id, currency_code, total_amount " },
  ],
  [
    { tone: "default", text: "  " },
    { tone: "keyword", text: "FROM" },
    { tone: "default", text: " I_SalesOrder " },
  ],
  [
    { tone: "default", text: "  " },
    { tone: "keyword", text: "WHERE" },
    { tone: "default", text: " CreationDate >= @iv_cutoff " },
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
    { tone: "comment", text: "** Work process monitor — production tuning" },
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
  [],
  [
    { tone: "keyword", text: "ENDCLASS" },
    { tone: "default", text: "." },
  ],
];

const TONE_COLOR = {
  comment: "#6E6A62",
  keyword: "#C8A24B",
  ident: "#D8CFBF",
  default: "#A8A29A",
} as const;

export function CodeWatermark({ className = "" }: { className?: string }) {
  // Repeat the block vertically to cover tall sections.
  const block = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05] ${className}`}
      style={{
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
      }}
    >
      <pre className="m-0 whitespace-pre px-4 py-8 font-mono text-[11px] leading-[1.65] md:text-[12px] md:leading-[1.7]">
        {block.map((b) => (
          <span key={b}>
            {LINES.map((line, i) => (
              <span key={`${b}-${i}`}>
                {line.length === 0 ? (
                  "\n"
                ) : (
                  <>
                    {line.map((seg, j) => (
                      <span key={j} style={{ color: TONE_COLOR[seg.tone] }}>
                        {seg.text}
                      </span>
                    ))}
                    {"\n"}
                  </>
                )}
              </span>
            ))}
          </span>
        ))}
      </pre>
    </div>
  );
}
