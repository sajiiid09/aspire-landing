import type { PageHeroContent } from "@/lib/content";

export function PageHero({ content }: { content: PageHeroContent }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,hsl(var(--accent)/0.12),transparent_38%)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <h1 className="animate-fade-rise max-w-4xl font-display text-5xl leading-[1.04] tracking-[-0.02em] text-foreground sm:text-6xl lg:text-[4.5rem]">
          {content.title.map((part, index) =>
            part.em ? (
              <em key={index} className="title-em pb-1">
                {part.text}
              </em>
            ) : (
              <span key={index}>{part.text}</span>
            ),
          )}
        </h1>
        <p className="animate-fade-rise-delay mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {content.intro}
        </p>
      </div>
    </section>
  );
}
