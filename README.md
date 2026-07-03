# Aspire Global Education — Landing Page

Static marketing landing page for Aspire Global Education, a study-abroad consultancy. Public page only — no login, no dashboard, no backend. The Student Portal button redirects to an external white-labeled portal.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · static export (`output: 'export'`)

## Features

- Nine sections: hero (fullscreen video), stats counter, services, study destinations, course finder CTA, testimonials, contact, footer
- Four switchable full-skin themes (default navy, classical, cyberpunk, space) via a floating theme switcher — CSS variables only, persisted in localStorage
- Liquid-glass surface language, scroll-reveal motion, `prefers-reduced-motion` support

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/
npm run lint
```

Deploy the `out/` directory to any static host.

## Configuration

Set in `.env.local` (placeholders used when unset):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_PORTAL_URL` | External student portal link |
| `NEXT_PUBLIC_COURSE_FINDER_URL` | External course finder link |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | Form provider endpoint (mailto fallback when empty) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO |

## Documentation

- [DESIGN.md](DESIGN.md) — design system, theme tokens, per-section specs
- [ARCHITECTURE.md](ARCHITECTURE.md) — stack, structure, theming architecture
- [AGENT.md](AGENT.md) — conventions and hard rules for contributors/AI agents
