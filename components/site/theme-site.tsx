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
const SPACE_BACKDROP_BOUNDARY = "stats";

export function ThemeSite() {
  const { theme, resolved } = useTheme();
  const active = resolved ? theme : "default";
  const order = THEME_LAYOUTS[active];

  if (active === "space") {
    const boundary = order.indexOf(SPACE_BACKDROP_BOUNDARY);
    const before = order.slice(0, boundary);
    const after = order.slice(boundary);
    return (
      <>
        <Header />
        <main>
          <div className="relative isolate overflow-hidden">
            <div className="hero-aurora absolute inset-0 z-0" aria-hidden />
            <div className="hero-decor" aria-hidden />
            {before.map((id) => {
              const Section = SECTION_REGISTRY[id];
              return (
                <div key={id} className="relative z-10">
                  <Section />
                </div>
              );
            })}
          </div>
          {after.map((id) => {
            const Section = SECTION_REGISTRY[id];
            return <Section key={id} />;
          })}
        </main>
        <ThemeSwitcher />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        {order.map((id) => {
          const Section = SECTION_REGISTRY[id];
          return <Section key={id} />;
        })}
      </main>
      <ThemeSwitcher />
    </>
  );
}
