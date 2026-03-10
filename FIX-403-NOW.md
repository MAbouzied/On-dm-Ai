# Fix 403 – Do This in Hostinger

## The Problem

Hostinger's **Next.js** preset runs `next start`, which only serves the frontend. Our app needs the combined Express + Next.js server (API + frontend).

## Code Fix (Already Done)

The frontend's `start` script now runs our combined server. If Hostinger runs `npm start` from the frontend context, it will work.

## Manual Fix (If Still 403)

1. **Hostinger** → **Settings & Redeploy**
2. **Scroll down** – find **Start command** (or **Run command**)
3. Set it to: **`npm start`**
4. Or try: **`npm run start -- -p $PORT`**
5. Click **Redeploy**

## Alternative: Change Framework Preset

Change **Framework preset** from **Next.js** to **Node** or **Express** – Hostinger may then use `npm start` by default.

## Verify

After redeploy, open:
- `https://your-site.hostingersite.com/health` → should show `{"status":"ok","service":"ondm-combined"}`
- `https://your-site.hostingersite.com/en` → should load the homepage

## Alternative: Change Framework Preset

If you see **Framework preset: Next.js**, try changing it to **Node** or **Express**. That may make Hostinger use `npm start` by default.
