/** Dieppe, NB — matches API default */
export const ECK_TIMEZONE = "America/Moncton";

/** Today's calendar date in Moncton (YYYY-MM-DD). */
export function monctonDateString(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: ECK_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const y = parts.find((p) => p.type === "year")?.value;
  const m = parts.find((p) => p.type === "month")?.value;
  const d = parts.find((p) => p.type === "day")?.value;
  if (!y || !m || !d) return "";
  return `${y}-${m}-${d}`;
}

export function formatIntervalLine(start, end, locale) {
  const loc = locale === "fr" ? "fr-CA" : locale === "es" ? "es" : "en-CA";
  const fmt = new Intl.DateTimeFormat(loc, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const a = new Date(Date.UTC(1970, 0, 1, sh, sm));
  const b = new Date(Date.UTC(1970, 0, 1, eh, em));
  return `${fmt.format(a)} – ${fmt.format(b)}`;
}

export function formatBannerDate(dateStr, locale) {
  const [y, M, d] = dateStr.split("-").map(Number);
  const utcNoon = new Date(Date.UTC(y, M - 1, d, 12, 0, 0));
  const loc = locale === "fr" ? "fr-CA" : locale === "es" ? "es" : "en-CA";
  return new Intl.DateTimeFormat(loc, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: ECK_TIMEZONE,
  }).format(utcNoon);
}

/** Short date: "Tue, Apr 21" */
export function formatShortDate(dateStr, locale) {
  const [y, M, d] = dateStr.split("-").map(Number);
  const utcNoon = new Date(Date.UTC(y, M - 1, d, 12, 0, 0));
  const loc = locale === "fr" ? "fr-CA" : "en-CA";
  return new Intl.DateTimeFormat(loc, {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: ECK_TIMEZONE,
  }).format(utcNoon);
}

/** Current time-of-day in Moncton as minutes since 00:00 */
export function monctonNowMinutes(date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: ECK_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const hh = parseInt(fmt.find((p) => p.type === "hour")?.value, 10);
  const mm = parseInt(fmt.find((p) => p.type === "minute")?.value, 10);
  if (Number.isNaN(hh) || Number.isNaN(mm)) return 0;
  const h = hh === 24 ? 0 : hh;
  return h * 60 + mm;
}

function toMinutes(hhmm) {
  const [h, m] = String(hhmm).split(":").map(Number);
  return h * 60 + m;
}

/**
 * Determines if the track is currently open, based on today's intervals.
 * @returns {'open'|'closed'}
 */
export function currentStatus(todayIntervals, nowMinutes = monctonNowMinutes()) {
  if (!Array.isArray(todayIntervals) || todayIntervals.length === 0) return "closed";
  const inside = todayIntervals.some((iv) => {
    const s = toMinutes(iv.start);
    const e = toMinutes(iv.end);
    return nowMinutes >= s && nowMinutes < e;
  });
  return inside ? "open" : "closed";
}

/**
 * @param {{ date: string, intervals: {start:string,end:string}[], note?: string }[]} days
 * @returns {{ mode: 'today'|'upcoming', day: object } | null}
 */
export function pickBannerDay(days, todayStr) {
  if (!Array.isArray(days) || !todayStr) return null;
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  const hasContent = (day) =>
    (day.note && String(day.note).trim().length > 0) || (Array.isArray(day.intervals) && day.intervals.length > 0);

  const today = sorted.find((d) => d.date === todayStr);
  if (today && hasContent(today)) {
    return { mode: "today", day: today };
  }
  const next = sorted.find((d) => d.date >= todayStr && hasContent(d));
  if (next) {
    return { mode: "upcoming", day: next };
  }
  return null;
}
