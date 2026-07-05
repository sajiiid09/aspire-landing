import { HERO } from "@/lib/content";

/** Cosmos hero — starfield (.hero-decor) + aurora glow (.hero-aurora),
 *  aurora-gradient emphasis, floating orb CTA. All visuals in themes.css. */
export function SpaceHero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="hero-aurora absolute inset-0 z-0" aria-hidden />
      <div className="hero-decor" aria-hidden />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-32 pt-32 text-center">
        <p className="animate-fade-rise text-xs uppercase tracking-[0.35em] text-muted-foreground">
          {HERO.eyebrow}
        </p>
        <h1 className="animate-fade-rise mt-8 max-w-5xl font-display text-5xl font-semibold leading-[1.02] tracking-[-1.5px] text-foreground sm:text-7xl">
          {HERO.headline.map((part, i) =>
            part.em ? (
              <em key={i} className="aurora-text not-italic">
                {part.text}
              </em>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </h1>
        <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {HERO.subtext}
        </p>

        <a
          href="#course-finder"
          className="orb-cta animate-fade-rise-delay-2 mt-16 flex h-36 w-36 items-center justify-center rounded-full bg-[linear-gradient(135deg,hsl(255_85%_72%/0.9),hsl(190_90%_65%/0.75))] p-4 text-center text-sm font-medium leading-snug text-[hsl(240_45%_8%)] transition-transform hover:scale-105"
        >
          {HERO.cta}
        </a>
      </div>
    </section>
  );
}
