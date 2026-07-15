# AGENTS.md

Follow `agent.md`, `architecture.md`, and `design.md` before changing code.

This is a static Next.js 15 marketing site with one Cinematic Navy visual system. There is no theme switcher, backend, login, API, middleware, database, or CMS. Portal and course search actions link to external services.

All visible copy belongs in `lib/content.ts`; external URLs belong in `lib/config.ts`. Preserve static export, the approved liquid-glass CSS, reduced-motion behavior, accessibility, and the rule against unverified social proof.

Verification:

```bash
npm run build
npm run lint
npx tsc --noEmit
```
