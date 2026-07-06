import Image from "next/image";
import { TRUST_LOGOS } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function TrustLogos() {
  return (
    <section id="partners" className="border-y border-border bg-secondary/40 py-10">
      <Reveal className="mx-auto max-w-7xl px-8">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {TRUST_LOGOS.eyebrow}
        </p>
        <div className="marquee mt-8 overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-16">
            <ul className="flex shrink-0 items-center gap-16">
              {TRUST_LOGOS.items.map((logo) => (
                <li key={logo.name} className="shrink-0">
                  <span className="block h-10 w-32">
                    <Image
                      src={logo.logo}
                      alt={logo.name}
                      width={128}
                      height={40}
                      className="h-full w-full object-contain grayscale opacity-80 transition-[filter,opacity] duration-300 hover:grayscale-0 hover:opacity-100"
                    />
                  </span>
                </li>
              ))}
            </ul>
            <ul className="flex shrink-0 items-center gap-16" aria-hidden="true">
              {TRUST_LOGOS.items.map((logo) => (
                <li key={`${logo.name}-dup`} className="shrink-0">
                  <span className="block h-10 w-32">
                    <Image
                      src={logo.logo}
                      alt=""
                      width={128}
                      height={40}
                      className="h-full w-full object-contain grayscale opacity-80"
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
