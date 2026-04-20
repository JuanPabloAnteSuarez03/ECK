const COOKIE_NAME = "eck_admin";

function parseCookies(header) {
  const out = {};
  if (!header || typeof header !== "string") return out;
  header.split(";").forEach((part) => {
    const idx = part.indexOf("=");
    if (idx === -1) return;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    out[k] = decodeURIComponent(v);
  });
  return out;
}

function getSessionToken(req) {
  const cookies = parseCookies(req.headers.cookie);
  return cookies[COOKIE_NAME] || "";
}

function isProduction() {
  return process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
}

/** Max-Age in seconds (7 days) */
function buildSetCookie(token, maxAgeSec) {
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAgeSec}`,
  ];
  if (isProduction()) parts.push("Secure");
  return parts.join("; ");
}

function buildClearCookie() {
  const parts = [`${COOKIE_NAME}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];
  if (isProduction()) parts.push("Secure");
  return parts.join("; ");
}

module.exports = {
  COOKIE_NAME,
  parseCookies,
  getSessionToken,
  buildSetCookie,
  buildClearCookie,
};
