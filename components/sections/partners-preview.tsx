import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PARTNERS } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

export function PartnersPreview() {
  return (
    <section className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <TextReveal className="font-display text-4xl leading-tight text-foreground md:text-5xl">{PARTNERS.title}</TextReveal>
          <Reveal>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{PARTNERS.body}</p>
          <Link href={PARTNERS.cta.href} className="mt-8 inline-flex items-center gap-2 text-sm text-foreground hover:text-muted-foreground">{PARTNERS.cta.label}<ArrowUpRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
        <Reveal stagger className="grid gap-3 sm:grid-cols-2">
          {PARTNERS.benefits.map((benefit, index) => (
            <article key={benefit.title} className={`surface rounded-xl p-7 ${index === 2 ? "sm:col-span-2" : ""}`}>
              <benefit.icon className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-6 font-display text-2xl text-foreground">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
