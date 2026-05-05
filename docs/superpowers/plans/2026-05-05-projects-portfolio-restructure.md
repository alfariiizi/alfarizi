# Projects Portfolio Restructure Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the personal site's projects portfolio so it supports highlighted flagship work, explicit project typing, richer professional project coverage, and sanitized internal project pages without breaking the existing content pipeline.

**Architecture:** Keep the existing Next.js App Router site and Velite-based MDX content model, but expand project frontmatter so UI behavior depends on explicit metadata rather than string inference. Implement the work in layers: first harden the data model and sorting helpers, then update project list/detail UI, then migrate project content and placeholder assets, and finally verify homepage alignment and build stability.

**Tech Stack:** Next.js App Router, React, TypeScript, Velite, MDX, Tailwind CSS, Node.js test runner

---

## Current Baseline

These current implementation details matter and should be treated as constraints during execution:

- Project content lives in `public/content/project/**/index.mdx`.
- Velite project frontmatter currently requires a real `image` file and eagerly resolves image dimensions and blur data in `velite.config.ts`.
- Project type is currently inferred from `team` via `isPersonalProject` in `velite.config.ts`.
- Highlight ordering is currently hardcoded via `bookmarkProjectTitle` in `src/app/project/shared.ts`.
- Homepage `Selected Work` currently renders `sortedProjects.slice(0, 3)` from the same shared project list.
- Project cards currently render `team`, inferred personal/project wording, and no explicit project type badge.
- Project detail pages currently render `title (team)` and show public links whenever `link` or `repo` exists.
- The working tree already contains unrelated uncommitted app changes. During implementation, do not revert them.

## File Map

**Files to modify**

- `velite.config.ts`
  - Expand the project schema with explicit metadata fields and stop deriving display semantics from `team`.
- `src/lib/content-utils.js`
  - Add focused helpers for highlight selection, non-highlight sorting, and project-type-based filtering if needed.
- `src/app/project/shared.ts`
  - Replace hardcoded bookmark ordering with metadata-driven highlighted/non-highlighted collections.
- `src/app/project/page.tsx`
  - Render the new `Highlighted Projects` and `All Projects` sections.
- `src/app/project/_components/Projects.tsx`
  - Update project cards to show `company`, `projectType` badge, role, and metadata-driven UI.
- `src/app/project/[...slug]/page.tsx`
  - Update the detail header to use `company`, explicit project type, and safe link behavior.
- `src/app/page.tsx`
  - Align homepage `Selected Work` preview with the three highlighted projects.
- existing project MDX files under `public/content/project/**/index.mdx`
  - Normalize frontmatter and rewrite content structure.

**Files to create**

- `tests/project-content-utils.test.mjs`
  - Regression coverage for project ordering, highlight selection, and project-type-aware grouping helpers.
- `tests/project-frontmatter.test.mjs`
  - File-level regression coverage for the required project frontmatter fields across `public/content/project/**/index.mdx`.
- new project folders under `public/content/project/**`
  - Add missing professional project entries and placeholder assets.

**Files to add only if the implementation needs them**

- `src/app/project/_components/ProjectTypeBadge.tsx`
  - Extract project type badge rendering if card/detail UI starts duplicating logic.
- `public/content/project/<slug>/cover.png`
  - Real placeholder cover image files for any new project lacking a current asset.

**Reference documents**

- `docs/superpowers/specs/2026-05-05-projects-portfolio-restructure-design.md`
- `docs/architecture/content-pipeline.md`

## Chunk 1: Data Model and Guardrails

### Task 1: Add regression tests for metadata-driven project ordering and grouping

**Files:**
- Create: `tests/project-content-utils.test.mjs`
- Modify: `src/lib/content-utils.js`
- Reference: `docs/superpowers/specs/2026-05-05-projects-portfolio-restructure-design.md`

- [ ] **Step 1: Write the failing test for highlighted project selection**

Create a pure-data test that feeds a small array of mock project records into a new helper and asserts:

- highlighted projects are selected by `highlight === true`
- highlighted projects preserve the intended order from newest to oldest unless the design specifies otherwise
- non-highlighted projects exclude all highlighted entries

Suggested shape:

```js
const input = [
  { title: "A", highlight: false, startDate: "2024-01-01" },
  { title: "B", highlight: true, startDate: "2025-01-01" },
  { title: "C", highlight: true, startDate: "2023-01-01" },
];
```

- [ ] **Step 2: Extend the same test file for chronological sorting**

Add assertions that:

- non-highlighted projects are sorted by `startDate` descending
- projects with the same `startDate` retain deterministic ordering
- the helper does not mutate the input array

- [ ] **Step 3: Run the test to verify it fails**

Run:

```bash
node --test tests/project-content-utils.test.mjs
```

Expected: FAIL because the metadata-driven helpers do not exist yet.

- [ ] **Step 4: Implement minimal pure helpers in `src/lib/content-utils.js`**

Add small focused helpers such as:

- `sortProjectsByStartDate(projects)`
- `getHighlightedProjects(projects)`
- `getNonHighlightedProjects(projects)`

Keep them pure and framework-independent.

- [ ] **Step 5: Re-run the test**

Run:

```bash
node --test tests/project-content-utils.test.mjs
```

Expected: PASS

- [ ] **Step 6: Commit the helper baseline**

```bash
git add src/lib/content-utils.js tests/project-content-utils.test.mjs
git commit -m "test: cover metadata-driven project ordering"
```

### Task 2: Add regression tests for required project frontmatter fields

**Files:**
- Create: `tests/project-frontmatter.test.mjs`
- Modify: `public/content/project/**/index.mdx`
- Reference: `docs/superpowers/specs/2026-05-05-projects-portfolio-restructure-design.md`

- [ ] **Step 1: Write the failing frontmatter test**

Create a test that scans every `public/content/project/**/index.mdx` file and asserts each file contains frontmatter keys for:

- `company`
- `projectType`
- `highlight`
- `image`
- `startDate`

Use simple file parsing rather than booting Next.js or Velite.

- [ ] **Step 2: Add one assertion for project type validity**

Assert `projectType` is exactly one of:

- `personal`
- `professional-public`
- `professional-internal`

- [ ] **Step 3: Run the test to verify it fails**

Run:

```bash
node --test tests/project-frontmatter.test.mjs
```

Expected: FAIL because existing project files do not yet contain the new keys.

- [ ] **Step 4: Do not fix the content yet**

Leave the test failing until the content migration chunk. The purpose of this task is to establish a guardrail first.

- [ ] **Step 5: Commit the failing guardrail**

```bash
git add tests/project-frontmatter.test.mjs
git commit -m "test: require explicit project frontmatter fields"
```

## Chunk 2: Velite Schema and Shared Data Wiring

### Task 3: Expand the Velite project schema with explicit portfolio metadata

**Files:**
- Modify: `velite.config.ts`
- Test: `tests/project-frontmatter.test.mjs`

- [ ] **Step 1: Add the new schema fields**

Extend the project schema with:

- `company: s.string().max(99)`
- `projectType: s.enum(["personal", "professional-public", "professional-internal"])`
- `highlight: s.boolean().default(false)`
- `status: s.string().max(30).optional()`

- [ ] **Step 2: Deprecate `team`-based classification**

Remove or stop using the transform that creates `isPersonalProject` by checking `team.toLowerCase().includes("personal")`.

If a compatibility field is temporarily helpful, prefer a derived explicit field such as:

```ts
isInternalProject: data.projectType === "professional-internal"
```

but do not keep `team` as the source of truth.

- [ ] **Step 3: Add any safe derived fields needed by the UI**

If the UI needs stable labels, add derived fields such as:

- `projectTypeLabel`
- `isProfessionalProject`
- `isInternalProject`

Keep the mapping centralized in the Velite transform or a small UI helper, not duplicated across pages.

- [ ] **Step 4: Run the frontmatter test**

Run:

```bash
node --test tests/project-frontmatter.test.mjs
```

Expected: still FAIL until project files are migrated.

- [ ] **Step 5: Commit the schema expansion**

```bash
git add velite.config.ts
git commit -m "feat: add explicit projects portfolio metadata"
```

### Task 4: Replace hardcoded project highlighting with metadata-driven shared selectors

**Files:**
- Modify: `src/app/project/shared.ts`
- Modify: `src/lib/content-utils.js`
- Test: `tests/project-content-utils.test.mjs`

- [ ] **Step 1: Remove the hardcoded bookmark title list**

Delete the current `bookmarkProjectTitle` list and the logic that maps titles manually.

- [ ] **Step 2: Build shared exported collections from metadata**

Export:

- `highlightedProjects`
- `nonHighlightedProjects`
- `sortedProjects` only if still needed

Use the pure helpers from `src/lib/content-utils.js`.

- [ ] **Step 3: Re-run the helper test**

Run:

```bash
node --test tests/project-content-utils.test.mjs
```

Expected: PASS

- [ ] **Step 4: Commit the shared project selectors**

```bash
git add src/app/project/shared.ts src/lib/content-utils.js tests/project-content-utils.test.mjs
git commit -m "refactor: derive project collections from metadata"
```

## Chunk 3: Projects Page and Homepage UI

### Task 5: Update project cards to show company and project type explicitly

**Files:**
- Modify: `src/app/project/_components/Projects.tsx`
- Create if needed: `src/app/project/_components/ProjectTypeBadge.tsx`

- [ ] **Step 1: Add a focused badge renderer**

If card markup gets noisy, extract a small badge component or helper that maps:

- `personal` -> `Personal`
- `professional-public` -> `Professional`
- `professional-internal` -> `Internal System`

- [ ] **Step 2: Replace `team`-based copy**

Remove the current line:

```tsx
project.isPersonalProject ? "Personal Project" : `Created with ${project.team}`
```

Replace it with explicit `company` context plus the new badge.

- [ ] **Step 3: Keep the rest of the card lightweight**

Cards should still show:

- title
- description
- company
- project type badge
- role if present
- year range
- tags or concise stack summary

Avoid turning the card into a dense resume block.

- [ ] **Step 4: Preserve card click behavior**

All cards should remain clickable detail links, including internal projects.

- [ ] **Step 5: Manually verify card rendering**

Run:

```bash
pnpm dev
```

Check `/project` and confirm cards now distinguish personal, professional, and internal work at a glance.

- [ ] **Step 6: Commit the card UI update**

```bash
git add src/app/project/_components/Projects.tsx src/app/project/_components/ProjectTypeBadge.tsx
git commit -m "feat: add explicit company and project type to cards"
```

If no extracted badge component is needed, omit it from the commit.

### Task 6: Split the projects page into highlighted and all-project sections

**Files:**
- Modify: `src/app/project/page.tsx`
- Modify: `src/app/project/shared.ts`

- [ ] **Step 1: Add the `Highlighted Projects` section**

Render exactly the three highlighted projects from shared metadata-driven selectors.

- [ ] **Step 2: Add the `All Projects` section**

Render every non-highlighted project in chronological order from newest to oldest.

- [ ] **Step 3: Adjust section intro copy only as needed**

Keep the current page tone aligned with the approved selected-work positioning.

- [ ] **Step 4: Verify layout behavior**

Run:

```bash
pnpm dev
```

Check that:

- highlighted projects appear first
- non-highlighted projects exclude the highlighted ones
- cards still render correctly on mobile and desktop widths

- [ ] **Step 5: Commit the projects page split**

```bash
git add src/app/project/page.tsx src/app/project/shared.ts
git commit -m "feat: split projects page into highlighted and all work"
```

### Task 7: Align the homepage project preview with the highlighted projects

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/project/shared.ts`

- [ ] **Step 1: Replace `sortedProjects.slice(0, 3)`**

Use the shared highlighted collection instead of slicing the general project list.

- [ ] **Step 2: Verify homepage and project page alignment**

Run:

```bash
pnpm dev
```

Check that the homepage `Selected Work` preview shows:

- `Oriskin`
- `Oriskin Home Service`
- `KurirGo`

- [ ] **Step 3: Commit the homepage alignment**

```bash
git add src/app/page.tsx src/app/project/shared.ts
git commit -m "refactor: align homepage work preview with highlights"
```

## Chunk 4: Project Detail Page Semantics

### Task 8: Update the project detail header to use the new model

**Files:**
- Modify: `src/app/project/[...slug]/page.tsx`
- Create if needed: `src/app/project/_components/ProjectTypeBadge.tsx`

- [ ] **Step 1: Replace the `title (team)` heading pattern**

Render:

- title
- company
- project type badge
- role if present
- year range

Do not display `team` in the header.

- [ ] **Step 2: Apply safe link behavior by project type**

Implement the following rules:

- `personal`: show live link and repo when available
- `professional-public`: show live link if safe and repo only if intended for publication
- `professional-internal`: hide live link unless explicitly safe

Avoid leaking internal-only URLs through generic frontmatter defaults.

- [ ] **Step 3: Keep the detail page body renderer unchanged**

Do not redesign the MDX article layout in this task. Limit this change to header semantics and safe metadata presentation.

- [ ] **Step 4: Manually verify detail pages**

Run:

```bash
pnpm dev
```

Check at least:

- one personal project
- one public professional project
- one internal professional project

Verify header semantics and link visibility for each.

- [ ] **Step 5: Commit the detail-page semantic update**

```bash
git add src/app/project/[...slug]/page.tsx src/app/project/_components/ProjectTypeBadge.tsx
git commit -m "refactor: normalize project detail header semantics"
```

If no extracted badge component is needed, omit it from the commit.

## Chunk 5: Content Migration and Placeholder Assets

### Task 9: Add real placeholder cover assets for any new professional project entries

**Files:**
- Create: `public/content/project/<slug>/cover.png`
- Create if needed: `public/content/project/<slug>/gallery-01.png`
- Create if needed: `public/content/project/<slug>/gallery-02.png`
- Create if needed: `public/content/project/<slug>/gallery-03.png`

- [ ] **Step 1: Inventory project folders that currently lack a valid cover asset**

Before writing frontmatter, list every new slug that needs a real `cover.png`.

- [ ] **Step 2: Add a real placeholder cover file for each new project**

Do not leave the frontmatter pointing at a missing file. If the final screenshot is not ready yet, add a real placeholder asset that can be replaced later.

- [ ] **Step 3: Skip gallery image files unless they are actually available**

The `Gallery` section may use textual placeholders. Only create gallery images now if there is already a safe placeholder file to use.

- [ ] **Step 4: Commit placeholder asset coverage**

```bash
git add public/content/project
git commit -m "chore: add placeholder project cover assets"
```

### Task 10: Migrate existing personal and professional project frontmatter

**Files:**
- Modify: existing `public/content/project/**/index.mdx`
- Test: `tests/project-frontmatter.test.mjs`

- [ ] **Step 1: Update every existing project frontmatter block**

Add the required new fields:

- `company`
- `projectType`
- `highlight`

Set examples such as:

- existing personal projects -> `company: Personal`, `projectType: personal`, `highlight: false`
- `Robota`, `Windsight`, `SPLP Sulbar`, `Jogiia`, `KurirGo`, `Oriskin` public products -> `professional-public`
- internal systems such as `Oriskin HARIS`, `Oriskin Blast`, `Oriskin Omnichannel`, `Oriskin Auth`, `Oriskin NextAppo`, `Oriskin Mitra Estetik` -> `professional-internal`

- [ ] **Step 2: Mark the three highlighted projects**

Set `highlight: true` only on:

- `Oriskin`
- `Oriskin Home Service`
- `KurirGo`

- [ ] **Step 3: Re-run the frontmatter test**

Run:

```bash
node --test tests/project-frontmatter.test.mjs
```

Expected: PASS

- [ ] **Step 4: Commit the metadata migration**

```bash
git add public/content/project tests/project-frontmatter.test.mjs
git commit -m "feat: migrate project frontmatter to explicit portfolio metadata"
```

### Task 11: Rewrite the three highlighted projects with the balanced structure

**Files:**
- Modify: `public/content/project/oriskin/index.mdx`
- Modify: `public/content/project/oriskin-home-service/index.mdx`
- Modify: `public/content/project/kurirgo/index.mdx`

- [ ] **Step 1: Write `Oriskin` with the approved public framing**

Include:

- customer-facing beauty clinic commerce/member context
- scale across 80+ branches and a large customer base
- frontend ownership in Next.js
- package/treatment browsing
- auth/member flows
- customer dashboard
- `Gallery` placeholders for safe screenshots

- [ ] **Step 2: Write `Oriskin Home Service` with the approved backend framing**

Include:

- home-service appointment context for non-medical treatment at the customer location
- backend role in Go
- scheduling, availability, therapist assignment, status flow, notifications, customer/treatment integration, reviews
- sanitized wording only
- `Gallery` placeholders

- [ ] **Step 3: Write `KurirGo` with the approved tech-lead framing**

Include:

- shipping aggregator context
- seller/general-user audience
- architecture and provider integration ownership
- pricing, lifecycle, tracking, team/delivery ownership
- `Gallery` placeholders

- [ ] **Step 4: Commit highlighted project rewrites**

```bash
git add public/content/project/oriskin public/content/project/oriskin-home-service public/content/project/kurirgo
git commit -m "feat: rewrite highlighted project case studies"
```

### Task 12: Draft the remaining professional and personal project pages

**Files:**
- Modify: all remaining `public/content/project/**/index.mdx`

- [ ] **Step 1: Draft missing professional project entries from the approved inventory**

Add missing folders and MDX pages for:

- `Oriskin HARIS`
- `Oriskin Blast`
- `Oriskin Omnichannel`
- `Oriskin Auth`
- `Oriskin NextAppo`
- `Oriskin Mitra Estetik`
- `KurirGo` if not already present
- `AgenCerdas`
- `Jogiia`
- `Oriskin` if not already present
- `Oriskin Home Service` if not already present

Skip any project already created in the highlighted rewrite task.

- [ ] **Step 2: Normalize the remaining existing project pages**

Rewrite current MDX content into the balanced section structure where reasonable:

- `Overview`
- `Business Context`
- `My Role`
- `Key Capabilities`
- `Technical Direction`
- `Outcome / Impact`
- `Gallery`

Keep legacy personal projects shorter when needed.

- [ ] **Step 3: Keep internal systems sanitized**

Do not add:

- sensitive workflow internals
- confidential metrics
- unblurred internal-only screenshots
- unsafe internal URLs

- [ ] **Step 4: Commit the bulk project-content migration**

```bash
git add public/content/project
git commit -m "feat: expand and normalize portfolio project content"
```

## Chunk 6: Verification and Release Readiness

### Task 13: Run automated regression coverage

**Files:**
- No code changes expected

- [ ] **Step 1: Run focused project tests**

Run:

```bash
node --test tests/project-content-utils.test.mjs
node --test tests/project-frontmatter.test.mjs
```

Expected: PASS

- [ ] **Step 2: Run the existing repository test suite**

Run:

```bash
pnpm test
```

Expected: PASS

- [ ] **Step 3: Commit only if a test file changed during verification**

```bash
git add tests
git commit -m "test: finalize project portfolio regression coverage"
```

Skip this commit if verification produced no file changes.

### Task 14: Run app-level verification for content pipeline and page rendering

**Files:**
- No code changes expected

- [ ] **Step 1: Run lint**

Run:

```bash
pnpm lint
```

Expected: PASS

- [ ] **Step 2: Run production build**

Run:

```bash
pnpm build
```

Expected: PASS, including Velite content processing with all new project cover images present.

- [ ] **Step 3: Run manual spot checks in dev mode**

Run:

```bash
pnpm dev
```

Manually verify:

- homepage `Selected Work`
- `/project`
- at least three highlighted project detail pages
- at least one internal project detail page
- at least one legacy personal project detail page

- [ ] **Step 4: Summarize any remaining content-review TODOs**

Document the remaining manual follow-up items, such as:

- replacing placeholder cover images
- replacing textual gallery placeholders with blurred screenshots
- factual corrections the user requests after reviewing generated copy

Do not treat these as blockers if the build, tests, and current UX all pass.

## Notes for Execution

- Do not assume missing project details; use conservative wording when facts are incomplete.
- Prefer small commits after each task or coherent subtask, as shown above.
- Do not revert unrelated workspace changes while implementing this plan.
- If the amount of MDX writing becomes too large for one uninterrupted pass, split the content migration tasks into smaller commits by company or by highlight status.
- If a new shared UI helper is introduced, keep it narrow and avoid creating a generic abstraction that only serves one call site.

## Expected End State

After this plan is executed:

- the projects portfolio is explicitly typed and metadata-driven
- the homepage and projects page both spotlight the same three flagship projects
- cards and detail pages distinguish personal, public professional, and internal systems clearly
- all approved project inventory is represented in the site
- internal systems are visible through sanitized writeups
- the Velite pipeline remains stable because every project has a valid cover image
- project content is ready for later screenshot replacement without structural rewrites
