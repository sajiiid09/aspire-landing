# PLAN — Structural Theme Variants for Aspire Landing

> Status: **Approved** (Phase 0 complete). Next action: Phase 1 — Infrastructure.
> Last updated: 2026-07-05.

---

## 1. Goal

Transform the theme system from a CSS-variable reskin (identical markup across themes) into **structural theme variants**: each of the 4 themes renders a visibly different site — bespoke hero, distinct section **order**, a **unique section** per theme, and a different visual language — while sharing one content source (`lib/content.ts`), a single route (`/`), and static-export SEO for the default theme.

---

## 2. Locked decisions

| Topic | Decision |
|---|---|
| SEO vs structure | Prerender **default**; non-default swaps in post-hydration. Single route `/`. |
| Switch behavior | Full reload: write `localStorage` → `location.reload()`. |
| **Default** | Clean **white**, formal, **sharp-edged** boxes, **no video**. Full eduwizz section set (~14). Unique = **Process**. |
| **Classical** | **Cinematic navy video** hero (today's default, relocated). Unique = **Heritage**. |
| **Cyberpunk** | Terminal/HUD, **no video**. Unique = **SystemStatus**. |
| **Space** | Cosmos/starfield, **no video**. Unique = **JourneyMap**. |
| Content | Same data, different layout/order. |
| Scope | Tiered: hero bespoke ×4; shared sections re-skinned via `.surface` + layout tokens; **one unique section/theme**; **per-theme section order**. |
| Services vs WhyChooseUs | **Both kept** (6 offerings + 4 differentiators). |
| Hero content model | **Single superset `HERO`**; each variant renders the fields it needs. |
| "Offline class" | **Avoided** — re-themed to **Process** (no classroom framing). |
| Hard Rule #2 | **Retired** → replaced with resolver/site-layer convention (§3.5). |

---

## 3. Architecture

### 3.1 Composition layer (enables per-theme ordering)

```
app/page.tsx                     → thin client wrapper → <ThemeSite/>
components/site/theme-site.tsx   → "use client"; reads useTheme(); renders ordered sections
lib/theme-layouts.ts             → Record<ThemeId, SectionId[]>   (the per-theme order)
lib/section-registry.tsx         → SectionId → ReactNode map
```

- Prerender uses `default` order/state (SEO-safe; the only fully-indexed tree).
- Non-default themes render after `ThemeProvider` resolves the saved theme.

### 3.2 Theming mechanism

- **`.surface` semantic class** (new): shared sections use `.surface` instead of hardcoding `.liquid-glass`. `themes.css` resolves `.surface` per theme:
  - `default` → flat, sharp-edged, hairline border
  - `classical` → verbatim `.liquid-glass` (Rule #8 preserved)
  - `cyberpunk` → neon-bracket outline + glow
  - `space` → aurora-edged panel
- **Layout tokens** added per `[data-theme]`: `--section-py`, `--hero-align`, `--grid-gap`, `--card-radius`, `--surface-style`. Shared sections consume them → look shifts per theme without bespoke code.
- **Token swap** in `styles/themes.css`: current `:root` (navy cinematic) → relocated to `[data-theme="classical"]`; new `:root` = clean white/formal (`--background: 0 0% 100%`, `--foreground` dark ink, `--radius: 0`, clean sans display). Cyberpunk/space blocks unchanged.

### 3.3 Flash prevention (paint-gate)

- Enhanced no-flash `<script>` in `layout.tsx`: if saved theme ≠ `default`, set `visibility:hidden` on `<body>` before paint.
- `ThemeProvider` resolves theme on mount → resolver renders correct tree → provider removes the hide.
- Safety nets: `<noscript>` reveal + max-timeout reveal in the script → content is **never** stranded hidden if JS fails. (`visibility:hidden` keeps the default tree DOM-crawlable for SEO.)

### 3.4 Switch behavior

- `theme-switcher.tsx` `setTheme`: write `localStorage['aspire-theme']`, set `data-theme` (graceful fallback), then `location.reload()`.

### 3.5 Revised convention (replaces Hard Rule #2)

> Theme branching is permitted **only** inside `components/site/theme-site.tsx`, `lib/section-registry.tsx`, and `components/sections/hero/hero.tsx`. Inline `if (theme === …)` inside section internals remains forbidden. Theme-specific **styling** still lives in `styles/themes.css`. Only the switcher and the resolver read the active theme.

---

## 4. Canonical section pool

**Existing (kept):** `Header`, `Hero`, `Stats`, `Services`, `Destinations`, `Testimonials`, `Contact`, `Footer`, `CtaBanner` (re-theme of current `CourseFinderCta` / eduwizz Final-CTA).

**New shared (from eduwizz):** `TrustLogos` (partner-university marquee), `About` (photo + stat badge + copy + tags), `WhyChooseUs` (4 differentiators), `Gallery` (photo grid), `Faq` (accordion).

**Unique (one per theme):** `Process` (default), `Heritage` (classical), `SystemStatus` (cyberpunk), `JourneyMap` (space).

---

## 5. Per-theme specifications

### 5.1 `default` — Clean White Agency (no video)

- **Hero:** eyebrow (destinations), practical headline, supporting line, **2 CTAs** (Book Free Consultation / Explore Destinations), **trust stats** inline, hero **image** (no video). Clean sans, sharp corners.
- **Order:** `Header → Hero → TrustLogos → About → WhyChooseUs → Destinations → Process(unique) → Stats → Testimonials → Gallery → Faq → CtaBanner → Contact → Footer`
- **Surface style:** flat, hairline borders, `--radius: 0`.

### 5.2 `classical` — Cinematic Navy Video

- **Hero:** today's video hero relocated; Instrument Serif headline, single CTA, no extra trust stats in hero.
- **Order:** `Header → Hero(video) → Stats → Heritage(unique) → About → Services → Destinations → Testimonials → CtaBanner → Contact → Footer`
- **Surface style:** `.liquid-glass` (verbatim spec).
- **Unique — Heritage:** editorial timeline of milestones (serif, hairline rules).

### 5.3 `cyberpunk` — Terminal / HUD (no video)

- **Hero:** boot-terminal aesthetic — Orbitron glitch headline, typed prompt-line CTA, scanlines, neon grid, mono labels, asymmetric.
- **Order:** `Header → Hero(terminal) → SystemStatus(unique) → WhyChooseUs → Stats → Destinations → Testimonials → Faq → CtaBanner → Contact → Footer`
- **Surface style:** neon-bracket panels + glow.
- **Unique — SystemStatus:** live HUD dashboard (animated counters, "system online" mono readout).

### 5.4 `space` — Cosmos (no video)

- **Hero:** deep-space gradient + animated starfield + aurora; Sora headline with aurora-gradient text; floating "planet orb" CTA.
- **Order:** `Header → Hero(starfield) → JourneyMap(unique) → Destinations → Stats → WhyChooseUs → Testimonials → CtaBanner → Contact → Footer`
- **Surface style:** aurora-edged panels.
- **Unique — JourneyMap:** constellation of partner universities / mission path, aurora lines.

All variants reuse `useCountUp`, `useInView`, `useScrollReveal`, and `<Reveal>` — no reimplementation. Each hero contains exactly one `h1`.

---

## 6. Content model (`lib/content.ts`)

- **Extend `HERO` to a superset** (optional fields, variants pick what they need):
  `{ eyebrow?, headline[], subtext, primaryCta, secondaryCta?, trustStats?: Stat[], videoSrc?, poster?, heroImage? }`
- **Add slices** (all `// PLACEHOLDER — pending client BRD data`):
  `TRUST_LOGOS`, `ABOUT`, `WHY_CHOOSE_US`, `PROCESS_STEPS`, `GALLERY`, `FAQ_ITEMS`, `HERITAGE_MILESTONES`, `SYSTEM_STATUS`, `JOURNEY_NODES`.
- **Header:** add click-to-call phone + WhatsApp icon link (from `SITE.phone`).
- Existing `STATS, SERVICES, DESTINATIONS, TESTIMONIALS, CONTACT, FOOTER, NAV_LINKS` retained; `COURSE_FINDER` reused as `CtaBanner` data.

---

## 7. File-by-file change list

### New

- `components/site/theme-site.tsx`
- `lib/theme-layouts.ts`, `lib/section-registry.tsx`
- `components/sections/hero/{hero.tsx, default-hero.tsx, classical-hero.tsx, cyberpunk-hero.tsx, space-hero.tsx}`
- `components/sections/{trust-logos,about,why-choose-us,gallery,faq}.tsx`
- `components/sections/unique/{process,heritage,system-status,journey-map}.tsx`
- `components/ui/accordion.tsx` (shadcn; fallback hand-built if static-export blocks CLI)

### Modified

- `app/page.tsx` → thin client wrapper → `<ThemeSite/>`
- `styles/themes.css` → token swap (`:root`↔classical) + layout tokens + `.surface` per theme
- `app/globals.css` → `.surface` base + `.theme-boot-hidden` utility + reveal
- `app/layout.tsx` → enhanced no-flash script + paint-gate + safety nets
- `components/theme/theme-provider.tsx` → `resolved` flag + reveal-on-resolve
- `components/theme/theme-switcher.tsx` → reload-on-switch
- `lib/content.ts` → HERO superset + new slices + header phone/WhatsApp
- Existing shared sections (`header, stats, services, destinations, testimonials, contact, footer, course-finder-cta`) → `.liquid-glass`→`.surface`, consume layout tokens
- `agent.md`, `architecture.md` §4, `design.md` §4 → replace Rule #2, document composition layer + `.surface`

### Relocated (content unchanged)

- Current `components/sections/hero.tsx` (video) → `components/sections/hero/classical-hero.tsx`

### Unchanged

- `lib/config.ts`, `lib/hooks.ts`, `components/reveal.tsx`, `tailwind.config.ts`, `next.config.ts`

---

## 8. Phased execution & verification gates

### Phase 0 — approved (this document).

### Phase 1 — Infrastructure (zero visual breakage)

1. Token swap + layout tokens + `.surface` in `themes.css`/`globals.css`.
2. Composition layer (`theme-layouts`, `section-registry`, `theme-site`); wire `page.tsx`.
3. Relocate video hero → `classical-hero.tsx`; build clean `default-hero.tsx`.
4. Provider paint-gate + enhanced no-flash + safety nets; switcher reload.
5. Refactor existing shared sections to `.surface` + tokens; header phone/WhatsApp.
6. Revise Rule #2 + docs.

**Gate:** `npm run build` + `npx tsc --noEmit` + `npm run lint` clean; **default = clean white**, **classical = today's video look**; reload works; non-default load flash-free.

### Phase 2 — Prove the pattern (one theme)

Build **cyberpunk** end-to-end (terminal hero + SystemStatus + reordered composition). → **Sign-off gate.**

### Phase 3 — Remaining themes

Classical (Heritage) + space (JourneyMap) heroes, unique sections, orders.

### Phase 4 — QA gate (Hard Rule #9)

4 themes × mobile/desktop × `prefers-reduced-motion`; exactly one `h1` per theme; WCAG AA per variant; Lighthouse on default (SEO ≥ 95, Perf ≥ 90).

---

## 9. Risks & mitigations

1. **FOUC for non-default** → paint-gate + `<noscript>`/timeout safety nets.
2. **`.surface` refactor regressions** → verify classical is pixel-identical to today after `.liquid-glass`→`.surface` mapping (Phase 1 gate).
3. **Bundle size** (all variants ship via registry imports) → static imports first; move to `next/dynamic` only if budget blown.
4. **SEO scope** — only `default` indexed (accepted).
5. **Build effort** (~14 sections + 4 heroes + 4 unique) → mitigated by tiering, `.surface`, shared content.
6. **Accordion under static export** → shadcn Accordion is client + static-safe; hand-built fallback ready.
7. **Verbatim specs (Rule #8)** — `.liquid-glass` and `fade-rise` untouched; `.liquid-glass` becomes classical's `.surface` rendering.

---

## 10. Explicit non-goals

- No backend/auth/API routes/DB (Hard Rule #1).
- No multi-route theme pages; no indexing of non-default themes.
- No theme branching scattered through section internals (only in the resolver/site layer).
- No changes to `lib/hooks.ts`, `components/reveal.tsx`, `tailwind.config.ts`.

---

## 11. Open data dependencies (placeholders, non-blocking)

Real client data still pending for: portal/course-finder URLs, stats, destinations, testimonials, contact details, socials, **plus new slices** (trust logos, about, why-choose-us, process, gallery, FAQ, heritage, system-status, journey nodes), and production hero video asset. All ship as clearly-marked `// PLACEHOLDER` until the BRD lands.
