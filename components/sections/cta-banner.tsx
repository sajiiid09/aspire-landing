import { COURSE_FINDER } from "@/lib/content";
import { COURSE_FINDER_URL } from "@/lib/config";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

/** Course Finder CTA shown only when its external URL is configured. */
export function CtaBanner() {
  if (!COURSE_FINDER_URL) return null;
  return (
    <section className="bg-primary/[0.06] section-pad">
      <div className="mx-auto max-w-5xl px-8">
        <Reveal className="surface flex flex-col items-center rounded-xl bg-background/80 px-8 py-16 text-center md:px-16">
          <TextReveal className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            {COURSE_FINDER.title}
          </TextReveal>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
            {COURSE_FINDER.body}
          </p>
          <a
            href={COURSE_FINDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 rounded-lg bg-primary px-10 py-4 text-base font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {COURSE_FINDER.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
