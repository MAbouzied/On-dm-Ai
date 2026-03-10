# Hostinger: Set Start Command

## Problem

If `/health` shows "This Page Does Not Exist", Hostinger is running **Next.js only** (`next start`) instead of our **Express + Next.js** server.

## Fix (2 minutes)

1. **Hostinger hPanel** → Websites → your site → **Manage**
2. Open **Settings & Redeploy** (or **Deployments** → **Settings**)
3. Find **Start command** / **Run command**
4. Set it to: **`npm start`**
5. Click **Redeploy**

## Why

- `npm start` runs `node server.js` → our combined Express + Next.js server (API + frontend)
- `next start` (Hostinger default for Next.js) → only frontend, no `/api/*`, no `/health`

## Verify

After redeploy, open:

```
https://your-site.hostingersite.com/health
```

You should see: `{"status":"ok","service":"ondm-combined"}`
