# Personal Site Scalability Foundation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the highest-risk scalability and maintainability bottlenecks in this personal site without changing its content model or visual design.

**Architecture:** Keep the site as a single Next.js application with file-based content, but make runtime behavior more deterministic, isolate content-processing concerns, and move user-facing queries away from full client-side filtering. The first phase hardens build and request paths; the second phase reduces payload, build-time cost, and operational fragility.

**Tech Stack:** Next.js App Router, React 18, TypeScript, Tailwind CSS, Velite, MDX, Zod, Resend, Node.js test runner

---

## Current Baseline

These changes are already in place and should be treated as the new starting point:

- Deterministic non-mutating sort helpers live in `src/lib/content-utils.js`.
- Contact form validation and in-memory rate limiting live in `src/lib/contact-form.js`.
- Contact API and form UI now return structured success/error responses.
- Contact endpoint now adds request IDs, structured operational logs, a honeypot field, and a light same-origin check when the `Origin` header is present.
- Content asset normalization now lives in `src/lib/content-assets.js`.
- Velite frontmatter images now resolve local assets from the filesystem instead of relying on live HTTP fetches.
- MDX image rendering now receives per-document asset context, so relative sources like `cover.png` resolve during static generation.
- Blog search normalization now lives in `src/lib/blog-search.js`.
- Blog listing filtering now happens in the server page before data reaches the presentational grid.
- MDX asset path joining now lives in `src/lib/mdx-paths.js`, replacing the old hardcoded slug helper.
- The MDX runtime trust boundary is now documented in `docs/architecture/content-pipeline.md`.
- `pnpm` is now the canonical package manager, `packageManager` is pinned in `package.json`, and non-canonical lockfiles have been removed.
- Required dependency build scripts are explicitly whitelisted via `package.json#pnpm.onlyBuiltDependencies`.
- `README.md` now documents the verified `pnpm`-based local workflow.
- Regression tests for those behaviors live in `tests/contact-form.test.mjs` and `tests/content-utils.test.mjs`.
- Additional asset resolution regression tests live in `tests/content-assets.test.mjs`.
- Additional blog search regression tests live in `tests/blog-search.test.mjs`.
- Additional MDX path regression tests live in `tests/mdx-paths.test.mjs`.

## File Map

**Already modified in this phase**

- `package.json`
- `src/app/api/email/route.ts`
- `src/app/blog/page.tsx`
- `src/app/blog/_components/Blog.tsx`
- `src/app/blog/_components/SearchInput.tsx`
- `src/app/contact/_components/Form.tsx`
- `src/app/page.tsx`
- `src/app/project/_components/Timeline.tsx`
- `src/app/project/shared.ts`
- `src/components/mdx/Image.tsx`
- `src/components/mdx/MDXComponets.tsx`
- `src/lib/mdx-paths.js`
- `src/lib/content-assets.js`
- `src/lib/blog-search.js`
- `src/lib/contact-form.js`
- `src/lib/content-utils.js`
- `README.md`
- `velite.config.ts`
- `docs/architecture/content-pipeline.md`
- `tests/content-assets.test.mjs`
- `tests/blog-search.test.mjs`
- `tests/contact-form.test.mjs`
- `tests/content-utils.test.mjs`
- `tests/mdx-paths.test.mjs`

**Likely future files to modify**

- `next.config.js`
- `velite.config.ts`
- `src/components/mdx/MDXComponets.tsx`
- `src/components/mdx/Image.tsx`
- `src/app/blog/_components/Blog.tsx`
- `src/app/blog/_components/SearchInput.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[...slug]/page.tsx`
- `src/app/project/[...slug]/page.tsx`
- `README.md`

**Likely future files to create**

- `src/lib/blog-search.js`
- `tests/blog-search.test.mjs`
- `src/lib/mdx-paths.js`
- `tests/mdx-paths.test.mjs`
- `docs/architecture/content-pipeline.md`

## Chunk 1: Toolchain Stability

### Task 1: Choose one package manager and clean lockfiles

**Files:**
- Modify: `README.md`
- Modify: `package.json`
- Delete or archive after approval: `package-lock.json` or `yarn.lock` or `bun.lockb`

- [x] **Step 1: Decide the canonical package manager**

Pick exactly one of `pnpm`, `npm`, `yarn`, or `bun`. Prefer the package manager that matches the verified repository workflow.

- [x] **Step 2: Update setup docs**

Document one install path only in `README.md`, including:

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm dev
```

- [x] **Step 3: Remove non-canonical lockfiles**

Keep only the lockfile for the chosen package manager.

- [x] **Step 4: Reinstall dependencies from scratch**

Run:

```bash
rm -rf node_modules
pnpm install --frozen-lockfile
```

Expected: install finishes without native module errors.

- [x] **Step 5: Verify `sharp` loads**

Run:

```bash
node -e "import('sharp').then(() => console.log('sharp ok'))"
```

Expected: `sharp ok`

## Chunk 2: MDX Runtime Safety

### Task 2: Remove slug-specific path generation from MDX helpers

**Files:**
- Modify: `src/components/mdx/MDXComponets.tsx`
- Create: `src/lib/mdx-paths.ts`
- Test: `tests/mdx-paths.test.mjs`

- [x] **Step 1: Write the failing path test**

Cover a case where a blog post slug such as `prisma-orm-and-turso` resolves local asset references without using a hardcoded slug.

- [x] **Step 2: Run the test and confirm it fails**

Run:

```bash
node --test tests/mdx-paths.test.mjs
```

Expected: FAIL because slug-aware path generation does not exist yet.

- [x] **Step 3: Implement a reusable MDX asset path helper**

Create a helper that receives:

- content type (`blog` or `project`)
- content slug
- asset filename

And returns a stable public path such as:

```ts
/content/blog/prisma-orm-and-turso/cover.png
```

- [x] **Step 4: Replace the hardcoded helper in `MDXComponets.tsx`**

Pass the current content slug through the page layer instead of relying on a global constant.

- [x] **Step 5: Re-run the test**

Expected: PASS

### Task 3: Reduce reliance on `new Function` for MDX execution

**Files:**
- Modify: `src/components/mdx/MDXComponets.tsx`
- Modify: `src/app/blog/[...slug]/page.tsx`
- Modify: `src/app/project/[...slug]/page.tsx`

- [x] **Step 1: Confirm the supported Velite MDX render path**

Check whether the current Velite output can be rendered through a safer, framework-supported path before designing a custom runtime.

- [x] **Step 2: Confirm whether the current runtime can be replaced safely**

Switch away from direct `new Function` execution.

- [x] **Step 3: Because replacement was not supported, isolate the risk**

Constrain the execution surface to trusted content only and document that trust boundary in `docs/architecture/content-pipeline.md`.

## Chunk 3: Blog Listing Scalability

### Task 4: Move blog filtering to a dedicated search helper

**Files:**
- Create: `src/lib/blog-search.js`
- Test: `tests/blog-search.test.mjs`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/_components/Blog.tsx`
- Modify: `src/app/blog/_components/SearchInput.tsx`

- [x] **Step 1: Write failing tests for blog search behavior**

Cover:

- empty query returns all posts
- query match is case-insensitive
- result order stays newest-first

- [x] **Step 2: Run the tests and confirm they fail**

Run:

```bash
node --test tests/blog-search.test.mjs
```

- [x] **Step 3: Implement a pure search helper**

Keep it independent of React so it can be reused on server-rendered pages later.

- [x] **Step 4: Use the helper in the page layer first**

Filter posts in `src/app/blog/page.tsx` using `searchParams.search` before sending data to the client.

- [x] **Step 5: Simplify the client grid**

Make `Blog.tsx` a presentational component that only renders posts it receives.

- [x] **Step 6: Verify behavior manually**

Run:

```bash
pnpm dev
```

Check `/blog?search=react` and `/blog?search=linux`.

## Chunk 4: Content Pipeline Cost

### Task 5: Separate image metadata generation from every build

**Files:**
- Modify: `velite.config.ts`
- Modify: `src/lib/getBase64.ts`
- Modify: `README.md`
- Create: `docs/architecture/content-pipeline.md`

- [x] **Step 1: Measure the current bottleneck**

Record which transformations in `velite.config.ts` depend on remote fetches or native image processing.

- [x] **Step 2: Decide the preferred model**

Choose one:

- precompute image metadata into content artifacts
- generate metadata only for local assets
- skip blur placeholders for unsupported sources

- [x] **Step 3: Implement the smallest safe change**

Prefer a strategy that removes network dependency during build.

- [x] **Step 4: Document the authoring rules**

Explain which image paths are supported and how to add new content assets safely.

## Chunk 5: Contact Path Operational Hardening

### Task 6: Add visibility and anti-abuse follow-up for the contact endpoint

**Files:**
- Modify: `src/app/api/email/route.ts`
- Modify: `src/app/contact/_components/Form.tsx`
- Test: `tests/contact-form.test.mjs`

- [x] **Step 1: Add a failing test for over-limit messaging**

Confirm the user-facing response stays stable when rate limited.

- [x] **Step 2: Add request identifiers or structured server logs**

Log only operational data. Never log message bodies in plaintext.

- [x] **Step 3: Add one stronger abuse control**

Choose one:

- honeypot field
- origin check
- CAPTCHA or Turnstile

- [x] **Step 4: Re-run contact form tests**

Run:

```bash
pnpm test
```

Expected: PASS

## Final Verification

- [x] Run:

```bash
pnpm test
```

- [x] Run:

```bash
npx tsc --noEmit
```

- [x] Run after fixing native dependency state:

```bash
pnpm lint
pnpm build
```

- [x] Update `README.md` with the verified local workflow only after the above commands succeed.

Plan complete and saved to `docs/superpowers/plans/2026-05-04-personal-site-scalability-foundation.md`. Ready to execute?
