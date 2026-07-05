import { COURSE_FINDER } from "@/lib/content";
import { COURSE_FINDER_URL } from "@/lib/config";
import { Reveal } from "@/components/reveal";

/** Final CTA band (eduwizz reference) — re-theme of the former CourseFinderCta.
 *  Keeps id="course-finder": hero CTAs and nav anchors target it. */
export function CtaBanner() {
  return (
    <section id="course-finder" className="aurora-band bg-primary/[0.06] section-pad">
      <div className="mx-auto max-w-5xl px-8">
        <Reveal className="surface flex flex-col items-center rounded bg-background/80 px-8 py-16 text-center md:px-16">
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
            className="mt-12 bg-primary px-14 py-5 text-base font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            style={{ borderRadius: "var(--card-radius)" }}
          >
            {COURSE_FINDER.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
