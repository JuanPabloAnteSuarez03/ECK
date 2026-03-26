const nodemailer = require("nodemailer");

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function validateFormData(data) {
  const errors = [];
  if (!data.name || data.name.trim().length < 2) {
    errors.push("El nombre debe tener al menos 2 caracteres");
  }
  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Email inválido");
  }
  if (!data.subject || data.subject.trim().length < 3) {
    errors.push("El asunto debe tener al menos 3 caracteres");
  }
  if (!data.message || data.message.trim().length < 10) {
    errors.push("El mensaje debe tener al menos 10 caracteres");
  }
  const htmlSpecialChars = /<|>/g;
  if (htmlSpecialChars.test(data.name) || htmlSpecialChars.test(data.subject)) {
    errors.push("Caracteres no permitidos en nombre o asunto");
  }
  return errors;
}

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

  const payload = parseBody(req);
  if (!payload) {
    return res.status(400).json({ success: false, message: "Cuerpo JSON inválido" });
  }

  const { name, email, subject, message } = payload;
  const errors = validateFormData({ name, email, subject, message });
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = (process.env.EMAIL_PASSWORD || "").replace(/\s+/g, "");
  const recipient = process.env.RECIPIENT_EMAIL;

  if (!emailUser || !emailPass || !recipient) {
    console.error("send-email: faltan EMAIL_USER, EMAIL_PASSWORD o RECIPIENT_EMAIL");
    return res.status(500).json({
      success: false,
      message: "Configuración de correo incompleta en el servidor.",
    });
  }

  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject);
  const safeEmail = escapeHtml(email);
  const safeMessageHtml = escapeHtml(message).replace(/\n/g, "<br>");

  const htmlMessage = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Asunto:</strong> ${safeSubject}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${safeMessageHtml}</p>
    `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
      from: emailUser,
      to: recipient,
      replyTo: email,
      subject: `[ECK Contact] ${subject}`,
      html: htmlMessage,
      text: `Nombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\n\nMensaje:\n${message}`,
    });

    return res.status(200).json({
      success: true,
      message: "Email enviado exitosamente. Pronto nos contactaremos contigo.",
    });
  } catch (err) {
    console.error("send-email error:", err);
    return res.status(500).json({
      success: false,
      message: "Error al enviar el email. Por favor, intenta de nuevo.",
    });
  }
};
