import { SiteShell } from "@/components/site/page-shell";
import { PageCta } from "@/components/site/page-cta";
import { Hero } from "@/components/sections/hero/classical-hero";
import { Stats } from "@/components/sections/stats";
import { HowItWorks } from "@/components/sections/how-it-works";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Destinations } from "@/components/sections/destinations";
import { Offers } from "@/components/sections/offers";
import { PartnersPreview } from "@/components/sections/partners-preview";
import { CtaBanner } from "@/components/sections/cta-banner";
import { HOME_CONTACT_CTA } from "@/lib/content";

export default function Home() {
  return (
    <SiteShell overlayHeader>
      <Hero />
      <Stats />
      <HowItWorks />
      <About />
      <Services />
      <Destinations />
      <Offers />
      <PartnersPreview />
      <CtaBanner />
      <PageCta content={HOME_CONTACT_CTA} />
    </SiteShell>
  );
}
