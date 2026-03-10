# Fix 503 Service Unavailable

503 means the app is **not running** or **crashing on startup**.

**Update:** The server now starts **immediately**; `db-setup` runs in the background so Hostinger won't timeout waiting for DB. If DB setup fails, the app still serves (API may error until DB is reachable).

## 1. Check Deployment Logs

1. **Hostinger** → your app → **Deployments**
2. Open the **latest deployment** → **View logs** or **Build logs**
3. Look for errors at the **end** of the log (after "Starting..." or similar)

Common causes:
- **DB connection failed** – App exits before starting
- **Missing env vars** – DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
- **Port not set** – Hostinger needs PORT in env

## 2. Verify Environment Variables

In **Hostinger** → **Environment Variables**, ensure ALL are set:

| Variable | Value |
|----------|-------|
| `PORT` | `4000` (or leave for Hostinger to set) |
| `NODE_ENV` | `production` |
| `DB_HOST` | `localhost` |
| `DB_PORT` | `3306` |
| `DB_USER` | `u140527120_ondm` |
| `DB_PASSWORD` | `1234LocalA` |
| `DB_NAME` | `u140527120_ondm` |
| `FRONTEND_URL` | Your site URL |
| `JWT_SECRET` | Any random string |

## 3. Skip DB Setup (Temporary Debug)

If DB connection fails from Hostinger (e.g. IP blocked), add:

```
SKIP_DB_SETUP=1
```

The server will start without running db-push/db-seed. You may get errors on pages that need the DB, but the app should at least load.

## 4. Redeploy

After fixing env vars, click **Redeploy**.
