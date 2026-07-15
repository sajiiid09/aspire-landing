import Image from "next/image";
import Link from "next/link";
import { FOOTER } from "@/lib/content";
import { PORTAL_URL, SITE } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 font-display text-2xl text-foreground">
            <span className="logo-chip h-10 w-10"><Image src="/asp-logo.png" alt="" width={40} height={40} className="h-full w-full object-contain" /></span>
            Aspire Global
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{FOOTER.tagline}</p>
        </div>
        <nav aria-label="Footer navigation">
          <h2 className="font-display text-lg text-foreground">Explore</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-1">
            {FOOTER.explore.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.label}</Link></li>)}
          </ul>
        </nav>
        {(SITE.address || SITE.phone || SITE.email || PORTAL_URL) && <div>
          <h2 className="font-display text-lg text-foreground">Contact</h2>
          <address className="mt-5 grid gap-1 text-sm not-italic text-muted-foreground">
            {SITE.address && <span>{SITE.address}</span>}
            {SITE.phone && <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>{SITE.phone}</a>}
            {SITE.email && <a href={`mailto:${SITE.email}`}>{SITE.email}</a>}
          </address>
          {PORTAL_URL && <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="surface mt-6 inline-block rounded-lg px-6 py-3 text-sm text-foreground">Student Portal</a>}
        </div>}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          {FOOTER.legal.length > 0 && <nav aria-label="Legal"><ul className="flex gap-5">{FOOTER.legal.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></nav>}
        </div>
      </div>
    </footer>
  );
}
