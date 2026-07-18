import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { HERO } from "@/lib/content";
import { HeroVideo } from "./hero-video";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-44 pt-32 sm:pb-52 sm:pt-40">
      <div data-header-sentinel className="pointer-events-none absolute left-0 top-[70%] h-px w-px" aria-hidden />
      <HeroVideo src={HERO.videoSrc} poster={HERO.poster} />
      <div className="hero-overlay" aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8">
        <h1 className="hero-enter max-w-4xl font-display text-5xl leading-[1.02] tracking-[-0.025em] text-foreground sm:text-7xl lg:text-[5.5rem]" style={{ "--hero-i": 0 } as CSSProperties}>
          {HERO.headline.map((part, index) => part.em ? <span key={index} className="hero-em pb-1">{part.text}</span> : <span key={index}>{part.text}</span>)}
        </h1>
        <p className="hero-enter mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg" style={{ "--hero-i": 1 } as CSSProperties}>{HERO.subtext}</p>
        <div className="hero-enter mt-10 flex flex-col items-start gap-4 sm:flex-row" style={{ "--hero-i": 2 } as CSSProperties}>
          <Link
            href="/contact"
            className="btn btn-primary group text-base"
          >
            {HERO.cta}
            <ArrowRight className="h-5 w-5 transition-transform duration-micro ease-hallmark-out group-hover:translate-x-1" aria-hidden />
          </Link>
          <Link
            href={HERO.ctaSecondary.href}
            className="btn btn-ghost text-base"
          >
            {HERO.ctaSecondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
