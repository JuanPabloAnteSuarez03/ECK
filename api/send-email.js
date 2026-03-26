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

/** HTML de correo con marca ECK (colores del tailwind del proyecto). Inline + tablas por compatibilidad. */
function buildContactEmailHtml({ safeName, safeEmail, safeSubject, safeMessageHtml, replyMailtoHref }) {
  const primary = "#d41012";
  const primaryDark = "#9f0c0e";
  const bgPage = "#f4f2f3";
  const cardBg = "#ffffff";
  const textMuted = "#6e6c6d";
  const textBody = "#2d2b2c";
  const border = "#e0dede";

  const row = (label, valueHtml) => `
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid ${border};vertical-align:top;">
        <p style="margin:0 0 4px 0;font-family:Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${textMuted};">
          ${label}
        </p>
        <p style="margin:0;font-family:Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size:15px;line-height:1.5;color:${textBody};">
          ${valueHtml}
        </p>
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Mensaje de contacto ECK</title>
</head>
<body style="margin:0;padding:0;background-color:${bgPage};">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${bgPage};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background-color:${cardBg};border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(26,26,26,0.08);">
        <tr>
          <td bgcolor="${primary}" style="background:linear-gradient(135deg,${primary} 0%,${primaryDark} 100%);padding:28px 24px;text-align:center;">
            <p style="margin:0;font-family:Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:rgba(255,255,255,0.92);">
              ECK
            </p>
            <p style="margin:10px 0 0 0;font-family:Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size:20px;font-weight:600;line-height:1.3;color:#ffffff;">
              Nuevo mensaje de contacto
            </p>
            <p style="margin:8px 0 0 0;font-family:Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size:14px;line-height:1.45;color:rgba(255,255,255,0.88);">
              Alguien ha escrito desde el sitio web.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              ${row("Nombre", safeName)}
              ${row(
                "Correo del remitente",
                `<a href="${replyMailtoHref}" style="color:${primary};text-decoration:none;">${safeEmail}</a>`,
              )}
              ${row("Asunto", safeSubject)}
              <tr>
                <td style="padding:20px 20px 24px 20px;vertical-align:top;">
                  <p style="margin:0 0 8px 0;font-family:Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${textMuted};">
                    Mensaje
                  </p>
                  <div style="font-family:Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size:15px;line-height:1.6;color:${textBody};background-color:#f9f7f8;border-radius:8px;padding:16px 18px;border:1px solid ${border};">
                    ${safeMessageHtml}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 20px 24px 20px;text-align:center;">
            <p style="margin:0;font-family:Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size:12px;line-height:1.5;color:${textMuted};">
              Responde a este correo o usa <strong style="color:${textBody};">Responder</strong> para escribir directamente al visitante.
            </p>
          </td>
        </tr>
      </table>
      <p style="margin:20px 0 0 0;font-family:Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size:11px;line-height:1.5;color:${textMuted};text-align:center;max-width:480px;">
        Mensaje generado automáticamente desde el formulario de contacto ECK.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`;
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

  const replyMailtoHref = `mailto:${encodeURIComponent(email)}`;
  const htmlMessage = buildContactEmailHtml({
    safeName,
    safeEmail,
    safeSubject,
    safeMessageHtml,
    replyMailtoHref,
  });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
      from: `"ECK Contacto" <${emailUser}>`,
      to: recipient,
      replyTo: email,
      subject: `[ECK] ${subject}`,
      html: htmlMessage,
      text: [
        "ECK — Nuevo mensaje de contacto",
        "",
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Asunto: ${subject}`,
        "",
        "Mensaje:",
        message,
        "",
        "— Responde a este correo para contactar al visitante.",
      ].join("\n"),
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
