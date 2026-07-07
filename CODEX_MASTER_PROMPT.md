# Codex Master Prompt — MichaelMoeller.io v1

You are implementing a professional multilingual consulting website in the existing public GitHub repository:

```text
Mokka83/mokka83.github.io
```

This is not a greenfield throwaway experiment. Treat it as a controlled production codebase transformation.

## Authoritative package

Read every document in the supplied `MichaelMoeller_Website_Codex_Package_v1` directory before changing files:

1. `README_FIRST.md`
2. `docs/01_ARCHITECTURE_AND_DECISIONS.md`
3. `docs/02_CONTENT_AND_CV_EDITORIAL_BRIEF.md`
4. `docs/03_SECURITY_PRIVACY_AND_OPERATIONS.md`
5. `docs/04_ACCEPTANCE_TESTS_AND_HANDOVER.md`
6. `content-seed/cv/en.md`
7. `content-seed/cv/de.md`
8. `content-seed/cv/da.md`

Where instructions conflict, apply them in the order above.

## Mission

Build a clean, accessible, multilingual professional website for **Michael Møller**, an independent senior IT consultant.

The new public domain will be `michaelmoeller.io`, but you must not make live DNS or hosting changes. Your work must remain local / in Git until Michael manually reviews it.

## Absolute constraints

You must:

- work only in the current repository and do not create a replacement repository;
- preserve the legacy website before replacing it;
- perform work only on a branch named `website-v1`;
- make no Cloudflare, Netlify, GitHub account, DNS, registrar, email, Calendly, Resend, Turnstile, or deployment changes;
- never request or use passwords, API tokens, recovery codes, or other private credentials;
- never publish or commit Michael’s home address, personal email, phone, date of birth, marital status, nationality, raw CV PDF, or private contract information;
- never invent clients, outcomes, roles, dates, professional certifications, technical claims, testimonials, reviews, logos, awards, or content;
- never use remote fonts, analytics, tracking pixels, generic chatbot widgets, auto-playing video, or the existing matrix / splash-video aesthetic;
- never force push or rewrite Git history.

Before touching implementation, confirm you have read the package and write a short implementation plan into `docs/IMPLEMENTATION_PLAN_V1.md`.

## Phase 0 — Audit and preserve current site

1. Run `git status --short` and record the result.
2. Record the current commit SHA.
3. Inspect the existing root files and identify the legacy site assets, including `index.html`, `matrix.js`, `Start.mp4`, and `assets/` if present.
4. Create an annotated tag:
   ```bash
   git tag -a legacy-github-pages-2026-07-07 -m "Preserve legacy GitHub Pages site before michaelmoeller.io v1"
   ```
   If that tag exists, do not overwrite it; use the same logical name with a safe suffix and document why.
5. Create a branch pointing at the same legacy commit:
   ```bash
   git branch legacy-github-pages-2026-07-07
   ```
   Again, do not overwrite an existing branch.
6. Create and switch to `website-v1` from the current main branch.
7. Create `docs/audits/legacy-site-audit.md` with original SHA, file inventory, branch/tag names, and a statement that legacy visual assets are intentionally not reused in v1.

Do not delete legacy files until preservation is complete and documented.

## Phase 1 — Build foundation

Implement Astro with TypeScript and default static output. Use npm and commit the lockfile.

Requirements:
- use current stable Astro packages compatible with the local Node runtime;
- use `strict` TypeScript;
- use Astro content collections for articles, projects, and scripts;
- use custom CSS and CSS variables only; no Tailwind, Bootstrap, UI kit, or broad UI framework;
- install only dependencies that provide a clear feature purpose;
- pin package versions through `package-lock.json`;
- keep the public site low-JavaScript by default;
- configure `@astrojs/sitemap`;
- write `README.md` for future maintenance;
- create `netlify.toml` but do not deploy;
- create `.env.example`, `.gitignore`, `SECURITY.md`, and durable docs as required in the package.

It is acceptable to remove the legacy root site files from the new branch after Phase 0. Their history remains reachable through the tag and legacy branch.

## Phase 2 — Design and routes

Implement the architecture and site map from `docs/01_ARCHITECTURE_AND_DECISIONS.md`.

Design standards:
- dark, restrained, enterprise-grade visual system;
- a small `MM` wordmark or monogram; no generated portrait;
- semantic HTML, keyboard support, skip link, visible focus state, reduced-motion support;
- responsive at mobile, tablet, desktop;
- system fonts only;
- local Open Graph image;
- no remote image dependency;
- no fake content.

Create full locale route structure for EN, DE, DA. Root `/` should render English and link clearly to language routes.

Build:
- home
- expertise
- projects / selected engagements
- articles index and article detail template
- script library index and script detail template
- CV with a corresponding locale
- contact
- legal placeholders
- 404
- admin route / CMS configuration

Use the provided content seed rather than rewrites or speculative translations.

## Phase 3 — CV and exports

### Public content

Transform `content-seed/cv/en.md`, `de.md`, and `da.md` into structured public-safe locale data for display.

Do not alter factual content. You may split it into data fields and render it elegantly.

Make job entries consistent:
- summary
- focus areas
- technologies where supplied
- period
- client
- role

Treat all client entries under **Selected Consulting Engagements / Ausgewählte Beratungsmandate / Udvalgte konsulentopgaver**.

### Exports

Implement `npm run export:cv`.

It must generate:
- `public/downloads/cv/michael-moeller-cv-en.pdf`
- `public/downloads/cv/michael-moeller-cv-en.docx`
- `public/downloads/cv/michael-moeller-cv-de.pdf`
- `public/downloads/cv/michael-moeller-cv-de.docx`
- `public/downloads/cv/michael-moeller-cv-da.pdf`
- `public/downloads/cv/michael-moeller-cv-da.docx`

Requirements:
- use the same structured locale data as the web CV;
- make documents visually conservative, professional, printable, and public-safe;
- include name, professional headline, LinkedIn URL, profile, engagements, skills, education, and selected certifications;
- exclude all prohibited private data;
- write generated files only after the source is validated;
- add `npm run verify:downloads`;
- do not make Netlify deploy depend on a browser / PDF runtime;
- add clear documentation on how to regenerate downloads locally.

If the environment cannot install the PDF runtime or produce reliable PDF files, do not fake success. Implement all source structure and scripts, record the exact blocking dependency in `docs/HANDOVER_V1.md`, and still produce the DOCX files where possible.

## Phase 4 — Content collections, CMS and contact foundation

### Content collections

Create schemas for projects, articles, and scripts. Draft content must not be published.

Build attractive empty states:
- Articles: “Technical notes and field guides will appear here.”
- Script Library: “Reviewed, reusable administration tools will be published here.”

Do not add invented public content to fill those pages.

### CMS

Integrate Decap CMS in the `/admin/` route and configure Git Gateway backend. Add concise setup documentation for Netlify Identity and Git Gateway. Assume the manual setup will use **Invite only** registration.

The CMS must only expose editing workflows for:
- articles
- scripts
- projects
- selected site configuration
- CV download replacement files only if an approved workflow is safe

CMS changes should be versioned Git commits. New article and script entries must default to drafts.

### Contact form

Implement:
- form UI
- client-side ergonomics only
- honeypot field
- Netlify Function endpoint
- Turnstile token support
- server-side validation implementation
- Resend mail delivery implementation
- safe error/success responses
- no frontend recipient email or secrets

The function must fail closed in production if security configuration is absent. Do not leave a client-side `mailto:` fallback.

Create a basic test strategy using Turnstile test-key behavior where possible, without real private keys.

### Booking

Implement a config-controlled external booking link. If `CALENDLY_URL` / booking URL is absent, the booking link must be hidden. Do not embed Calendly in v1.

## Phase 5 — Privacy and safety checks

Implement `npm run verify:public-safety`.

At minimum, it must scan the build output and generated public assets for:
- email patterns associated with raw private addresses
- raw telephone number patterns
- known raw home-address terms
- date-of-birth labels
- words or fields that indicate marital status or nationality
- secret variable values / API tokens
- `mailto:`
- `TODO(MICHAEL-REVIEW)` or equivalent unreviewed text
- references to local absolute file paths
- source maps if they expose source content

The scanner must use a documented allowlist only for deliberately public values such as `https://www.linkedin.com/in/mokka83/`. It must emit actionable filenames and exit non-zero on violations.

Do not scan the legacy Git history; scan current production output and current branch public files.

## Phase 6 — Verification and handover

Run and record:

```bash
npm ci
npm run check
npm run build
npm run verify:public-safety
npm run export:cv
npm run verify:downloads
```

Run any additional tests you add.

Create:
- `docs/HANDOVER_V1.md`
- `docs/operations/LAUNCH_CHECKLIST.md`
- `docs/operations/RECOVERY.md`
- `docs/operations/CONTENT_EDITING_GUIDE.md`

Handover must state:
- current branch
- final commit hash
- legacy tag and branch
- commands executed and results
- expected manual setup steps
- known limitations
- explicit statement that no private details, credentials, or raw CV source were committed

Commit cleanly with a message similar to:

```text
feat: build michaelmoeller.io v1 professional site
```

Do not merge to main and do not deploy.

## Completion response

When finished, return:
1. a concise implementation summary;
2. exact branch and commit;
3. pass/fail results for every verification command;
4. precise manual next steps that Michael must do;
5. all blockers or TODOs, if any;
6. confirmation of no live changes and no private data exposure.

Do not claim completion unless the actual commands were run and the corresponding evidence exists in the repository.
