import Image from "next/image";
import { FAQ_ITEMS } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section id="faq" className="section-pad">
      <div className="mx-auto grid max-w-7xl gap-[var(--grid-gap)] px-8 md:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="text-sm text-muted-foreground">{FAQ_ITEMS.eyebrow}</div>
          <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {FAQ_ITEMS.title}
          </h2>
          <div className="relative mt-10 hidden aspect-[4/3] md:block">
            <Image
              src={FAQ_ITEMS.image}
              alt={FAQ_ITEMS.imageAlt}
              fill
              sizes="(min-width: 768px) 40vw, 0px"
              className="rounded object-cover"
            />
          </div>
        </Reveal>

        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.items.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="font-display text-lg text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
