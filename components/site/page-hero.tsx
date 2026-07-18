import type { PageHeroContent } from "@/lib/content";

export function PageHero({ content }: { content: PageHeroContent }) {
  return (
    <section className="section-tight relative border-b border-foreground/10 pt-32 md:pt-40">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <h1 className="max-w-4xl font-display text-5xl leading-[1.04] tracking-[-0.02em] text-foreground sm:text-6xl lg:text-[4.5rem]">
          {content.title.map((part, index) =>
            part.em ? (
              <span key={index} className="title-em pb-1">
                {part.text}
              </span>
            ) : (
              <span key={index}>{part.text}</span>
            ),
          )}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {content.intro}
        </p>
      </div>
    </section>
  );
}
