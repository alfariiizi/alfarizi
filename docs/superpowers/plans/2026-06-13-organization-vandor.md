# Organization and Vandor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public `Organization` area to the site, centered on `Vandor`, and surface a concise teaser on the home page.

**Architecture:** Keep the organization copy in one small content module so the home page and dedicated organization page share the same source of truth. Expose the new page through the existing navbar structure and include the route in the sitemap so the page behaves like the other public surfaces.

**Tech Stack:** Next.js App Router, TypeScript, MDX/content-driven pages, React, existing navbar and sitemap utilities.

---

## Chunk 1: Public Navigation and Route Plumbing

**Files:**
- Modify: `src/app/_components/Navbar/shared.tsx`
- Modify: `src/app/sitemap.ts`
- Test: `tests/site-copy.test.mjs`

- [ ] **Step 1: Write the failing test**

Add assertions that the navbar menu includes `Organization` and that the sitemap includes `/organization`.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/site-copy.test.mjs`
Expected: FAIL because `Organization` is not yet present.

- [ ] **Step 3: Write minimal implementation**

Add the `Organization` menu item and include `/organization` in the sitemap.

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/site-copy.test.mjs`
Expected: PASS.

## Chunk 2: Organization Content and Home Teaser

**Files:**
- Create: `src/app/organization/data.ts`
- Create: `src/app/organization/page.tsx`
- Modify: `src/app/page.tsx`
- Test: `tests/site-copy.test.mjs`

- [ ] **Step 1: Write the failing test**

Add assertions that the organization page references `Vandor` and that the home page includes a Vandor teaser.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/site-copy.test.mjs`
Expected: FAIL because the new page and teaser do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create a shared Vandor content object, render it on `/organization`, and add a compact teaser card on the home page.

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/site-copy.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/_components/Navbar/shared.tsx src/app/sitemap.ts src/app/page.tsx src/app/organization tests/site-copy.test.mjs docs/superpowers/plans/2026-06-13-organization-vandor.md
git commit -m "Add organization page for Vandor"
```
