# Configuración del servidor de emails SEGURO

El formulario usa un **servidor Node.js seguro** con:
- ✅ Variables de entorno (credenciales protegidas)
- ✅ Rate limiting (evita spam/ataques)
- ✅ Validación de datos
- ✅ CORS restringido
- ✅ Emails ilimitados

## Pasos para configurar:

### 1. Habilitar "App Passwords" en Gmail

**Necesitas una "contraseña de aplicación"** (no tu contraseña normal):

1. Ve a https://myaccount.google.com/security
2. Activa la **Verificación en 2 pasos** (si no la tienes)
3. Ve a **"Contraseñas de aplicaciones"**
4. Selecciona dispositivo: **Mail** y **Windows**
5. Gmail te generará una contraseña de 16 caracteres
6. **Copia esa contraseña**

### 2. Configurar el archivo `.env`

En la raíz del proyecto, abre el archivo `.env` y completa:

```
EMAIL_USER=tu-correo@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
RECIPIENT_EMAIL=csilva2527@gmail.com
PORT=5000
```

**Reemplaza:**
- `tu-correo@gmail.com` con tu email de Gmail
- `xxxx xxxx xxxx xxxx` con la contraseña de 16 caracteres que generó Gmail
- `csilva2527@gmail.com` con el correo donde quieres recibir los mensajes

### 3. Iniciar el servidor

En la terminal (nueva ventana), desde la raíz del proyecto:

```bash
node server.js
```

Deberías ver:
```
Servidor de emails corriendo en puerto 5000
Email configurado: tu-correo@gmail.com
```

### 4. Dejar el servidor corriendo

- Mantén la terminal abierta mientras usas la aplicación
- El formulario enviará emails a través del servidor

## ¿Está funcionando?

1. Llena el formulario de contacto
2. Haz clic en "Send"
3. En 2-3 segundos deberías recibir el email en csilva2527@gmail.com

## Problemas comunes:

| Problema | Solución |
|----------|---------|
| "Error al conectar con el servidor" | Asegúrate de que el servidor está corriendo (`node server.js`) |
| "Email inválido" | Verifica que completaste los datos correctamente en `.env` |
| No llega el email | Revisa la carpeta de SPAM en Gmail |
| Error 429 (Too many requests) | Alguien envió más de 5 emails en 15 minutos desde la misma IP |

## Seguridad

- 🔒 Las credenciales están en `.env` (no en el código)
- 🔒 Rate limiting: máximo 5 emails cada 15 minutos
- 🔒 CORS configurado solo para localhost
- 🔒 Validación completa de datos
- 🔒 Sin exponer detalles de errores al cliente

## Para producción (cuando deploys)

1. Actualiza `CORS` en `server.js` línea 16 con tu dominio:
```javascript
origin: [
  'https://tudominio.com'
]
```

2. Deploy el servidor en Heroku, Railway, Render, etc.
3. Actualiza la URL en el formulario (línea 27 de `TwoColContactUsWithIllustrationFullForm.js`)

¿Necesitas ayuda? 📧


