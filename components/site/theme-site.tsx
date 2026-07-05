"use client";

import { Header } from "@/components/sections/header";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { useTheme } from "@/components/theme/theme-provider";
import { THEME_LAYOUTS } from "@/lib/theme-layouts";
import { SECTION_REGISTRY } from "@/lib/section-registry";

/**
 * Composition resolver — one of the three files where theme branching is
 * permitted (AGENT.md rule 2). SSG emits the default order; the first client
 * render matches it (resolved === false), so hydration never mismatches.
 * When a non-default theme is saved, the body stays paint-gated
 * (html.theme-boot) until this component re-renders with the resolved order
 * and the provider reveals it.
 */
export function ThemeSite() {
  const { theme, resolved } = useTheme();
  const active = resolved ? theme : "default";

  return (
    <>
      <Header />
      <main>
        {THEME_LAYOUTS[active].map((id) => {
          const Section = SECTION_REGISTRY[id];
          return <Section key={id} />;
        })}
      </main>
      <ThemeSwitcher />
    </>
  );
}
