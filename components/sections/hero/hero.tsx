"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { ClassicalHero } from "./classical-hero";
import { CyberpunkHero } from "./cyberpunk-hero";
import { DefaultHero } from "./default-hero";
import { SpaceHero } from "./space-hero";

/**
 * Hero resolver — one of the three files where theme branching is permitted
 * (AGENT.md rule 2). Renders the default variant until the provider resolves
 * so the SSR tree and first client render match.
 */
export function Hero() {
  const { theme, resolved } = useTheme();
  const active = resolved ? theme : "default";

  switch (active) {
    case "classical":
      return <ClassicalHero />;
    case "cyberpunk":
      return <CyberpunkHero />;
    case "space":
      return <SpaceHero />;
    default:
      return <DefaultHero />;
  }
}
