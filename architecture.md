# Architecture — Aspire Global Education Landing Page

Technical source of truth. Visual system lives in `DESIGN.md`; agent conventions in `AGENT.md`.

## 1. Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15, App Router | `output: 'export'` — fully static, no server runtime |
| Language | TypeScript, `strict: true` | |
| Styling | Tailwind CSS | utilities mapped to CSS variables (theming) |
| Components | shadcn/ui | copied into `components/ui/`, minimal set only |
| Icons | lucide-react | stroke icons, `currentColor` |
| Fonts | `next/font/google` | six families across 4 themes, `display: swap` |
| Hosting | Any static host (Vercel/Netlify/S3) | output is `out/` directory |

The reference hero prompt mentioned Vite; that was design reference only. This project is Next.js.

## 2. Scope Boundaries (hard rules)

- **Public landing page only. Single route `/`.**
- **No login, no dashboard, no backend, no API routes, no database.**
- "Student Portal" and "Course Finder" buttons are plain `<a target="_blank" rel="noopener noreferrer">` to an external white-labeled portal. URL from `NEXT_PUBLIC_PORTAL_URL` (and `NEXT_PUBLIC_COURSE_FINDER_URL`), defined in `.env.local` / host env, with placeholder fallback in `lib/config.ts`.
- Contact form has no backend: v1 uses a third-party form endpoint (Formspree-class) via `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`; `mailto:` fallback when unset. Client-side validation only. **Open item: client to choose provider.**
- No i18n, no CMS, no analytics in v1 (add-later seams noted below).

## 3. Directory Layout

```
aspire-landing/
├── app/
│   ├── layout.tsx          # fonts, metadata, no-flash theme script, ThemeProvider
│   ├── page.tsx            # composes all 9 sections in order
│   ├── globals.css         # Tailwind layers, token defaults, liquid-glass, keyframes
│   └── icon.svg / opengraph-image.png
├── components/
│   ├── sections/           # one file per landing section, self-contained
│   │   ├── header.tsx
│   │   ├── hero.tsx
│   │   ├── stats.tsx
│   │   ├── services.tsx
│   │   ├── destinations.tsx
│   │   ├── course-finder-cta.tsx
│   │   ├── testimonials.tsx
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   ├── theme/
│   │   ├── theme-provider.tsx   # context: activeTheme, setTheme
│   │   └── theme-switcher.tsx   # floating pill (DESIGN.md §9)
│   └── ui/                 # shadcn/ui components (generated, minimally edited)
├── lib/
│   ├── content.ts          # ALL page copy/data as typed constants
│   ├── config.ts           # portal URLs, form endpoint, site metadata constants
│   └── hooks.ts            # useScrollReveal (IntersectionObserver), useCountUp
├── styles/
│   └── themes.css          # [data-theme="…"] variable blocks for all 4 themes
├── public/
│   └── images/ videos/     # posters, destination photos, testimonial photos
├── next.config.ts          # output: 'export', images.unoptimized (see §7)
├── tailwind.config.ts
├── DESIGN.md  ARCHITECTURE.md  AGENT.md  CLAUDE.md
```

## 4. Theming Architecture

Decision: **`data-theme` attribute + CSS variables. No theme library.**

- Themes: `default`, `classical`, `cyberpunk`, `space` (canonical ids — use everywhere: CSS selectors, localStorage, switcher).
- `styles/themes.css` holds one `[data-theme="x"]` block per theme overriding the token set defined in `DESIGN.md` §3–4. `:root` carries `default` values.
- Tailwind config maps semantic utilities to vars: `colors: { background: 'hsl(var(--background))', … }`, `fontFamily: { display: 'var(--font-display)', body: 'var(--font-body)', accent: 'var(--font-accent)' }`. Components use only semantic utilities (`bg-background`, `text-muted-foreground`, `font-display`) — never raw palette classes.
- **No-flash script:** inline `<script>` in `<head>` (via `dangerouslySetInnerHTML` in `layout.tsx`) reads `localStorage['aspire-theme']` and sets `document.documentElement.dataset.theme` before first paint. Must stay tiny and dependency-free.
- `ThemeProvider` (client component, wraps body content): owns `activeTheme` state, syncs `data-theme` + localStorage on change. Consumed only by `theme-switcher.tsx`. Sections are theme-agnostic — they read tokens via CSS, never branch on theme in JSX.
- Hero overlay/filter and decorative layers (starfield, scanlines) are driven by theme vars (`--hero-overlay`, `--hero-video-filter`) and `[data-theme="x"] .hero-decor { … }` CSS — markup renders one generic decor element; CSS decides its appearance/visibility per theme.
- Fonts: all six Google families loaded once in `layout.tsx` via `next/font/google`, each exposing a CSS variable (`--font-inter`, `--font-cormorant`, …). Theme blocks in `themes.css` assign `--font-display: var(--font-cormorant)` etc. Cost: all fonts load regardless of theme — acceptable for v1 with `display: swap`; revisit if perf budget demands.

## 5. Content Model

All copy, stats, services, destinations, testimonials, nav links, footer columns: typed constants in `lib/content.ts`.

```ts
interface Stat { value: number; suffix: string; label: string }
interface Service { icon: LucideIcon; title: string; description: string }
interface Destination { country: string; image: string; statLine: string }
interface Testimonial { quote: string; name: string; destination: string; university: string; image: string }
```

- Single import surface: sections import their slice from `content.ts`. Copy edits never touch components.
- Placeholder data (stats figures, destinations, testimonials, contact details) marked with `// PLACEHOLDER — pending client BRD data` comments.
- Add-later seam: if CMS ever needed, `content.ts` becomes the adapter boundary.

## 6. Rendering & Interactivity

- Static export: every component prerendered at build. Server components by default; client components (`'use client'`) only where needed: `theme-provider`, `theme-switcher`, `stats` (count-up), scroll-reveal wrapper, mobile menu, contact form.
- Scroll reveal: one `useScrollReveal` hook (IntersectionObserver, fire-once, 20% threshold) + a thin `<Reveal>` wrapper component; sections wrap their content rather than each implementing observers.
- Count-up: `useCountUp(target, { duration: 1500 })`, starts when visible, renders final value immediately under `prefers-reduced-motion`.
- Smooth-scroll anchors: nav links `#services` etc., `scroll-behavior: smooth` in CSS (disabled under reduced motion), `scroll-margin-top` on sections for fixed-header offset.

## 7. Media & Performance

- `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }` (next/image optimization needs a server). Use `next/image` with explicit `width/height` for layout stability; pre-size assets manually (destination photos ≤ 200KB, WebP).
- Hero video: `preload="metadata"`, mandatory `poster` (first-frame WebP in `public/images/`). Current CloudFront URL is a **design-phase asset; production asset TBD** — self-host or client CDN before launch.
- Fonts via `next/font` (self-hosted at build, zero layout shift with `swap` + fallback metrics).
- Budgets: Lighthouse Perf ≥ 90; JS shipped to client should stay minimal — interactivity is theme switcher + counters + reveals + menu + form only.

## 8. SEO

- Metadata API in `layout.tsx`: title ("Aspire Global Education — Study Abroad Consultancy"), description, canonical, OG/Twitter card (`opengraph-image.png`).
- Single `h1` (hero). Semantic landmarks per `DESIGN.md` §10.
- `app/sitemap.ts` + `app/robots.ts` (both static-export compatible).
- JSON-LD `EducationalOrganization` schema in layout (name, url, contact — placeholders until client data).

## 9. Tooling

- `npm run dev` — dev server; `npm run build` — static export to `out/`; `npm run lint` — ESLint (next/core-web-vitals); `npx tsc --noEmit` — typecheck.
- No test framework in v1 (static marketing page); verification = build passes + Lighthouse + manual theme QA across 4 themes × mobile/desktop.

## 10. Open Items (client-blocking)

1. Real portal + course-finder URLs.
2. Real stats, destinations, testimonials, contact details, social links.
3. Contact form provider choice.
4. Production hero video + destination photography.
5. Logo asset (currently wordmark text).
