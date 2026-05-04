# Personal Site Premium Copy Refresh Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the personal website copy so it feels more premium, mature, and understated while keeping the site personal and technically credible.

**Architecture:** Keep the existing page structure and visual layout intact. Limit this phase to copy and metadata changes, plus one lightweight regression test that guards against the most obvious tone regressions such as playful hero phrasing, age-based identity copy, decorative emoji in titles, and banned Ozone CTO references.

**Tech Stack:** Next.js App Router, React, TypeScript, Node.js test runner

---

## File Map

**Files to modify**

- `src/app/page.tsx`
  - Update the hero headline, supporting copy, social lead-in text, and optionally the homepage section headings/link copy if the current tone still feels casual.
- `src/app/project/page.tsx`
  - Rewrite the page title and supporting description so the page reads as selected work rather than a casual project list.
- `src/app/contact/page.tsx`
  - Rewrite the page title and supporting description into a calmer, more professional invitation to connect.
- `src/app/layout.tsx`
  - Replace the default site metadata title/description with wording aligned to the new positioning.

**Files to create**

- `tests/site-copy.test.mjs`
  - Add lightweight regression coverage for the new tone constraints and key hero copy.

**Reference documents**

- `docs/superpowers/specs/2026-05-04-personal-site-premium-copy-design.md`

## Chunk 1: Guardrails

### Task 1: Add copy regression coverage for tone and banned phrases

**Files:**
- Create: `tests/site-copy.test.mjs`
- Reference: `docs/superpowers/specs/2026-05-04-personal-site-premium-copy-design.md`

- [ ] **Step 1: Write the failing test**

Create a file-level regression test that reads:

- `src/app/page.tsx`
- `src/app/project/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/layout.tsx`

The test should assert all of the following:

- homepage includes `Building thoughtful software for real-world use.`
- homepage includes `I work across product, frontend, backend, and delivery`
- homepage does not include `Hey there`
- homepage does not include `Cat lover`
- homepage does not include `24 years old`
- contact page does not include `🫱🏼‍🫲🏽`
- project page does not include `🏗️`
- target files do not include `CTO Ozone`
- target files do not include `Ozone` unless a future revision explicitly needs that

Suggested test structure:

```js
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function read(relativePath) {
  return fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("homepage copy matches the premium positioning", () => {
  const page = read("src/app/page.tsx");
  assert.match(page, /Building thoughtful software for real-world use\./);
  assert.match(
    page,
    /I work across product, frontend, backend, and delivery to build systems that are clear, reliable, and useful under real constraints\./,
  );
  assert.doesNotMatch(page, /Hey there/);
  assert.doesNotMatch(page, /Cat lover/);
  assert.doesNotMatch(page, /24 years old/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
node --test tests/site-copy.test.mjs
```

Expected: FAIL because the current site still contains playful hero copy, emoji-led headings, and generic metadata.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/site-copy.test.mjs
git commit -m "test: add site copy regression coverage"
```

## Chunk 2: Homepage Rewrite

### Task 2: Rewrite the homepage hero and supporting section copy

**Files:**
- Modify: `src/app/page.tsx`
- Test: `tests/site-copy.test.mjs`
- Reference: `docs/superpowers/specs/2026-05-04-personal-site-premium-copy-design.md`

- [ ] **Step 1: Replace the hero headline**

Change the current hero `<h1>` so it uses:

```tsx
Building thoughtful software for real-world use.
```

Keep the name visible in the hero, but no longer make it the centerpiece of a playful introduction.

- [ ] **Step 2: Replace the hero supporting paragraphs**

Rewrite the supporting copy so it reflects:

- product
- frontend
- backend
- delivery
- reliability
- real business constraints

Required supporting sentence:

```tsx
I work across product, frontend, backend, and delivery to build systems that are clear, reliable, and useful under real constraints.
```

Then add one or two short supporting paragraphs that:

- stay personal
- avoid title-heavy framing
- avoid age-based or “nerd” language
- mention engineering quality, maintainability, and thoughtful execution

- [ ] **Step 3: Rewrite the social lead-in line**

Replace the current:

```tsx
You can find me there 👇
```

with calmer wording such as:

```tsx
You can also find me here.
```

or similarly understated copy.

- [ ] **Step 4: Review section headings and CTA labels**

Adjust homepage section labels only if they still feel too casual after the hero rewrite. Likely candidates:

- `Newest Articles`
- `Featured Projects`
- `See all articles`
- `See all projects`

Prefer restrained wording over clever wording.

- [ ] **Step 5: Run the copy regression test**

Run:

```bash
node --test tests/site-copy.test.mjs
```

Expected: homepage assertions PASS, while project/contact/layout assertions may still fail.

- [ ] **Step 6: Commit the homepage rewrite**

```bash
git add src/app/page.tsx tests/site-copy.test.mjs
git commit -m "refactor: elevate homepage copy tone"
```

## Chunk 3: Page Copy and Metadata

### Task 3: Rewrite project page, contact page, and global metadata

**Files:**
- Modify: `src/app/project/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/layout.tsx`
- Test: `tests/site-copy.test.mjs`

- [ ] **Step 1: Rewrite the projects page heading and description**

Replace the current emoji-led heading and generic description with copy that feels more curated.

Target direction:

- heading without emoji
- language that frames the page as selected work
- no “explore my projects” phrasing if it reads too casual

Example tone:

```tsx
Selected Work
```

with a short sentence about building products and systems with care.

- [ ] **Step 2: Rewrite the contact page heading and description**

Replace:

- `Get in Touch 🫱🏼‍🫲🏽`
- the current generic invitation copy

Use a composed, direct invitation centered on engineering, product, collaboration, or thoughtful work.

Avoid sounding overly formal or sales-like.

- [ ] **Step 3: Rewrite the global metadata title and description**

Update `src/app/layout.tsx` so:

- the default title no longer needs to say `Personal Website` if a cleaner label reads better
- the description reflects thoughtful software, real-world use, and engineering work
- the description no longer sounds like a generic portfolio template

Keep it concise enough for SEO metadata.

- [ ] **Step 4: Expand the regression test assertions**

Update `tests/site-copy.test.mjs` so it verifies:

- `src/app/project/page.tsx` no longer contains `🏗️`
- `src/app/contact/page.tsx` no longer contains `🫱🏼‍🫲🏽`
- `src/app/layout.tsx` no longer contains `Personal Website` if the implementation removes it
- metadata copy includes the new positioning language

- [ ] **Step 5: Run the regression test**

Run:

```bash
node --test tests/site-copy.test.mjs
```

Expected: PASS

- [ ] **Step 6: Commit the page and metadata rewrite**

```bash
git add src/app/project/page.tsx src/app/contact/page.tsx src/app/layout.tsx tests/site-copy.test.mjs
git commit -m "refactor: refresh supporting site copy"
```

## Chunk 4: Final Verification

### Task 4: Validate the refresh in the running app and production build

**Files:**
- Verify only: `src/app/page.tsx`, `src/app/project/page.tsx`, `src/app/contact/page.tsx`, `src/app/layout.tsx`, `tests/site-copy.test.mjs`

- [ ] **Step 1: Run the full test suite**

Run:

```bash
pnpm test
```

Expected: PASS

- [ ] **Step 2: Run lint**

Run:

```bash
pnpm lint
```

Expected: PASS

- [ ] **Step 3: Run the production build**

Run:

```bash
pnpm build
```

Expected: PASS

- [ ] **Step 4: Manually review key pages in development**

Run:

```bash
pnpm dev
```

Review:

- `/`
- `/project`
- `/contact`

Manual checks:

- hero reads as calm and mature on first view
- no decorative emoji remain in page titles/headings
- copy feels personal, not corporate
- no mention of Ozone CTO appears
- project and contact intros feel aligned with the hero

- [ ] **Step 5: Commit final polish if needed**

If manual review leads to small wording adjustments:

```bash
git add src/app/page.tsx src/app/project/page.tsx src/app/contact/page.tsx src/app/layout.tsx tests/site-copy.test.mjs
git commit -m "chore: polish premium copy refresh"
```

Plan complete and saved to `docs/superpowers/plans/2026-05-04-personal-site-premium-copy-refresh.md`. Ready to execute?
