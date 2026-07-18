import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PageCtaContent } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

/** Closing CTA card; overlaps into the footer so both read as one section. */
export function PageCta({ content }: { content: PageCtaContent }) {
  return (
    <section className="section-standard">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8">
        <Reveal>
          <div className="band-cream relative z-10 -mb-24 grid overflow-hidden rounded-[2rem] px-6 py-12 shadow-overlap sm:px-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12 md:py-16">
            <div>
              <TextReveal className="max-w-2xl font-display text-3xl leading-tight text-foreground md:text-4xl">
                {content.title}
              </TextReveal>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                {content.body}
              </p>
            </div>
            <Link href={content.href} className="btn btn-primary group mt-8 md:mt-0">
              {content.label}<ArrowUpRight className="h-4 w-4 transition-transform duration-micro ease-hallmark-out group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
