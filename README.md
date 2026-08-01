# Aspire Global Education

Multi-page marketing site for a study-abroad consultancy. The approved visual direction is a single Cinematic Navy system with editorial serif typography, restrained motion, and liquid-glass surfaces.

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
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_CONTACT_ADDRESS`
- `NEXT_PUBLIC_WHATSAPP_URL`
- `SMTP_HOST` (defaults to `smtp.gmail.com`)
- `SMTP_PORT` (defaults to `465`)
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_EMAIL` (defaults to `SMTP_USER`)

The contact form posts to the server-only `/api/contact` route and sends through SMTP. For Gmail, enable 2-Step Verification and use a Google App Password as `SMTP_PASS`. Never expose SMTP credentials through a `NEXT_PUBLIC_` variable.

Because the form requires a server route, deploy this project to a host that supports the Next.js Node.js runtime (for example, Vercel) rather than as a static export.
