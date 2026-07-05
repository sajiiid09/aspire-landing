# Agent Conventions — aspire-landing

Rules for AI agents (and humans) working in this repo. `DESIGN.md` = visual source of truth. `ARCHITECTURE.md` = structural source of truth. When code and docs conflict, flag it — don't silently pick one.

## Project in one paragraph

Static landing page for Aspire Global Education (study-abroad consultancy). Next.js 15 App Router + TypeScript strict + Tailwind + shadcn/ui, `output: 'export'`. Single route `/`, four **structural** theme variants (`default`, `classical`, `cyberpunk`, `space`): each theme has its own hero, section order (`lib/theme-layouts.ts`), and one unique section, composed by `components/site/theme-site.tsx` from a shared section pool. Skins ride on `data-theme` + CSS variables; only the default order is prerendered (SEO); switching themes reloads the page.

## Commands

```bash
npm run dev          # dev server
npm run build        # static export → out/
npm run lint         # ESLint
npx tsc --noEmit     # typecheck
```

## Hard rules

1. **Never add backend, auth, API routes, or a database.** "Student Portal" / "Course Finder" are plain external `<a>` links using constants from `lib/config.ts`. If a task seems to require a backend, stop and ask.
2. **Theme tokens via CSS variables; structure via the composition layer.** Theme branching is permitted **only** inside `components/site/theme-site.tsx`, `lib/section-registry.tsx`, and `components/sections/hero/hero.tsx`. Inline `if (theme === …)` inside section internals remains forbidden. Theme-specific **styling** still lives in `styles/themes.css` under `[data-theme="…"]` selectors (panels use the semantic `.surface` class, resolved per theme). Only the switcher and those resolvers read the active theme from context.
3. **Semantic Tailwind utilities only** — `bg-background`, `text-muted-foreground`, `font-display`. Never raw palette classes (`bg-slate-900`) or hex values in components.
4. **All copy/data lives in `lib/content.ts`.** No literal marketing strings inside section components. Placeholder data keeps its `// PLACEHOLDER` comment until real client data lands.
5. **Sections stay self-contained** in `components/sections/` — one file per landing section, no cross-imports between sections. Shared behavior goes in `lib/hooks.ts` or `components/theme/`.
6. **shadcn/ui components go in `components/ui/`** via the shadcn CLI; edit them minimally. Don't hand-write components that shadcn already provides.
7. **Static export constraints:** no server-only features (dynamic routes with runtime data, next/image optimization API, headers/middleware). Anything added must survive `next build` with `output: 'export'`.
8. **Preserve the verbatim specs** in `DESIGN.md` §6–7 (`.liquid-glass`, `fade-rise`) — these came from the approved design prompt; change only with explicit user sign-off.
9. **Every visual change must be checked in all four themes** and under `prefers-reduced-motion`. A change that looks right only in `default` is not done.
10. **Accessibility bar is non-negotiable:** WCAG AA contrast per theme, keyboard-operable switcher and menu, single `h1`, semantic landmarks.

## Where things go

| Change | File(s) |
|---|---|
| Copy / stats / testimonials | `lib/content.ts` |
| Theme colors / fonts / layout tokens / `.surface` skins | `styles/themes.css` (+ token docs in `DESIGN.md`) |
| Per-theme section order | `lib/theme-layouts.ts` |
| New section wiring | `lib/section-registry.tsx` (+ id in `theme-layouts.ts`) |
| Hero variants | `components/sections/hero/` (resolver = `hero.tsx`) |
| Theme-unique sections | `components/sections/unique/` |
| New shared animation/behavior | `lib/hooks.ts` |
| Section layout | that section's file in `components/sections/` |
| shadcn primitives | `components/ui/` |
| External URLs, site metadata | `lib/config.ts` |
| Global CSS, glass, keyframes, `.surface` base | `app/globals.css` |
