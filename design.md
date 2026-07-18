# Design — Aspire Global Education

A locked design system for the full marketing site. Every route uses the same palette, typography, CTA voice, and interaction discipline.

## Genre

Atmospheric with editorial typography: cinematic, assured, documentary, and restrained.

## Macrostructure family

- Marketing homepage: **Photographic** — documentary video/image leads, copy is left-biased, and image edges create section breaks.
- Marketing inner pages: **Long Document / editorial composition** — compact left-aligned heroes, continuous reading rhythm, and asymmetric proof blocks.
- Content pages: **Long Document** — typography first, no decorative motion.

Navigation is N10 scroll-morph. The footer is Ft5 Statement.

## Theme

- `--color-paper`: `oklch(0.24 0.055 228)`
- `--color-paper-2`: `oklch(0.29 0.048 226)`
- `--color-ink`: `oklch(0.965 0.018 84)`
- `--color-ink-2`: `oklch(0.78 0.03 225)`
- `--color-rule`: `oklch(0.43 0.04 225)`
- `--color-accent`: `oklch(0.72 0.12 72)`
- `--color-focus`: `oklch(0.84 0.11 80)`

The accent is a signal, not a surface: active navigation, focus, a restrained heading underline, and small CTA details only.

## Typography

- Display: Fraunces variable, roman, weight 500–600.
- Body: Manrope, weights 400–600.
- Display tracking: `-0.025em`.
- Display cap: `clamp(3rem, 6vw, 5.5rem)`.
- Headings are never italic. Emphasis uses amber colour plus a fine underline.

## Spacing

The 4-point named scale lives in `tokens.css`. Sections use three rhythms: tight, standard, and generous. Raw spacing values are reserved for unavoidable optical corrections.

## Motion

- Page entrance: homepage hero only, opacity plus 8px translation, 420ms.
- Functional motion: metric count-up, accordion state, menu state, and dialog state.
- No scroll-triggered section reveals, card lifts, image zooms, or carousel autoplay.
- Reduced motion removes spatial movement and caps transitions at 150ms.

## Microinteractions stance

- Buttons shift colour; arrows may translate by 2px. Buttons never scale.
- Cards shift surface or rule colour only.
- Focus rings appear instantly and remain visible at 3:1 or better.
- Success is silent when the result is already visible.

## CTA voice

- Primary: tinted-ivory fill, navy ink, pill shape, short one-line action.
- Secondary: transparent surface, visible rule, one-line action.
- Active state translates down by 1px; no hover lift.

## What every route shares

Wordmark, palette, Fraunces/Manrope pairing, CTA geometry, focus treatment, static section content, and the statement footer.

## What routes may vary

Image crops, asymmetric column spans, section rhythm, and whether the real supplied photography/video appears full-bleed or inline.

## Exports

### CSS custom properties

`tokens.css` at the project root is the source of truth and contains the full palette, typography, spacing, motion, radius, rule, shadow, and z-index tokens. Core portable export:

```css
:root {
  --color-paper: oklch(0.24 0.055 228);
  --color-paper-2: oklch(0.29 0.048 226);
  --color-ink: oklch(0.965 0.018 84);
  --color-ink-2: oklch(0.78 0.03 225);
  --color-rule: oklch(0.43 0.04 225);
  --color-accent: oklch(0.72 0.12 72);
  --color-focus: oklch(0.84 0.11 80);
  --font-display: "Fraunces", ui-serif, serif;
  --font-body: "Manrope", ui-sans-serif, sans-serif;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-micro: 120ms;
  --dur-short: 220ms;
  --dur-long: 420ms;
}
```

### Tailwind v4 `@theme`

```css
@theme {
  --color-paper: oklch(0.24 0.055 228);
  --color-paper-2: oklch(0.29 0.048 226);
  --color-ink: oklch(0.965 0.018 84);
  --color-ink-2: oklch(0.78 0.03 225);
  --color-rule: oklch(0.43 0.04 225);
  --color-accent: oklch(0.72 0.12 72);
  --color-focus: oklch(0.84 0.11 80);
  --font-display: var(--font-fraunces), ui-serif, serif;
  --font-body: var(--font-manrope), ui-sans-serif, sans-serif;
  --spacing-md: 1.5rem;
  --spacing-xl: 3rem;
  --text-md: 1.125rem;
  --text-2xl: 2.25rem;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### DTCG `tokens.json`

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "color": {
    "paper": { "$value": "oklch(0.24 0.055 228)", "$type": "color" },
    "paper-2": { "$value": "oklch(0.29 0.048 226)", "$type": "color" },
    "ink": { "$value": "oklch(0.965 0.018 84)", "$type": "color" },
    "ink-2": { "$value": "oklch(0.78 0.03 225)", "$type": "color" },
    "rule": { "$value": "oklch(0.43 0.04 225)", "$type": "color" },
    "accent": { "$value": "oklch(0.72 0.12 72)", "$type": "color" },
    "focus": { "$value": "oklch(0.84 0.11 80)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Fraunces, ui-serif, serif", "$type": "fontFamily" },
    "body": { "$value": "Manrope, ui-sans-serif, sans-serif", "$type": "fontFamily" }
  },
  "space": {
    "md": { "$value": "1.5rem", "$type": "dimension" },
    "xl": { "$value": "3rem", "$type": "dimension" }
  }
}
```

### shadcn/ui CSS variables

Aspire maps shadcn's primary role to the site's tinted-ivory CTA rather than to the amber signal accent.

```css
:root {
  --background: 0.24 0.055 228;
  --foreground: 0.965 0.018 84;
  --card: 0.29 0.048 226;
  --card-foreground: 0.965 0.018 84;
  --primary: 0.965 0.018 84;
  --primary-foreground: 0.24 0.055 228;
  --secondary: 0.33 0.043 224;
  --secondary-foreground: 0.965 0.018 84;
  --muted: 0.43 0.04 225;
  --muted-foreground: 0.78 0.03 225;
  --border: 0.43 0.04 225;
  --input: 0.58 0.035 225;
  --ring: 0.84 0.11 80;
  --radius: 0.75rem;
}
```
