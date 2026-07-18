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
    <section id="faq" className="band-cream section-generous">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <TextReveal className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            {FAQ.title.map((part, index) =>
              part.em ? <span key={index} className="title-em">{part.text}</span> : <span key={index}>{part.text}</span>,
            )}
          </TextReveal>
          <Reveal className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-2xl lg:block">
            <Image src={FAQ.image} alt={FAQ.imageAlt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </Reveal>
        </div>

        <Reveal stagger className="grid min-w-0 gap-3">
          {FAQ.items.map((item, index) => {
            const expanded = open === index;
            return (
              <div key={item.question} className="rounded-xl bg-background/70 shadow-card">
                <h3>
                  <button
                    id={`faq-button-${index}`}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpen(expanded ? null : index)}
                    className="group flex w-full min-w-0 items-center justify-between gap-4 whitespace-normal px-6 py-5 text-left"
                  >
                    <span className="min-w-0 whitespace-normal text-base font-semibold text-foreground transition-colors duration-short ease-hallmark-out group-hover:text-accent">{item.question}</span>
                    <span
                      aria-hidden
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-short ease-hallmark-out ${expanded ? "rotate-45 bg-accent text-background" : "bg-foreground/[0.07] text-foreground"}`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  hidden={!expanded}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
