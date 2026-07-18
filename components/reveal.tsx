import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger direct children instead of revealing as one block */
  stagger?: boolean;
  className?: string;
}

/** Static compatibility wrapper. The `stagger` prop remains for existing callers. */
export function Reveal({ children, stagger: _stagger = false, className = "" }: RevealProps) {
  return <div className={className}>{children}</div>;
}
