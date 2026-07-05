import Image from "next/image";
import { HERO } from "@/lib/content";

/** Clean White Agency hero — eyebrow, italic-serif emphasis, 2 CTAs,
 *  trust stat + avatar cluster, overlapping image collage. No video. */
export function DefaultHero() {
  const trust = HERO.trustStats[0];

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-[var(--grid-gap)] px-8 pb-20 pt-32 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="surface animate-fade-rise inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {HERO.eyebrow}
          </p>
          <h1 className="animate-fade-rise mt-6 font-display text-5xl font-medium leading-[1.02] tracking-[-1.5px] text-foreground sm:text-6xl lg:text-7xl">
            {HERO.headline.map((part, i) =>
              part.em ? (
                <em key={i} className="hero-em text-muted-foreground">
                  {part.text}
                </em>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </h1>
          <p className="animate-fade-rise-delay mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {HERO.subtext}
          </p>

          <div className="animate-fade-rise-delay-2 mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {HERO.cta}
            </a>
            <a
              href={HERO.secondaryCta.href}
              className="surface px-8 py-4 text-sm text-foreground transition-colors hover:bg-accent"
            >
              {HERO.secondaryCta.label}
            </a>
          </div>

          <div className="animate-fade-rise-delay-2 mt-12 flex items-center gap-6">
            <div>
              <p className="font-display text-3xl text-foreground">
                {trust.value}
                {trust.suffix}
              </p>
              <p className="text-sm text-muted-foreground">{trust.label}</p>
            </div>
            <div className="h-10 w-px bg-border" aria-hidden />
            <div className="flex -space-x-3">
              {HERO.avatars.map((avatar, i) => (
                <Image
                  key={i}
                  src={avatar.src}
                  alt={avatar.alt}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="animate-fade-rise-delay relative hidden aspect-[4/5] lg:block" aria-hidden>
          <div className="absolute right-0 top-0 h-[70%] w-[78%] border border-border">
            <Image
              src={HERO.collage[0].src}
              alt={HERO.collage[0].alt}
              fill
              sizes="(min-width: 1024px) 40vw, 0px"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute bottom-[8%] left-0 h-[42%] w-[52%] border border-border bg-background p-1.5">
            <div className="relative h-full w-full">
              <Image
                src={HERO.collage[1].src}
                alt={HERO.collage[1].alt}
                fill
                sizes="(min-width: 1024px) 25vw, 0px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-[10%] h-[26%] w-[30%] border border-border bg-background p-1.5">
            <div className="relative h-full w-full">
              <Image
                src={HERO.collage[2].src}
                alt={HERO.collage[2].alt}
                fill
                sizes="(min-width: 1024px) 15vw, 0px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
