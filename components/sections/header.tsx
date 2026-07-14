"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import { PORTAL_URL, SITE } from "@/lib/config";

export function Header({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (variant === "solid") return;
    const sentinel = document.querySelector("[data-header-sentinel]");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const solid = variant === "solid" || pastHero;

  return (
    <header className={`${solid ? "surface fixed" : "absolute"} inset-x-0 top-0 z-40 transition-colors`}>
      <nav aria-label="Primary navigation" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="inline-flex shrink-0 items-center gap-3 font-display text-xl tracking-tight text-foreground lg:text-2xl">
          <span className="logo-chip h-9 w-9">
            <Image src="/asp-logo.png" alt="" width={36} height={36} className="h-full w-full object-contain" />
          </span>
          <span>Aspire Global</span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={`${pathname === link.href ? "font-semibold text-foreground" : "text-muted-foreground"} whitespace-nowrap text-sm transition-colors hover:text-foreground`}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {SITE.phone && <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} aria-label={`Call ${SITE.phone}`} className="hidden text-muted-foreground transition-colors hover:text-foreground xl:inline-flex"><Phone className="h-4 w-4" aria-hidden /></a>}
          {SITE.whatsappUrl && <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="hidden text-muted-foreground transition-colors hover:text-foreground md:inline-flex"><MessageCircle className="h-5 w-5" aria-hidden /></a>}
          {PORTAL_URL && <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="liquid-glass hidden whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] sm:inline-block">Student Portal</a>}
          <button type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="rounded-lg p-2 text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background px-6 pb-8 pt-5 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl">Aspire Global</span>
            <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="rounded-lg p-2"><X className="h-6 w-6" /></button>
          </div>
          <nav aria-label="Mobile navigation" className="mt-16 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="border-b border-border py-4 font-display text-3xl text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto grid gap-3">
            {SITE.phone && <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-2 py-2 text-muted-foreground"><Phone className="h-4 w-4" />{SITE.phone}</a>}
            {PORTAL_URL && <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-primary px-6 py-4 text-center text-primary-foreground">Student Portal</a>}
          </div>
        </div>
      )}
    </header>
  );
}
