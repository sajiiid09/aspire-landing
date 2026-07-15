import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { SERVICES_PAGE } from "@/lib/content";
import { SiteShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-cta";
import { Reveal } from "@/components/reveal";
import { Faq } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: SERVICES_PAGE.meta.title,
  description: SERVICES_PAGE.meta.description,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const [featured, ...supporting] = SERVICES_PAGE.items;
  return (
    <SiteShell>
      <PageHero content={SERVICES_PAGE.hero} />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <Reveal className="surface grid overflow-hidden rounded-xl lg:grid-cols-2">
            <div className="relative min-h-80"><Image src={featured.image} alt={featured.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></div>
            <div className="p-8 md:p-12">
              <featured.icon className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} aria-hidden />
              <h2 className="mt-6 font-display text-4xl text-foreground">{featured.title}</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{featured.description}</p>
              <Deliverables items={featured.deliverables} />
            </div>
          </Reveal>
          <Reveal stagger className="mt-16 grid gap-10 lg:grid-cols-3">
            {supporting.map((service) => (
              <article key={service.title}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src={service.image} alt={service.imageAlt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" /></div>
                <service.icon className="mt-7 h-6 w-6 text-muted-foreground" strokeWidth={1.5} aria-hidden />
                <h2 className="mt-5 font-display text-3xl text-foreground">{service.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <Deliverables items={service.deliverables} />
              </article>
            ))}
          </Reveal>
        </div>
      </section>
      <Faq />
      <PageCta content={SERVICES_PAGE.cta} />
    </SiteShell>
  );
}

function Deliverables({ items }: { items: readonly string[] }) {
  return <ul className="mt-7 grid gap-3">{items.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm text-foreground"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden />{item}</li>)}</ul>;
}
