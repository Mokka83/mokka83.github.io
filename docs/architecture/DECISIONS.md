# Architecture Decisions

## ADR-001: Existing Public Repository Retained

The original instruction targets `Mokka83/mokka83.github.io`. This local workspace is not that repository, so this build is prepared as a portable Astro site that can be moved into the repository for review.

## ADR-002: Astro Static-Site Architecture

Astro is used for static output, low JavaScript, and content-focused multilingual routing.

## ADR-003: Netlify Platform

Netlify is configured for static hosting, serverless contact handling, and future Decap CMS Git Gateway activation. No live Netlify project was created.

## ADR-004: Cloudflare Perimeter

Cloudflare remains the planned DNS, Turnstile, and future protected-portal perimeter. No Cloudflare changes were made.

## ADR-005: No Public PII

The site uses the public-safe CV seed and excludes direct personal email, telephone number, address, date of birth, marital status, nationality, and private contract details.

## ADR-006: Git-Versioned Content and CMS

Articles, scripts, and projects use Astro content collections and Decap CMS configuration. New article and script entries default to drafts.

## ADR-007: No Analytics or Embedded Widgets

The public site loads no analytics, tracking pixels, remote fonts, autoplay media, or booking embeds.

## ADR-008: Private Portal Deferred

Any mini-server or protected portal work is deferred to a separate Cloudflare Access and Tunnel milestone.

## ADR-009: Independent Engagement Framing

Overlapping/current work is presented as selected consulting engagements rather than linear employment history.
