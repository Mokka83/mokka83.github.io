# MichaelMoeller.io v1

Static Astro website for Michael Moeller, independent IT consultant.

## Local workflow

```powershell
npm ci
npm run check
npm run build
npm run export:cv
npm run verify:downloads
npm run verify:public-safety
npm run dev
```

CV downloads are generated deliberately with `npm run export:cv`; Netlify builds do not regenerate binary files.

## Configuration

Copy `.env.example` to `.env` for local testing only. Never commit `.env`.

Required production variables are configured in Netlify after review:

- `PUBLIC_SITE_URL`
- `PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `CONTACT_RECIPIENT`
- `CONTACT_FROM`
- `CALENDLY_URL` when booking should be visible

The contact endpoint fails closed in production when security or mail configuration is absent.
