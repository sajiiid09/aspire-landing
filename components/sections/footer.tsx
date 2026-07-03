import { DESTINATIONS, FOOTER } from "@/lib/content";
import { PORTAL_URL, SITE } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl tracking-tight text-foreground">
            Aspire Global<sup className="text-xs">®</sup>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {FOOTER.tagline}
          </p>
        </div>

        <nav aria-label="Explore">
          <h3 className="text-sm text-foreground">Explore</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {FOOTER.explore.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Destinations">
          <h3 className="text-sm text-foreground">Destinations</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {DESTINATIONS.items.map((dest) => (
              <li key={dest.country}>
                <a
                  href="#destinations"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {dest.country}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm text-foreground">Contact</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {SITE.address}
            <br />
            {SITE.phone}
            <br />
            {SITE.email}
          </p>
          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass mt-6 inline-block rounded-full px-6 py-2.5 text-sm text-foreground transition-transform hover:scale-[1.03]"
          >
            Student Portal
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 py-6 text-sm text-muted-foreground sm:flex-row">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span className="flex gap-6">
            {FOOTER.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
