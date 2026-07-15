"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { FAQ } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="band-cream section-pad">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-foreground/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {FAQ.badge}
            </span>
          </Reveal>
          <TextReveal className="mt-5 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {FAQ.title.map((part, index) =>
              part.em ? <em key={index} className="title-em">{part.text}</em> : <span key={index}>{part.text}</span>,
            )}
          </TextReveal>
          <Reveal className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
            <Image src={FAQ.image} alt={FAQ.imageAlt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </Reveal>
        </div>

        <Reveal stagger className="grid gap-3">
          {FAQ.items.map((item, index) => {
            const expanded = open === index;
            return (
              <div key={item.question} className="rounded-xl bg-background/70 shadow-[0_10px_30px_hsl(201_60%_20%/0.06)]">
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpen(expanded ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-foreground">{item.question}</span>
                    <span
                      aria-hidden
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground/[0.07] text-foreground transition-transform duration-300 ${expanded ? "rotate-45" : ""}`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
