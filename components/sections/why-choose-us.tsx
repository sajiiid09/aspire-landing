import { WHY_CHOOSE_US } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-secondary/40 section-pad">
      <div className="mx-auto grid max-w-7xl gap-[var(--grid-gap)] px-8 md:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="text-sm text-muted-foreground">{WHY_CHOOSE_US.eyebrow}</div>
          <h2 className="section-title mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {WHY_CHOOSE_US.title}
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            {WHY_CHOOSE_US.body}
          </p>
          <a
            href={WHY_CHOOSE_US.cta.href}
            className="surface mt-10 inline-block rounded-full px-8 py-3.5 text-sm text-foreground transition-transform hover:scale-[1.03]"
          >
            {WHY_CHOOSE_US.cta.label}
          </a>
        </Reveal>

        <Reveal stagger className="flex flex-col">
          {WHY_CHOOSE_US.items.map((item, i) => (
            <div
              key={item.title}
              className="flex gap-6 border-b border-border py-8 first:pt-0 last:border-b-0"
            >
              <span
                aria-hidden
                className="font-display text-4xl text-muted-foreground/40 md:text-5xl"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl text-foreground md:text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
