# Formulario de contacto (Vercel Serverless)

El envío del formulario usa la **función serverless** `api/send-email.js` en el mismo proyecto. Las credenciales viven solo en variables de entorno; el cliente solo hace `POST` a `/api/send-email`.

## 1. Contraseña de aplicación de Gmail

Necesitas una **contraseña de aplicación** (no tu contraseña normal):

1. https://myaccount.google.com/security
2. Activa la **verificación en 2 pasos** si aún no la tienes.
3. **Contraseñas de aplicaciones** → dispositivo **Mail**, sistema **Windows** (o el que prefieras).
4. Copia la contraseña de 16 caracteres.

## 2. Variables de entorno

### Producción (Vercel)

En el proyecto → **Settings** → **Environment Variables**, añade:

| Variable           | Valor                                      |
|--------------------|--------------------------------------------|
| `EMAIL_USER`       | Tu Gmail                                     |
| `EMAIL_PASSWORD`   | Contraseña de aplicación (con o sin espacios) |
| `RECIPIENT_EMAIL`  | Buzón donde quieres recibir los mensajes    |

Despliega de nuevo si ya había un deploy sin estas variables.

### Local (probar envío real)

1. Copia `.env.example` a `.env` y completa los tres valores de correo.
2. Desde la raíz del proyecto:

```bash
npm run dev:vercel
```

Esto levanta el frontend y las rutas `/api/*` como en producción. Con **`npm start` solo** no existe `/api/send-email` en local; el formulario mostrará error de red o respuesta inválida.

## 3. Comprobar que funciona

1. Abre la app (la URL que muestre `vercel dev`, normalmente el puerto del front).
2. Envía el formulario de contacto.
3. Revisa `RECIPIENT_EMAIL` y la carpeta de spam si no llega al instante.

## Problemas habituales

| Problema | Qué revisar |
|----------|-------------|
| Error de red en local | Usar `npm run dev:vercel` y un `.env` con las variables de correo. |
| "Configuración de correo incompleta" | Faltan `EMAIL_USER`, `EMAIL_PASSWORD` o `RECIPIENT_EMAIL` en Vercel o en `.env` para `vercel dev`. |
| Email inválido / validación | Campos demasiado cortos o formato incorrecto (el API valida antes de enviar). |
| No llega el correo | Spam, contraseña de app revocada, o cuenta Gmail con restricciones. |

## Seguridad

- No subas `.env` al repositorio.
- Las credenciales solo existen en el entorno de ejecución de Vercel (o en tu máquina para `vercel dev`).
- El cuerpo del mensaje se escapa para HTML en el email; se validan nombre, email, asunto y mensaje.
