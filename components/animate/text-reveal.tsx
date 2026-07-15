"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

interface TextRevealProps {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}

/**
 * Masked line-by-line heading reveal (GSAP SplitText + ScrollTrigger).
 * Server HTML renders the heading fully visible; splitting and the hidden
 * state happen post-hydration after fonts load, so SEO/no-JS/CLS are safe.
 */
export function TextReveal({ as: Tag = "h2", className = "", children }: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      document.fonts.ready.then(
        contextSafe(() => {
          if (!el.isConnected) return;
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                opacity: 0,
                duration: 0.9,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              }),
          });
        }),
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
