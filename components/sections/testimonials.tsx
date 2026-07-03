import Image from "next/image";
import { TESTIMONIALS } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Testimonials() {
  return (
    <section id="stories" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal>
          <div className="text-sm text-muted-foreground">{TESTIMONIALS.eyebrow}</div>
          <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {TESTIMONIALS.title}
          </h2>
        </Reveal>
      </div>

      <Reveal
        stagger
        className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto px-8 pb-4 md:mx-auto md:max-w-7xl"
      >
        {TESTIMONIALS.items.map((t, i) => (
          <figure
            key={t.name}
            className="flex w-[85%] flex-shrink-0 snap-start flex-col overflow-hidden rounded border border-border sm:w-[60%] md:w-[31%]"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={t.image}
                alt={`${t.name}, student in ${t.destination}`}
                fill
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, hsl(var(--background) / 0.9))",
                }}
              />
            </div>
            <blockquote
              className={`flex-1 p-6 font-display text-xl leading-snug text-foreground ${
                i === 0 ? "testimonial-first" : ""
              }`}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="border-t border-border p-6 text-sm text-muted-foreground">
              <span className="text-foreground">{t.name}</span>
              <br />
              {t.university} · {t.destination}
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}
