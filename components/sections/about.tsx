"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ABOUT } from "@/lib/content";
import { useCountUp, useInView } from "@/lib/hooks";
import { Reveal } from "@/components/reveal";

function StatBadge() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const value = useCountUp(ABOUT.statBadge.value, inView);

  return (
    <div
      ref={ref}
      className="surface absolute -right-5 top-8 flex h-32 w-32 flex-col items-center justify-center !rounded-full bg-background/80 text-center backdrop-blur md:-right-8"
    >
      <span className="font-display text-2xl text-foreground">
        {value.toLocaleString()}
        {ABOUT.statBadge.suffix}
      </span>
      <span className="mt-1 px-3 text-xs text-muted-foreground">{ABOUT.statBadge.label}</span>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="section-pad">
      <div className="mx-auto grid max-w-7xl items-center gap-[var(--grid-gap)] px-8 md:grid-cols-2">
        <Reveal className="relative">
          <div className="relative mr-8 aspect-[4/5] max-w-md md:mr-12">
            <Image
              src={ABOUT.image}
              alt={ABOUT.imageAlt}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="rounded object-cover"
            />
            <StatBadge />
          </div>
        </Reveal>

        <Reveal>
          <div className="text-sm text-muted-foreground">{ABOUT.eyebrow}</div>
          <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {ABOUT.title.map((part, i) =>
              part.em ? (
                <em key={i} className="title-em text-muted-foreground">
                  {part.text}
                </em>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </h2>
          {ABOUT.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-6 leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
          <ul className="mt-8 flex flex-wrap gap-2">
            {ABOUT.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
          <Link
            href={ABOUT.cta.href}
            className="mt-8 inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 transition-colors hover:text-muted-foreground hover:underline"
          >
            {ABOUT.cta.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
