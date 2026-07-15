import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ABOUT } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

export function About() {
  return (
    <section className="section-pad">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-8 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image src={ABOUT.image} alt={ABOUT.imageAlt} fill sizes="(min-width: 768px) 42vw, 90vw" className="object-cover" />
          </div>
          <div className="surface absolute -bottom-6 right-4 rounded-xl p-5 sm:right-8">
            <p className="metric-value text-3xl text-foreground">{ABOUT.statBadge.value.toLocaleString()}<span className="metric-suffix">{ABOUT.statBadge.suffix}</span></p>
            <p className="mt-1 text-xs text-muted-foreground">{ABOUT.statBadge.label}</p>
          </div>
        </Reveal>
        <div>
          <TextReveal className="font-display text-4xl leading-tight text-foreground md:text-6xl">
            {ABOUT.title.map((part, index) => part.em ? <em key={index} className="title-em pb-1 text-muted-foreground">{part.text}</em> : <span key={index}>{part.text}</span>)}
          </TextReveal>
          <Reveal>
          {ABOUT.paragraphs.map((paragraph) => <p key={paragraph} className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{paragraph}</p>)}
          <Link href={ABOUT.cta.href} className="mt-8 inline-flex items-center gap-2 text-sm text-foreground hover:text-muted-foreground">{ABOUT.cta.label}<ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
