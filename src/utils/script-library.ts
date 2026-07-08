import { existsSync } from "node:fs";
import { join, normalize } from "node:path";

import type { CollectionEntry } from "astro:content";

export type SiteLocale = "en" | "de" | "da";
export type ScriptEntry = CollectionEntry<"scripts">;

export const siteLocales: SiteLocale[] = ["en", "de", "da"];

const sensitivePatterns = [
  /\b(?:password|passwd|pwd|secret|token|api[_-]?key|client[_-]?secret)\b\s*[:=]/i,
  /\btenant[_-]?id\b\s*[:=]/i,
  /\b[A-Z]:\\[^\s"'`<>]+/i,
  /\\\\[A-Za-z0-9_.-]+\\[^\s"'`<>]+/,
  /\b(?:10|172\.(?:1[6-9]|2\d|3[0-1])|192\.168)\.\d{1,3}\.\d{1,3}\b/,
  /\b[a-z0-9-]+\.(?:corp|internal|intranet|local)\b/i,
  /https?:\/\/(?:localhost|127\.0\.0\.1|[a-z0-9-]+\.(?:corp|internal|intranet|local))/i
];

export function scriptSlug(entry: ScriptEntry) {
  const localePrefix = `${entry.data.locale}-`;
  return entry.slug.startsWith(localePrefix) ? entry.slug.slice(localePrefix.length) : entry.slug;
}

export function localesForScript(entry: ScriptEntry): SiteLocale[] {
  return entry.data.locale === "all" ? siteLocales : [entry.data.locale];
}

export function scriptBelongsToLocale(entry: ScriptEntry, locale: SiteLocale) {
  return entry.data.locale === "all" || entry.data.locale === locale;
}

export function hasSensitiveScriptContent(entry: ScriptEntry) {
  const metadata = [
    entry.data.title,
    entry.data.summary,
    entry.data.platform,
    entry.data.riskLevel,
    entry.data.downloadPath || "",
    ...(entry.data.prerequisites || []),
    ...(entry.data.tags || [])
  ].join("\n");
  const body = "body" in entry ? String(entry.body || "") : "";
  const combined = `${metadata}\n${body}`;
  return sensitivePatterns.some((pattern) => pattern.test(combined));
}

export function isPublicScript(entry: ScriptEntry) {
  return !entry.data.draft && !hasSensitiveScriptContent(entry);
}

export function scriptUrl(entry: ScriptEntry, locale: SiteLocale) {
  return `/${locale}/scripts/${scriptSlug(entry)}/`;
}

export function getDownloadState(downloadPath?: string) {
  if (!downloadPath) return { configured: false, available: false, href: "" };
  if (!downloadPath.startsWith("/") || downloadPath.includes("://")) {
    return { configured: true, available: false, href: "" };
  }
  const normalized = normalize(downloadPath).replace(/^[/\\]+/, "");
  const filePath = join(process.cwd(), "public", normalized);
  return {
    configured: true,
    available: existsSync(filePath),
    href: downloadPath
  };
}
