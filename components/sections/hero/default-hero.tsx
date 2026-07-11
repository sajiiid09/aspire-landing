import Image from "next/image";
import { HERO } from "@/lib/content";

/** Clean White Agency hero — full-bleed campus photo (BRD V2 §5 brief),
 *  gradient scrim via --hero-overlay, light-on-dark copy scoped by
 *  .hero-photo variable remap. Eyebrow + secondary CTA use liquid glass. */
export function DefaultHero() {
  const trust = HERO.trustStats[0];

  return (
    <section id="home" className="hero-photo relative flex min-h-screen items-center overflow-hidden">
      <Image
        src={HERO.backgroundImage.src}
        alt={HERO.backgroundImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="hero-overlay" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-24 pt-40">
        <p className="liquid-glass animate-fade-rise inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {HERO.eyebrow}
        </p>
        <h1 className="animate-fade-rise mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.02] tracking-[-1.5px] text-foreground sm:text-6xl lg:text-7xl">
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
            className="liquid-glass px-8 py-4 text-sm text-foreground transition-transform hover:scale-[1.02]"
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
    </section>
  );
}
