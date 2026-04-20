const crypto = require("crypto");
const { verifyJwt } = require("./jwt.js");
const { getSessionToken } = require("./cookies.js");

function timingSafeEqualStr(a, b) {
  const bu = Buffer.from(String(a), "utf8");
  const bv = Buffer.from(String(b), "utf8");
  if (bu.length !== bv.length) {
    try {
      crypto.timingSafeEqual(Buffer.alloc(bu.length), Buffer.alloc(bv.length));
    } catch {
      /* ignore */
    }
    return false;
  }
  return crypto.timingSafeEqual(bu, bv);
}

function getJwtSecret() {
  return process.env.ADMIN_JWT_SECRET || "";
}

function verifyAdminSession(req) {
  const secret = getJwtSecret();
  if (!secret) {
    return false;
  }
  const token = getSessionToken(req);
  if (!token) return false;
  const payload = verifyJwt(token, secret);
  if (!payload || payload.role !== "eck-admin") return false;
  return true;
}

module.exports = { timingSafeEqualStr, getJwtSecret, verifyAdminSession };
