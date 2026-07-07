# MichaelMoeller.io — Codex Implementation Package v1

## Purpose

This package is the controlled build brief for the professional public website of **Michael Møller**, an independent senior IT consultant.

It is deliberately structured to prevent a vague “make me a website” implementation. It defines the architecture, public-content boundaries, brand, security posture, branch workflow, content schema, and acceptance tests.

## What Codex must do

1. Work **only** in the existing public repository: `Mokka83/mokka83.github.io`.
2. Preserve the current site through a Git tag and a legacy branch before replacing it.
3. Build the production-ready static Astro site on a dedicated branch named `website-v1`.
4. Do **not** deploy, change Cloudflare DNS, create accounts, activate Netlify, or use / request credentials.
5. Do **not** put private CV source material, private email addresses, telephone numbers, home address, date of birth, marital status, contract end dates, secrets, or API keys in the public repository.
6. Deliver a local build, a documented verification report, and a clean commit for Michael to review.

## What this package contains

- `CODEX_MASTER_PROMPT.md`
  The exact master prompt to paste into Codex.

- `docs/01_ARCHITECTURE_AND_DECISIONS.md`
  Technical architecture, scope, site map, deployment model, and decision log.

- `docs/02_CONTENT_AND_CV_EDITORIAL_BRIEF.md`
  Public brand positioning, editorial rules, content model, and multilingual CV source.

- `docs/03_SECURITY_PRIVACY_AND_OPERATIONS.md`
  Non-negotiable data exposure rules, contact-form model, CMS, post-build setup and recovery procedures.

- `docs/04_ACCEPTANCE_TESTS_AND_HANDOVER.md`
  Build acceptance criteria and the required Codex handover report.

- `content-seed/`
  Sanitised CV content seeds in English, German, and Danish. These files are fit for a public repository and may be copied into the Astro content layer.

## Content status

The supplied CV text is intentionally public-safe. It does not include:
- home address
- personal email
- telephone number
- date of birth
- marital status
- nationality
- client contract end dates
- internal rate, availability, or extension information

The final downloadable PDFs and DOCX files must use this sanitised public content only.

## Repository and delivery model

```text
GitHub public repo: Mokka83/mokka83.github.io
  ├─ source code
  ├─ public content
  ├─ generated CV downloads
  └─ durable operations documentation

Netlify (manual post-build connection)
  ├─ preview deployments
  ├─ production hosting
  ├─ Netlify Identity + Git Gateway
  └─ serverless contact function

Cloudflare (already owned by Michael)
  ├─ michaelmoeller.io domain and DNS
  ├─ Cloudflare Turnstile
  └─ future Access/Tunnel portal
```

## Out of scope for this Codex pass

- Connecting accounts, buying services, or entering private credentials
- Actual Cloudflare DNS changes
- Legal sign-off of Impressum / Privacy Policy
- Publishing a live Calendly link before Michael creates it
- Opening the home mini-server to the internet
- Using a client name, project claim, certification status, or metric not present in the source content
- Generating a portrait, testimonial, fake customer logo, fake certification badge, or fake “case study outcome”

## Operator instruction

Read `CODEX_MASTER_PROMPT.md` first. It is the authoritative instruction set.
