import type { PageHero as PageHeroContent } from "@/lib/content";

/** Shared top band for inner pages — eyebrow pill, h1 with emphasis, intro. */
export function PageHero({ content }: { content: PageHeroContent }) {
  return (
    <div className="border-b border-border pt-32">
      <div className="mx-auto max-w-7xl px-8 pb-16 md:pb-20">
        <p className="surface animate-fade-rise inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {content.eyebrow}
        </p>
        <h1 className="animate-fade-rise mt-6 max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-[-1px] text-foreground sm:text-5xl lg:text-6xl">
          {content.title.map((part, i) =>
            part.em ? (
              <em key={i} className="title-em text-muted-foreground">
                {part.text}
              </em>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </h1>
        <p className="animate-fade-rise-delay mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {content.intro}
        </p>
      </div>
    </div>
  );
}
