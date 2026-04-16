import { Hero } from "@/components/sections/Hero";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { Pillars } from "@/components/sections/Pillars";
import { Keywords } from "@/components/sections/Keywords";
import { Differentiators } from "@/components/sections/Differentiators";
import { IntentGrid } from "@/components/sections/IntentGrid";
import { Cases } from "@/components/sections/Cases";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <Pillars />
      <Keywords />
      <Differentiators />
      <IntentGrid />
      <Cases />
      <ContactCTA />
    </>
  );
}
