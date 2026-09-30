# commsIQ Full Site Mirror Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a full multi-page Next.js marketing site mirroring Karix IA/UX as **commsIQ by Mediacorn Digital**, with Framer Motion transitions and front-end-only forms.

**Architecture:** Shared layout + section components + typed content modules + template-driven product/use-case/industry/case-study pages; brand tokens from the provided logo.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, React Hook Form (optional light validation)

## Global Constraints

- Repo root: `/home/perennial/Projects/commsiq`
- Rebrand Karix → commsIQ, Tanla → Mediacorn Digital; anonymize client case studies
- No Karix asset scraping/hotlinking; use provided logo + generated placeholders
- Forms: client-side validation + success UI only
- Placeholder Mediacorn Digital contact details in footer
- Prefer many small focused files (<400 lines typical)
- Immutable patterns; no secrets in repo

---

### Task 1: Scaffold Next.js app + brand foundation

**Files:**
- Create: Next.js app via `create-next-app`
- Create: `public/brand/commsiq-logo.png` (copy from assets)
- Create: `app/globals.css`, `tailwind` theme tokens
- Create: `lib/brand.ts`

- [ ] **Step 1:** `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack` (or equivalent non-interactive flags)
- [ ] **Step 2:** Install `framer-motion`
- [ ] **Step 3:** Copy logo into `public/brand/`
- [ ] **Step 4:** Define CSS variables: `--ciq-pink`, `--ciq-blue`, `--ciq-black`, gradient utilities
- [ ] **Step 5:** Verify `npm run dev` starts
- [ ] **Step 6:** Commit `chore: scaffold Next.js app with commsIQ brand tokens`

### Task 2: Layout shell (Header, Footer, Cookie, Demo modal)

**Files:**
- Create: `components/layout/Header.tsx`, `MegaMenu.tsx`, `Footer.tsx`, `CookieBanner.tsx`, `DemoModal.tsx`
- Create: `lib/content/nav.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1:** Implement nav data matching Karix IA with commsIQ routes
- [ ] **Step 2:** Header with logo, mega-menus, Book a Demo
- [ ] **Step 3:** Footer with placeholder Mediacorn Digital contacts
- [ ] **Step 4:** Cookie banner + Demo modal (form success local)
- [ ] **Step 5:** Wire into root layout
- [ ] **Step 6:** Commit `feat: add site shell with mega-menu and footer`

### Task 3: Motion primitives + page transition

**Files:**
- Create: `components/motion/FadeIn.tsx`, `PageTransition.tsx`, `Crossfade.tsx`
- Modify: `app/template.tsx` or layout for route transitions

- [ ] **Step 1:** Implement reusable `FadeIn` (`whileInView`)
- [ ] **Step 2:** Route-level `PageTransition`
- [ ] **Step 3:** Commit `feat: add Framer Motion primitives and page transitions`

### Task 4: Homepage sections

**Files:**
- Create: `components/sections/Hero.tsx`, `StatsPanels.tsx`, `CpaasTabs.tsx`, `CaseStudyHighlight.tsx`, `Outcomes.tsx`, `Departments.tsx`, `ContactBlock.tsx`
- Create: `lib/content/home.ts`
- Modify: `app/page.tsx`

- [ ] **Step 1:** Build all homepage sections with motion
- [ ] **Step 2:** Compose on `/`
- [ ] **Step 3:** Responsive pass
- [ ] **Step 4:** Commit `feat: implement animated homepage`

### Task 5: Shared page templates

**Files:**
- Create: `components/templates/ProductPage.tsx`, `SolutionPage.tsx`, `IndustryPage.tsx`, `CaseStudyPage.tsx`, `SimpleContentPage.tsx`
- Create: `lib/content/products.ts`, `useCases.ts`, `industries.ts`, `caseStudies.ts`, `company.ts`

- [ ] **Step 1:** Define content types + sample content
- [ ] **Step 2:** Build templates with hero, features, FAQ, CTA
- [ ] **Step 3:** Commit `feat: add reusable marketing page templates`

### Task 6: Wire all IA routes

**Files:**
- Create: `app/products/[slug]/page.tsx` and parallel route folders for use-cases, industries, case-studies, company pages

- [ ] **Step 1:** Dynamic routes for products/use-cases/industries/case-studies
- [ ] **Step 2:** Static company/legal pages
- [ ] **Step 3:** Case studies index
- [ ] **Step 4:** `npm run build` green
- [ ] **Step 5:** Commit `feat: wire full site information architecture`

### Task 7: Polish + verification

- [ ] **Step 1:** Mobile nav drawer, a11y focus, reduced-motion respect
- [ ] **Step 2:** Visual QA against Karix section order
- [ ] **Step 3:** Final commit `chore: polish motion, responsive, and a11y`

---

## Execution note

User requested immediate implementation after architecture approval. Execute tasks sequentially in this repo; prefer working homepage + shell first, then template fan-out for full IA.
