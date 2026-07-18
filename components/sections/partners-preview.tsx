import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PARTNERS } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

export function PartnersPreview() {
  return (
    <section className="section-standard">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-xl">
          <Image
            src="/images/partners-team.webp"
            alt="Education colleagues reviewing information together around a laptop"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <div>
          <TextReveal className="font-display text-4xl leading-tight text-foreground md:text-5xl">{PARTNERS.title}</TextReveal>
          <Reveal>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{PARTNERS.body}</p>
          </Reveal>
          <Reveal stagger className="mt-10 divide-y divide-foreground/10 border-y border-foreground/10">
            {PARTNERS.benefits.map((benefit) => (
              <article key={benefit.title} className="py-7">
                <div className="flex items-center gap-3">
                  <benefit.icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                  <h3 className="font-display text-2xl text-foreground">{benefit.title}</h3>
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
              </article>
            ))}
          </Reveal>
          <Reveal>
            <Link href={PARTNERS.cta.href} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="link-sweep">{PARTNERS.cta.label}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-micro ease-hallmark-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
