import { ArrowUpRight } from "lucide-react";
import { COURSE_FINDER } from "@/lib/content";
import { COURSE_FINDER_URL } from "@/lib/config";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

/** Course Finder CTA shown only when its external URL is configured. */
export function CtaBanner() {
  if (!COURSE_FINDER_URL) return null;
  return (
    <section className="section-standard bg-primary/[0.04]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="surface grid items-end gap-10 rounded-[2rem] bg-background/80 px-8 py-14 md:grid-cols-[minmax(0,1fr)_auto] md:px-14 md:py-16">
          <div>
            <TextReveal className="font-display text-4xl leading-tight text-foreground md:text-5xl">
              {COURSE_FINDER.title}
            </TextReveal>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              {COURSE_FINDER.body}
            </p>
          </div>
          <a
            href={COURSE_FINDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary group"
          >
            {COURSE_FINDER.cta}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-micro ease-hallmark-out group-hover:translate-x-0.5" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
