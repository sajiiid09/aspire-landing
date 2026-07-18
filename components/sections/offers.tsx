"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { OFFERS } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

export function Offers({ priority = false }: { priority?: boolean }) {
  const options = useMemo(
    () => ({ loop: true, align: "start" as const, containScroll: "trimSnaps" as const }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState<number[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const syncCarouselState = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setVisibleSlides(emblaApi.slidesInView());
    };
    syncCarouselState();
    emblaApi.on("select", syncCarouselState);
    emblaApi.on("reInit", syncCarouselState);
    emblaApi.on("slidesInView", syncCarouselState);
    return () => {
      emblaApi.off("select", syncCarouselState);
      emblaApi.off("reInit", syncCarouselState);
      emblaApi.off("slidesInView", syncCarouselState);
    };
  }, [emblaApi]);

  // Native <dialog> traps focus and closes on Escape; it does not lock the
  // page scroll behind it, so do that while the lightbox is open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    document.documentElement.classList.add("overflow-hidden");
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [lightboxIndex]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => {
      emblaApi?.scrollTo(i);
    },
    [emblaApi],
  );

  const openLightbox = useCallback((i: number) => {
    setLightboxIndex(i);
    dialogRef.current?.showModal();
  }, []);
  const closeLightbox = useCallback(() => {
    dialogRef.current?.close();
    setLightboxIndex(null);
  }, []);

  // Escape closes the native dialog without going through closeLightbox, so
  // reset state on the close event as well.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setLightboxIndex(null);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);
  const stepLightbox = useCallback((delta: number) => {
    setLightboxIndex((i) =>
      i === null ? i : (i + delta + OFFERS.items.length) % OFFERS.items.length,
    );
  }, []);

  const current = lightboxIndex === null ? null : OFFERS.items[lightboxIndex];

  return (
    <section id="offers" className="section-generous">
      <div className="mx-auto max-w-7xl px-8">
        <TextReveal className="font-display text-4xl leading-tight text-foreground md:text-5xl">
          {OFFERS.title}
        </TextReveal>
        <Reveal>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {OFFERS.body}
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <div
            className="relative"
            role="region"
            aria-roledescription="carousel"
            aria-label="Current university offers"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") scrollPrev();
              if (event.key === "ArrowRight") scrollNext();
            }}
          >
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex h-[420px] gap-4 md:h-[500px]">
                {OFFERS.items.map((poster, i) => (
                  <button
                    key={poster.src}
                    type="button"
                    onClick={() => openLightbox(i)}
                    aria-label={`View offer: ${poster.label}`}
                    aria-haspopup="dialog"
                    aria-hidden={!visibleSlides.includes(i)}
                    inert={!visibleSlides.includes(i)}
                    tabIndex={visibleSlides.includes(i) ? 0 : -1}
                    className="surface group relative h-full min-w-0 flex-none overflow-hidden"
                    style={{ aspectRatio: `${poster.width} / ${poster.height}` }}
                  >
                    <Image
                      src={poster.src}
                      alt={poster.alt}
                      width={poster.width}
                      height={poster.height}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 70vw"
                      priority={priority && i === 0}
                      className="h-full w-full object-contain"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-[image:var(--photo-overlay)] px-4 py-3 text-left text-xs text-foreground">
                      <span className="truncate">{poster.label}</span>
                      <ZoomIn
                        aria-hidden
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.5}
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              aria-label="Previous offer"
              onClick={scrollPrev}
              className="surface absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-3 text-foreground transition-[background-color,color] duration-short ease-hallmark-out hover:bg-foreground/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next offer"
              onClick={scrollNext}
              className="surface absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-3 text-foreground transition-[background-color,color] duration-short ease-hallmark-out hover:bg-foreground/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-1">
            {OFFERS.items.map((poster, i) => (
              <button
                key={poster.src}
                aria-label={`Go to ${poster.label}`}
                aria-current={i === selectedIndex ? "true" : undefined}
                onClick={() => scrollTo(i)}
                className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              >
                <span
                  aria-hidden
                  className={`h-2 w-2 rounded-full transition-colors duration-short ease-hallmark-out ${
                    i === selectedIndex ? "bg-accent" : "bg-muted-foreground/40 group-hover:bg-muted-foreground/70"
                  }`}
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeLightbox();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") stepLightbox(-1);
          if (e.key === "ArrowRight") stepLightbox(1);
          if (e.key === "Escape") closeLightbox();
        }}
        aria-label={current ? `${current.label} offer poster` : undefined}
        className="m-auto max-h-[92vh] max-w-[92vw] bg-transparent p-0 backdrop:bg-background/85"
      >
        {current && (
          <div className="relative">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="92vw"
              className="max-h-[92vh] w-auto rounded object-contain"
            />
            <button
              autoFocus
              type="button"
              aria-label="Close offer poster"
              onClick={closeLightbox}
              className="surface absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Previous poster"
              onClick={() => stepLightbox(-1)}
              className="surface absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next poster"
              onClick={() => stepLightbox(1)}
              className="surface absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
