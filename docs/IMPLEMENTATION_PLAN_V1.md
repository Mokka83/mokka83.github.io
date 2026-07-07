# Implementation Plan V1

This workspace contains the implementation package itself rather than the original `Mokka83/mokka83.github.io` Git repository. The user explicitly instructed Codex to ignore the preservation requirement and build the website as instructed in the best practical way.

## Plan

1. Build an Astro static site directly in this folder.
2. Use structured public-safe CV data as the shared source for web CV pages, project cards, and generated downloads.
3. Implement EN, DE, and DA route families with home, expertise, selected engagements, articles, script library, CV, and contact pages.
4. Add Decap CMS configuration, Netlify function contact handling, sitemap, robots, local Open Graph asset, and security documentation.
5. Add `npm run export:cv`, `npm run verify:downloads`, and `npm run verify:public-safety`.
6. Run install, check, build, export, and verification commands.

## Deliberate deviations from the original package

- No legacy tag or branch can be created because this folder was not a Git repository at the start of implementation.
- No legacy site files were present in this folder.
- No live hosting, DNS, Cloudflare, Netlify, Resend, Turnstile, Calendly, or account changes are made.
