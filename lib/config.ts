/** External services remain outside this static marketing site. */
export const PORTAL_URL =
  process.env.NEXT_PUBLIC_PORTAL_URL ?? "";

export const COURSE_FINDER_URL =
  process.env.NEXT_PUBLIC_COURSE_FINDER_URL ?? "";

export const CONTACT_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

export const SITE = {
  name: "Aspire Global Education",
  title: "Aspire Global Education | Study Abroad Consultancy",
  description:
    "Explore international courses and get clear support with admissions, scholarships, documents, and visa applications.",
  url: siteUrl,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? "",
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "",
} as const;
