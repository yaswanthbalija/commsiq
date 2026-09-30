# commsIQ Marketing Site — Design Spec

**Date:** 2026-09-05  
**Status:** Approved for implementation  
**Product:** commsIQ by Mediacorn Digital  
**Reference:** https://www.karix.com/ (structure/IA/UX mirror; rebranded content)

## Goals

Build a full multi-page marketing site that mirrors Karix’s information architecture, section patterns, mega-menus, and motion language, rebranded as **commsIQ by Mediacorn Digital** using the provided logo (cloud/speech-bubble gradient, pink↔blue).

## Non-goals

- Backend/CRM form submission (front-end validation + success UI only)
- Scraping or hotlinking Karix proprietary assets
- Verbatim third-party client case study branding (anonymize patterns)
- Pixel-identical reproduction of Karix’s exact animation timelines/assets

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Scope | Full site mirror (all primary IA routes) + transitions |
| Stack | Next.js App Router, TypeScript, Tailwind, Framer Motion |
| Repo | `/home/perennial/Projects/commsiq` |
| Forms | Client-side only |
| Company contact | Placeholder Mediacorn Digital details |
| Copy | Structural mirror + rebrand; anonymize client-specific IP |

## Architecture

Component-driven marketing system:

- Shared layout: Header (mega-menus), Footer, Cookie banner, Demo CTA modal
- Section primitives reused across homepage and inner pages
- Typed content modules under `lib/content/`
- Brand tokens in CSS variables / Tailwind theme
- Framer Motion: page transitions, scroll reveals, menu/panel crossfades, hover lifts

## Brand

- **Name:** commsIQ (comms = pink, IQ = blue)
- **Attribution:** by Mediacorn Digital (white, lighter weight)
- **Icon:** cloud + speech-bubble outline, pink→purple→blue gradient
- **Surfaces:** near-black backgrounds; high-contrast text; gradient accents on CTAs/icons
- **Logo asset:** provided PNG in `public/brand/`

## Information architecture (routes)

### Core

- `/` — Homepage
- `/book-a-demo` or modal — Demo/contact (also homepage form)

### Products

- `/products/whatsapp`
- `/products/rcs`
- `/products/truecaller`
- `/products/sms`
- `/products/email`
- `/products/voice`

### Use cases

- `/use-case-solutions/acquisition-activation`
- `/use-case-solutions/engagement-retention`
- `/use-case-solutions/transactional-messaging`
- `/use-case-solutions/customer-support-and-experience`
- `/managed-services/performance-marketing`

### Industries

- `/industry-solutions/edtech`
- `/industry-solutions/gaming`
- `/industry-solutions/travel`
- `/industry-solutions/logistics`
- `/industry-solutions/retail-ecommerce`
- `/industry-solutions/healthcare`
- `/industry-solutions/government`
- `/industry-solutions/bfsi`

### Case studies

- `/case-studies` (index)
- Detail pages with anonymized titles (template-driven)

### Company / legal

- `/about-us`
- `/company`
- `/careers`
- `/terms-and-conditions`
- `/privacy-policy`
- `/online-cookie-statement`
- Partner/Resources mega-menu destinations as template pages where Karix exposes them

## Homepage sections

1. Sticky header + mega-menus + Book a Demo
2. Hero + Connect with an Expert
3. Market position / channel leadership / trust stats (carousel or rotating panels)
4. “Only CPaaS partner you need” — tabs: use cases / industries / channels / AI journeys
5. Case study highlights
6. Enterprise outcomes (TCO, security, performance) + partnerships strip
7. Department cards (Marketing, Performance, Product, CX)
8. Contact form CTA block
9. Footer + cookie banner

## Motion

- App-level route transition (fade + slight Y)
- Scroll-triggered section reveals (`whileInView`)
- Mega-menu expand/collapse
- Tab/panel content crossfade
- Card hover elevation / gradient border glow
- Form success state transition

## Forms

Fields: Name, Email, Mobile, Designation, City. Client validation; success/error UI; no network submit.

## Delivery waves

1. Scaffold + brand + layout shell + homepage (animated)
2. Product + channel pages (shared template)
3. Use-case + industry pages (shared template)
4. Case studies + company/legal + remaining nav leaves
5. Polish: motion, responsive, a11y, content pass

## Success criteria

- All listed routes render with shared shell and brand
- Homepage visually complete with transitions
- Inner pages use consistent templates filled with rebranded content
- Forms validate and show success locally
- `npm run build` succeeds
