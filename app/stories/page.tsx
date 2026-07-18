import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { STORIES_PAGE } from "@/lib/content";
import { SiteShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: STORIES_PAGE.meta.title, description: STORIES_PAGE.meta.description, alternates: { canonical: "/stories" } };

export default function StoriesPage() {
  return (
    <SiteShell plainFooter>
      <PageHero content={STORIES_PAGE.hero} />
      <section className="section-standard">
        <Reveal className="mx-auto grid max-w-7xl gap-8 border-y border-foreground/10 px-6 py-12 sm:px-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16 md:py-16">
          <h2 className="font-display text-3xl text-foreground md:text-4xl">{STORIES_PAGE.emptyTitle}</h2>
          <div>
            <p className="max-w-xl leading-relaxed text-muted-foreground">{STORIES_PAGE.emptyBody}</p>
            <div className="mt-8 flex flex-col items-start gap-4 lg:flex-row">
              <Link href={STORIES_PAGE.cta.href} className="btn btn-primary">
                {STORIES_PAGE.cta.label}<ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href={STORIES_PAGE.ctaSecondary.href} className="btn btn-ghost">{STORIES_PAGE.ctaSecondary.label}</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
