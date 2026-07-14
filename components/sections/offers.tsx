"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { OFFERS } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Offers() {
  const autoplay = useRef(
    Autoplay({ delay: 3500, stopOnMouseEnter: true, stopOnInteraction: false }),
  );
  // Stable across renders. An inline array/options object here would make
  // embla reinit (and reset the autoplay timer) on every re-render.
  const plugins = useMemo(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return reduced ? [] : [autoplay.current];
  }, []);
  const options = useMemo(
    () => ({ loop: true, align: "start" as const, containScroll: "trimSnaps" as const }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  // Native <dialog> traps focus and closes on Escape; it does not lock the
  // page scroll behind it, so do that while the lightbox is open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    document.documentElement.classList.add("overflow-hidden");
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [lightboxIndex]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    emblaApi?.plugins().autoplay?.reset();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    emblaApi?.plugins().autoplay?.reset();
  }, [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => {
      emblaApi?.scrollTo(i);
      emblaApi?.plugins().autoplay?.reset();
    },
    [emblaApi],
  );

  const openLightbox = useCallback(
    (i: number) => {
      setLightboxIndex(i);
      emblaApi?.plugins().autoplay?.stop();
      dialogRef.current?.showModal();
    },
    [emblaApi],
  );
  const closeLightbox = useCallback(() => {
    dialogRef.current?.close();
    setLightboxIndex(null);
    emblaApi?.plugins().autoplay?.play();
  }, [emblaApi]);

  // Escape closes the native dialog without going through closeLightbox, so
  // reset state on the close event as well.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setLightboxIndex(null);
      emblaApi?.plugins().autoplay?.play();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [emblaApi]);
  const stepLightbox = useCallback((delta: number) => {
    setLightboxIndex((i) =>
      i === null ? i : (i + delta + OFFERS.items.length) % OFFERS.items.length,
    );
  }, []);

  const current = lightboxIndex === null ? null : OFFERS.items[lightboxIndex];

  return (
    <section id="offers" className="section-pad">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal>
          <h2 className="section-title font-display text-4xl leading-tight text-foreground md:text-5xl">
            {OFFERS.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {OFFERS.body}
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex h-[420px] gap-4 md:h-[500px]">
                {OFFERS.items.map((poster, i) => (
                  <button
                    key={poster.src}
                    type="button"
                    onClick={() => openLightbox(i)}
                    aria-label={`View offer: ${poster.label}`}
                    aria-haspopup="dialog"
                    className="surface group relative min-w-0 flex-[0_0_auto] overflow-hidden"
                  >
                    <Image
                      src={poster.src}
                      alt={poster.alt}
                      width={poster.width}
                      height={poster.height}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 70vw"
                      loading="lazy"
                      className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <span
                      className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-4 py-3 text-left text-xs text-foreground"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent, hsl(var(--background) / 0.92))",
                      }}
                    >
                      <span className="truncate">{poster.label}</span>
                      <ZoomIn
                        aria-hidden
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:scale-110"
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
              className="surface absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-3 text-foreground transition-transform hover:scale-[1.06]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next offer"
              onClick={scrollNext}
              className="surface absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-3 text-foreground transition-transform hover:scale-[1.06]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {OFFERS.items.map((poster, i) => (
              <button
                key={poster.src}
                aria-label={`Go to ${poster.label}`}
                aria-current={i === selectedIndex}
                onClick={() => scrollTo(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === selectedIndex ? "bg-foreground" : "bg-muted-foreground/40"
                }`}
              />
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
        className="m-auto max-h-[92vh] max-w-[92vw] bg-transparent p-0 backdrop:bg-[hsl(var(--background)/0.85)] backdrop:backdrop-blur-sm"
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
              className="surface absolute right-3 top-3 rounded-full p-2 text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Previous poster"
              onClick={() => stepLightbox(-1)}
              className="surface absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next poster"
              onClick={() => stepLightbox(1)}
              className="surface absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
