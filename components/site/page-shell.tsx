import type { ReactNode } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

/**
 * Chrome for inner pages (/about, /services). Skin-only theming: one fixed
 * layout, colors/fonts resolve via the active theme's CSS variables — no
 * theme branching (AGENT.md rule 2). `id="home"` keeps the root layout's
 * skip-link working on every route.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header variant="solid" />
      <main id="home">{children}</main>
      <ThemeSwitcher />
      <Footer />
    </>
  );
}
