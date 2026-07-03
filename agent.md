# Agent Conventions — aspire-landing

Rules for AI agents (and humans) working in this repo. `design.md` = visual source of truth. `architecture.md` = structural source of truth. When code and docs conflict, flag it — don't silently pick one.

## Project in one paragraph

Static landing page for Aspire Global Education (study-abroad consultancy). Next.js 15 App Router + TypeScript strict + Tailwind + shadcn/ui, `output: 'export'`. Single route `/`, nine sections, four switchable full-skin themes (`default`, `classical`, `cyberpunk`, `space`) via `data-theme` + CSS variables, floating theme switcher.

## Commands

```bash
npm run dev          # dev server
npm run build        # static export → out/
npm run lint         # ESLint
npx tsc --noEmit     # typecheck
```

## Hard rules

1. **Never add backend, auth, API routes, or a database.** "Student Portal" / "Course Finder" are plain external `<a>` links using constants from `lib/config.ts`. If a task seems to require a backend, stop and ask.
2. **Themes only via CSS variables.** Never branch on theme in JSX (`if (theme === 'cyberpunk')` is forbidden in sections). Theme-specific visuals go in `styles/themes.css` under `[data-theme="…"]` selectors. Only `theme-switcher.tsx` may read the active theme from context.
3. **Semantic Tailwind utilities only** — `bg-background`, `text-muted-foreground`, `font-display`. Never raw palette classes (`bg-slate-900`) or hex values in components.
4. **All copy/data lives in `lib/content.ts`.** No literal marketing strings inside section components. Placeholder data keeps its `// PLACEHOLDER` comment until real client data lands.
5. **Sections stay self-contained** in `components/sections/` — one file per landing section, no cross-imports between sections. Shared behavior goes in `lib/hooks.ts` or `components/theme/`.
6. **shadcn/ui components go in `components/ui/`** via the shadcn CLI; edit them minimally. Don't hand-write components that shadcn already provides.
7. **Static export constraints:** no server-only features (dynamic routes with runtime data, next/image optimization API, headers/middleware). Anything added must survive `next build` with `output: 'export'`.
8. **Preserve the verbatim specs** in `design.md` §6–7 (`.liquid-glass`, `fade-rise`) — these came from the approved design prompt; change only with explicit user sign-off.
9. **Every visual change must be checked in all four themes** and under `prefers-reduced-motion`. A change that looks right only in `default` is not done.
10. **Accessibility bar is non-negotiable:** WCAG AA contrast per theme, keyboard-operable switcher and menu, single `h1`, semantic landmarks.

## Where things go

| Change | File(s) |
|---|---|
| Copy / stats / testimonials | `lib/content.ts` |
| Theme colors / fonts / hero overlays | `styles/themes.css` (+ token docs in `design.md`) |
| New shared animation/behavior | `lib/hooks.ts` |
| Section layout | that section's file in `components/sections/` |
| External URLs, site metadata | `lib/config.ts` |
| Global CSS, glass, keyframes | `app/globals.css` |
