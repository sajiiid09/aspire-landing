"use client";

import { SYSTEM_STATUS, type Stat } from "@/lib/content";
import { useCountUp, useInView } from "@/lib/hooks";
import { Reveal } from "@/components/reveal";

function Readout({ stat }: { stat: Stat }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const value = useCountUp(stat.value, inView);

  return (
    <div ref={ref} className="surface rounded p-6">
      <div className="stat-value font-display text-4xl text-foreground md:text-5xl">
        {value.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="mt-3 font-accent text-xs text-muted-foreground">{stat.label}</div>
    </div>
  );
}

/** Cyberpunk theme's unique section — live HUD dashboard with animated
 *  counters and a mono system readout (PLAN.md §5.3). */
export function SystemStatus() {
  return (
    <section id="system-status" className="section-pad">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-accent text-sm text-muted-foreground">
              {SYSTEM_STATUS.eyebrow}
            </div>
            <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
              {SYSTEM_STATUS.title}
            </h2>
          </div>
          <p className="surface flex items-center gap-2.5 rounded-full px-5 py-2.5 font-accent text-xs text-primary">
            <span aria-hidden className="status-dot h-2 w-2 rounded-full bg-primary" />
            {SYSTEM_STATUS.statusLabel}
          </p>
        </Reveal>

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-[var(--grid-gap)] sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEM_STATUS.readouts.map((stat) => (
            <Readout key={stat.label} stat={stat} />
          ))}
        </Reveal>

        <Reveal className="surface mt-[var(--grid-gap)] rounded p-6">
          <div className="font-accent text-xs leading-loose text-muted-foreground">
            {SYSTEM_STATUS.logLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
