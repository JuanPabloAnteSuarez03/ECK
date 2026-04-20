const { getWalkinData } = require("./lib/walkin-store.js");

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    return res.status(204).end();
  }
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const data = await getWalkinData();
    return res.status(200).json({ ok: true, data });
  } catch (e) {
    console.error("public-walkin:", e);
    return res.status(500).json({ ok: false, message: "Error al cargar horarios" });
  }
};
