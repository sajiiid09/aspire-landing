import { HERO } from "@/lib/content";

export function Hero() {
  return (
    <section id="home" className="over-video relative min-h-screen">
      <video
        className="hero-video absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={HERO.poster}
        aria-hidden
      >
        <source src={HERO.videoSrc} type="video/mp4" />
      </video>
      <div className="hero-overlay" aria-hidden />
      <div className="hero-decor" aria-hidden />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-40 pt-32 text-center">
        <h1 className="hero-title animate-fade-rise max-w-7xl font-display text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-foreground sm:text-7xl md:text-8xl">
          {HERO.headline.map((part, i) =>
            "em" in part && part.em ? (
              <em key={i} className="hero-em not-italic text-muted-foreground">
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
          className="liquid-glass animate-fade-rise-delay-2 mt-12 cursor-pointer rounded-full px-14 py-5 text-base text-foreground transition-transform hover:scale-[1.03]"
        >
          {HERO.cta}
        </a>
      </div>
    </section>
  );
}
