const { kv } = require("@vercel/kv");

const KV_KEY = "eck:walkin:v1";

const DEFAULT_TIMEZONE = "America/Moncton";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

function kvConfigured() {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function defaultWalkin() {
  return { timezone: DEFAULT_TIMEZONE, weekly: {}, days: [] };
}

function parseMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function validateIntervals(rawIntervals, ctx) {
  if (!Array.isArray(rawIntervals)) {
    return { ok: false, message: `intervals debe ser un array (${ctx})` };
  }
  if (rawIntervals.length > 4) {
    return { ok: false, message: `Máximo 4 intervalos (${ctx})` };
  }
  const out = [];
  for (const iv of rawIntervals) {
    if (!iv || typeof iv !== "object") {
      return { ok: false, message: `Intervalo inválido (${ctx})` };
    }
    const { start, end } = iv;
    if (typeof start !== "string" || !TIME_RE.test(start) || typeof end !== "string" || !TIME_RE.test(end)) {
      return { ok: false, message: `Horas deben ser HH:mm 24h (${ctx})` };
    }
    if (parseMinutes(start) >= parseMinutes(end)) {
      return { ok: false, message: `La hora de inicio debe ser antes del fin (${ctx})` };
    }
    out.push({ start, end });
  }
  return { ok: true, value: out };
}

function validateWalkinPayload(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "Cuerpo inválido" };
  }
  const timezone = typeof body.timezone === "string" && body.timezone.trim() ? body.timezone.trim() : DEFAULT_TIMEZONE;
  if (!Array.isArray(body.days)) {
    return { ok: false, message: "`days` debe ser un array" };
  }
  if (body.days.length > 60) {
    return { ok: false, message: "Máximo 60 días" };
  }

  const normalizedWeekly = {};
  if (body.weekly != null) {
    if (typeof body.weekly !== "object" || Array.isArray(body.weekly)) {
      return { ok: false, message: "`weekly` debe ser un objeto" };
    }
    for (const key of Object.keys(body.weekly)) {
      if (!/^[0-6]$/.test(key)) {
        return { ok: false, message: `Clave de weekly inválida: ${key}` };
      }
      const entry = body.weekly[key];
      if (entry == null) continue;
      if (typeof entry !== "object") {
        return { ok: false, message: `Entrada weekly inválida (día ${key})` };
      }
      const ivCheck = validateIntervals(entry.intervals || [], `weekly day ${key}`);
      if (!ivCheck.ok) return ivCheck;
      const note = typeof entry.note === "string" ? entry.note.slice(0, 500) : "";
      if (ivCheck.value.length === 0 && !note) continue;
      normalizedWeekly[key] = { intervals: ivCheck.value, note };
    }
  }

  const seenDates = new Set();
  const normalizedDays = [];

  for (const day of body.days) {
    if (!day || typeof day !== "object") {
      return { ok: false, message: "Cada día debe ser un objeto" };
    }
    const date = day.date;
    if (typeof date !== "string" || !DATE_RE.test(date)) {
      return { ok: false, message: "Fecha debe ser YYYY-MM-DD" };
    }
    if (seenDates.has(date)) {
      return { ok: false, message: `Fecha duplicada: ${date}` };
    }
    seenDates.add(date);

    const note = typeof day.note === "string" ? day.note.slice(0, 500) : "";
    const ivCheck = validateIntervals(day.intervals || [], `date ${date}`);
    if (!ivCheck.ok) return ivCheck;

    normalizedDays.push({ date, intervals: ivCheck.value, note });
  }

  normalizedDays.sort((a, b) => a.date.localeCompare(b.date));

  return { ok: true, value: { timezone, weekly: normalizedWeekly, days: normalizedDays } };
}

async function getWalkinData() {
  if (!kvConfigured()) {
    return defaultWalkin();
  }
  try {
    const raw = await kv.get(KV_KEY);
    if (raw == null) {
      return defaultWalkin();
    }
    let parsed = raw;
    if (typeof raw === "string") {
      try {
        parsed = JSON.parse(raw);
      } catch {
        return defaultWalkin();
      }
    }
    if (!parsed || typeof parsed !== "object") {
      return defaultWalkin();
    }
    const tz = typeof parsed.timezone === "string" && parsed.timezone.trim() ? parsed.timezone.trim() : DEFAULT_TIMEZONE;
    const days = Array.isArray(parsed.days) ? parsed.days : [];
    const weekly = parsed.weekly && typeof parsed.weekly === "object" && !Array.isArray(parsed.weekly) ? parsed.weekly : {};
    return { timezone: tz, weekly, days };
  } catch (e) {
    console.error("walkin-store get:", e);
    return defaultWalkin();
  }
}

async function setWalkinData(validated) {
  if (!kvConfigured()) {
    const err = new Error("KV no configurado");
    err.code = "KV_MISSING";
    throw err;
  }
  await kv.set(KV_KEY, JSON.stringify(validated));
}

module.exports = {
  KV_KEY,
  DEFAULT_TIMEZONE,
  kvConfigured,
  defaultWalkin,
  validateWalkinPayload,
  getWalkinData,
  setWalkinData,
};
