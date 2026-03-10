# Hostinger Build Configuration

Use these exact values in Hostinger **Settings & Redeploy**.

> **hostinger.json** in the project root may be read by Hostinger. If not, enter the values below manually.

## Build configuration

| Field | Value |
|-------|-------|
| **Framework preset** | **Node** or **Express** (if available) — *not* Next.js |
| **Branch** | `main` |
| **Node version** | `20.x` |
| **Root directory** | `./` |

## Build and output settings

| Field | Value |
|-------|-------|
| **Build command** | `npm run build` |
| **Output directory** | `.next` |
| **Package manager** | `npm` |
| **Start command** | `npm start` |

> **Important:** If you see a **Start command** or **Run command** field, set it to `npm start`.  
> With Framework preset "Next.js", Hostinger may default to `next start`, which breaks the API. Use **Node** or **Express** preset, or override Start command to `npm start`.

## Environment variables

Add all of these:

| Key | Value |
|-----|-------|
| `PORT` | `4000` |
| `NODE_ENV` | `production` |
| `DB_HOST` | **`localhost`** (Hostinger MySQL uses localhost, not IP – see HOSTINGER-MYSQL.md) |
| `DB_PORT` | `3306` |
| `DB_USER` | Full username with prefix (e.g. `u123456789_ondm`) from Hostinger panel |
| `DB_PASSWORD` | your password |
| `DB_NAME` | Full database name with prefix (e.g. `u123456789_ondm`) from Hostinger panel |
| `FRONTEND_URL` | `https://your-site.hostingersite.com` |
| `JWT_SECRET` | random secret string |

## After changing settings

Click **Redeploy** and wait for the build to finish.
