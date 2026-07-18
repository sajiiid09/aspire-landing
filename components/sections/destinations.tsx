import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DESTINATIONS } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

export function Destinations() {
  const featured = DESTINATIONS.items.slice(0, 5);
  return (
    <section className="section-standard bg-secondary/25">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <TextReveal className="font-display text-4xl leading-tight text-foreground md:text-5xl">{DESTINATIONS.title}</TextReveal>
        <Reveal>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{DESTINATIONS.body}</p>
        </Reveal>
        <Reveal stagger className="mt-12 grid auto-rows-[240px] gap-4 md:grid-cols-12">
          {featured.map((destination, index) => (
            <Link key={destination.country} href={DESTINATIONS.cta.href} aria-label={`Study in ${destination.country} — view all destinations`} className={`group relative block overflow-hidden whitespace-normal rounded-xl ring-1 ring-inset ring-foreground/10 ${index === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}`}>
              <Image src={destination.image} alt={destination.imageAlt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-[image:var(--photo-overlay)] transition-opacity duration-short ease-hallmark-out group-hover:opacity-90" aria-hidden />
              <span aria-hidden className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 transition-opacity duration-short ease-hallmark-out group-hover:opacity-100 group-focus-visible:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-3xl text-foreground">{destination.country}</h3>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70">{destination.region}</p>
              </div>
            </Link>
          ))}
        </Reveal>
        <Reveal className="mt-8">
          <Link href={DESTINATIONS.cta.href} className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="link-sweep">{DESTINATIONS.cta.label}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-micro ease-hallmark-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
