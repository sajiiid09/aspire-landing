import { COURSE_FINDER } from "@/lib/content";
import { COURSE_FINDER_URL } from "@/lib/config";
import { Reveal } from "@/components/reveal";

export function CourseFinderCta() {
  return (
    <section id="course-finder" className="aurora-band bg-secondary/60 section-pad">
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center px-8 text-center">
        <h2 className="aurora-text font-display text-4xl leading-tight text-foreground md:text-5xl">
          {COURSE_FINDER.title}
        </h2>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
          {COURSE_FINDER.body}
        </p>
        <a
          href={COURSE_FINDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="surface mt-12 rounded-full px-14 py-5 text-base text-foreground transition-transform hover:scale-[1.03]"
        >
          {COURSE_FINDER.cta}
        </a>
      </Reveal>
    </section>
  );
}
