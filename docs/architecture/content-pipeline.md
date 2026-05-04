# Content Pipeline

## Overview

This project uses Velite to transform file-based content from `public/content` into typed data inside `.velite`.

The pipeline has two distinct image paths:

1. Frontmatter images are normalized in `velite.config.ts`
2. Relative images inside MDX body are resolved at render time by `src/components/mdx/Image.tsx`

## Asset Rules

- Use relative asset names like `cover.png` when the file lives beside `index.mdx`
- Use absolute public paths like `/images/tech-logo/nextjs.png` for shared assets in `public/images`
- Remote image URLs are allowed, but they do not generate blur placeholders during build

## MDX Runtime Trust Boundary

Velite currently emits compiled MDX code as a string in `.velite/*.json`.
This project renders that code through `new Function(...)` in `src/components/mdx/MDXComponets.tsx`.

This is acceptable only because:

- the input content is repository-owned
- the emitted code is generated locally by Velite during build
- there is no user-submitted MDX or CMS-authored arbitrary content in this pipeline

This is not a safe pattern for untrusted content.
If the content model changes to support multi-author or external CMS input, the MDX runtime must be redesigned before that launch.

## Current Constraints

- Relative MDX body images depend on `assetDirectory` being passed from the page layer
- Build reliability should never depend on live HTTP fetches for local content assets
- The project should prefer filesystem reads for local assets and tolerate missing blur placeholders over failing the build
