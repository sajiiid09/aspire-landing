"use client";

import { Reveal } from "@/components/reveal";
import { STATS } from "@/lib/content";
import { useCountUp, useInView } from "@/lib/hooks";

function StatValue({ value, suffix }: { value: number; suffix: string }) {
  const { ref, inView } = useInView<HTMLParagraphElement>();
  const current = useCountUp(value, inView);
  return <p ref={ref} className="font-display text-5xl text-foreground md:text-6xl">{current.toLocaleString()}{suffix}</p>;
}

export function Stats() {
  return (
    <section className="border-y border-border bg-secondary/30 py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <Reveal>
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">{STATS.title}</h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{STATS.body}</p>
        </Reveal>
        <Reveal stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-3">
          {STATS.items.map((stat) => (
            <div key={stat.label} className="bg-background p-7 md:p-8">
              <StatValue value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
