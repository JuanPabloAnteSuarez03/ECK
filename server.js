require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS - Solo permitir tu dominio (cambiar en producción)
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5000',
    // Agregar tu dominio aquí cuando deploys: 'https://tudominio.com'
  ],
  methods: ['POST'],
  credentials: true
};
app.use(cors(corsOptions));

// Rate Limiting - máximo 5 emails por IP cada 15 minutos
const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 requets por IP
  message: 'Demasiados emails desde esta IP. Intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Configurar transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Función para validar email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Función para validar datos
const validateFormData = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Email inválido');
  }
  
  if (!data.subject || data.subject.trim().length < 3) {
    errors.push('El asunto debe tener al menos 3 caracteres');
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres');
  }
  
  // Prevenir inyección de scripts
  const htmlSpecialChars = /<|>/g;
  if (htmlSpecialChars.test(data.name) || htmlSpecialChars.test(data.subject)) {
    errors.push('Caracteres no permitidos en nombre o asunto');
  }
  
  return errors;
};

// Ruta para enviar emails
app.post('/api/send-email', emailLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validar datos
    const errors = validateFormData({ name, email, subject, message });
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    
    // Crear contenido del email
    const htmlMessage = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `[ECK Contact] ${subject}`,
      html: htmlMessage,
      text: `
Nombre: ${name}
Email: ${email}
Asunto: ${subject}

Mensaje:
${message}
      `
    };
    
    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email enviado:', info.response);
    
    return res.status(200).json({
      success: true,
      message: 'Email enviado exitosamente. Pronto nos contactaremos contigo.'
    });
    
  } catch (error) {
    console.error('Error al enviar email:', error);
    
    // No revelar detalles del error al cliente
    return res.status(500).json({
      success: false,
      message: 'Error al enviar el email. Por favor, intenta de nuevo.'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor de emails corriendo en puerto ${PORT}`);
  console.log(`Email configurado: ${process.env.EMAIL_USER}`);
});
