"use client";

import { JOURNEY_NODES } from "@/lib/content";
import { useInView } from "@/lib/hooks";
import { Reveal } from "@/components/reveal";

/** Space theme's unique section — constellation of destinations with an
 *  aurora path that draws in on scroll (PLAN.md §5.4). */
export function JourneyMap() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const points = JOURNEY_NODES.nodes.map((n) => `${n.x},${n.y}`).join(" ");

  return (
    <section id="journey" className="section-pad">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal>
          <div className="text-sm text-muted-foreground">{JOURNEY_NODES.eyebrow}</div>
          <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {JOURNEY_NODES.title}
          </h2>
        </Reveal>

        <div
          ref={ref}
          className={`relative mt-16 aspect-[16/10] sm:aspect-[2/1] ${inView ? "is-visible" : ""}`}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="journey-aurora" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(255 85% 72%)" />
                <stop offset="100%" stopColor="hsl(190 90% 65%)" />
              </linearGradient>
            </defs>
            <polyline
              points={points}
              fill="none"
              stroke="url(#journey-aurora)"
              strokeWidth="0.4"
              strokeLinecap="round"
              className="constellation-path"
            />
          </svg>

          {JOURNEY_NODES.nodes.map((node) => (
            <div
              key={node.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <span
                aria-hidden
                className="mx-auto block h-2.5 w-2.5 rounded-full bg-[hsl(var(--accent))] shadow-[0_0_12px_hsl(var(--accent)/0.8)]"
              />
              <p className="mt-2 whitespace-nowrap text-center text-sm font-medium text-foreground">
                {node.label}
              </p>
              {node.sub && (
                <p className="whitespace-nowrap text-center text-xs text-muted-foreground">
                  {node.sub}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
