"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import { PORTAL_URL } from "@/lib/config";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={
        scrolled
          ? "liquid-glass fixed inset-x-0 top-0 z-40"
          : "over-video absolute inset-x-0 top-0 z-40"
      }
    >
      <nav className="mx-auto flex max-w-7xl flex-row items-center justify-between px-8 py-6">
        <a
          href="#home"
          className="inline-flex items-center gap-3 font-display text-3xl tracking-tight text-foreground"
        >
          <span className="logo-chip h-9 w-9">
            <Image
              src="/asp-logo.png"
              alt=""
              width={32}
              height={32}
              className="h-full w-full object-contain"
            />
          </span>
          <span>
            Aspire Global<sup className="text-xs">®</sup>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link text-sm transition-colors ${
                "active" in link && link.active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass hidden rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03] md:inline-block"
          >
            Student Portal
          </a>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="text-foreground md:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="liquid-glass fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-[hsl(var(--background)/0.9)] md:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute right-8 top-6 text-foreground"
          >
            <X className="h-6 w-6" />
          </button>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass mt-4 rounded-full px-8 py-3 text-base text-foreground"
          >
            Student Portal
          </a>
        </div>
      )}
    </header>
  );
}
