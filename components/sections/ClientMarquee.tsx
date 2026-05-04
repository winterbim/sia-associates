import Image from "next/image";

// Per UI/UX Pro Max "Enterprise Gateway" pattern: static logo grid with
// trust-signal framing (kicker + context line). No infinite loop marquee —
// respects reduced-motion and reads as a credential row, not a slideshow.

type Client = {
  name: string;
  src?: string;
};

const CLIENTS: readonly Client[] = [
  { name: "VINCI", src: "/clients/vinci.png" },
  { name: "GRDF", src: "/clients/grdf.svg" },
  { name: "RTE", src: "/clients/rte.svg" },
  { name: "SAFRAN", src: "/clients/safran.png" },
  { name: "ENGIE", src: "/clients/engie.png" },
  { name: "EQUANS" },
] as const;

export function ClientMarquee() {
  return (
    <section
      className="border-y border-hairline bg-bone py-16"
      aria-label="Clients de référence"
    >
      <div className="section-container">
        <div className="mb-10 flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Ils m&apos;ont fait confiance</p>
            <p className="mt-2 max-w-md text-sm text-graphite">
              Grands comptes industriels et services publics français —
              mêmes exigences, même engagement sur 19+ ans.
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-kicker text-ash">
            11 références publiques · 2010 → 2026
          </p>
        </div>

        <ul className="grid grid-cols-2 items-center gap-x-10 gap-y-10 sm:grid-cols-3 md:gap-x-14 lg:grid-cols-6">
          {CLIENTS.map((client) => (
            <li
              key={client.name}
              className="flex items-center justify-center"
            >
              {client.src ? (
                <Image
                  src={client.src}
                  alt={`Logo ${client.name}`}
                  width={200}
                  height={80}
                  className="h-10 w-auto opacity-60 grayscale transition-[opacity,filter] duration-200 ease-out hover:opacity-100 hover:grayscale-0 md:h-12"
                />
              ) : (
                <span className="font-display text-base font-semibold uppercase tracking-[0.18em] text-ink/60 transition-colors duration-200 hover:text-ink md:text-lg">
                  {client.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
