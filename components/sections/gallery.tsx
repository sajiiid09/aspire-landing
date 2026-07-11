import Image from "next/image";
import { GALLERY } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Gallery() {
  return (
    <section id="gallery" className="section-pad">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal>
          <div className="text-sm text-muted-foreground">{GALLERY.eyebrow}</div>
          <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {GALLERY.title}
          </h2>
        </Reveal>

        <Reveal stagger className="mt-16 grid grid-cols-2 gap-4 sm:gap-6">
          {GALLERY.items.map((item) => (
            <figure key={item.image} className="relative">
              <div className="relative aspect-[4/5]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 45vw, 90vw"
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
        </Reveal>
      </div>
    </section>
  );
}
