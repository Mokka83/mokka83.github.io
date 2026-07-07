# Public Safety Allowlist

The public-safety scanner allows these deliberate values:

- `https://www.linkedin.com/in/mokka83/` as Michael's public LinkedIn profile.
- `form@notify.michaelmoeller.io` as a placeholder sender identity in `.env.example`.

The scanner skips the pinned local Decap CMS app bundle at:

- `public/admin/decap-cms-app.js`
- `dist/admin/decap-cms-app.js`

Reason: this is third-party CMS application code copied from the pinned `decap-cms-app` npm package for the no-index `/admin/` route. It contains generic vendor strings that match broad mail and telephone patterns, but it is not first-party public content and does not contain Michael's private contact data.
