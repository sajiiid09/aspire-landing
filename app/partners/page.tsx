import type { Metadata } from "next";
import Image from "next/image";
import { PARTNERS, PARTNERS_PAGE } from "@/lib/content";
import { SiteShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-cta";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: PARTNERS_PAGE.meta.title, description: PARTNERS_PAGE.meta.description, alternates: { canonical: "/partners" } };

export default function PartnersPage() {
  return (
    <SiteShell>
      <PageHero content={PARTNERS_PAGE.hero} />
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src="/images/contact-bg.jpg" alt="International education counseling team at work" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></Reveal>
          <Reveal>
            <h2 className="font-display text-4xl text-foreground md:text-5xl">{PARTNERS.title}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{PARTNERS.body}</p>
            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              {PARTNERS.benefits.map((benefit) => <article key={benefit.title}><benefit.icon className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} /><h3 className="mt-4 font-display text-2xl text-foreground">{benefit.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p></article>)}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section-pad bg-secondary/25">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal><h2 className="font-display text-4xl text-foreground md:text-5xl">{PARTNERS_PAGE.workflowTitle}</h2></Reveal>
          <Reveal stagger className="mt-12 grid gap-px overflow-hidden rounded-xl bg-border md:grid-cols-3">
            {PARTNERS_PAGE.workflow.map((item) => <article key={item.title} className="bg-background p-8"><h3 className="font-display text-2xl text-foreground">{item.title}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p></article>)}
          </Reveal>
        </div>
      </section>
      <PageCta content={PARTNERS_PAGE.cta} />
    </SiteShell>
  );
}
