"use client";

import { STATS, type Stat } from "@/lib/content";
import { useCountUp, useInView } from "@/lib/hooks";
import { Reveal } from "@/components/reveal";

function StatTile({ stat }: { stat: Stat }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const value = useCountUp(stat.value, inView);

  return (
    <div ref={ref} className="surface relative rounded p-6">
      {/* Corner dots (Ondex reference, DESIGN.md §8.3) */}
      {["left-2 top-2", "right-2 top-2", "bottom-2 left-2", "bottom-2 right-2"].map(
        (pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute ${pos} h-1 w-1 rounded-full bg-[hsl(var(--muted-foreground)/0.4)]`}
          />
        ),
      )}
      <div className="stat-value font-display text-5xl text-foreground md:text-6xl">
        {value.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
        {stat.label}
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <section id="stats" className="bg-secondary/40 section-pad">
      <div className="mx-auto grid max-w-7xl items-center gap-[var(--grid-gap)] px-8 md:grid-cols-2">
        <Reveal>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-foreground" />
            {STATS.eyebrow}
          </div>
          <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {STATS.title}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            {STATS.body}
          </p>
        </Reveal>
        <Reveal stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {STATS.items.map((stat) => (
            <StatTile key={stat.label} stat={stat} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
