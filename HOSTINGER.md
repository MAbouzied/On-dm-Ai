# Deploying ON-DM to Hostinger

This guide helps you deploy the ON-DM app (frontend + backend combined) to Hostinger via GitHub.

## Prerequisites

- **Hostinger plan**: Node.js Web Apps hosting (Business Web Hosting or Cloud)
- **GitHub repo**: Your code pushed to GitHub (e.g. `On-dm-Ai`)

## Step 1: Connect GitHub

1. In Hostinger hPanel, go to **Websites** → **Add Website** → **Node.js Apps**
2. Choose **Import Git Repository**
3. Connect your GitHub account and select the `On-dm-Ai` repository
4. Select the branch (usually `main`)

## Step 2: Build Settings

Configure Hostinger (use **npm**, not pnpm):

| Setting | Value |
|---------|-------|
| **Package manager** | `npm` |
| **Node.js version** | `20.x` (required: ≥20.9.0 for Next.js 16) |
| **Install command** | `npm install` |
| **Build command** | `npm run build` |
| **Start command** | `npm run start` |

## Step 3: Environment Variables

Add in Hostinger's environment variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `""` (empty string) for same-origin — API runs on same server |
| `DATABASE_URL` | `file:./backend/dev.db` for SQLite (path relative to project root), or MySQL URL if using Hostinger MySQL |
| `FRONTEND_URL` | `https://your-site.hostinger.com` (your deployed URL for CORS) |
| `JWT_SECRET` | A random secret string for auth (e.g. generate with `openssl rand -base64 32`) |

## Step 4: Deploy

Click **Deploy**. Hostinger will install dependencies, build both frontend and backend, and start the combined server.

## Architecture

The deployment runs a single Node.js process that:

- Serves the Next.js frontend (pages, static assets)
- Serves the Express API at `/api/*`
- Serves uploaded files at `/uploads`
- Uses SQLite by default (`backend/dev.db`)

## Database

- **SQLite (default)**: Uses `file:./backend/dev.db`. The schema is created automatically on first run via `prisma db push` (run during build).
- **MySQL**: If you use Hostinger MySQL, set `DATABASE_URL="mysql://user:pass@host:3306/ondm"` and run migrations manually or add to build.

## Troubleshooting

- **"Unsupported framework"** – Ensure `next.config.mjs` and `package.json` with `next` are at the repo root (already configured)
- **Build fails** – Check that `npm run build` works locally
- **403 Forbidden** – Ensure all environment variables are set in Hostinger
- **API errors** – Set `NEXT_PUBLIC_API_URL=""` for combined deployment (same-origin)
