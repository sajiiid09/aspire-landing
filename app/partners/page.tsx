import type { Metadata } from "next";
import Image from "next/image";
import { PARTNERS, PARTNERS_PAGE } from "@/lib/content";
import { SiteShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-cta";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

export const metadata: Metadata = { title: PARTNERS_PAGE.meta.title, description: PARTNERS_PAGE.meta.description, alternates: { canonical: "/partners" } };

export default function PartnersPage() {
  return (
    <SiteShell>
      <PageHero content={PARTNERS_PAGE.hero} />
      <section className="section-standard">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src="/images/partners-team.webp" alt="Education colleagues reviewing information together around a laptop" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></Reveal>
          <Reveal>
            <h2 className="font-display text-4xl text-foreground md:text-5xl">{PARTNERS.title}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{PARTNERS.body}</p>
            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              {PARTNERS.benefits.map((benefit) => <article key={benefit.title}><benefit.icon className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} aria-hidden /><h3 className="mt-4 font-display text-2xl text-foreground">{benefit.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p></article>)}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section-generous bg-secondary/25">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <TextReveal className="font-display text-4xl text-foreground md:text-5xl">{PARTNERS_PAGE.workflowTitle}</TextReveal>
          <Reveal stagger className="mt-12 divide-y divide-foreground/10 border-y border-foreground/10">
            {PARTNERS_PAGE.workflow.map((item, index) => <article key={item.title} className="grid gap-4 py-8 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8"><span className="font-display text-lg text-accent">0{index + 1}</span><div><h3 className="font-display text-2xl text-foreground">{item.title}</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.description}</p></div></article>)}
          </Reveal>
        </div>
      </section>
      <PageCta content={PARTNERS_PAGE.cta} />
    </SiteShell>
  );
}
