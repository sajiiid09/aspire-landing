import { TRUST_LOGOS } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function TrustLogos() {
  return (
    <section id="partners" className="border-y border-border bg-secondary/40 py-10">
      <Reveal className="mx-auto max-w-7xl px-8">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {TRUST_LOGOS.eyebrow}
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {TRUST_LOGOS.items.map((logo) => (
            <li
              key={logo.name}
              className="font-display text-sm uppercase tracking-wide text-muted-foreground"
            >
              {logo.name}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
