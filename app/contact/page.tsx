import type { Metadata } from "next";
import { CONTACT_PAGE } from "@/lib/content";
import { SiteShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = { title: CONTACT_PAGE.meta.title, description: CONTACT_PAGE.meta.description, alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <SiteShell plainFooter><PageHero content={CONTACT_PAGE.hero} /><Contact /></SiteShell>;
}
