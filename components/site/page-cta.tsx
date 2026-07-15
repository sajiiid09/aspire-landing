import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PageCtaContent } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

/** Closing CTA card; overlaps into the footer so both read as one section. */
export function PageCta({ content }: { content: PageCtaContent }) {
  return (
    <section className="mt-20 sm:mt-28">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <Reveal>
          <div className="band-cream relative z-10 -mb-24 rounded-[2rem] px-6 py-12 text-center shadow-[0_24px_60px_hsl(201_100%_6%/0.35)] sm:px-12 md:py-16">
            <TextReveal className="mx-auto max-w-2xl font-display text-3xl leading-tight text-foreground md:text-4xl">
              {content.title}
            </TextReveal>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
              {content.body}
            </p>
            <Link href={content.href} className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]">
              {content.label}<ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
