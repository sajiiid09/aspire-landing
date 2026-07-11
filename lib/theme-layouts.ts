import type { ThemeId } from "@/lib/config";

/**
 * Per-theme section orders (PLAN.md §5). Header and the theme switcher are
 * common chrome rendered by ThemeSite, not sections. The prerendered tree is
 * always `default` — the only fully-indexed order (PLAN.md §3.1).
 */
export type SectionId =
  | "hero"
  | "trust-logos"
  | "about"
  | "why-choose-us"
  | "services"
  | "destinations"
  | "stats"
  | "testimonials"
  | "gallery"
  | "offers"
  | "faq"
  | "cta-banner"
  | "contact"
  | "footer"
  | "process"
  | "heritage"
  | "system-status"
  | "journey-map";

export const THEME_LAYOUTS: Record<ThemeId, readonly SectionId[]> = {
  default: [
    "hero",
    "trust-logos",
    "about",
    "services",
    "why-choose-us",
    "destinations",
    "process",
    "stats",
    "testimonials",
    "offers",
    "faq",
    "cta-banner",
    "contact",
    "footer",
  ],
  classical: [
    "hero",
    "trust-logos",
    "stats",
    "heritage",
    "about",
    "services",
    "destinations",
    "offers",
    "testimonials",
    "cta-banner",
    "contact",
    "footer",
  ],
  cyberpunk: [
    "hero",
    "system-status",
    "trust-logos",
    "why-choose-us",
    "stats",
    "destinations",
    "offers",
    "testimonials",
    "faq",
    "cta-banner",
    "contact",
    "footer",
  ],
  space: [
    "hero",
    "journey-map",
    "trust-logos",
    "destinations",
    "stats",
    "offers",
    "why-choose-us",
    "testimonials",
    "cta-banner",
    "contact",
    "footer",
  ],
};
