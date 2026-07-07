# 03 — Security, Privacy and Operations

## 1. Absolute public-data restrictions

The public repository and built site must never contain:
- home street address or postcode
- personal Gmail address
- telephone number
- date of birth
- marital status
- nationality
- private contract dates, rates, or availability details
- credentials, API keys, recovery codes, tokens, certificate files, private keys, tenant/device IDs
- client internal URLs, IPs, server names, tickets, package IDs, screenshots, documents, or diagrams
- hidden HTML comments containing any of the above
- source maps that expose non-public files
- raw private CV source document

Create and run `npm run verify:public-safety` against the production `dist/` output. It must fail on configurable high-risk patterns, including known legacy private contact values if they are present in the local source.

## 2. Git and branch control

### Required initial preservation

Before migration:
1. inspect `git status`
2. create a dated annotated tag such as `legacy-github-pages-2026-07-07`
3. create a legacy branch pointing to the original current commit
4. record current commit SHA and files in `docs/audits/legacy-site-audit.md`
5. create branch `website-v1` from the current main branch
6. do all website work only on `website-v1`

Never force-push. Never rewrite history. Never commit a generated binary, dependency lock change, or deletion without describing it in the final report.

## 3. Environment variables

Create `.env.example` only. It must contain placeholders, never real values:

```dotenv
PUBLIC_SITE_URL=https://michaelmoeller.io
PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
RESEND_API_KEY=
CONTACT_RECIPIENT=
CONTACT_FROM=Michael Moeller Website <form@notify.michaelmoeller.io>
CALENDLY_URL=
```

Requirements:
- `.env` must be gitignored.
- Client-side code may read only the explicitly public `PUBLIC_*` variables.
- `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, and `CONTACT_RECIPIENT` may be used only inside the Netlify serverless function.
- Do not put secrets in `netlify.toml`.
- Do not print secrets in logs, test output, error messages, or source code.

## 4. Contact form implementation

### Required request flow

```text
Visitor
  -> Contact page form
  -> Turnstile widget generates token
  -> Netlify Function: /.netlify/functions/contact
  -> Server validates token with Cloudflare Siteverify
  -> Function validates fields and honeypot
  -> Function sends message through Resend
  -> Recipient receives message
```

### Function requirements

- Accept POST only.
- Reject other methods with 405.
- Parse only expected fields; cap input size.
- Validate name, email, topic, consent, and message server-side.
- Honeypot must be empty.
- Require and server-validate Turnstile token when configured.
- Turnstile validation failure must block delivery.
- Use a generic error response. Do not expose provider errors, recipient address, secrets, or implementation detail.
- Use a generic success response; do not disclose contact details.
- Set a meaningful reply-to field to the visitor’s submitted email after validating it.
- Escape user-supplied content before building any email HTML.
- Reject CRLF injection in fields used in email headers.
- Add basic anti-abuse checks: timestamp / minimum form completion interval and length limits.
- Provide a development-only fallback only when explicitly configured; production must fail closed when the security integration is absent.

### Resend configuration after local build approval

Michael will manually:
1. create Resend account
2. create a sending subdomain, recommended `notify.michaelmoeller.io`
3. verify the required DNS records in Cloudflare
4. set `RESEND_API_KEY`, `CONTACT_RECIPIENT`, and `CONTACT_FROM` in Netlify
5. test a real inquiry from the deployed preview
6. confirm message deliverability and reply handling

Do not configure Resend receiving; Cloudflare Email Routing can be used separately for normal incoming mail aliases. Keep sending and inbound mail concerns separated.

## 5. Turnstile configuration after local build approval

Michael will manually:
1. create Turnstile widget for `michaelmoeller.io`, `www.michaelmoeller.io`, and the relevant Netlify preview domain if needed
2. add the public site key as `PUBLIC_TURNSTILE_SITE_KEY`
3. add the private secret as `TURNSTILE_SECRET_KEY` in Netlify Functions scope
4. test the site using Cloudflare’s Turnstile test keys in automated tests, never production keys

## 6. CMS: Decap CMS + Netlify Identity + Git Gateway

### Build requirements

- Create `/admin/` route and configuration needed by Decap CMS.
- Use current stable package version pinned in lockfile.
- Configure Git Gateway backend.
- Register only content collections that map to public, structured, reviewed content.
- Do not offer arbitrary repository browsing / editing through CMS.
- Keep admin route out of search indexing.
- Default all new articles/scripts to draft.
- Upload media only to a clear `public/uploads/` or equivalent path.
- Ensure a CMS save commits structured content changes to the repository.

### Manual activation after Netlify connection

Michael will manually:
1. connect GitHub repository to Netlify
2. enable Netlify Identity
3. set registration preference to **Invite only**
4. enable Git Gateway
5. invite only his own long-lived administrator email
6. test `/admin/` in a private window
7. confirm CMS-created commit triggers a deploy preview / production build as configured

Never configure open registration.

## 7. Calendly

- Use a normal external link, not an embedded widget, in v1.
- Store URL only in a site configuration field / environment variable.
- Hide booking call-to-action where it is not configured.
- Link must open in a new tab and include a modest notice that booking is handled by an external provider.
- No calendar information is stored by the site itself.

## 8. Cloudflare and Netlify roles

### Cloudflare

- registrar and DNS authority for `michaelmoeller.io`
- TLS / DNS management
- Turnstile
- future Cloudflare Access and Tunnel for a separate, private mini-server portal

### Netlify

- static hosting and deploy previews
- Netlify Function for contact endpoint
- Identity and Git Gateway for Decap CMS
- environment variable storage

Do not configure a Cloudflare Tunnel, WARP route, public NAT/port-forward, or direct mini-server link during v1.

## 9. Production-launch gates

Production launch is blocked until:
- domain ownership account protected by MFA and recovery code storage
- Netlify project is connected to the reviewed repository branch
- all six CV download files exist, are readable, and are public-safe
- no direct personal email / phone / address exposed
- contact form works end-to-end with Turnstile server validation
- Resend sender domain verifies successfully
- legal pages are reviewed and completed by Michael
- privacy wording accurately reflects actual providers
- booking link either works or is hidden
- `npm run verify:public-safety` passes
- preview is reviewed on desktop and mobile
- `docs/operations/LAUNCH_CHECKLIST.md` is complete

## 10. Backup and recovery

- GitHub repository is the source of truth.
- Git tags preserve legacy state and release candidate milestones.
- Netlify provides deploy history; use it for fast rollback.
- Keep a `docs/operations/RECOVERY.md` document explaining:
  - restore a Netlify deploy
  - revert a Git commit
  - disable the contact endpoint by removing env variables / site redeploy
  - remove a compromised CMS user
  - rotate Turnstile and Resend credentials
  - disable a Cloudflare DNS record or future portal route
- Store all external-account recovery codes in Michael’s password manager, not in GitHub or the repository.
