# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static landing page for **Aspire Global Education**, a study-abroad consultancy. Public marketing page only — no login, no dashboard, no backend. The "Student Portal" button is an external redirect to a white-labeled portal.

The three companion docs are binding:

- `DESIGN.md` — design system: tokens, 4 theme skins, per-section specs, motion, accessibility bar
- `ARCHITECTURE.md` — stack, directory layout, theming architecture, content model, constraints
- `AGENT.md` — hard rules and file placement conventions (read before any code change)

## Stack

Next.js 15 (App Router) + TypeScript strict + Tailwind CSS + shadcn/ui, **`output: 'export'`** — fully static, single route `/`. Anything added must survive static export (no API routes, middleware, or runtime image optimization).

## Commands

```bash
npm run dev          # dev server
npm run build        # static export → out/
npm run lint         # ESLint
npx tsc --noEmit     # typecheck
```

No test framework (v1); verification = clean build + manual QA across all 4 themes + Lighthouse.

## Architecture (big picture)

- **Structural theming is the core mechanism:** 4 theme variants (`default` clean-white, `classical` cinematic navy video, `cyberpunk` terminal, `space` cosmos), each with a bespoke hero (`components/sections/hero/`), its own section order (`lib/theme-layouts.ts`), and one unique section (`components/sections/unique/`). `components/site/theme-site.tsx` composes the order from `lib/section-registry.tsx`. Skins ride on CSS variables under `[data-theme="…"]` in `styles/themes.css`; shared panels use the semantic `.surface` class resolved per theme. The inline script in `app/layout.tsx` sets the attribute pre-paint and paint-gates non-default themes; switching reloads the page. Theme branching in JSX is allowed **only** in `theme-site.tsx`, `section-registry.tsx`, and `hero/hero.tsx`. Only the `default` order is prerendered (SEO). Tailwind utilities are semantic (`bg-background`, `font-display`) and resolve through the variables.
- **Content is data:** all copy, stats, destinations, testimonials live as typed constants in `lib/content.ts` — never as literals in components. Much of it is placeholder pending client data (marked `// PLACEHOLDER`).
- **Shared section pool** in `components/sections/` (header, stats, services, destinations, trust-logos, about, why-choose-us, gallery, faq, cta-banner, testimonials, contact, footer) — self-contained, no cross-imports. Shared behavior (scroll reveal, count-up) lives in `lib/hooks.ts`.
- **External links** (portal, course finder, contact form endpoint) come from `lib/config.ts` / `NEXT_PUBLIC_*` env vars.
- The `.liquid-glass` CSS and `fade-rise` keyframes in `DESIGN.md` §6–7 are verbatim approved specs — do not alter without user sign-off.
