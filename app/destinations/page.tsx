import type { Metadata } from "next";
import Image from "next/image";
import { DESTINATIONS, DESTINATIONS_PAGE } from "@/lib/content";
import { SiteShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-cta";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

export const metadata: Metadata = { title: DESTINATIONS_PAGE.meta.title, description: DESTINATIONS_PAGE.meta.description, alternates: { canonical: "/destinations" } };

export default function DestinationsPage() {
  const english = DESTINATIONS.items.filter((item) => item.region === "English-speaking");
  const europe = DESTINATIONS.items.filter((item) => item.region === "Europe");
  return (
    <SiteShell>
      <PageHero content={DESTINATIONS_PAGE.hero} />
      <DestinationGroup title={DESTINATIONS_PAGE.groups.english.title} body={DESTINATIONS_PAGE.groups.english.body} items={english} featured />
      <DestinationGroup title={DESTINATIONS_PAGE.groups.europe.title} body={DESTINATIONS_PAGE.groups.europe.body} items={europe} />
      <PageCta content={DESTINATIONS_PAGE.cta} />
    </SiteShell>
  );
}

function DestinationGroup({ title, body, items, featured = false }: { title: string; body: string; items: readonly (typeof DESTINATIONS.items)[number][]; featured?: boolean }) {
  return (
    <section className={`section-pad ${featured ? "" : "bg-secondary/25"}`}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <TextReveal className="font-display text-4xl text-foreground md:text-5xl">{title}</TextReveal>
        <Reveal><p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{body}</p></Reveal>
        <Reveal stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => <article key={item.country} className={`group relative min-h-72 overflow-hidden rounded-xl ${featured && index === 0 ? "sm:col-span-2 lg:row-span-2 lg:min-h-[36rem]" : ""}`}><Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent" /><h3 className="absolute bottom-0 p-6 font-display text-3xl text-foreground">{item.country}</h3></article>)}
        </Reveal>
      </div>
    </section>
  );
}
