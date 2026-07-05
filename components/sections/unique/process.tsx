import { Check } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/content";
import { Reveal } from "@/components/reveal";

/** Default theme's unique section — full-bleed accent band with the
 *  step-by-step journey checklist (PLAN.md §5.1). */
export function Process() {
  return (
    <section id="process" className="bg-primary text-primary-foreground section-pad">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal>
          <div className="text-sm opacity-70">{PROCESS_STEPS.eyebrow}</div>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
            {PROCESS_STEPS.title}
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed opacity-80">{PROCESS_STEPS.body}</p>
        </Reveal>

        <Reveal
          stagger
          className="mt-14 grid grid-cols-1 gap-x-[var(--grid-gap)] gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROCESS_STEPS.steps.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <span
                aria-hidden
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-current/40"
              >
                <Check className="h-4 w-4" strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-display text-lg">
                  <span aria-hidden className="mr-2 opacity-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed opacity-75">{step.description}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
