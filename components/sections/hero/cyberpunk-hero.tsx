import { HERO } from "@/lib/content";

/** Terminal/HUD hero — background video, boot log, glitch headline, typed-prompt CTA.
 *  HUD overlay/filter (.hero-overlay, .hero-video), scanlines (.hero-decor), and
 *  neon grid (.hero-grid) resolve in themes.css. */
export function CyberpunkHero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <video
        className="hero-video absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src={HERO.videoSrcCyberpunk} type="video/mp4" />
      </video>
      <div className="hero-overlay" aria-hidden />
      <div className="hero-grid absolute inset-0 z-0" aria-hidden />
      <div className="hero-decor" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-8 pb-24 pt-32">
        <div className="animate-fade-rise surface max-w-md rounded p-4 font-accent text-xs leading-relaxed text-muted-foreground">
          {HERO.terminalLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <h1 className="hero-title animate-fade-rise mt-10 max-w-5xl font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {HERO.headline.map((part, i) =>
            part.em ? (
              <em key={i} className="hero-em not-italic text-primary">
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
          className="surface animate-fade-rise-delay-2 mt-12 inline-block self-start rounded px-10 py-4 font-accent text-sm text-primary transition-transform hover:scale-[1.02]"
        >
          <span className="prompt-caret">&gt; {HERO.cta.toLowerCase().replaceAll(" ", "_")}</span>
        </a>
      </div>
    </section>
  );
}
