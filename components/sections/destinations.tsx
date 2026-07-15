import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DESTINATIONS } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Destinations() {
  const featured = DESTINATIONS.items.slice(0, 5);
  return (
    <section className="section-pad bg-secondary/25">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">{DESTINATIONS.title}</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{DESTINATIONS.body}</p>
        </Reveal>
        <Reveal stagger className="mt-12 grid auto-rows-[240px] gap-4 md:grid-cols-12">
          {featured.map((destination, index) => (
            <article key={destination.country} className={`group relative overflow-hidden rounded-xl ${index === 0 ? "md:col-span-7 md:row-span-2" : "md:col-span-5"}`}>
              <Image src={destination.image} alt={destination.imageAlt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/10 to-transparent" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-3xl text-foreground">{destination.country}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{destination.region}</p>
              </div>
            </article>
          ))}
        </Reveal>
        <Reveal className="mt-8"><Link href={DESTINATIONS.cta.href} className="inline-flex items-center gap-2 text-sm text-foreground hover:text-muted-foreground">{DESTINATIONS.cta.label}<ArrowUpRight className="h-4 w-4" /></Link></Reveal>
      </div>
    </section>
  );
}
