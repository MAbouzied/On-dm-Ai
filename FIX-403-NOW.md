# Fix 403 – Do This in Hostinger

## The Problem

Hostinger's **Next.js** preset runs `next start`, which only serves the frontend. Our app needs `npm start`, which runs the combined Express + Next.js server (API + frontend).

## The Fix (2 minutes)

1. **Hostinger hPanel** → your Node.js app → **Settings & Redeploy**
2. Find **Start command** (or **Run command**)
3. Set it to exactly: **`npm start`**
4. Click **Redeploy**

## If You Don't See "Start command"

- Look under **Build and output settings**
- Or **Build configuration** → **Advanced**
- The field might be called **Run command** or **Start command**

## Verify

After redeploy, open:
- `https://your-site.hostingersite.com/health` → should show `{"status":"ok","service":"ondm-combined"}`
- `https://your-site.hostingersite.com/en` → should load the homepage

## Alternative: Change Framework Preset

If you see **Framework preset: Next.js**, try changing it to **Node** or **Express**. That may make Hostinger use `npm start` by default.
