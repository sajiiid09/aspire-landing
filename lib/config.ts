/**
 * External URLs and site metadata.
 * Portal + course finder live on an external white-labeled portal — this
 * site never implements auth or backend features (architecture.md §2).
 */

// PLACEHOLDER — pending real portal URLs from client
export const PORTAL_URL =
  process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.example.com";

export const COURSE_FINDER_URL =
  process.env.NEXT_PUBLIC_COURSE_FINDER_URL ?? `${PORTAL_URL}/courses`;

/** Third-party form endpoint (Formspree-class). Empty → mailto fallback. */
export const CONTACT_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "";

export const SITE = {
  name: "Aspire Global Education",
  title: "Aspire Global Education — Study Abroad Consultancy",
  description:
    "We guide students from first question to first day abroad — universities, visas, scholarships, and everything between.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aspireglobal.example.com",
  // PLACEHOLDER — pending client contact details
  email: "hello@aspireglobal.example.com",
  phone: "+880 1XXX-XXXXXX",
  address: "House 00, Road 00, Gulshan, Dhaka, Bangladesh",
} as const;

export const THEME_STORAGE_KEY = "aspire-theme";

export const THEMES = ["default", "classical", "cyberpunk", "space"] as const;
export type ThemeId = (typeof THEMES)[number];
