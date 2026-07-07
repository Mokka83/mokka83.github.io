# 01 — Architecture and Decisions

## 1. Product definition

**Domain:** `michaelmoeller.io`
**Public name:** Michael Møller
**Professional identity:** Independent IT Consultant
**Primary disciplines:** Modern Workplace, Endpoint Management, SCCM/MECM, Intune, Windows deployment, enterprise automation, cloud and security architecture.

The site is a professional consulting presence — not a personal diary, startup landing page, generic agency site, online CV template, or e-commerce site.

## 2. Chosen architecture

| Concern | Decision | Rationale |
|---|---|---|
| Source repository | Existing `Mokka83/mokka83.github.io` public GitHub repository | Preserves Michael’s established account and avoids a parallel, abandoned website repository. |
| Framework | Astro with TypeScript in static-output mode | Strong fit for content-heavy pages, fast delivery, and low client-side JavaScript. |
| Content | Astro content collections using Markdown/MDX and structured data | Files remain versioned, reviewable, portable, and editable with Git-backed CMS. |
| Styling | Custom CSS, CSS variables, no Tailwind, no UI framework | Lower dependency surface; durable design system; no generic-template appearance. |
| Hosting | Netlify after local review | Git-driven preview deployments, functions, and compatible CMS / identity model. |
| DNS and security perimeter | Cloudflare | Domain already registered there; supports Turnstile and a later protected private portal. |
| CMS | Decap CMS at `/admin` backed by Netlify Identity + Git Gateway | Browser editing without granting repository write permissions to casual editors. |
| Contact form | Netlify Function + Cloudflare Turnstile + Resend (manual post-build configuration) | Avoids publishing Michael’s address; allows real server-side Turnstile validation and email delivery. |
| Booking | External Calendly link, disabled until configured | Privacy-conscious and easy to manage; avoids premature third-party embeds. |
| Analytics | None in v1 | No consent-banner complexity; preserve a privacy-first posture. |
| Private portal | Explicitly excluded from v1 | Future Cloudflare Access + Tunnel project only. |

## 3. Site map

All public pages require localised versions where practical.

```text
/
├─ /en/
│  ├─ /en/cv/
│  ├─ /en/expertise/
│  ├─ /en/projects/
│  ├─ /en/articles/
│  ├─ /en/articles/[slug]/
│  ├─ /en/scripts/
│  ├─ /en/scripts/[slug]/
│  └─ /en/contact/
├─ /de/
│  └─ equivalent core pages
├─ /da/
│  └─ equivalent core pages
├─ /downloads/cv/
│  ├─ michael-moeller-cv-en.pdf
│  ├─ michael-moeller-cv-en.docx
│  ├─ michael-moeller-cv-de.pdf
│  ├─ michael-moeller-cv-de.docx
│  ├─ michael-moeller-cv-da.pdf
│  └─ michael-moeller-cv-da.docx
├─ /impressum/
├─ /privacy/
├─ /404/
└─ /admin/
```

### Default language

The root route `/` must render the English home page while offering a clearly visible language switcher: EN / DE / DA.

Implement `<link rel="alternate" hreflang="...">` metadata for the localised pages, including `x-default`.

## 4. Visual direction

### Design statement

**Signal over spectacle.**
The site should communicate depth, trust, order, and technical competence. It must look like the online presence of a senior enterprise consultant, not an AI-generated marketing page or a junior developer portfolio.

### Direction

- Dark, quiet technical palette: charcoal/slate foundation, one restrained blue accent, high-contrast text.
- Use modern system fonts only. Do not load Google Fonts or any external font CDN.
- Use an `MM` monogram / wordmark; do not generate or use a portrait by default.
- Comfortable whitespace and readable line length.
- Few, high-quality interactions: navigation, theme preference if implemented, copy buttons for scripts, filter/search only where it creates value.
- No matrix animation, auto-playing video, background music, particle field, stock photos, overdone gradients, testimonials, counters, fake logos, or animated “skill bars”.
- Existing `Start.mp4`, `matrix.js`, and legacy visual assets remain recoverable through the legacy tag; they are not to be reused in the new production design unless Michael explicitly requests it later.
- Meet WCAG 2.2 AA expectations: semantic landmarks, visible focus states, keyboard navigation, sufficient contrast, labels, skip link, and reduced-motion support.

### Main navigation

`Expertise` · `Projects` · `Articles` · `Script Library` · `CV` · `Contact`

Right-side actions:
- Language switcher: EN / DE / DA
- “Book a conversation” only when a valid booking URL exists; otherwise hide it completely.

## 5. Page requirements

### Home

Must include:
- concise positioning statement
- primary service themes
- a “Selected consulting engagements” section
- selected expertise grouped by outcome, not a random tool cloud
- latest article / script entries if any exist
- buttons for “View CV”, “Discuss an engagement”, and (only when configured) “Book a conversation”
- LinkedIn link
- no direct phone or email address

### Expertise

Six clear clusters:
1. Endpoint Management & Modern Workplace
2. SCCM / MECM Architecture & Operations
3. Intune, Apple & Android Enterprise Management
4. Windows Deployment, Packaging & Automation
5. Security Hardening & Operational Architecture
6. Cloud, Virtualisation & Enterprise Platforms

Optional seventh cluster:
7. Applied AI & Automation — presented as a secondary capability, never as a vague replacement for enterprise expertise.

### Projects

Use a client-safe presentation. Client names may appear only where included in the supplied content seed. Each project/engagement must distinguish:
- role
- period display
- delivery context
- scope and technologies
- value / outcome
- confidentiality note where appropriate

The heading must be **Selected Consulting Engagements**, not “Employment History” and not “Past Projects”.

Include this explanatory line, localised:
> Selected independent engagements. Where delivery scopes permit, multiple mandates may be delivered concurrently under separately agreed responsibilities.

### CV

- Has structured in-browser CV for EN, DE, DA.
- Has buttons for PDF and DOCX downloads for the matching locale.
- A visitor should understand at a glance that Michael is an independent consultant, so non-linear client engagements are intentional.
- Present current work as `2026–Present` or `2024–Present`; do not publish specific contract end dates.
- The downloadable files and browser content must match materially.

### Articles

- Article cards with title, short summary, publication date, language, topic tags, and reading time.
- Default content state: no fabricated articles. Include one clearly marked editorial placeholder only if needed to demonstrate the layout; it must not publish as a real article.
- Support drafts in content metadata; drafts must not render in the production build.

### Script Library

Each public script entry requires:
- title
- concise purpose
- platform and prerequisites
- risk level (`Low`, `Moderate`, `High`)
- tested context / last reviewed date
- usage or pseudocode
- optional file download
- disclaimer: test before production use; no warranty; remove environment-specific data.

Never publish scripts containing actual customer names, internal URLs, credentials, certificates, device IDs, tenant IDs, paths, server names, or change-ticket references.

### Contact

- Name, company/organisation, email, topic, optional telephone, message, consent checkbox.
- A hidden honeypot field.
- Cloudflare Turnstile embedded only when configured.
- Form submits to a Netlify Function.
- Do not expose Michael’s recipient email in HTML, JavaScript, source maps, static JSON, page metadata, or client-side environment variables.
- Success response must say that a reply will be sent after review. It must not reveal contact details.
- No generic “mailto:” fallback.

### Legal routes

Create:
- `/impressum/`
- `/privacy/`

They must be clearly labelled as **publication-review placeholders** until Michael adds legally reviewed, current information. Do not invent registration numbers, tax information, street addresses, legal representatives, or legal claims.

The production launch checklist must block launch until these pages have been reviewed and completed by Michael.

## 6. Suggested project structure

```text
.
├─ src/
│  ├─ components/
│  ├─ content/
│  │  ├─ articles/
│  │  ├─ projects/
│  │  └─ scripts/
│  ├─ data/
│  │  ├─ site.ts
│  │  └─ cv/
│  │     ├─ en.ts
│  │     ├─ de.ts
│  │     └─ da.ts
│  ├─ layouts/
│  ├─ pages/
│  │  ├─ en/
│  │  ├─ de/
│  │  ├─ da/
│  │  └─ api/
│  ├─ styles/
│  └─ content.config.ts
├─ public/
│  ├─ admin/
│  ├─ downloads/
│  │  └─ cv/
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ og/
├─ netlify/
│  └─ functions/
│     └─ contact.ts
├─ scripts/
│  ├─ export-cv.mjs
│  ├─ verify-public-safety.mjs
│  └─ verify-downloads.mjs
├─ docs/
│  ├─ architecture/
│  ├─ operations/
│  └─ audits/
├─ tests/
├─ netlify.toml
├─ package.json
├─ .env.example
├─ .gitignore
├─ SECURITY.md
└─ README.md
```

Exact naming can vary only where the result remains clean, documented, and fits Astro conventions.

## 7. CV export strategy

The CV source of truth must be structured public-safe locale data in `src/data/cv/`.

Implement:
- `npm run export:cv` to generate six files (EN / DE / DA, each PDF + DOCX).
- DOCX generation using a maintained document library.
- PDF generation from a dedicated print-optimised route using a reproducible local toolchain.
- Generated files committed to `public/downloads/cv/` only after they pass the public-safety scan.
- `npm run verify:downloads` must assert that all six files exist and are non-empty.

Do not run CV generation automatically during Netlify deployment. It should be an explicit local / Codex command so binary outputs remain deliberate and reviewable.

## 8. SEO and technical baseline

Implement:
- canonical URL from `PUBLIC_SITE_URL` with a safe local fallback
- page-specific `<title>` and meta description
- Open Graph metadata with local static preview image
- `sitemap.xml`
- `robots.txt`
- Schema.org JSON-LD using a minimal `Person` or `ProfessionalService` model; include only name, public website URL, professional description, and LinkedIn. No private address, email, or telephone.
- custom 404 page
- no tracking pixel, no analytics, no cookie banner in v1
- no indexes of admin routes or non-production pages

## 9. Durable decision log

Codex must create `docs/architecture/DECISIONS.md` with at least:

- ADR-001: Existing public repository retained.
- ADR-002: Astro static-site architecture.
- ADR-003: Netlify as hosting/function/CMS platform.
- ADR-004: Cloudflare as registrar/DNS/Turnstile/future portal perimeter.
- ADR-005: No public PII in CV or page source.
- ADR-006: Content is Git-versioned and editable through Decap CMS.
- ADR-007: No analytics or third-party embedded widgets in v1.
- ADR-008: Private mini-server portal deferred to a separate Cloudflare Access + Tunnel milestone.
- ADR-009: Current/overlapping independent engagements presented as selected consulting engagements.
