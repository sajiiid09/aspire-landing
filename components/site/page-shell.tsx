import type { ReactNode } from "react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

export function SiteShell({
  children,
  overlayHeader = false,
  plainFooter = false,
}: {
  children: ReactNode;
  overlayHeader?: boolean;
  /** Set on pages without a closing PageCta card overlapping the footer. */
  plainFooter?: boolean;
}) {
  return (
    <>
      <Header variant={overlayHeader ? "overlay" : "solid"} />
      <main id="main-content">{children}</main>
      <Footer plain={plainFooter} />
    </>
  );
}
