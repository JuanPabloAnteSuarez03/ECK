# ECK — East Coast Karting

[English](README.md) · **Español**

Landing page de [East Coast Karting](https://eck-6c79.vercel.app), una pista de karts en New Brunswick, Canadá. Es una single-page app en React con un backend serverless en Vercel que gestiona el envío del formulario de contacto por correo y un panel de administración para el horario de walk-in de la pista.

🔗 **En vivo:** https://eck-6c79.vercel.app

---

## Qué hay acá

El objetivo del sitio no es informar sino convertir: que quien llegue termine escribiendo. Eso vuelve al formulario de contacto una pieza central del sistema, no un accesorio. Todo lo que el sitio necesita del backend corre como funciones serverless de Vercel dentro del mismo despliegue, lo que mantiene las credenciales SMTP fuera del navegador y evita pagar un servidor aparte.

- **Landing bilingüe** (EN/FR) — las traducciones viven en `src/i18n/eckTranslations.js`
- **Formulario de contacto** respaldado por una función serverless que envía correo con Nodemailer
- **Horario de walk-in** editable por el dueño desde un panel, almacenado en Vercel KV
- **Panel de administración** en `/admin-eck`, protegido con sesión JWT en una cookie `httpOnly`

### Por qué Vercel KV y no una base de datos

El horario de walk-in es un único registro semanal, con overrides por día y hasta cuatro franjas horarias, que el dueño edita ocasionalmente. Un solo registro clave-valor alcanza; una base de datos relacional habría sido sobreingeniería para este alcance.

---

## Stack

| Capa | Tecnología |
|---|---|
| UI | React 18, Create React App (`react-scripts` 5) |
| Estilos | TailwindCSS 3, styled-components, `twin.macro` |
| Animación | Framer Motion, react-slick |
| Ruteo | React Router 6 |
| API | Funciones serverless de Vercel (Node) |
| Correo | Nodemailer |
| Almacenamiento | Vercel KV |
| Autenticación | JWT en cookie `httpOnly` |
| Hosting | Vercel |

---

## Puesta en marcha

```bash
npm install
cp .env.example .env      # completar los valores (ver abajo)
npm start                 # solo el frontend, en http://localhost:3001
```

`npm start` levanta el servidor de desarrollo de React **sin** las funciones serverless. Para probar el formulario de contacto o el panel de administración en local, hay que correr todo junto con la CLI de Vercel:

```bash
npm run dev:vercel        # npx vercel dev — frontend + /api juntos
```

### Build

```bash
npm run build             # genera build/
```

---

## Variables de entorno

Copiar `.env.example` a `.env` para desarrollo local; en producción se definen las mismas variables en **Vercel → Project → Settings → Environment Variables**.

| Variable | Para qué sirve |
|---|---|
| `EMAIL_USER` | Cuenta de Gmail desde la que se envía el formulario |
| `EMAIL_PASSWORD` | **Contraseña de aplicación** de Gmail (los espacios se ignoran) |
| `RECIPIENT_EMAIL` | Dónde llegan los mensajes del formulario |
| `ADMIN_USERNAME` | Usuario del panel de administración |
| `ADMIN_PASSWORD` | Contraseña del panel |
| `ADMIN_JWT_SECRET` | Secreto con el que se firma la sesión de administrador |
| `KV_REST_API_URL` | Vercel KV — la CLI lo completa al enlazar el store |
| `KV_REST_API_TOKEN` | Vercel KV — igual |
| `REACT_APP_EMAIL_API_URL` | Opcional; solo si el API vive en otro dominio |

> El formulario apunta a `/api/send-email` por defecto, así que `REACT_APP_EMAIL_API_URL` normalmente no hace falta.

En `EMAIL_SETUP.md` está el paso a paso para generar la contraseña de aplicación de Gmail.

---

## Estructura del proyecto

```
api/                      Funciones serverless de Vercel
├─ send-email.js          Formulario de contacto → Nodemailer
├─ admin-login.js         Emite la cookie de sesión JWT
├─ admin-logout.js        La limpia
├─ admin-session.js       Valida la sesión actual
├─ admin-walkin.js        Lee/escribe el horario de walk-in (requiere auth)
├─ public-walkin.js       Lectura pública del horario
└─ lib/
   ├─ cookies.js          Helpers de parseo/serialización de cookies
   ├─ jwt.js              Firma y verificación de sesiones
   ├─ require-admin.js    Guard compartido por los endpoints de admin
   └─ walkin-store.js     Capa de acceso a Vercel KV

src/
├─ components/            Secciones de UI y bloques reutilizables
├─ pages/                 Páginas de ruta (incluye AdminEckPage)
├─ i18n/                  eckTranslations.js — cadenas EN/FR
├─ context/               Estado global
├─ helpers/ · utils/      Lógica compartida
└─ images/ · styles/      Recursos y estilos globales

scripts/
├─ convert-heic-to-web.js       Convierte las fotos HEIC del cliente a formatos web
└─ sync-icon-colors-to-primary.js
```

---

## Despliegue

Vercel, configurado en `vercel.json`:

- Build: `npm run build` → `build/`
- Fallback de SPA: toda ruta que no empiece por `/api/` se reescribe a `index.html`

Con un push a `main`, Vercel despliega automáticamente.

---

## Notas

- El proyecto partió de la plantilla de componentes [Treact](https://treact.owaiskhan.me/), y por eso el paquete todavía se llama `treact` internamente. El landing en sí fue diseñado y armado para ECK.
- `npm run deploy` es un resto de la plantilla y apunta a Netlify — el despliegue real es en Vercel.
- `NODE_OPTIONS=--openssl-legacy-provider` está en `start` y `build` porque `react-scripts` 5 lo necesita en versiones modernas de Node.

---

## Sobre el proyecto

Desarrollado por [Juan Pablo Ante Suárez](https://github.com/JuanPabloAnteSuarez03). Hice prácticamente todo el landing, diseño incluido; un compañero en Canadá llevó los requerimientos y la comunicación con el cliente en persona, en la pista.

📖 **Caso de estudio completo:** [juanpabloante.vercel.app/es/projects/eck](https://juanpabloante.vercel.app/es/projects/eck)
