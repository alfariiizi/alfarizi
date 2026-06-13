# Experience Company Logos Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a compact company logo and company name header to every experience entry, using local assets and preserving the current experience layout.

**Architecture:** Keep company metadata in `src/app/experience/data.ts` so the page remains data-driven. Store logo assets in `public/images/company-logos` and render them in the experience page as a small leading identity row above each headline.

**Tech Stack:** Next.js App Router, React, TypeScript, local static image assets, existing experience page layout.

---

## Chunk 1: Assets and Data

**Files:**
- Create: `public/images/company-logos/oriskin.png`
- Create: `public/images/company-logos/jogiia.png`
- Create: `public/images/company-logos/datains.png`
- Create: `public/images/company-logos/nanosense.png`
- Modify: `src/app/experience/data.ts`
- Test: `tests/site-copy.test.mjs`

- [ ] **Step 1: Write the failing test**

Add assertions that each experience entry now exposes a logo path and company display name.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/site-copy.test.mjs`
Expected: FAIL because logo metadata is not yet present.

- [ ] **Step 3: Write minimal implementation**

Add `companyLogo` and `companyName` fields to the experience data and copy logo assets into `public/images/company-logos`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/site-copy.test.mjs`
Expected: PASS.

## Chunk 2: Experience UI

**Files:**
- Modify: `src/app/experience/page.tsx`
- Test: `tests/site-copy.test.mjs`

- [ ] **Step 1: Write the failing test**

Add assertions that the experience page renders a company identity row before the headline.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/site-copy.test.mjs`
Expected: FAIL until the new layout exists.

- [ ] **Step 3: Write minimal implementation**

Render each logo with a small image and company name above the headline, keeping spacing and hierarchy compact.

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/site-copy.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add public/images/company-logos src/app/experience/data.ts src/app/experience/page.tsx tests/site-copy.test.mjs docs/superpowers/plans/2026-06-13-experience-company-logos.md
git commit -m "Add company logos to experience entries"
```
