"use client";

import { useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Gallery() {
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

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    autoplay.current.reset();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    autoplay.current.reset();
  }, [emblaApi]);

  return (
    <section id="gallery" className="section-pad">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal>
          <div className="text-sm text-muted-foreground">{GALLERY.eyebrow}</div>
          <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {GALLERY.title}
          </h2>
        </Reveal>

        <Reveal className="relative mt-16">
          <div ref={emblaRef} className="overflow-hidden rounded">
            <div className="flex gap-4">
              {GALLERY.items.map((item) => (
                <figure
                  key={item.image}
                  className="relative min-w-0 flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%]"
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"
                      className="rounded object-cover"
                    />
                  </div>
                  {item.caption && (
                    <figcaption className="mt-3 text-sm text-muted-foreground">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>

          <button
            aria-label="Previous photo"
            onClick={scrollPrev}
            className="surface absolute -left-3 top-1/2 -translate-y-1/2 rounded-full p-3 text-foreground transition-transform hover:scale-[1.06]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next photo"
            onClick={scrollNext}
            className="surface absolute -right-3 top-1/2 -translate-y-1/2 rounded-full p-3 text-foreground transition-transform hover:scale-[1.06]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
