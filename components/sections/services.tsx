import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal>
          <div className="text-sm text-muted-foreground">{SERVICES.eyebrow}</div>
          <h2 className="section-title mt-4 max-w-2xl font-display text-4xl leading-tight text-foreground md:text-5xl">
            {SERVICES.title}
          </h2>
        </Reveal>

        <Reveal
          stagger
          className="mt-16 grid grid-cols-1 border-t border-border md:grid-cols-3"
        >
          {SERVICES.items.map((service) => (
            <div
              key={service.title}
              className="group relative flex flex-col gap-4 border-b border-border p-8 md:border-r md:[&:nth-child(3n)]:border-r-0"
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
                className="absolute bottom-6 right-6 flex h-8 w-8 items-center justify-center border border-border text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
              >
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
