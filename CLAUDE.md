# Aspire Global Education

Static multi-page marketing site for a study-abroad consultancy. Read `agent.md`, `architecture.md`, and `design.md` before changing code.

## Stack

Next.js 15 App Router, strict TypeScript, Tailwind CSS, and `output: 'export'`.

## Architecture

- One approved Cinematic Navy design across all routes.
- Shared `SiteShell` provides the header and footer.
- Public copy and typed page data live in `lib/content.ts`.
- Portal and Course Finder actions are external URLs from `lib/config.ts`.
- No backend, authentication, API routes, middleware, database, CMS, or runtime image optimization.
- Do not publish unverified testimonials, performance claims, milestones, or university partnerships.
- Preserve the approved liquid-glass and fade-rise CSS specifications.

## Verification

```bash
npm run build
npm run lint
npx tsc --noEmit
```
