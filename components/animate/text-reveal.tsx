import type { ReactNode } from "react";

interface TextRevealProps {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}

/** Static heading wrapper kept API-compatible with the former reveal component. */
export function TextReveal({ as: Tag = "h2", className = "", children }: TextRevealProps) {
  return <Tag className={className}>{children}</Tag>;
}
