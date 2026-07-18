import { HOW_IT_WORKS } from "@/lib/content";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/animate/text-reveal";

export function HowItWorks() {
  return (
    <section className="section-generous">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
        <div>
          <TextReveal className="font-display text-4xl text-foreground md:text-5xl">{HOW_IT_WORKS.title}</TextReveal>
          <Reveal>
            <p className="mt-4 max-w-md text-muted-foreground">{HOW_IT_WORKS.body}</p>
          </Reveal>
        </div>
        <Reveal stagger>
          <ol className="divide-y divide-foreground/10 border-y border-foreground/10">
            {HOW_IT_WORKS.items.map((item, index) => (
              <li key={item.title} className="grid gap-5 py-8 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-8">
                <span className="font-display text-lg text-muted-foreground">0{index + 1}</span>
                <div>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
                    <h3 className="font-display text-2xl text-foreground">{item.title}</h3>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
