# 04 — Acceptance Tests and Handover

## 1. Required commands

Codex must provide and run these commands where the environment permits:

```bash
npm ci
npm run check
npm run build
npm run verify:public-safety
npm run verify:downloads
```

Recommended additional commands:

```bash
npm run dev
npm run export:cv
```

If Codex adds tests, document them in `package.json` and run them.

## 2. Functional acceptance criteria

### Repository safety

- [ ] Existing repository was preserved by an annotated legacy tag and legacy branch.
- [ ] New work is contained on `website-v1`.
- [ ] No force push, no history rewrite, no deployment, no credential use.
- [ ] `docs/audits/legacy-site-audit.md` records original file inventory and commit SHA.
- [ ] New documentation is included in repository.

### Design and navigation

- [ ] Site reads as a senior independent consultant presence.
- [ ] No reused matrix animation, autoplay video, or legacy splash assets in new production page.
- [ ] Responsive navigation works at common phone, tablet, and desktop widths.
- [ ] Keyboard navigation and visible focus states work.
- [ ] Page titles / meta descriptions render.
- [ ] Language switcher works and preserves logical destination where routes exist.
- [ ] 404 page exists.
- [ ] Sitemap and robots files exist.

### CV and content

- [ ] English, German, and Danish CV pages exist.
- [ ] All engagement dates use the agreed public display style.
- [ ] Current Rheinmetall Senior SCCM Specialist role displays `May 2026–Present` (and equivalent localised dates).
- [ ] AXA displays `March 2024–Present` (and equivalent localised dates).
- [ ] No future contract end dates appear.
- [ ] Six CV files exist under `public/downloads/cv/`.
- [ ] All downloads are generated from public-safe locale source.
- [ ] Articles and scripts have clean empty states or non-public drafts; no fabricated public content.
- [ ] Project cards draw only from seed content.

### Privacy and security

- [ ] Built `dist/` contains no private direct contact data, PII, secrets, TODO source comments, or raw CV file.
- [ ] No direct email address appears on home, CV, projects, footer, JS, JSON, metadata, or source maps.
- [ ] Contact form uses no `mailto:` link.
- [ ] Contact Function rejects invalid methods and invalid fields.
- [ ] Turnstile validation is implemented server-side with fail-closed production behavior.
- [ ] Secrets remain server-side only.
- [ ] `.env` is ignored; `.env.example` contains placeholders only.
- [ ] `/admin/` exists but is no-index.
- [ ] CMS config defaults content items to drafts.
- [ ] No external analytics, tracker, cookie banner, remote font, or unnecessary third-party script has been added.

### Deployment readiness

- [ ] `netlify.toml` has correct build and function settings.
- [ ] Site builds with static output.
- [ ] Custom domain is configured only as documentation / environment fallback, not through live DNS changes.
- [ ] Post-build Netlify, Cloudflare, Turnstile, Resend, CMS, and Calendly instructions are included in `docs/operations/`.

## 3. Required Codex handover report

Codex must create `docs/HANDOVER_V1.md` containing:

1. Branch name and final commit hash.
2. Existing-site preservation tag and legacy branch.
3. Files added, removed, or materially changed.
4. Package and runtime versions.
5. Commands run and results.
6. Known limitations or TODOs.
7. Exact manual post-build setup checklist, ordered as:
   - create Netlify project and preview
   - activate custom domain after preview approval
   - add environment variables
   - configure Resend
   - create Turnstile widget
   - enable Netlify Identity / Git Gateway
   - invite administrator
   - configure Calendly
   - complete legal review
   - launch production
8. Explicit confirmation that no credentials, private CV material, or direct personal contact details were committed.
9. Screenshots or concise local-preview notes for desktop and mobile if Codex supports them.
10. Rollback procedure.

## 4. Definition of done

This Codex milestone is complete only when:
- all build and safety checks pass;
- local preview is operational;
- design/content/security requirements are met;
- the repository contains durable docs;
- the change is committed to `website-v1`;
- nothing has been made live without Michael’s manual review.
