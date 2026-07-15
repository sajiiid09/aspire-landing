"use client";

import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";
import { STATS } from "@/lib/content";
import { useCountUp, useInView } from "@/lib/hooks";

function StatValue({ value, suffix }: { value: number; suffix: string }) {
  const { ref, inView } = useInView<HTMLParagraphElement>();
  const current = useCountUp(value, inView);
  return <p ref={ref} className="font-display text-5xl text-foreground md:text-6xl">{current.toLocaleString()}{suffix}</p>;
}

export function Stats() {
  return (
    <section className="band-cream py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <TextReveal className="font-display text-4xl leading-tight text-foreground md:text-5xl">{STATS.title}</TextReveal>
          <Reveal>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{STATS.body}</p>
          </Reveal>
        </div>
        <Reveal stagger className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {STATS.items.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-secondary/80 p-7 md:p-8">
              <StatValue value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
