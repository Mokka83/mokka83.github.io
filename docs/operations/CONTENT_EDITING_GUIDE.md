# Content Editing Guide

## CV

Edit structured CV data in `src/data/cv-data.mjs`. Regenerate downloads with:

```powershell
npm run export:cv
npm run verify:downloads
npm run verify:public-safety
```

## Articles and scripts

Use Decap CMS after Netlify Identity and Git Gateway are enabled. New articles and scripts default to drafts and do not publish until `draft` is set to `false`.

## Projects

Only publish client-safe engagement descriptions derived from approved source material. Do not add internal URLs, customer infrastructure details, tickets, tenant IDs, device IDs, or credentials.
