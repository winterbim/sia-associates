import Image from "next/image";

const CLIENTS = [
  { name: "Safran", src: "/clients/safran.png" },
  { name: "VINCI", src: "/clients/vinci.png" },
  { name: "ENGIE", src: "/clients/engie.png" },
  { name: "GRDF", src: "/clients/grdf.svg" },
  { name: "RTE", src: "/clients/rte.svg" },
  { name: "Applium", src: "/clients/applium.svg" },
] as const;

export function ClientMarquee() {
  return (
    <section className="border-y border-hairline bg-bone py-12" aria-label="Clients de reference">
      <p className="kicker mb-8 text-center">Ils m&apos;ont fait confiance</p>

      <div className="group relative overflow-hidden">
        {/* Gradient masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bone to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bone to-transparent" />

        <div
          className="flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]"
          role="marquee"
          aria-label="Defile des logos clients"
        >
          {/* Double the logos for seamless loop */}
          {[...CLIENTS, ...CLIENTS].map((client, i) => (
            <div key={`${client.name}-${i}`} className="shrink-0">
              <Image
                src={client.src}
                alt={`Logo ${client.name}`}
                width={200}
                height={80}
                className="h-12 w-auto opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
