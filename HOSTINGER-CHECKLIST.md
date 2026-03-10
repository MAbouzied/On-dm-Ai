# Hostinger Deployment Checklist

## Root Cause of 503

503 occurs when the Node.js process **crashes on startup** or **never binds to the correct port**. Common causes for this project:

1. **DB connection blocking startup** – Fixed: db-setup runs in background; server starts immediately.
2. **Wrong DB host** – Hostinger MySQL is at `localhost:3306`, not a remote IP.
3. **Missing/wrong env vars** – DB_USER and DB_NAME must include Hostinger prefix (e.g. `u123456789_ondm`).
4. **Next.js prepare() failure** – Wrong paths or missing `frontend/.next` after build.
5. **JWT_SECRET** – Missing in production (app still runs but logs a warning).

---

## Exact Hostinger Environment Variables

Set these in **Hostinger → Your App → Environment Variables**:

| Variable | Value | Required |
|----------|-------|----------|
| `NODE_ENV` | `production` | Yes |
| `PORT` | Leave empty (Hostinger sets it) or `4000` | Hostinger usually sets |
| `DB_HOST` | `localhost` | Yes |
| `DB_PORT` | `3306` | Yes |
| `DB_USER` | Full username from Hostinger (e.g. `u140527120_ondm`) | Yes |
| `DB_PASSWORD` | Your MySQL password | Yes |
| `DB_NAME` | Full database name from Hostinger (e.g. `u140527120_ondm`) | Yes |
| `FRONTEND_URL` | Your site URL, e.g. `https://yourdomain.com` | Yes |
| `JWT_SECRET` | Random string (e.g. `openssl rand -base64 32`) | Yes |

**Alternative:** Use `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_PORT` instead of `DB_*`.

**Password with special characters:** If using `DATABASE_URL` directly, URL-encode the password (e.g. `@` → `%40`).

---

## Exact Hostinger Manual Steps

1. **Create MySQL database** (if not done)
   - hPanel → Databases → MySQL Databases → Create
   - Note: Database name, Username (both have prefix like `u123456789_`), Password

2. **Set environment variables**
   - Hostinger → Your App → Environment Variables
   - Add every variable from the table above
   - Ensure `DB_HOST=localhost` (Hostinger MySQL is on the same server)

3. **Verify hostinger.json**
   - `buildCommand`: `npm run build`
   - `startCommand`: `npm start`
   - `framework`: `node` (not `nextjs`)

4. **Deploy**
   - Push code to GitHub
   - Hostinger → Deploy / Redeploy
   - Wait for build to complete

5. **Check deployment logs**
   - Hostinger → Deployments → Latest → View logs
   - Look for: `[server] db-setup running in background` and `ON-DM (Frontend + Backend) running on`
   - If you see `[server] Next.js prepare failed`, the build output may be wrong

---

## Post-Deploy Verification

1. **Health check (no DB)**
   ```
   GET https://yourdomain.com/health
   ```
   Expected: `{"status":"ok","service":"ondm-combined"}`

2. **Health check with DB**
   ```
   GET https://yourdomain.com/api/health?db=1
   ```
   Expected: `{"status":"ok","db":"connected"}`  
   If `{"status":"degraded","db":"disconnected"}`, fix DB env vars (DB_HOST=localhost) and redeploy.

3. **DB status**
   ```
   GET https://yourdomain.com/api/db-status
   ```

4. **Homepage**
   ```
   GET https://yourdomain.com/
   ```
   Should load the site.

---

## If 503 Persists

1. **View deployment logs** – Look for `uncaughtException`, `Next.js prepare failed`, or DB errors.
2. **Try `SKIP_DB_SETUP=1`** – Add to env and redeploy. If the app loads, the issue is DB-related.
3. **Confirm `frontend/.next` exists** – Build must complete before start. Check build logs.
4. **Confirm PORT** – Hostinger may inject `PORT`. Our server uses `process.env.PORT || 3000`.

---

## Status

**READY TO REDEPLOY** – All fixes applied. Follow the checklist above.
