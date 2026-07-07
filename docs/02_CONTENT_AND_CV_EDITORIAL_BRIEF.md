# 02 — Content and CV Editorial Brief

## 1. Public positioning

### Primary display name

**Michael Møller**

### URL-safe spelling

**Michael Moeller**

### Primary title

**Independent IT Consultant**

### Optional descriptor line

**Modern Workplace · Endpoint Management · Enterprise Automation**

### Core English positioning statement

> Independent senior IT infrastructure and modern workplace consultant with more than 15 years of experience designing, operating, and modernising enterprise endpoint, deployment, and cloud environments. I support organisations with SCCM/MECM, Intune, Windows deployment, security hardening, automation, and complex operational architecture.

### Core German positioning statement

> Freiberuflicher Senior Consultant für IT-Infrastruktur und Modern Workplace mit über 15 Jahren Erfahrung in der Konzeption, dem Betrieb und der Modernisierung von Enterprise-Umgebungen für Endgeräte, Deployment und Cloud. Ich unterstütze Organisationen bei SCCM/MECM, Intune, Windows-Deployment, Security Hardening, Automatisierung und komplexer Betriebsarchitektur.

### Core Danish positioning statement

> Selvstændig senior IT-infrastruktur- og Modern Workplace-konsulent med mere end 15 års erfaring i at designe, drifte og modernisere enterprise-miljøer for endpoints, deployment og cloud. Jeg hjælper organisationer med SCCM/MECM, Intune, Windows-deployment, security hardening, automatisering og kompleks driftsarkitektur.

## 2. Tone and editorial rules

Use:
- direct, competent, specific language
- outcome-oriented descriptions
- active verbs
- British or neutral international English, not US-heavy marketing copy
- clear German business language
- professional, natural Danish

Avoid:
- “passionate”, “rockstar”, “guru”, “ninja”, “world-class”, “game-changing”
- vague AI language
- phrases that imply 24/7 availability
- claims that Michael is fully available for every new assignment
- client-confidential detail
- unverified metrics or inflated ownership claims

### Availability statement

**EN**
> I support clients through defined delivery scopes, long-term consulting engagements, architecture work, and targeted technical escalations. Availability for new assignments is assessed individually based on scope, urgency, and delivery requirements.

**DE**
> Ich unterstütze Kunden im Rahmen klar definierter Leistungsumfänge, langfristiger Beratungsmandate, Architekturarbeit und gezielter technischer Eskalationen. Die Verfügbarkeit für neue Mandate wird individuell anhand von Umfang, Dringlichkeit und Lieferanforderungen beurteilt.

**DA**
> Jeg understøtter kunder gennem klart definerede leveranceomfang, længerevarende konsulentopgaver, arkitekturarbejde og målrettede tekniske eskalationer. Kapacitet til nye opgaver vurderes individuelt ud fra omfang, hast og leverancekrav.

## 3. Engagement framing

### Section title

- EN: **Selected Consulting Engagements**
- DE: **Ausgewählte Beratungsmandate**
- DA: **Udvalgte konsulentopgaver**

### Explanatory text

- EN: Selected independent engagements. Where delivery scopes permit, multiple mandates may be delivered concurrently under separately agreed responsibilities.
- DE: Ausgewählte freiberufliche Beratungsmandate. Sofern die Leistungsumfänge dies zulassen, können mehrere Mandate parallel innerhalb separat vereinbarter Verantwortlichkeiten erbracht werden.
- DA: Udvalgte selvstændige konsulentopgaver. Når leveranceomfanget tillader det, kan flere opgaver gennemføres parallelt inden for særskilt aftalte ansvarsområder.

## 4. Public CV data

Use the files in `content-seed/cv/` as the initial public-facing CV source. Codex must not add factual claims or infer dates beyond these files.

### Public date rules

- Current Rheinmetall SCCM specialist engagement: `May 2026–Present` / `Mai 2026–Heute` / `Maj 2026–Nu`
- Current AXA engagement: `March 2024–Present` / `März 2024–Heute` / `Marts 2024–Nu`
- Do not publish the intended October 2026 end date for the current Rheinmetall term.
- Do not publish client extension expectations.
- Do not expose private address, direct email, phone, date of birth, nationality, or marital status.

### Certification rule

Some certification validity periods may need confirmation. Use a neutral heading such as **Selected Certifications and Training**. Do not label an expired or unconfirmed certification as “active” or “current”.

## 5. Content collection models

### Project

```yaml
title: "Senior SCCM Specialist"
client: "Rheinmetall AG"
period: "May 2026–Present"
locale: "en"
role: "Independent Senior SCCM Specialist"
summary: "..."
scope:
  - "..."
technologies:
  - "MECM"
  - "PowerShell"
visibility: "public"
featured: true
confidentialityNote: "Client-safe summary; no internal infrastructure details."
```

### Article

```yaml
title: "..."
description: "..."
locale: "en"
publishedAt: 2026-07-07
updatedAt: 2026-07-07
tags: ["Intune", "Windows"]
draft: false
featured: false
```

### Script library item

```yaml
title: "..."
summary: "..."
locale: "en"
platform: "Windows PowerShell"
riskLevel: "Moderate"
lastReviewed: 2026-07-07
prerequisites:
  - "Run in a test environment first."
tags: ["SCCM", "PowerShell"]
downloadPath: "/downloads/scripts/example.ps1"
draft: true
```

## 6. Initial public content inventory

For the first production-ready build:
- CV: full structured content in EN / DE / DA
- Projects: selected engagement cards derived from the CV
- Articles: empty state only, or one explicit unpublished draft
- Script Library: empty state only, or one explicit unpublished draft
- No invented blog posts, scripts, case studies, testimonials, customer logos, certification badges, or metrics

## 7. Contact and booking wording

### Contact call to action

- EN: **Discuss an engagement**
- DE: **Projekt oder Mandat anfragen**
- DA: **Drøft en opgave**

### Booking call to action

- EN: **Book a 30-minute introduction**
- DE: **30-minütiges Kennenlernen buchen**
- DA: **Book et 30-minutters introduktionsmøde**

Only show the booking control when the configuration contains a real, approved external booking URL.

## 8. Script-library content policy

Every published script must have:
1. a declared owner/author
2. a clear purpose
3. platform and prerequisites
4. stated risk level
5. a last-reviewed date
6. a statement that it must be tested outside production first
7. no customer-specific identifiers, secrets, or internal paths
8. syntax-highlighted source or a download, but never both if maintenance becomes confusing

## 9. Language-quality safeguards

Codex may format, render, and apply the supplied text. It must not:
- translate additional technical text by machine without marking it for review
- change job titles into inflated titles
- change the legal/client names
- claim native-level language proficiency beyond the source content
- turn “understands / speaks some Ukrainian and Russian” into professional fluency

If a text decision is unclear, leave a clear `TODO(MICHAEL-REVIEW)` marker in the source content and document it in the handover report rather than inventing an answer.
