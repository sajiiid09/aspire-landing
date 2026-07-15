import type { Metadata } from "next";
import Link from "next/link";
import { STORIES_PAGE } from "@/lib/content";
import { SiteShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: STORIES_PAGE.meta.title, description: STORIES_PAGE.meta.description, alternates: { canonical: "/stories" } };

export default function StoriesPage() {
  return (
    <SiteShell plainFooter>
      <PageHero content={STORIES_PAGE.hero} />
      <section className="section-pad">
        <Reveal className="mx-auto max-w-3xl px-6 text-center sm:px-8">
          <div className="surface rounded-xl px-7 py-16 md:px-14">
            <h2 className="font-display text-3xl text-foreground md:text-4xl">{STORIES_PAGE.emptyTitle}</h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted-foreground">{STORIES_PAGE.emptyBody}</p>
            <Link href={STORIES_PAGE.cta.href} className="mt-8 inline-flex rounded-lg bg-primary px-8 py-4 text-sm font-medium text-primary-foreground">{STORIES_PAGE.cta.label}</Link>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
