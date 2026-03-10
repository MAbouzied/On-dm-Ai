# Deploying ON-DM to Hostinger

This guide helps you deploy the ON-DM Next.js frontend to Hostinger via GitHub.

## Prerequisites

- **Hostinger plan**: Node.js Web Apps hosting (Business Web Hosting or Cloud)
- **GitHub repo**: Your code pushed to GitHub (e.g. `On-dm-Ai`)

## Step 1: Connect GitHub

1. In Hostinger hPanel, go to **Websites** → **Add Website** → **Node.js Apps**
2. Choose **Import Git Repository**
3. Connect your GitHub account and select the `On-dm-Ai` repository
4. Select the branch (usually `main`)

## Step 2: Build Settings

Because this is a monorepo (frontend in `frontend/`), configure Hostinger:

| Setting | Value |
|---------|-------|
| **Install command** | `npm install` |
| **Build command** | `npm run build:hostinger` |
| **Start command** | `npm run start -- -p $PORT` |
| **Node.js version** | 18.x or 20.x |

## Step 3: Environment Variables

Add in Hostinger’s environment variables:

- `NEXT_PUBLIC_API_URL` – Your backend API URL (e.g. `https://api.yourdomain.com`)

If the backend is not deployed yet, the frontend will fall back to `http://localhost:4000` and API calls will fail in production.

## Step 4: Deploy

Click **Deploy**. Hostinger will install dependencies, build the frontend, and start the app.

## Backend Deployment

The backend (Express + Prisma) must run separately. Options:

1. **Hostinger Node.js app** – Deploy the backend as another Node.js app and point `NEXT_PUBLIC_API_URL` to it
2. **VPS** – Run backend on a VPS
3. **Other PaaS** – Railway, Render, Fly.io, etc.

## Troubleshooting

- **"Unsupported framework"** – Ensure `next.config.mjs` and `package.json` with `next` are at the repo root (already configured)
- **Build fails** – Check that `npm run build:hostinger` works locally
- **API errors** – Set `NEXT_PUBLIC_API_URL` to your live backend URL
