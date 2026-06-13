# Alfarizi Design Guide

This guide defines the default UI and copy direction for the site. Use it when adding new screens, panels, components, or content surfaces.

## Product Tone

- Use direct, plain English.
- Prefer useful wording over decorative wording.
- Keep copy short enough to scan in one pass.
- Describe what the user is seeing and why it matters.

## Hierarchy

1. Page title
2. Short supporting sentence
3. Data cards, panels, tables, and content blocks

If the page title already explains the surface, avoid repeating that context in a separate eyebrow label.

## Typography Defaults

- Use normal text for labels by default.
- Avoid `uppercase` unless the content is a true acronym, brand mark, or compact status chip that genuinely benefits from it.
- Avoid `tracking-wide` and `tracking-widest` as stylistic defaults.
- Use sentence case for helper labels, section captions, and metadata.
- Use title case only when a heading needs to stay compact and scan-friendly.

## Label Rules

- Section labels should be useful first, decorative never.
- Badge text should stay short and functional.
- Do not stack uppercase labels with wide letterspacing just to create hierarchy.
- Prefer clear nouns and verbs over promotional phrasing.

## Copy Rules

- Prefer concrete phrases over broad claims.
- Avoid wording that sounds like template scaffolding.
- Keep helper text concrete. State what is happening and what the next step is.
- Empty states should say what is missing and what the user can do next.

## State Rules

- Loading states should feel intentional, not generic.
- Empty states should explain the absence of data.
- Warning and hold states should explain the cause, not just the status.
- Reference-only or legacy surfaces should say so plainly.

## Preferred Patterns

- `Inventory Overview`
- `Remaining capacity`
- `Download Resume`
- `Selected Projects`
- `No compatible orders`

## Discouraged Patterns

- `REMAINING CAPACITY`
- `SHELL MAPPING`
- `TEMPORARY SHELL-STAGE SURFACE`
- `OLDER TEMPLATE PAGES`
- `UPPERCASE EVERYWHERE`

## Frontend Implementation Rules

- When implementing or editing frontend UI, use the `uncodixify` skill first.
- Treat `uncodixify` as the default safeguard against generic AI-looking layouts.
- Prefer UI choices that feel intentional, human, and specific to this project.
- If an existing screen already has a strong established pattern, preserve it instead of restyling it arbitrarily.

## Keeping New Work Aligned

When adding a new screen or panel, check three things:

- Does the title already explain the page?
- Does the label need uppercase or can it stay normal text?
- Does the copy sound like a real product, not a starter template?

If the answer to any of those is no, simplify before shipping the UI.
