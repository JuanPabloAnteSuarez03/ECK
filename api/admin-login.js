const { signJwt } = require("./lib/jwt.js");
const { buildSetCookie } = require("./lib/cookies.js");
const { timingSafeEqualStr, getJwtSecret } = require("./lib/require-admin.js");

function parseBody(req) {
  if (req.body == null) return null;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return req.body;
}

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const secret = getJwtSecret();
  const expectedUser = process.env.ADMIN_USERNAME || "";
  const expectedPass = process.env.ADMIN_PASSWORD || "";

  if (!secret || !expectedUser || !expectedPass) {
    console.error("admin-login: faltan ADMIN_JWT_SECRET, ADMIN_USERNAME o ADMIN_PASSWORD");
    return res.status(500).json({
      success: false,
      message: "Configuración de administrador incompleta en el servidor.",
    });
  }

  const payload = parseBody(req);
  if (!payload || typeof payload !== "object") {
    return res.status(400).json({ success: false, message: "Cuerpo JSON inválido" });
  }

  const username = typeof payload.username === "string" ? payload.username.trim() : "";
  const password = typeof payload.password === "string" ? payload.password : "";

  if (!timingSafeEqualStr(username, expectedUser) || !timingSafeEqualStr(password, expectedPass)) {
    return res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos." });
  }

  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
  const token = signJwt({ role: "eck-admin", v: 1, exp }, secret);

  res.setHeader("Set-Cookie", buildSetCookie(token, 7 * 24 * 60 * 60));
  return res.status(200).json({ success: true });
};
