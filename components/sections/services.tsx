import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

export function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="mx-auto max-w-7xl px-8">
        <TextReveal className="section-title max-w-2xl font-display text-4xl leading-tight text-foreground md:text-5xl">
          {SERVICES.title}
        </TextReveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {SERVICES.items.map((service) => (
            <div
              key={service.title}
              className="group relative flex min-h-64 flex-col gap-4 rounded-xl bg-secondary/40 p-8 transition-colors hover:bg-secondary/60"
            >
              <service.icon
                aria-hidden
                className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground"
                strokeWidth={1.5}
              />
              <h3 className="font-display text-xl text-foreground md:text-2xl">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <span
                aria-hidden
                className="absolute bottom-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
              >
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10">
          <Link
            href={SERVICES.cta.href}
            className="inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 transition-colors hover:text-muted-foreground hover:underline"
          >
            {SERVICES.cta.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
