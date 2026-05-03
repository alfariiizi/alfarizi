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
- Content asset normalization now lives in `src/lib/content-assets.js`.
- Velite frontmatter images now resolve local assets from the filesystem instead of relying on live HTTP fetches.
- MDX image rendering now receives per-document asset context, so relative sources like `cover.png` resolve during static generation.
- Blog search normalization now lives in `src/lib/blog-search.js`.
- Blog listing filtering now happens in the server page before data reaches the presentational grid.
- Regression tests for those behaviors live in `tests/contact-form.test.mjs` and `tests/content-utils.test.mjs`.
- Additional asset resolution regression tests live in `tests/content-assets.test.mjs`.
- Additional blog search regression tests live in `tests/blog-search.test.mjs`.

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
- `src/lib/content-assets.js`
- `src/lib/blog-search.js`
- `src/lib/contact-form.js`
- `src/lib/content-utils.js`
- `velite.config.ts`
- `tests/content-assets.test.mjs`
- `tests/blog-search.test.mjs`
- `tests/contact-form.test.mjs`
- `tests/content-utils.test.mjs`

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
- `src/lib/getBase64.ts`
- `README.md`

**Likely future files to create**

- `src/lib/blog-search.js`
- `tests/blog-search.test.mjs`
- `src/lib/mdx-paths.ts`
- `tests/mdx-paths.test.mjs`
- `docs/architecture/content-pipeline.md`

## Chunk 1: Toolchain Stability

### Task 1: Choose one package manager and clean lockfiles

**Files:**
- Modify: `README.md`
- Modify: `package.json`
- Delete or archive after approval: `package-lock.json` or `yarn.lock` or `bun.lockb`

- [ ] **Step 1: Decide the canonical package manager**

Pick exactly one of `npm`, `yarn`, or `bun`. Prefer `npm` unless there is a strong existing deployment dependency on another tool.

- [ ] **Step 2: Update setup docs**

Document one install path only in `README.md`, including:

```bash
npm ci
npm test
npm run dev
```

- [ ] **Step 3: Remove non-canonical lockfiles**

Keep only the lockfile for the chosen package manager.

- [ ] **Step 4: Reinstall dependencies from scratch**

Run:

```bash
rm -rf node_modules
npm ci
```

Expected: install finishes without native module errors.

- [ ] **Step 5: Verify `sharp` loads**

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

- [ ] **Step 1: Write the failing path test**

Cover a case where a blog post slug such as `prisma-orm-and-turso` resolves local asset references without using a hardcoded slug.

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
node --test tests/mdx-paths.test.mjs
```

Expected: FAIL because slug-aware path generation does not exist yet.

- [ ] **Step 3: Implement a reusable MDX asset path helper**

Create a helper that receives:

- content type (`blog` or `project`)
- content slug
- asset filename

And returns a stable public path such as:

```ts
/content/blog/prisma-orm-and-turso/cover.png
```

- [ ] **Step 4: Replace the hardcoded helper in `MDXComponets.tsx`**

Pass the current content slug through the page layer instead of relying on a global constant.

- [ ] **Step 5: Re-run the test**

Expected: PASS

### Task 3: Reduce reliance on `new Function` for MDX execution

**Files:**
- Modify: `src/components/mdx/MDXComponets.tsx`
- Modify: `src/app/blog/[...slug]/page.tsx`
- Modify: `src/app/project/[...slug]/page.tsx`

- [ ] **Step 1: Confirm the supported Velite MDX render path**

Check whether the current Velite output can be rendered through a safer, framework-supported path before designing a custom runtime.

- [ ] **Step 2: If supported, replace the current runtime**

Switch away from direct `new Function` execution.

- [ ] **Step 3: If not supported, isolate the risk**

Constrain the execution surface to trusted content only and document that trust boundary in `docs/architecture/content-pipeline.md`.

## Chunk 3: Blog Listing Scalability

### Task 4: Move blog filtering to a dedicated search helper

**Files:**
- Create: `src/lib/blog-search.js`
- Test: `tests/blog-search.test.mjs`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/blog/_components/Blog.tsx`
- Modify: `src/app/blog/_components/SearchInput.tsx`

- [ ] **Step 1: Write failing tests for blog search behavior**

Cover:

- empty query returns all posts
- query match is case-insensitive
- result order stays newest-first

- [ ] **Step 2: Run the tests and confirm they fail**

Run:

```bash
node --test tests/blog-search.test.mjs
```

- [ ] **Step 3: Implement a pure search helper**

Keep it independent of React so it can be reused on server-rendered pages later.

- [ ] **Step 4: Use the helper in the page layer first**

Filter posts in `src/app/blog/page.tsx` using `searchParams.search` before sending data to the client.

- [ ] **Step 5: Simplify the client grid**

Make `Blog.tsx` a presentational component that only renders posts it receives.

- [ ] **Step 6: Verify behavior manually**

Run:

```bash
npm run dev
```

Check `/blog?search=react` and `/blog?search=linux`.

## Chunk 4: Content Pipeline Cost

### Task 5: Separate image metadata generation from every build

**Files:**
- Modify: `velite.config.ts`
- Modify: `src/lib/getBase64.ts`
- Modify: `README.md`
- Create: `docs/architecture/content-pipeline.md`

- [ ] **Step 1: Measure the current bottleneck**

Record which transformations in `velite.config.ts` depend on remote fetches or native image processing.

- [ ] **Step 2: Decide the preferred model**

Choose one:

- precompute image metadata into content artifacts
- generate metadata only for local assets
- skip blur placeholders for unsupported sources

- [ ] **Step 3: Implement the smallest safe change**

Prefer a strategy that removes network dependency during build.

- [ ] **Step 4: Document the authoring rules**

Explain which image paths are supported and how to add new content assets safely.

## Chunk 5: Contact Path Operational Hardening

### Task 6: Add visibility and anti-abuse follow-up for the contact endpoint

**Files:**
- Modify: `src/app/api/email/route.ts`
- Modify: `src/app/contact/_components/Form.tsx`
- Test: `tests/contact-form.test.mjs`

- [ ] **Step 1: Add a failing test for over-limit messaging**

Confirm the user-facing response stays stable when rate limited.

- [ ] **Step 2: Add request identifiers or structured server logs**

Log only operational data. Never log message bodies in plaintext.

- [ ] **Step 3: Add one stronger abuse control**

Choose one:

- honeypot field
- origin check
- CAPTCHA or Turnstile

- [ ] **Step 4: Re-run contact form tests**

Run:

```bash
npm test
```

Expected: PASS

## Final Verification

- [ ] Run:

```bash
npm test
```

- [ ] Run:

```bash
npx tsc --noEmit
```

- [ ] Run after fixing native dependency state:

```bash
npm run lint
npm run build
```

- [ ] Update `README.md` with the verified local workflow only after the above commands succeed.

Plan complete and saved to `docs/superpowers/plans/2026-05-04-personal-site-scalability-foundation.md`. Ready to execute?
