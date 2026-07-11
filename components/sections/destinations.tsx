"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DESTINATIONS } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Destinations() {
  const autoplay = useRef(
    Autoplay({ delay: 2000, stopOnMouseEnter: true, stopOnInteraction: false }),
  );
  // Stable across renders — an inline array/options object here would make
  // embla reinit (and reset the autoplay timer) on every re-render.
  const plugins = useMemo(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return reduced ? [] : [autoplay.current];
  }, []);
  const options = useMemo(() => ({ loop: true, align: "start" as const }), []);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    autoplay.current.reset();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    autoplay.current.reset();
  }, [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => {
      emblaApi?.scrollTo(i);
      autoplay.current.reset();
    },
    [emblaApi],
  );

  return (
    <section id="destinations" className="section-pad">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal>
          <div className="text-sm text-muted-foreground">{DESTINATIONS.eyebrow}</div>
          <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {DESTINATIONS.title}
          </h2>
        </Reveal>

        <Reveal className="mt-16">
          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden rounded">
              <div className="flex">
                {DESTINATIONS.items.map((dest) => (
                  <article key={dest.country} className="relative min-w-0 flex-[0_0_100%]">
                    <div className="relative aspect-[4/3] w-full md:aspect-[21/9]">
                      <Image
                        src={dest.image}
                        alt={dest.imageAlt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                      {/* Gradient overlay for text legibility (Evergreen reference) */}
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 20%, hsl(var(--background) / 0.9))",
                        }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                      <h3 className="font-display text-3xl text-foreground md:text-5xl">
                        {dest.country}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{dest.statLine}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {dest.universities.map((uni) => (
                          <li
                            key={uni}
                            className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-foreground backdrop-blur"
                          >
                            {uni}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button
              aria-label="Previous destination"
              onClick={scrollPrev}
              className="surface absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-3 text-foreground transition-transform hover:scale-[1.06]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next destination"
              onClick={scrollNext}
              className="surface absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-3 text-foreground transition-transform hover:scale-[1.06]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {DESTINATIONS.items.map((dest, i) => (
              <button
                key={dest.country}
                aria-label={`Go to ${dest.country}`}
                aria-current={i === selectedIndex}
                onClick={() => scrollTo(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === selectedIndex ? "bg-foreground" : "bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </Reveal>

        <Reveal stagger className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {DESTINATIONS.highlights.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-4 rounded border border-border bg-secondary/60 p-8"
            >
              <item.icon aria-hidden className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="font-display text-xl text-foreground md:text-2xl">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
