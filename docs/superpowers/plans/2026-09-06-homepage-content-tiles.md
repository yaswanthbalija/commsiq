# Homepage content + tiles implementation plan

> **For Claude:** REQUIRED SUB-SKILL: Use executing-plans (or implement directly in this session). Steps use checkbox (`- [ ]`) syntax.

**Goal:** Populate the CommsIQ homepage with approved content and Karix-style people tiles using stock photos + brand overlays.

**Architecture:** Content in `lib/content/home.ts`; sections under `components/sections/`; `app/page.tsx` composes order.

**Tech:** Next.js App Router, Tailwind, existing GSAP/Framer patterns, logo CSS variables.

---

### Task 1: Content + people assets

**Files:**
- Modify: `lib/content/home.ts`
- Modify: `lib/brand.ts` (tagline / domain hints)
- Create: `public/brand/people/*.jpg`

- [ ] Download 3 stock portraits into `public/brand/people/`
- [ ] Replace `home.ts` with hero, tiles, about, products, solutions, industries, trustStats, contact fields

### Task 2: Hero + people tiles

**Files:**
- Modify: `components/sections/HeroScroll.tsx`
- Create: `components/sections/PeopleTiles.tsx`

- [ ] Hero uses new headline/subhead/CTAs + trust bar
- [ ] PeopleTiles: 2–3 Karix-like cards (text + photo + brand circles)
- [ ] Keep LogoMarquee under tiles

### Task 3: About / Products / Solutions / Industries

**Files:**
- Create: `components/sections/AboutBlock.tsx`
- Create: `components/sections/ProductsStack.tsx`
- Create: `components/sections/SolutionsEngine.tsx`
- Create: `components/sections/IndustriesGrid.tsx`
- Modify: `app/page.tsx`

- [ ] Wire sections; retire or demote empty Outcomes/Departments/Ecosystem if redundant

### Task 4: Contact form

**Files:**
- Modify: `components/sections/ContactBlock.tsx`

- [ ] Fields: name, work email, phone+country, company, channels checkboxes, volume dropdown, message
- [ ] CTA: Request Consultation & Pricing
- [ ] Corporate blurb (24x7 NOC / TAM, powered by Mediacorn)

### Task 5: Verify

- [ ] Hard-refresh `/` — tiles + content visible
- [ ] Lint clean on touched files
