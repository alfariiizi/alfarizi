# Projects Portfolio Restructure Design

## Objective

Restructure the `Selected Work` section so it better represents Moh Rizal Alfarizi's professional portfolio rather than a loose collection of past projects.

The new structure should:

- include both personal and professional work
- clearly distinguish public professional work from internal systems
- elevate three highlighted projects above the rest
- preserve detailed project pages for every project
- make it easy to add sanitized screenshots later without rewriting content

## Approved Direction

The approved direction for this work is:

- keep the projects page as a flat project list, not grouped by company
- treat `company` as context shown inside each card and detail page
- show all projects, including personal and professional work
- highlight three flagship projects:
  - `Oriskin`
  - `Oriskin Home Service`
  - `KurirGo`
- sort non-highlighted projects from newest to oldest
- write all project content in English
- use a balanced project detail structure rather than short blurbs or deep case studies
- allow internal systems to have public detail pages as long as the content is sanitized

## Constraints

- Do not redesign the entire website.
- Keep the existing visual language and navigation patterns intact.
- Scope UI changes to the projects experience.
- Do not require public live links for internal systems.
- Do not expose sensitive operational details, confidential metrics, or unblurred screenshots for internal work.
- Assume screenshots may be added later and structure the content around placeholders now.

## Content Model

### Existing Problem

The current project model relies too heavily on informal metadata such as `team`, and some UI behavior is inferred indirectly from string content like `Personal`.

That makes the portfolio harder to scale now that the site needs to cover:

- personal projects
- public professional projects
- internal professional systems
- highlighted flagship work

### Required Fields

Each project MDX document should remain at:

- `public/content/project/<slug>/index.mdx`

The frontmatter should be expanded to include:

- `company`
- `projectType`
- `highlight`
- `status` optional

The resulting model should support:

- `company`: portfolio context such as `Oriskin`, `Jogiia`, `DataIns`, or `Personal`
- `projectType`: one of:
  - `personal`
  - `professional-public`
  - `professional-internal`
- `highlight`: `true` for flagship projects, otherwise `false`
- `status` optional, for future use such as `active`, `completed`, or `archived`

### Existing Fields To Keep

Keep the current fields that still serve the project detail and card UI:

- `title`
- `description`
- `position`
- `image`
- `tech`
- `link`
- `repo`
- `startDate`
- `endDate`
- `icon`
- `tags`
- `mdx`
- `raw`

### Team Field Status

`team` should no longer be treated as a display or classification field.

From this restructure onward:

- `company` replaces `team` as the user-facing organization context
- `projectType` replaces any category inference previously derived from `team`
- project cards and project detail headers should stop rendering `team`

If keeping `team` temporarily helps migration, it may remain in old documents during the transition, but it should be treated as deprecated and removed from the target UI semantics.

### Source of Truth

After this restructure:

- `projectType` becomes the source of truth for portfolio classification
- `highlight` becomes the source of truth for promoted projects
- `company` becomes the source of truth for organization context

The UI should stop inferring project category from `team`.

## Project Inventory Direction

### Included Work

The portfolio should include all project work discussed so far:

#### Professional

- `Oriskin`
- `Oriskin HARIS`
- `Oriskin Blast`
- `Oriskin Omnichannel`
- `Oriskin Auth`
- `Oriskin NextAppo`
- `Oriskin Home Service`
- `Oriskin Mitra Estetik`
- `KurirGo`
- `AgenCerdas`
- `Jogiia`
- `Robota`
- `Windsight`
- `SPLP Sulbar`

#### Personal

Existing personal projects already present in the repository should remain included, such as:

- `[This Site] rizalalfarizi.com`
- `Jalinan`
- `Portfolio`
- `Blog`
- `WikiRocket!`
- `Movientar`
- `Guess My Number`
- `Pig Game`

### Highlighted Projects

The three highlighted projects are:

- `Oriskin`
- `Oriskin Home Service`
- `KurirGo`

These should appear in a dedicated highlighted area above the general project list.

The same three highlighted projects should also be used for the homepage `Selected Work` preview so the homepage and the full projects page stay aligned.

## Projects Page Behavior

### Page Structure

The `Selected Work` page should be split into two presentation layers:

1. `Highlighted Projects`
2. `All Projects`

### Highlighted Projects

This section should contain exactly the three highlighted projects.

Each highlighted card should show:

- title
- short summary
- company
- project type badge
- role or position
- year range
- concise stack summary
- call to action to open the detail page

The visual treatment should feel more important than regular cards, but still belong to the current site design system.

### All Projects

This section should contain every non-highlighted project.

Rules:

- remain a flat list of cards
- do not group by company
- sort from newest to oldest by `startDate`
- allow personal and professional work to appear in the same stream
- always show enough metadata to distinguish context quickly

Sorting should use `startDate` descending for the non-highlighted list.

## Card UI Rules

Each card should show:

- title
- description
- company
- project type badge
- role if present
- year range
- tags or stack summary

### Badge Rules

Badges should clearly identify project type:

- `Personal`
- `Professional`
- `Internal System`

Recommended mapping:

- `personal` -> `Personal`
- `professional-public` -> `Professional`
- `professional-internal` -> `Internal System`

### Link Rules

- all projects remain clickable and have detail pages
- `professional-public` may show a live link if safe and available
- `personal` may show both live link and repository if available
- `professional-internal` should not show a public live link unless explicitly safe

## Project Detail Header Rules

The project detail page header should be updated to match the new content model.

It should show:

- title
- company
- project type badge
- role if present
- year range
- safe public links according to project type

It should not render the legacy `title (team)` pattern.

Link behavior on the detail page must follow the same rules as the card/list experience:

- `personal`: may show live link and repository when available
- `professional-public`: may show live link if safe, and repository only if intended for publication
- `professional-internal`: should omit public live links unless explicitly approved as safe

## Project Detail Structure

Every project page should follow one shared structure so the portfolio feels intentional and comparable.

### Standard Sections

- `Overview`
- `Business Context`
- `My Role`
- `Key Capabilities`
- `Technical Direction`
- `Outcome / Impact`
- `Gallery`

### Section Expectations

#### Overview

Summarize what the project is and why it exists.

#### Business Context

Explain who uses the product, what problem it solves, and in what context it operates.

#### My Role

Clarify the scope of ownership and what part of the system Rizal directly handled.

#### Key Capabilities

List the most representative workflows, features, or system capabilities.

#### Technical Direction

Describe the main stack and notable implementation choices in practical terms.

#### Outcome / Impact

Capture safe-to-share scale, scope, or business relevance.

#### Gallery

Reserve space for screenshots, blurred internal UI, or workflow illustrations.

### Content Depth

The approved depth is `balanced`.

That means:

- enough detail to feel credible and professional
- not so much detail that every project turns into a long engineering postmortem

Legacy personal projects may use shorter versions of the same structure.

## Highlight Project Guidance

### Oriskin

Public positioning:

- customer-facing and member-facing digital experience for a beauty clinic business
- used by a large member base across 80+ branches

Known contribution area:

- frontend work in Next.js
- package and treatment browsing
- auth and member flows
- customer dashboard

### Oriskin Home Service

Public positioning:

- customer-facing home service appointment system for non-medical treatments performed at the customer's location

Known contribution area:

- backend work in Go
- appointment creation and scheduling
- availability by location
- therapist assignment and workflow orchestration
- status flow management
- customer account and purchased-treatment integration
- notifications
- internal operations API support
- therapist review support

### KurirGo

Public positioning:

- shipping aggregator platform for sellers and general users who need access to multiple expedition providers through a single application

Known contribution area:

- tech lead ownership
- system architecture and service boundaries
- expedition provider integrations
- shipping rate calculation flow
- order lifecycle and tracking
- team leadership, delivery ownership, code review, and release/process responsibility

## Internal Project Publishing Rules

Internal systems are allowed to have public detail pages as long as the content is sanitized.

Sanitized content may include:

- business problem
- role
- stack
- architecture direction at a high level
- non-sensitive workflow descriptions
- safe scale statements

Sanitized content must avoid:

- confidential internal screenshots without blur
- sensitive entity names if not intended for publication
- exact internal logic that should remain private
- privileged operational details
- confidential metrics

## Asset Placeholder Strategy

Each project directory should support a consistent placeholder-friendly asset layout.

Recommended asset names:

- `cover.png`
- `gallery-01.png`
- `gallery-02.png`
- `gallery-03.png`

Because the current Velite pipeline resolves `image` metadata eagerly, every project must have a real image file for the frontmatter `image` field at implementation time.

That means:

- each project must ship with a real `cover.png` or equivalent existing asset from day one
- no project frontmatter should point to a missing file
- if a final screenshot is not ready yet, implementation should use a real placeholder image file rather than a missing reference

During drafting, the `Gallery` section can contain placeholder notes such as:

- `Screenshot placeholder: customer dashboard`
- `Screenshot placeholder: checkout and package flow`
- `Screenshot placeholder: internal scheduling board`

Only the cover image is required immediately for the current pipeline.

Gallery images may be added later. Until then, the written `Gallery` section should use textual placeholders rather than broken or missing image references.

This allows the written portfolio content to be completed before final screenshots are prepared while remaining compatible with the current build pipeline.

## Drafting Strategy

### Highlighted Projects

The three highlighted projects should receive stronger, more polished writeups based on approved user input:

- `Oriskin`
- `Oriskin Home Service`
- `KurirGo`

### Non-Highlighted Projects

All remaining projects should be drafted directly from:

- existing repository content
- the CV
- the project list and descriptions already provided during brainstorming

Drafting rules:

- default to conservative, non-inflated wording
- clearly separate known facts from inferred framing
- keep internal projects sanitized
- write in English
- preserve a professional, credible tone

## UI Scope

This work does require a targeted UI update within the projects experience.

Expected UI changes:

- add a `Highlighted Projects` area above the main list
- add project type badges
- surface company context on cards
- support different link behavior for internal vs public projects
- normalize detail page structure
- slightly strengthen visual hierarchy for highlighted cards

This work should not:

- redesign the full website
- replace the broader visual language
- alter site navigation outside project-related adjustments

## Files Expected To Change In Implementation

Likely implementation targets include:

- `velite.config.ts`
- project MDX files under `public/content/project/**`
- `src/app/project/page.tsx`
- `src/app/project/shared.ts`
- `src/app/project/_components/Projects.tsx`
- `src/app/project/[...slug]/page.tsx`
- `src/app/page.tsx`

## Success Criteria

The restructure is successful if:

- the projects page reads as a mature portfolio rather than a casual archive
- professional, personal, and internal work are clearly distinguishable
- the three highlighted projects are immediately visible and feel intentional
- all projects still remain accessible through detail pages
- internal systems are represented credibly without exposing sensitive material
- the content model is explicit enough to support future UI expansion such as filters
- screenshot placeholders are ready for later asset drop-in without content rewrites
