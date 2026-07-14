# Agent Conventions

## Project

Aspire Global Education is a static, public marketing site built with Next.js 15, TypeScript, Tailwind CSS, and `output: 'export'`. It uses one approved Cinematic Navy design across all routes.

## Rules

1. Do not add a backend, authentication, API routes, middleware, database, or runtime image optimization.
2. Student Portal and Course Finder remain external links configured in `lib/config.ts`.
3. Keep visible marketing copy and structured content in `lib/content.ts`.
4. Use semantic CSS variables and Tailwind utilities. Do not add route-specific color palettes.
5. Preserve the approved `.liquid-glass` and `fade-rise` definitions unless the client approves a change.
6. Do not publish unverified testimonials, performance claims, milestones, or university partnerships.
7. Use Server Components by default and isolate browser behavior in small Client Components.
8. Honor reduced motion, keyboard navigation, visible focus, semantic landmarks, and WCAG AA contrast.
9. Every change must pass TypeScript, ESLint, and the static production build.

## Placement

- Copy, navigation, page models: `lib/content.ts`
- External URLs and site metadata: `lib/config.ts`
- Shared chrome: `components/site/`
- Homepage sections: `components/sections/`
- Route composition and metadata: `app/<route>/page.tsx`
- Global tokens: `styles/themes.css`
- Shared CSS and approved effects: `app/globals.css`
