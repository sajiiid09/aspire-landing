# Aspire Global Education

Static multi-page marketing site for a study-abroad consultancy. The approved visual direction is a single Cinematic Navy system with editorial serif typography, restrained motion, and liquid-glass surfaces.

## Routes

- `/` overview and conversion path
- `/about` company and operating model
- `/services` counseling, admissions, visa, and scholarship support
- `/destinations` 13 study destinations
- `/stories` verified-story placeholder until approved content is supplied
- `/partners` B2B sub-agent information
- `/contact` student and partner inquiry form

Student Portal and Course Finder are external links. This repository contains no backend or authentication.

## Commands

```bash
npm run dev
npm run build
npm run lint
npx tsc --noEmit
```

## Configuration

Copy the required values into `.env.local` or the hosting environment:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PORTAL_URL`
- `NEXT_PUBLIC_COURSE_FINDER_URL`
- `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_CONTACT_ADDRESS`
- `NEXT_PUBLIC_WHATSAPP_URL`

Unconfigured portal, course-search, and contact details stay hidden. The contact form uses the configured third-party endpoint and falls back to the configured email address when the endpoint is unset.
