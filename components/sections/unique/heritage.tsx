import { HERITAGE_MILESTONES } from "@/lib/content";
import { Reveal } from "@/components/reveal";

/** Classical theme's unique section — editorial milestone timeline with
 *  serif years and hairline rules (PLAN.md §5.2). */
export function Heritage() {
  return (
    <section id="heritage" className="section-pad">
      <div className="mx-auto max-w-5xl px-8">
        <Reveal>
          <div className="text-sm text-muted-foreground">{HERITAGE_MILESTONES.eyebrow}</div>
          <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {HERITAGE_MILESTONES.title}
          </h2>
        </Reveal>

        <Reveal stagger className="mt-16 border-l border-border">
          {HERITAGE_MILESTONES.items.map((item) => (
            <article
              key={item.year}
              className="relative grid gap-2 border-b border-border py-10 pl-8 last:border-b-0 md:grid-cols-[8rem_1fr] md:gap-8"
            >
              <span
                aria-hidden
                className="absolute -left-[3px] top-[3.2rem] h-1.5 w-1.5 rounded-full bg-foreground"
              />
              <p className="font-display text-3xl text-muted-foreground md:text-4xl">{item.year}</p>
              <div>
                <h3 className="font-display text-2xl text-foreground">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
