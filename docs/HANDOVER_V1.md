# Handover V1

## Status

Website v1 has been implemented locally in this folder as an Astro static site with multilingual routes, structured CV data, generated CV downloads, Decap CMS configuration, Netlify contact function scaffolding, and public-safety verification.

## Repository and branch

- Starting state: this folder was not a Git repository.
- Branch: unavailable in this workspace.
- Commit hash: unavailable in this workspace.
- Legacy tag and branch: not created because no legacy repository or legacy site files were present.

The standalone build workspace was not a Git repository. Legacy preservation was completed later during controlled integration into Mokka83/mokka83.github.io.

## Main implementation

- Astro static site with TypeScript strict checking.
- Routes for `/`, `/en/`, `/de/`, `/da/`, CV, expertise, selected engagements, articles, script library, contact, legal placeholders, 404, and `/admin/`.
- Shared structured CV source in `src/data/cv-data.mjs`.
- Generated downloads in `public/downloads/cv/` for EN, DE, and DA in PDF and DOCX formats.
- Local Open Graph image, favicon, robots file, sitemap integration, and semantic responsive design.
- Decap CMS config with Git Gateway backend and draft defaults for articles and scripts.
- Netlify Function contact endpoint with honeypot, validation, Turnstile verification support, Resend delivery support, and fail-closed production behavior.
- Documentation in `docs/architecture/`, `docs/operations/`, and `docs/audits/`.

## Commands run

| Command | Result | Notes |
|---|---:|---|
| `npm ci --cache .\.npm-cache` | PASS | Completed with Decap/transitive npm warnings and reported audit vulnerabilities from dependencies. |
| `npm run check` | PASS | 0 errors, 0 warnings, 0 hints. Empty content-collection warnings are expected because no fake articles/scripts were added. |
| `npm run build` | PASS | Static routes and `sitemap-index.xml` generated. Empty article/script collection notices are expected. |
| `npm run export:cv` | PASS | Generated six CV files. |
| `npm run verify:downloads` | PASS | All six CV files exist and are non-empty. |
| `npm run verify:public-safety` | PASS | Public safety scan passed. |

## Known limitations

- No Git commit was created because the workspace was not a Git repository.
- Local browser preview could not be completed because background preview servers exited immediately under the managed Windows shell. Build verification succeeded.
- Decap CMS is present but still requires Netlify Identity and Git Gateway setup after deployment.
- Contact delivery requires real Netlify environment variables, Turnstile configuration, and Resend configuration.
- Legal pages are publication-review placeholders and must be completed before launch.
- Articles and script library intentionally show empty states; no fabricated content was added.
- `npm ci` reports dependency audit warnings, primarily from Decap CMS and transitive packages. Review before production if the CMS dependency tree changes.

## Manual next steps

1. Move or merge this implementation into the reviewed `Mokka83/mokka83.github.io` repository.
2. Create/use branch `website-v1` in that repository.
3. Re-run `npm ci`, `npm run check`, `npm run build`, `npm run export:cv`, `npm run verify:downloads`, and `npm run verify:public-safety`.
4. Commit with `feat: build michaelmoeller.io v1 professional site`.
5. Create Netlify project and preview from the reviewed branch.
6. Add environment variables from `.env.example`.
7. Configure Resend sender domain and contact recipient.
8. Create Cloudflare Turnstile widget and add public/secret keys.
9. Enable Netlify Identity and Git Gateway with Invite only registration.
10. Invite the administrator account and test `/admin/`.
11. Add `CALENDLY_URL` only after an approved booking page exists.
12. Complete legal review for Impressum and Privacy.
13. Review desktop/mobile preview, then connect the custom domain manually.

## Safety confirmation

No live Cloudflare, Netlify, GitHub, DNS, Resend, Turnstile, Calendly, email, or deployment changes were made. No credentials, private CV material, direct personal email, telephone number, home address, date of birth, marital status, nationality, or private contract details were intentionally added.


## Repository integration completed

- Integrated into `Mokka83/mokka83.github.io` on local branch `website-v1`.
- Legacy baseline and local working-copy state were preserved before integration.
- Generated Netlify and Decap build artifacts are intentionally excluded from Git.
- No remote push or deployment occurred.
