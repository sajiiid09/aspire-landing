# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project

Static landing page for **Aspire Global Education**, a study-abroad consultancy. Public marketing page only — no login, no dashboard, no backend. The "Student Portal" button is an external redirect to a white-labeled portal.

Currently docs-only; code scaffolding is the next phase. The three companion docs are binding:

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

- **Theming is the core mechanism:** 4 full-skin themes (`default`, `classical`, `cyberpunk`, `space`) driven entirely by CSS variables under `[data-theme="…"]` in `styles/themes.css`. Inline no-flash script in `app/layout.tsx` sets the attribute pre-paint from `localStorage['aspire-theme']`. Components never branch on theme in JSX — only `components/theme/theme-switcher.tsx` knows the active theme. Tailwind utilities are semantic (`bg-background`, `font-display`) and resolve through the variables.
- **Content is data:** all copy, stats, destinations, testimonials live as typed constants in `lib/content.ts` — never as literals in components. Much of it is placeholder pending client data (marked `// PLACEHOLDER`).
- **Page = 9 self-contained sections** in `components/sections/` (header, hero, stats, services, destinations, course-finder-cta, testimonials, contact, footer), composed in order by `app/page.tsx`. Shared behavior (scroll reveal, count-up) lives in `lib/hooks.ts`.
- **External links** (portal, course finder, contact form endpoint) come from `lib/config.ts` / `NEXT_PUBLIC_*` env vars.
- The `.liquid-glass` CSS and `fade-rise` keyframes in `DESIGN.md` §6–7 are verbatim approved specs — do not alter without user sign-off.
