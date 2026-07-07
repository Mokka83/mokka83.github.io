# Launch Checklist

- Review the finished website locally and in a Netlify preview.
- Confirm all six CV downloads are current and public-safe.
- Complete and legally review the Impressum and Privacy pages.
- Create the Netlify project from the reviewed branch.
- Configure `PUBLIC_SITE_URL`.
- Configure Cloudflare Turnstile and add `PUBLIC_TURNSTILE_SITE_KEY` plus `TURNSTILE_SECRET_KEY`.
- Configure Resend sender domain and add `RESEND_API_KEY`, `CONTACT_RECIPIENT`, and `CONTACT_FROM`.
- Test the contact form end to end from a deployed preview.
- Enable Netlify Identity and Git Gateway with Invite only registration.
- Invite only the approved administrator account.
- Add `CALENDLY_URL` only after an approved booking page exists.
- Connect `michaelmoeller.io` only after preview approval.
- Confirm no direct personal contact data, private CV source, credentials, or source maps are public.
