import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { SERVICES_PAGE } from "@/lib/content";
import { PageShell } from "@/components/site/page-shell";
import { PageHero } from "@/components/site/page-hero";
import { PageCta } from "@/components/site/page-cta";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: SERVICES_PAGE.meta.title,
  description: SERVICES_PAGE.meta.description,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero content={SERVICES_PAGE.hero} />

      <section className="section-pad">
        <div className="mx-auto flex max-w-7xl flex-col gap-20 px-8 md:gap-28">
          {SERVICES_PAGE.items.map((service, index) => (
            <Reveal
              key={service.title}
              className="grid items-center gap-[var(--grid-gap)] md:grid-cols-2"
            >
              <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                <service.icon
                  aria-hidden
                  className="h-8 w-8 text-muted-foreground"
                  strokeWidth={1.5}
                />
                <h2 className="mt-6 font-display text-3xl leading-tight text-foreground md:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <BadgeCheck
                        aria-hidden
                        className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.5}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`relative aspect-[4/3] w-full border border-border ${
                  index % 2 === 1 ? "md:order-1" : ""
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <PageCta content={SERVICES_PAGE.cta} />
    </PageShell>
  );
}
