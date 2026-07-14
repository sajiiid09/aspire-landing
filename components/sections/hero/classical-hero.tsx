import Link from "next/link";
import { HERO } from "@/lib/content";
import { HeroVideo } from "./hero-video";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <div data-header-sentinel className="pointer-events-none absolute left-0 top-[72vh] h-px w-px" aria-hidden />
      <HeroVideo src={HERO.videoSrc} poster={HERO.poster} />
      <div className="hero-overlay" aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-28 text-center sm:px-8">
        <h1 className="hero-title animate-fade-rise mx-auto max-w-5xl font-display text-5xl leading-[1.02] tracking-[-0.025em] text-foreground sm:text-7xl lg:text-[5.5rem]">
          {HERO.headline.map((part, index) => part.em ? <em key={index} className="hero-em pb-1">{part.text}</em> : <span key={index}>{part.text}</span>)}
        </h1>
        <p className="animate-fade-rise-delay mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{HERO.subtext}</p>
        <Link href="/contact" className="liquid-glass animate-fade-rise-delay-2 mt-9 inline-flex rounded-lg px-9 py-4 text-base text-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]">{HERO.cta}</Link>
      </div>
    </section>
  );
}
