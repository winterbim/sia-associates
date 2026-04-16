import { Hero } from "@/components/sections/Hero";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { Pillars } from "@/components/sections/Pillars";
import { Keywords } from "@/components/sections/Keywords";
import { Differentiators } from "@/components/sections/Differentiators";
import { IntentGrid } from "@/components/sections/IntentGrid";
import { Cases } from "@/components/sections/Cases";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const dynamic = "force-dynamic";

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
      <BlogPreview />
      <ContactCTA />
    </>
  );
}
