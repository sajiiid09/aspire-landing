import { HOW_IT_WORKS } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

export function HowItWorks() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <TextReveal className="font-display text-4xl text-foreground md:text-5xl">{HOW_IT_WORKS.title}</TextReveal>
        <Reveal>
          <p className="mt-4 max-w-xl text-muted-foreground">{HOW_IT_WORKS.body}</p>
        </Reveal>
        <Reveal stagger className="mt-12 grid gap-4 md:grid-cols-[1.2fr_0.9fr_1.1fr]">
          {HOW_IT_WORKS.items.map((item, index) => (
            <article key={item.title} className={`surface rounded-xl p-8 ${index === 1 ? "md:mt-12" : ""}`}>
              <item.icon className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-8 font-display text-2xl text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
