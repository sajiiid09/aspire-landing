# Design System — Aspire Global Education Landing Page

Visual source of truth for the Aspire Global Education landing page. Architecture and code conventions live in `ARCHITECTURE.md` and `AGENT.md`.

## 1. Brand & Voice

Aspire Global Education is a study-abroad consultancy. The landing page positions it as premium, calm, and aspirational — cinematic rather than salesy.

**Copy register:** short, editorial, confident. Headlines are poetic but concrete (adapted from the reference register of "Where dreams rise through the silence"). Body copy is plain and warm.

- Hero headline (adapted to Aspire): **"Where ambition finds its horizon."** — emphasis words ("ambition", "its horizon.") rendered in the muted accent color, matching the reference treatment.
- Hero subtext: "We guide students from first question to first day abroad — universities, visas, scholarships, and everything between. Calm, expert, end to end."
- Primary CTA label: **"Begin Your Journey"**. Portal button label: **"Student Portal"** (external redirect only).

> All stats figures, destination lists, testimonials, and contact details in this document are **placeholders pending real BRD data**.

## 2. Design Inspirations (mapping)

| Reference | Carries into |
|---|---|
| Evergreen Nexus University (gradient-overlay photos, oversized editorial headlines on imagery) | Study Destinations cards, Testimonials imagery treatment |
| LimeIQ newsroom (warm editorial canvas, serif display, hairline-bordered card grid, underlined active filters) | Our Services grid, Destinations grid language, section header style |
| Ondex stats (glassmorphic stat tiles with corner dots over dark photo/video) | Statistics Counter section, glass tile language generally |
| Velorah hero prompt (video hero, liquid glass, Instrument Serif, fade-rise) | Hero + Navigation, global glass + motion system |

## 3. Token Architecture

Every visual decision routes through CSS variables on `:root`, overridden per theme via `[data-theme="…"]`. Components never hardcode colors or fonts. Tailwind maps utilities to these vars (see `ARCHITECTURE.md`).

Color values are HSL triplets (consumed as `hsl(var(--background))`).

### Core token set

```css
:root {
  /* color */
  --background; --foreground;
  --muted; --muted-foreground;
  --primary; --primary-foreground;
  --secondary; --accent;
  --border; --input; --ring;
  --glow;                    /* theme accent for glows/highlights; transparent where unused */

  /* typography */
  --font-display; --font-body; --font-accent;   /* accent = cursive/mono per theme */

  /* surfaces */
  --radius;
  --glass-bg; --glass-blur; --glass-border-gradient;

  /* hero treatment */
  --hero-overlay;            /* gradient/tint layered above video */
  --hero-video-filter;       /* CSS filter applied to <video> */
}
```

## 4. The Four Themes (full skins)

Layout and markup are identical across themes. Only token values (colors, fonts, hero overlay, decorative layer) change.

### 4.1 `default` — Cinematic Navy

Base theme, taken directly from the hero prompt.

| Token | Value |
|---|---|
| `--background` | `201 100% 13%` (deep navy) |
| `--foreground` | `0 0% 100%` |
| `--muted-foreground` | `240 4% 66%` |
| `--primary` / `--primary-foreground` | `0 0% 100%` / `0 0% 4%` |
| `--secondary`, `--muted`, `--accent` | `0 0% 10%` |
| `--border`, `--input` | `0 0% 18%` |
| `--font-display` | `'Instrument Serif', serif` |
| `--font-body` | `'Inter', sans-serif` (weights 400/500) |
| Hero treatment | Video untouched — no overlay, no filter. Video provides all depth. |
| Decorative layer | None. Minimalist. |

### 4.2 `classical` — Academic Manuscript

Warm parchment editorial register (LimeIQ reference), cursive influence.

| Token | Value |
|---|---|
| `--background` | `39 32% 89%` (parchment cream) |
| `--foreground` | `24 25% 12%` (ink brown-black) |
| `--muted-foreground` | `28 12% 40%` |
| `--primary` / `--primary-foreground` | `24 25% 12%` / `39 32% 92%` |
| `--border` | `30 15% 74%` (hairline sepia) |
| `--font-display` | `'Cormorant Garamond', serif` |
| `--font-body` | `'EB Garamond', serif` |
| `--font-accent` | `'Pinyon Script', cursive` — emphasis words in headlines only, never body |
| Hero treatment | Warm sepia tint overlay `linear-gradient(rgba(58,40,20,.45), rgba(58,40,20,.65))` + `sepia(.35) contrast(.95)` filter |
| Decorative layer | Hairline rules above/below section headers; drop-cap on first testimonial |

### 4.3 `cyberpunk` — Neon Circuit

| Token | Value |
|---|---|
| `--background` | `260 30% 5%` (near-black violet) |
| `--foreground` | `180 100% 92%` |
| `--muted-foreground` | `280 15% 60%` |
| `--primary` / `--primary-foreground` | `320 100% 60%` (magenta) / `260 30% 5%` |
| `--accent` | `180 100% 50%` (cyan) |
| `--border` | `300 80% 30%` |
| `--glow` | `180 100% 50%` |
| `--font-display` | `'Orbitron', sans-serif` |
| `--font-body` | `'Space Grotesk', sans-serif` |
| `--font-accent` | `'JetBrains Mono', monospace` — stats digits, nav links |
| Hero treatment | Neon duotone overlay `linear-gradient(160deg, rgba(255,0,170,.25), rgba(0,255,255,.2))` + subtle scanline layer (repeating-linear-gradient, 3px, opacity .06) + `saturate(1.4) hue-rotate(-10deg)` |
| Decorative layer | Glass elements gain `box-shadow: 0 0 24px hsl(var(--glow) / .25)`; borders shift to glow gradient |

### 4.4 `space` — Sky / Stars

| Token | Value |
|---|---|
| `--background` | `240 45% 8%` (deep space indigo) |
| `--foreground` | `220 60% 96%` |
| `--muted-foreground` | `230 25% 68%` |
| `--primary` / `--primary-foreground` | `255 85% 72%` (aurora violet) / `240 45% 8%` |
| `--accent` | `190 90% 65%` (ice blue) |
| `--border` | `240 30% 24%` |
| `--font-display` | `'Sora', sans-serif` (clean geometric) |
| `--font-body` | `'Inter', sans-serif` |
| Hero treatment | Deep-space gradient overlay `linear-gradient(rgba(10,10,40,.55), rgba(10,10,40,.8))` + CSS starfield layer (two `radial-gradient` dot fields, parallax via slow `translateY` keyframes) above the video |
| Decorative layer | Aurora gradient accent (`linear-gradient(90deg, violet, ice-blue)`) on section header underlines and stat digits; faint starfield repeats behind Statistics section |

**Contrast rule:** every theme must hold WCAG AA (4.5:1) for body text on `--background` and on glass surfaces. `classical` is the light theme — verify glass tiles use dark ink text, not white.

## 5. Typography

- Display: `var(--font-display)` — h1–h3, stat digits, logo.
- Body: `var(--font-body)` — everything else.
- Accent: `var(--font-accent)` — theme-specific flourish only (cursive emphasis words in `classical`, mono digits/labels in `cyberpunk`). Themes without it fall back to display font.

Scale (desktop → mobile):

| Role | Size |
|---|---|
| Hero h1 | `text-5xl sm:text-7xl md:text-8xl`, `leading-[0.95]`, `tracking-[-2.46px]`, `font-normal` |
| Section h2 | `text-4xl md:text-5xl`, tight leading |
| Card h3 | `text-xl md:text-2xl` |
| Body | `text-base sm:text-lg`, `leading-relaxed` |
| Labels/eyebrows | `text-sm`, `text-muted-foreground`, small-caps tracking in classical |
| Stat digits | `text-5xl md:text-6xl`, display font |

Fonts load via `next/font/google` (see `ARCHITECTURE.md`); all six families declared with `display: swap`.

## 6. Liquid Glass (global surface language)

Used by: nav CTA, hero CTA, stat tiles, floating theme switcher, sticky nav background on scroll. Spec preserved verbatim from hero prompt:

```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

Theme adjustments via vars only: `classical` swaps white glass tints for warm ink tints (`rgba(58,40,20,…)`); `cyberpunk` adds `--glow` box-shadow; `space` unchanged from default.

## 7. Motion System

Keyframes verbatim from hero prompt:

```css
@keyframes fade-rise {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-rise { animation: fade-rise 0.8s ease-out both; }
.animate-fade-rise-delay { animation: fade-rise 0.8s ease-out 0.2s both; }
.animate-fade-rise-delay-2 { animation: fade-rise 0.8s ease-out 0.4s both; }
```

Rules:
- Hero: h1 `animate-fade-rise`, subtext `-delay`, CTA `-delay-2`. On-load only.
- All other sections: scroll-reveal via `IntersectionObserver` (single reusable hook), same fade-rise curve, children staggered 0.1s, triggered once at 20% visibility.
- Stats: count-up animation from 0 when tile enters viewport (~1.5s ease-out), runs once.
- Hover: interactive glass elements `hover:scale-[1.03]` with `transition-transform`; links `hover:text-foreground transition-colors`.
- `prefers-reduced-motion: reduce` → all animations disabled, counters render final values, hero video paused showing poster frame.

## 8. Sections (in page order)

### 8.1 Header / Navigation
- `relative z-10`, flex row, `justify-between`, `px-8 py-6`, `max-w-7xl mx-auto`. Transparent over hero; gains `.liquid-glass` background + becomes `fixed` after scrolling past hero (progressive enhancement).
- Logo: **"Aspire Global®"** (`®` as `<sup class="text-xs">`), `text-3xl tracking-tight`, display font.
- Links (`hidden md:flex`, `text-sm text-muted-foreground`, `hover:text-foreground transition-colors`): Home (active, `text-foreground`), Services, Destinations, Stories, Contact — anchor links to sections.
- Right side: **"Student Portal"** — liquid-glass `rounded-full px-6 py-2.5 text-sm`, `hover:scale-[1.03]`. Plain `<a href={PORTAL_URL} target="_blank" rel="noopener noreferrer">`. External redirect only; no auth logic ever.
- Mobile: hamburger → full-screen glass overlay menu, links stacked, portal button at bottom.

### 8.2 Hero
Per prompt, adapted copy:
- Fullscreen `<video autoPlay loop muted playsInline preload="metadata" poster={…}>`, `absolute inset-0 w-full h-full object-cover z-0`. Source: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4` *(design-phase asset; production video TBD)*.
- Theme overlay layer (`--hero-overlay`, `--hero-video-filter`) between video (z-0) and content (z-10); `default` theme renders none.
- Content: flex column, centered, `text-center px-6 pt-32 pb-40 py-[90px]`.
- H1: "Where **ambition** finds **its horizon.**" — emphasis words in `<em class="not-italic text-muted-foreground">` (in `classical`, emphasis words additionally take `--font-accent` cursive).
- Subtext: `text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed`.
- CTA: "Begin Your Journey" — liquid-glass `rounded-full px-14 py-5 text-base mt-12`, `hover:scale-[1.03]`, scrolls to Course Finder CTA section.
- No decorative blobs/gradients beyond the theme overlay. Video provides depth.

### 8.3 Statistics Counter
Ondex reference: glass tiles floating over a full-bleed dark image band (or continuation of theme background).
- Split layout: left column — eyebrow dot + label ("Our Impact"), h2 "Proven Guidance, Real Outcomes", short paragraph. Right: 2×2 grid of `.liquid-glass` stat tiles.
- Tile: corner dots (4px, `--muted-foreground` at 40%) in all four corners per reference; digit in display font `text-5xl md:text-6xl`; caption `text-sm text-muted-foreground` below, separated by hairline.
- Placeholder stats: `5,000+ students placed`, `98% visa success rate`, `12 destination countries`, `250+ partner universities`.
- Count-up on scroll entry (see §7). Mobile: single column, tiles 1×4.

### 8.4 Our Services
LimeIQ editorial grid language.
- Section header: eyebrow ("What we do"), h2 in display serif, optional intro line — left-aligned, `max-w-7xl`.
- 3-column grid (`md:grid-cols-3`, 1-col mobile) with **hairline borders between cells** (`divide` / `border` using `--border`), no card shadows — flat editorial.
- Card: small line icon (lucide, stroke uses `currentColor`), h3, 2-line description, "Learn more ↗" affordance (arrow box in bottom-right corner per LimeIQ card pattern).
- Placeholder services (6): University Admissions, Visa Guidance, Scholarship Support, Test Preparation, Career Counseling, Pre-Departure Briefing.

### 8.5 Study Destinations
Evergreen reference: photos under soft gradient overlays, oversized headline text over image.
- Grid of destination cards (`md:grid-cols-3`, feature card spanning 2 cols on first row optional): full-bleed photo, gradient overlay (`linear-gradient(180deg, transparent 30%, hsl(var(--background)/.85))`), country name in display font `text-3xl` bottom-left over image, small stat line ("40+ partner universities").
- Hover: image `scale-105` inside `overflow-hidden`, 0.5s ease.
- Placeholder destinations: UK, USA, Canada, Australia, Germany, Malaysia.

### 8.6 Aspire Global Course Finder CTA
Full-width band, distinct from neighbors (uses `--secondary` surface or inverted `--primary` band in classical).
- Centered: h2 "Find the course that fits your future.", one line of supporting text, large liquid-glass CTA "Explore Course Finder" → external link (course finder lives on the white-labeled portal; same `PORTAL_URL` family, plain `<a>`).
- In `space` theme this band gets the aurora gradient edge treatment.

### 8.7 Student Success Stories / Testimonials
- Section header per §8.4 pattern.
- Horizontally scrollable snap row (`scroll-snap-type: x mandatory`) of 3-up cards (1-up mobile): student photo with Evergreen-style gradient overlay, quote in display serif `text-xl`, name + destination + university in `text-sm text-muted-foreground`.
- In `classical`, first card's quote gets a drop-cap. Placeholder content: 4–6 fictional-but-plausible testimonials, clearly marked placeholder in `lib/content.ts`.

### 8.8 Contact Section
- Two columns: left — h2 "Start the conversation.", office address, phone, email, social links (placeholders); right — simple form (name, email, phone, destination interest select, message).
- **No backend.** Form submits via `mailto:` fallback or a third-party form endpoint (Formspree-class) configured by constant; decision deferred, documented in `ARCHITECTURE.md`. Client-side validation only.
- Inputs: transparent background, `border-b` hairline only (editorial register), focus ring `--ring`.

### 8.9 Footer
- 4-column (`md:grid-cols-4`, stacked mobile): logo + one-liner; Explore links (section anchors); Destinations links; Contact summary + Student Portal link.
- Bottom bar: hairline top border, © line, "Privacy" / "Terms" placeholders.
- Background: `--secondary` tone of active theme.

## 9. Floating Theme Switcher

- Fixed `bottom-6 right-6`, `z-50`, `.liquid-glass rounded-full` pill.
- Collapsed: single circular button showing active theme's swatch (palette icon). Expanded (click): vertical stack of 4 swatch buttons — navy, parchment, neon magenta, space indigo — each `w-8 h-8 rounded-full` with theme-representative gradient fill, `title` + `aria-label` with theme name.
- Active swatch: ring (`--ring`) + scale 1.1. Selection applies instantly (`data-theme` on `<html>`), persists to `localStorage` (`aspire-theme`).
- Keyboard: pill is a `radiogroup`; arrow keys cycle, Enter selects, Esc collapses. Focus visible in all themes.
- Theme transition: `html { transition: background-color .4s ease, color .4s ease }` — suppressed under reduced motion.
- Mobile: same position; collapsed by default so it never blocks content; hit target ≥ 44px.

## 10. Accessibility & Quality Bar

- WCAG AA contrast in all four themes, including text over glass and over images (gradient overlays exist partly to guarantee this).
- Full keyboard navigation; skip-to-content link; semantic landmarks (`header/nav/main/section/footer`), one `h1`.
- `prefers-reduced-motion` honored globally (§7).
- Video: `muted playsInline` required for autoplay; poster required; no audio ever.
- Images: descriptive `alt`; decorative overlays `aria-hidden`.
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 on static export.
