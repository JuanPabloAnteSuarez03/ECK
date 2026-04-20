const { verifyAdminSession } = require("./lib/require-admin.js");
const { validateWalkinPayload, getWalkinData, setWalkinData, kvConfigured } = require("./lib/walkin-store.js");

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
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (!verifyAdminSession(req)) {
    return res.status(401).json({ ok: false, message: "No autorizado" });
  }

  if (req.method === "GET") {
    try {
      const data = await getWalkinData();
      return res.status(200).json({ ok: true, data, kvConfigured: kvConfigured() });
    } catch (e) {
      console.error("admin-walkin GET:", e);
      return res.status(500).json({ ok: false, message: "Error al cargar" });
    }
  }

  if (req.method === "PUT") {
    if (!kvConfigured()) {
      return res.status(503).json({
        ok: false,
        message: "Vercel KV no está configurado (KV_REST_API_URL / KV_REST_API_TOKEN).",
      });
    }
    const body = parseBody(req);
    const validation = validateWalkinPayload(body);
    if (!validation.ok) {
      return res.status(400).json({ ok: false, message: validation.message });
    }
    try {
      await setWalkinData(validation.value);
      return res.status(200).json({ ok: true, data: validation.value });
    } catch (e) {
      if (e && e.code === "KV_MISSING") {
        return res.status(503).json({ ok: false, message: "Almacenamiento no disponible" });
      }
      console.error("admin-walkin PUT:", e);
      return res.status(500).json({ ok: false, message: "Error al guardar" });
    }
  }

  return res.status(405).json({ ok: false, message: "Method not allowed" });
};
