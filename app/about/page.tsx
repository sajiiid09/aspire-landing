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
      <Offers />
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            {ABOUT_PAGE.paragraphs.map((paragraph) => <p key={paragraph} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground first:mt-0">{paragraph}</p>)}
          </Reveal>
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image src="/images/about-intro.jpg" alt="Graduates celebrating and throwing caps on a university lawn" fill sizes="(min-width: 1024px) 42vw, 90vw" className="object-cover" />
          </Reveal>
        </div>
      </section>
      <section className="band-cream py-14 md:py-20">
        <Reveal stagger className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-3 sm:px-8">
          {STATS.items.map((stat) => <div key={stat.label} className="rounded-xl bg-secondary/80 p-7"><p className="font-display text-4xl text-foreground">{stat.value.toLocaleString()}{stat.suffix}</p><p className="mt-2 text-sm text-muted-foreground">{stat.label}</p></div>)}
        </Reveal>
      </section>
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <TextReveal className="font-display text-4xl text-foreground md:text-5xl">{HOW_IT_WORKS.title}</TextReveal>
          <Reveal><p className="mt-4 max-w-xl text-muted-foreground">{HOW_IT_WORKS.body}</p></Reveal>
          <Reveal stagger className="mt-12 grid gap-10 md:grid-cols-3">
            {HOW_IT_WORKS.items.map((item) => <article key={item.title}><item.icon className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} /><h3 className="mt-5 font-display text-2xl text-foreground">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p></article>)}
          </Reveal>
        </div>
      </section>
      <Faq />
      <PageCta content={ABOUT_PAGE.cta} />
    </SiteShell>
  );
}
