import type { Metadata } from "next";
import Image from "next/image";
import { ABOUT_PAGE } from "@/lib/content";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-cta";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: ABOUT_PAGE.meta.title,
  description: ABOUT_PAGE.meta.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { destinations } = ABOUT_PAGE;

  return (
    <PageShell>
      <PageHero content={ABOUT_PAGE.hero} />

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl items-center gap-[var(--grid-gap)] px-8 md:grid-cols-2">
          <Reveal>
            {ABOUT_PAGE.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-6 leading-relaxed text-muted-foreground first:mt-0"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal className="relative">
            <div className="relative aspect-[4/3] w-full border border-border">
              <Image
                src={ABOUT_PAGE.image}
                alt={ABOUT_PAGE.imageAlt}
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border">
        <Reveal
          stagger
          className="mx-auto grid max-w-7xl grid-cols-2 divide-border px-8 md:grid-cols-4 md:divide-x"
        >
          {ABOUT_PAGE.stats.map((stat) => (
            <div key={stat.label} className="py-10 md:px-8 md:first:pl-0">
              <p className="font-display text-4xl text-foreground">
                {stat.value.toLocaleString()}
                {stat.suffix}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-8">
          <Reveal>
            <div className="text-sm text-muted-foreground">{destinations.eyebrow}</div>
            <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
              {destinations.title}
            </h2>
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-[var(--grid-gap)] md:grid-cols-2">
            {[destinations.tier1, destinations.europe].map((group) => (
              <div key={group.label} className="surface p-8 md:p-10">
                <h3 className="font-display text-2xl text-foreground">{group.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {group.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.countries.map((country) => (
                    <li
                      key={country}
                      className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
                    >
                      {country}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <PageCta content={ABOUT_PAGE.cta} />
    </PageShell>
  );
}
