# ECK — East Coast Karting

**English** · [Español](README.es.md)

Landing page for [East Coast Karting](https://eck-6c79.vercel.app), a go-kart track in New Brunswick, Canada. Built as a React single-page app with a serverless backend on Vercel that handles contact-form email and a small admin panel for the track's walk-in schedule.

🔗 **Live:** https://eck-6c79.vercel.app

---

## What's in here

The site's goal is conversion, not just information — so the contact form is a first-class part of the system, not an afterthought. Everything the site needs from a backend runs as Vercel serverless functions inside the same deployment, which keeps SMTP credentials out of the browser and avoids paying for a separate server.

- **Bilingual landing page** (EN/FR) — translations live in `src/i18n/eckTranslations.js`
- **Contact form** backed by a serverless function that sends email through Nodemailer
- **Walk-in schedule** the owner can edit from an admin panel, stored in Vercel KV
- **Admin panel** at `/admin-eck`, protected by a JWT session in an `httpOnly` cookie

### Why Vercel KV instead of a database

The walk-in schedule is one weekly record with per-day overrides and up to four time slots — something the owner edits occasionally. A single key-value record covers it; a relational database would have been over-engineering for this scope.

---

## Stack

| Layer | Technology |
|---|---|
| UI | React 18, Create React App (`react-scripts` 5) |
| Styling | TailwindCSS 3, styled-components, `twin.macro` |
| Motion | Framer Motion, react-slick |
| Routing | React Router 6 |
| API | Vercel serverless functions (Node) |
| Email | Nodemailer |
| Storage | Vercel KV |
| Auth | JWT in an `httpOnly` cookie |
| Hosting | Vercel |

---

## Getting started

```bash
npm install
cp .env.example .env      # fill in the values (see below)
npm start                 # frontend only, on http://localhost:3001
```

The plain `npm start` runs the React dev server **without** the serverless functions. To exercise the contact form or the admin panel locally, run the whole thing through the Vercel CLI:

```bash
npm run dev:vercel        # npx vercel dev — frontend + /api together
```

### Build

```bash
npm run build             # outputs to build/
```

---

## Environment variables

Copy `.env.example` to `.env` for local development; in production set the same variables under **Vercel → Project → Settings → Environment Variables**.

| Variable | Purpose |
|---|---|
| `EMAIL_USER` | Gmail account used to send the contact form |
| `EMAIL_PASSWORD` | Gmail **app password** (spaces are ignored) |
| `RECIPIENT_EMAIL` | Where contact-form messages are delivered |
| `ADMIN_USERNAME` | Admin panel login |
| `ADMIN_PASSWORD` | Admin panel password |
| `ADMIN_JWT_SECRET` | Secret used to sign the admin session |
| `KV_REST_API_URL` | Vercel KV — filled in automatically when you link the KV store |
| `KV_REST_API_TOKEN` | Vercel KV — same |
| `REACT_APP_EMAIL_API_URL` | Optional; only if the API lives on a different domain |

> The contact form posts to `/api/send-email` by default, so `REACT_APP_EMAIL_API_URL` is usually unnecessary.

See `EMAIL_SETUP.md` for the full walkthrough of setting up the Gmail app password.

---

## Project structure

```
api/                      Vercel serverless functions
├─ send-email.js          Contact form → Nodemailer
├─ admin-login.js         Issues the JWT session cookie
├─ admin-logout.js        Clears it
├─ admin-session.js       Validates the current session
├─ admin-walkin.js        Read/write the walk-in schedule (auth required)
├─ public-walkin.js       Public read of the schedule
└─ lib/
   ├─ cookies.js          Cookie parse/serialize helpers
   ├─ jwt.js              Sign and verify sessions
   ├─ require-admin.js    Guard shared by the admin endpoints
   └─ walkin-store.js     Vercel KV access layer

src/
├─ components/            UI sections and reusable blocks
├─ pages/                 Route-level pages (incl. AdminEckPage)
├─ i18n/                  eckTranslations.js — EN/FR strings
├─ context/               Global state
├─ helpers/ · utils/      Shared logic
└─ images/ · styles/      Assets and global styles

scripts/
├─ convert-heic-to-web.js       Converts the client's HEIC photos to web formats
└─ sync-icon-colors-to-primary.js
```

---

## Deployment

Vercel, configured in `vercel.json`:

- Build: `npm run build` → `build/`
- SPA fallback: every non-`/api/` path rewrites to `index.html`

Push to `main` and Vercel deploys automatically.

---

## Notes

- The project started from the [Treact](https://treact.owaiskhan.me/) component template, which is why the package is still named `treact` internally. The landing itself was designed and assembled for ECK.
- `npm run deploy` is a leftover from the template and targets Netlify — the real deployment path is Vercel.
- `NODE_OPTIONS=--openssl-legacy-provider` is set on `start` and `build` because `react-scripts` 5 needs it on modern Node versions.

---

## About

Built by [Juan Pablo Ante Suárez](https://github.com/JuanPabloAnteSuarez03). I developed practically the entire landing page, design included; a teammate in Canada handled requirements and client communication in person at the track.

📖 **Full case study:** [juanpabloante.vercel.app/en/projects/eck](https://juanpabloante.vercel.app/en/projects/eck)
