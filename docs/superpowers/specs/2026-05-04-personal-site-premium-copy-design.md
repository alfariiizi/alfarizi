# Personal Site Premium Copy Refresh Design

## Objective

Refresh the copy of the personal website so it feels more premium, mature, and elegant while staying human and understated.

The website should present Moh Rizal Alfarizi as an experienced engineer with strong product and delivery judgment, without leaning on inflated titles or overly playful personal branding.

## Constraints

- Do not mention `CTO Ozone` anywhere on the website.
- Keep the tone humble.
- Avoid childish or overly internet-native humor.
- Allow a small amount of dry wit, but only as an accent.
- Do not reposition the site as a corporate landing page.
- Do not use decorative emoji in titles, headings, or metadata.

## Positioning

The website should not lead with a title-heavy identity such as `Senior Fullstack Engineer`, `Technical Lead`, or `CTO`.

Instead, it should lead with a calm statement of intent:

`Building thoughtful software for real-world use.`

The supporting narrative should communicate that the site owner works across:

- product
- frontend
- backend
- delivery

The credibility should come from scope, clarity, and tone rather than from self-promotional labels.

## Voice and Tone

### Desired traits

- understated
- thoughtful
- precise
- mature
- technically credible
- slightly warm

### Allowed humor

- dry wit
- subtle self-awareness
- one-line accents that support the message

### Avoid

- playful introductions like `Hey there`
- identity labels like `cat lover, developer, nerd`
- age-based identity copy like `24 years old`
- vague passion statements like `I like to code`
- exaggerated self-branding
- startup-founder bravado

## Core Messaging

### Hero

Hero headline:

`Building thoughtful software for real-world use.`

Hero supporting line:

`I work across product, frontend, backend, and delivery to build systems that are clear, reliable, and useful under real constraints.`

### Secondary narrative

The rest of the homepage should reinforce these ideas:

- works across the stack, but not in a generic resume-like way
- cares about reliability, maintainability, and clarity
- understands production realities and business constraints
- writes and builds with intention

## Content Strategy by Area

### Homepage

Purpose:
Shift from playful self-introduction to calm professional positioning.

Required changes:

- replace the current playful hero copy
- remove youthful identity descriptors
- remove age-based and overly biographical self-labeling
- keep the page personal, but sharpen the language
- maintain readability and warmth

### Projects page

Purpose:
Frame projects as selected work rather than a casual collection.

Required changes:

- rewrite the page intro to sound deliberate and curated
- position the work as examples of systems thinking and execution

### Contact page

Purpose:
Invite conversations in a more composed and professional way.

Required changes:

- replace generic outreach language
- remove emoji-led title styling
- invite collaboration around engineering, product, or thoughtful work

### Metadata

Purpose:
Align SEO-facing description with the new positioning.

Required changes:

- remove generic `portfolio/blog` phrasing where possible
- emphasize thoughtful software, real-world constraints, and engineering work
- review the default site title and page titles so they feel deliberate and mature
- avoid `Personal Website` phrasing if a more precise brand label reads better

## Copy Style Rules

- Prefer short, clean sentences.
- Do not overuse adjectives.
- Prefer concrete phrases over broad claims.
- Use confidence without swagger.
- Avoid sounding like a resume pasted into a website.
- Avoid jargon-heavy wording unless it adds precision.
- Avoid time-sensitive identifiers that age poorly.

## What This Refresh Is Not

- not a visual redesign
- not a resume dump
- not a founder-branding exercise
- not a title escalation

## Implementation Scope

Files expected to change in the implementation phase:

- `src/app/page.tsx`
- `src/app/project/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/layout.tsx`
- optional: section-level UI copy in homepage cards and links if the tone still feels casual

Possible optional follow-up:

- refine section headings on the homepage
- review project card button copy if needed
- review blog section copy if the new tone makes it feel too casual

## Success Criteria

The refresh is successful if:

- the homepage feels more senior and composed within the first screen
- the site still feels personal, not corporate
- the writing sounds confident without sounding boastful
- the copy aligns better with real experience shown in the CV
- no Ozone CTO framing appears anywhere on the site
