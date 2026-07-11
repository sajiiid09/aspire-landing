import type { ComponentType } from "react";
import type { SectionId } from "@/lib/theme-layouts";
import { Hero } from "@/components/sections/hero/hero";
import { TrustLogos } from "@/components/sections/trust-logos";
import { About } from "@/components/sections/about";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Services } from "@/components/sections/services";
import { Destinations } from "@/components/sections/destinations";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Gallery } from "@/components/sections/gallery";
import { Offers } from "@/components/sections/offers";
import { Faq } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Process } from "@/components/sections/unique/process";
import { Heritage } from "@/components/sections/unique/heritage";
import { SystemStatus } from "@/components/sections/unique/system-status";
import { JourneyMap } from "@/components/sections/unique/journey-map";

/**
 * SectionId → component map, consumed by ThemeSite (PLAN.md §3.1).
 * Static imports keep SSG simple; switch entries to next/dynamic only if the
 * Lighthouse perf budget fails (PLAN.md §9.3).
 */
export const SECTION_REGISTRY: Record<SectionId, ComponentType> = {
  hero: Hero,
  "trust-logos": TrustLogos,
  about: About,
  "why-choose-us": WhyChooseUs,
  services: Services,
  destinations: Destinations,
  stats: Stats,
  testimonials: Testimonials,
  gallery: Gallery,
  offers: Offers,
  faq: Faq,
  "cta-banner": CtaBanner,
  contact: Contact,
  footer: Footer,
  process: Process,
  heritage: Heritage,
  "system-status": SystemStatus,
  "journey-map": JourneyMap,
};
