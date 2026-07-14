# Design System

## Design read

Premium study-abroad marketing for students, parents, and education partners. The approved direction is Cinematic Navy: calm, editorial, trustworthy, and aspirational.

- Design variance: 6
- Motion intensity: 5
- Visual density: 4

## Foundation

- One dark navy theme across every route.
- Instrument Serif for display text and Inter for body text.
- White is the primary interactive color; cool blue-gray is the secondary text color.
- Cards and interactive controls use a consistent 12px radius.
- Liquid glass is reserved for navigation, key panels, and selected CTAs.
- Images use natural-light international campus, city, and counseling scenes.

## Layout

The homepage uses a cinematic video hero, plain scale band, offset workflow, split About section, editorial services grid, image-led destinations, poster carousel, partner section, and focused CTAs. Inner pages reuse the shell but vary their content composition.

Desktop navigation stays within 72px and one line. Multi-column layouts collapse to one column below 768px. Hero content uses `min-height: 100dvh` and keeps the CTA visible in the first viewport.

## Motion and accessibility

The approved `fade-rise` animation supports hierarchy on load and section entry. Carousels pause for reduced motion, and all transitions collapse under `prefers-reduced-motion`. Body copy, controls, focus rings, forms, and image overlays must meet WCAG AA.

## Content rules

Use concrete language and one CTA label per intent. Do not use invented proof, placeholder identities, em or en dashes, decorative status dots, section numbering, wrapped desktop CTAs, repeated equal-card layouts, or unverified logos.
