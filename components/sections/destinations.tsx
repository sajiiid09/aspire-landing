import Image from "next/image";
import { DESTINATIONS } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Destinations() {
  return (
    <section id="destinations" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal>
          <div className="text-sm text-muted-foreground">{DESTINATIONS.eyebrow}</div>
          <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {DESTINATIONS.title}
          </h2>
        </Reveal>

        <Reveal stagger className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {DESTINATIONS.items.map((dest) => (
            <article
              key={dest.country}
              className={`group relative overflow-hidden rounded ${
                dest.featured ? "md:col-span-2" : ""
              }`}
            >
              <div
                className={`relative aspect-[4/3] w-full ${
                  dest.featured ? "md:aspect-[3/1]" : "md:aspect-[3/2]"
                }`}
              >
                <Image
                  src={dest.image}
                  alt={`Study in ${dest.country}`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Gradient overlay for text legibility (Evergreen reference) */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 30%, hsl(var(--background) / 0.85))",
                  }}
                />
              </div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-display text-3xl text-foreground">{dest.country}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{dest.statLine}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
