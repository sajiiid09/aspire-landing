import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PageCtaContent } from "@/lib/content";
import { Reveal } from "@/components/reveal";

/** Closing CTA band for inner pages. */
export function PageCta({ content }: { content: PageCtaContent }) {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal>
          <div className="surface flex flex-col items-start gap-8 p-10 md:flex-row md:items-center md:justify-between md:p-14">
            <div>
              <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
                {content.title}
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                {content.body}
              </p>
            </div>
            <Link href={content.href} className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]">
              {content.label}<ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
