"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, inView, stagger as staggerDelay } from "motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: ReactNode;
  /** Stagger direct children instead of revealing as one block */
  stagger?: boolean;
  className?: string;
}

/**
 * Scroll-triggered reveal. SSR output is fully visible; the hidden state is
 * applied post-hydration only, so no-JS visitors and crawlers see everything.
 * With `stagger`, direct children animate in sequence while remaining direct
 * DOM children (grid/col-span layouts stay intact).
 */
export function Reveal({ children, stagger = false, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = (stagger ? Array.from(el.children) : [el]) as HTMLElement[];
    if (targets.length === 0) return;

    for (const target of targets) {
      target.style.opacity = "0";
      target.style.transform = "translateY(24px)";
    }

    const stop = inView(
      el,
      () => {
        animate(
          targets,
          { opacity: 1, transform: "translateY(0px)" },
          { duration: 0.7, ease: EASE, delay: stagger ? staggerDelay(0.09) : 0 },
        );
      },
      { amount: 0.2 },
    );

    return () => {
      stop();
      for (const target of targets) {
        target.style.opacity = "";
        target.style.transform = "";
      }
    };
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
