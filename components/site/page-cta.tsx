import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PageCtaContent } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

/** Closing CTA band for inner pages. */
export function PageCta({ content }: { content: PageCtaContent }) {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal>
          <div className="band-cream flex flex-col items-start gap-8 rounded-2xl p-10 shadow-[0_24px_60px_hsl(201_100%_6%/0.25)] md:flex-row md:items-center md:justify-between md:p-14">
            <div>
              <TextReveal className="font-display text-3xl leading-tight text-foreground md:text-4xl">
                {content.title}
              </TextReveal>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                {content.body}
              </p>
            </div>
            <Link href={content.href} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]">
              {content.label}<ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
