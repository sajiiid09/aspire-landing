"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { HEADER_CONTACT, NAV_LINKS } from "@/lib/content";
import { PORTAL_URL } from "@/lib/config";

interface HeaderProps {
  /** overlay = transparent over hero until scroll (landing); solid = surface bar from scroll 0 (inner pages) */
  variant?: "overlay" | "solid";
}

export function Header({ variant = "overlay" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Route links highlight on their page; hash links never highlight
  const isActive = (href: string) => !href.includes("#") && pathname === href;

  useEffect(() => {
    if (variant === "solid") return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = variant === "solid" || scrolled;

  return (
    <header
      className={
        solid
          ? "surface fixed inset-x-0 top-0 z-40"
          : "over-video absolute inset-x-0 top-0 z-40"
      }
    >
      <nav className="mx-auto flex max-w-7xl flex-row items-center justify-between px-8 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-3 font-display text-2xl tracking-tight text-foreground"
        >
          <span className="logo-chip h-8 w-8">
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
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link text-sm transition-colors ${
                isActive(link.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={HEADER_CONTACT.phoneHref}
            className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {HEADER_CONTACT.phoneLabel}
          </a>
          <a
            href={HEADER_CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="hidden text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
          </a>
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="surface hidden rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03] md:inline-block"
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
        <div className="surface fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-[hsl(var(--background)/0.9)] md:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute right-8 top-6 text-foreground"
          >
            <X className="h-6 w-6" />
          </button>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={HEADER_CONTACT.phoneHref}
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 text-base text-muted-foreground"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {HEADER_CONTACT.phoneLabel}
          </a>
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="surface mt-4 rounded-full px-8 py-3 text-base text-foreground"
          >
            Student Portal
          </a>
        </div>
      )}
    </header>
  );
}
