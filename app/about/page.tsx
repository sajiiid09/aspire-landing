import type { Metadata } from "next";
import Image from "next/image";
import { ABOUT_PAGE, HOW_IT_WORKS, STATS } from "@/lib/content";
import { SiteShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-cta";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";
import { Offers } from "@/components/sections/offers";
import { Faq } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: ABOUT_PAGE.meta.title,
  description: ABOUT_PAGE.meta.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero content={ABOUT_PAGE.hero} />
      <section className="section-standard">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            {ABOUT_PAGE.paragraphs.map((paragraph) => <p key={paragraph} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground first:mt-0">{paragraph}</p>)}
          </Reveal>
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/images/about-story.webp" alt="University students collaborating around a table in a campus library" fill sizes="(min-width: 1024px) 42vw, 90vw" className="object-cover" />
          </Reveal>
        </div>
      </section>
      <section className="band-cream section-tight">
        <Reveal stagger className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-12 sm:px-8">
          {STATS.items.map((stat, index) => <div key={stat.label} className={`rounded-xl border border-foreground/10 bg-secondary/80 p-7 ${index === 0 ? "sm:col-span-7 sm:row-span-2 sm:flex sm:flex-col sm:justify-end sm:p-10" : "sm:col-span-5"}`}><p className={`metric-value text-foreground ${index === 0 ? "text-5xl md:text-6xl" : "text-4xl"}`}>{stat.value.toLocaleString()}<span className="metric-suffix">{stat.suffix}</span></p><p className="mt-2 text-sm text-muted-foreground">{stat.label}</p></div>)}
        </Reveal>
      </section>
      <section className="section-generous">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <TextReveal className="font-display text-4xl text-foreground md:text-5xl">{HOW_IT_WORKS.title}</TextReveal>
          <Reveal><p className="mt-4 max-w-xl text-muted-foreground">{HOW_IT_WORKS.body}</p></Reveal>
          <Reveal stagger className="mt-12 divide-y divide-foreground/10 border-y border-foreground/10">
            {HOW_IT_WORKS.items.map((item, index) => <article key={item.title} className="grid gap-5 py-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8"><span className="font-display text-lg text-muted-foreground">0{index + 1}</span><div><div className="flex items-center gap-3"><item.icon className="h-5 w-5 text-accent" strokeWidth={1.5} /><h3 className="font-display text-2xl text-foreground">{item.title}</h3></div><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.description}</p></div></article>)}
          </Reveal>
        </div>
      </section>
      <Offers />
      <Faq />
      <PageCta content={ABOUT_PAGE.cta} />
    </SiteShell>
  );
}
