"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "@/lib/hooks";

interface RevealProps {
  children: ReactNode;
  /** Stagger direct children instead of revealing as one block */
  stagger?: boolean;
  className?: string;
}

export function Reveal({ children, stagger = false, className = "" }: RevealProps) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`${stagger ? "reveal-stagger" : "reveal"} ${className}`}>
      {children}
    </div>
  );
}
