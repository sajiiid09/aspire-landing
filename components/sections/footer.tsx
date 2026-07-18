import Link from "next/link";
import { FOOTER } from "@/lib/content";
import { PORTAL_URL, SITE } from "@/lib/config";

/** `plain` = no overlapping CTA card above, use normal top padding. */
export function Footer({ plain = false }: { plain?: boolean }) {
  return (
    <footer className={`bg-secondary/70 ${plain ? "pt-16" : "pt-32 sm:pt-36"}`}>
      <div className="mx-auto mb-14 flex max-w-7xl items-center gap-5 px-6 sm:px-8" aria-hidden>
        <span className="h-px flex-1 bg-foreground/10" />
        <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
        <span className="h-px flex-1 bg-foreground/10" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 font-display text-2xl text-foreground">
            Aspire Global
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{FOOTER.tagline}</p>
        </div>
        <nav aria-label="Footer navigation">
          <h2 className="font-display text-lg text-foreground">Explore</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-1">
            {FOOTER.explore.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground transition-colors duration-short ease-hallmark-out hover:text-accent">{link.label}</Link></li>)}
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
      <div className="overflow-hidden px-6" aria-hidden>
        <p className="mega-word pointer-events-none -mb-3 whitespace-nowrap text-center text-[clamp(4.5rem,17.5vw,15rem)] [mask-image:linear-gradient(180deg,black_50%,transparent_98%)] sm:-mb-5">
          ASPIRE
        </p>
      </div>
      <div className="relative bg-secondary/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          {FOOTER.legal.length > 0 && <nav aria-label="Legal"><ul className="flex gap-5">{FOOTER.legal.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></nav>}
        </div>
      </div>
    </footer>
  );
}
