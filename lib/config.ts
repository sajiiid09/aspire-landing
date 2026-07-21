/** External services remain outside this static marketing site. */
export const PORTAL_URL =
  process.env.NEXT_PUBLIC_PORTAL_URL ?? "";

export const COURSE_FINDER_URL =
  process.env.NEXT_PUBLIC_COURSE_FINDER_URL ?? "";

export const CONTACT_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "";

export const HERO_VIDEO_URL =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ??
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

export const SITE = {
  name: "Aspire Global Education",
  title: "Aspire Global Education | Study Abroad Consultancy",
  description:
    "Explore international courses and get clear support with admissions, scholarships, documents, and visa applications.",
  url: siteUrl,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "aspireeducationglobal@gmail.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "01626824721",
  address:
    process.env.NEXT_PUBLIC_CONTACT_ADDRESS ??
    "Panthonibash, 5th floor, 69/J, Panthopath, Dhaka (opposite Bashundhara City Shopping Mall), Bangladesh",
  whatsappUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/8801626824721",
} as const;
