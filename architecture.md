# Architecture

## Stack and constraints

Next.js 15 App Router, strict TypeScript, Tailwind CSS, and static export. Images are unoptimized at runtime because the deployment has no image server. Client-side code is limited to navigation state, scroll reveals, count-up values, carousels, dialogs, and the contact form.

No backend, authentication, API routes, middleware, database, CMS, or server-only features are allowed. Portal, course search, and form processing are external. Unconfigured external links and contact details are not rendered. `.env.example` documents the configuration interface without committing client data.

## Structure

- `app/` contains seven static routes plus metadata, sitemap, and robots output.
- `components/site/` provides the shared header/footer shell and inner-page bands.
- `components/sections/` contains reusable homepage and contact sections.
- `lib/content.ts` is the typed source for public copy and page data.
- `lib/config.ts` owns environment-backed external URLs and site identity.
- `styles/themes.css` contains the single Cinematic Navy token set.

All routes render through `SiteShell`. There is no theme state, theme persistence, resolver, or variant registry.

## Content and trust

The BRD supports 750+ universities in the network, 75,000+ courses, and 13 destinations. Testimonials, student outcomes, milestones, performance rates, and named partnerships must remain absent until the client supplies verifiable approval.

## Quality

Each route has metadata, one `h1`, semantic landmarks, keyboard navigation, reduced-motion behavior, stable image dimensions, and static-export compatibility. Verification is TypeScript, ESLint, production build, responsive QA, and Lighthouse.
