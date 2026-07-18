import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

export function Services() {
  return (
    <section id="services" className="section-generous">
      <div className="mx-auto max-w-7xl px-8">
        <TextReveal className="max-w-2xl font-display text-4xl leading-tight text-foreground md:text-5xl">
          {SERVICES.title}
        </TextReveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12"
        >
          {SERVICES.items.map((service, index) => (
            <div
              key={service.title}
              className={`card-line group relative flex min-h-64 flex-col gap-4 rounded-xl border border-foreground/10 bg-secondary/40 p-8 ${index % 4 === 0 || index % 4 === 3 ? "md:col-span-7" : "md:col-span-5"}`}
            >
              <service.icon
                aria-hidden
                className="h-6 w-6 text-muted-foreground transition-colors duration-short ease-hallmark-out group-hover:text-accent"
                strokeWidth={1.5}
              />
              <h3 className="font-display text-xl text-foreground md:text-2xl">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10">
          <Link
            href={SERVICES.cta.href}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground"
          >
            <span className="link-sweep">{SERVICES.cta.label}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-micro ease-hallmark-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
