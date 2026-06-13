# Resume Page and PDF Generation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dedicated `/resume` experience with one shared resume data model, a web preview, and build-generated ATS/original PDF downloads.

**Architecture:** Keep resume content in one composed data module that reuses existing experience, project, and contact data. Render the public `/resume` page and the printable ATS/original variants from the same shared resume document component, then have a build-time Puppeteer script print those printable routes into stable PDF files under `public/resume/*`.

**Tech Stack:** Next.js App Router, Tailwind CSS, Velite, Puppeteer, Node `node:test`, pnpm.

---

## Chunk 1: Shared Resume Data and Filename Helpers

Create the source of truth for resume content and the small helpers that keep filenames and links stable.

**Files:**
- Create: `src/app/resume/data.ts`
- Create: `src/app/resume/utils.js`
- Create: `tests/resume-utils.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import {
  buildResumePdfFilename,
  buildResumePdfHref,
  formatResumeBuildTimestamp,
} from "../src/app/resume/utils.js";

test("resume filename helpers produce filesystem-safe names", () => {
  const stamp = formatResumeBuildTimestamp(
    new Date("2026-06-13T14:05:00+07:00"),
  );

  assert.equal(stamp, "2026-06-13 14-05");
  assert.equal(
    buildResumePdfFilename(stamp, "ats"),
    "2026-06-13 14-05 - Moh Rizal Alfarizi.pdf",
  );
  assert.equal(
    buildResumePdfHref(stamp, "ori"),
    "/resume/ori/2026-06-13 14-05 - Moh Rizal Alfarizi.pdf",
  );
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pnpm test`

Expected: fail because `src/app/resume/utils.js` and the resume data module do not exist yet.

- [ ] **Step 3: Implement the shared resume data and helpers**

Implement:

- a composed `resumeData` object that reuses existing experience entries
- a selected project list sourced from the existing highlighted Velite projects
- resume contact details sourced from the site contact info already in the repo
- filename and href helpers for the ATS/original PDF variants

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pnpm test`

Expected: pass with the new resume helper coverage.

- [ ] **Step 5: Commit**

```bash
git add src/app/resume/data.ts src/app/resume/utils.js tests/resume-utils.test.mjs
git commit -m "feat: add shared resume data helpers"
```

## Chunk 2: Resume Page and Print-Only Layouts

Build the public `/resume` page and the two printable routes that the PDF generator will print.

**Files:**
- Create: `src/app/_components/SiteShell.tsx`
- Modify: `src/app/layout.tsx`
- Create: `src/app/resume/page.tsx`
- Create: `src/app/resume/_components/ResumeDocument.tsx`
- Create: `src/app/resume/_components/ResumeDownloadHeader.tsx`
- Create: `src/app/resume/ats/page.tsx`
- Create: `src/app/resume/ori/page.tsx`

- [ ] **Step 1: Write the failing test**

Add a small helper-level test if needed for any new link builder or route helper introduced in chunk 2. Prefer testing a pure function rather than rendering React in node:test.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pnpm test`

Expected: fail until the new resume components and any new helper exports exist.

- [ ] **Step 3: Implement the page and shared document component**

Implement:

- the `/resume` page with a top `Download Resume` section
- a preview section below it that shows the ATS and original variants
- the shared `ResumeDocument` component that both the preview and print routes reuse
- the download header that links to the generated PDF files using the build timestamp

Also update the root shell so the global navbar and footer are hidden on `/resume/ats` and `/resume/ori`, since those routes are meant to print cleanly.

- [ ] **Step 4: Run the tests and build to verify routing compiles**

Run: `pnpm test`

Run: `pnpm build`

Expected: tests pass and the Next build succeeds with the new resume routes.

- [ ] **Step 5: Commit**

```bash
git add src/app/_components/SiteShell.tsx src/app/layout.tsx src/app/resume/page.tsx src/app/resume/_components/ResumeDocument.tsx src/app/resume/_components/ResumeDownloadHeader.tsx src/app/resume/ats/page.tsx src/app/resume/ori/page.tsx
git commit -m "feat: add resume page and printable routes"
```

## Chunk 3: Build-Time PDF Generation

Add the build-time script that writes the shared build timestamp and prints both resume variants into `public/resume`.

**Files:**
- Create: `src/lib/resume/build-info.js`
- Create: `script/write-resume-build-info.mjs`
- Create: `script/generate-resume-pdfs.mjs`
- Modify: `package.json`
- Modify: `.gitignore` only if the generated build-info file should stay untracked

- [ ] **Step 1: Write the failing test**

Extend `tests/resume-utils.test.mjs` with a case that imports the generated build stamp and checks that it matches the filename helper.

```js
import test from "node:test";
import assert from "node:assert/strict";
import { RESUME_BUILD_TIMESTAMP } from "../src/lib/resume/build-info.js";
import { buildResumePdfFilename } from "../src/app/resume/utils.js";

test("generated build stamp matches resume filename format", () => {
  assert.match(RESUME_BUILD_TIMESTAMP, /^\d{4}-\d{2}-\d{2} \d{2}-\d{2}$/);
  assert.equal(
    buildResumePdfFilename(RESUME_BUILD_TIMESTAMP, "ats"),
    `${RESUME_BUILD_TIMESTAMP} - Moh Rizal Alfarizi.pdf`,
  );
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pnpm test`

Expected: fail until the build-info and PDF-generation helpers exist.

- [ ] **Step 3: Implement the build pipeline**

Implement:

- a prebuild step that writes `src/lib/resume/build-info.js` once per build
- a Puppeteer script that starts the built app locally, waits for fonts, opens `/resume/ats` and `/resume/ori`, and saves PDFs into:
  - `public/resume/ats/`
  - `public/resume/ori/`
- package scripts so `pnpm build` performs the normal Next build and then generates the PDFs automatically

- [ ] **Step 4: Verify the generated files**

Run: `pnpm build`

Then verify:

```bash
ls public/resume/ats
ls public/resume/ori
```

Expected: one ATS PDF and one original PDF whose filenames match the shared build timestamp.

- [ ] **Step 5: Commit**

```bash
git add src/lib/resume/build-info.js script/write-resume-build-info.mjs script/generate-resume-pdfs.mjs package.json .gitignore
git commit -m "feat: generate resume pdfs during build"
```

---

## Final Verification

- `/resume` loads and shows both download links.
- The ATS and original printable routes render without the site chrome.
- `pnpm build` finishes successfully and writes the generated PDFs into `public/resume/ats` and `public/resume/ori`.
- The generated filenames use the same build timestamp everywhere.
