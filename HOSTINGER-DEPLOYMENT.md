# Hostinger Deployment Checklist

## Critical: Fix These First

### 1. DB_PORT must be 3306 (not 4000)

**MySQL uses port 3306.** If `DB_PORT` is set to `4000`, the database connection will fail and the app will not start. The 403 error often appears when the Node.js process crashes on startup.

**In Hostinger Environment Variables, set:**
```
DB_PORT=3306
```

### 2. Add NODE_ENV

```
NODE_ENV=production
```

### 3. Verify Start Command

Hostinger must run `npm start` after the build. This starts the combined Express + Next.js server. If Hostinger has a "Start command" or "Run command" field, it should be:
```
npm start
```
or
```
node server.js
```

### 4. Output Directory

For this project (Node.js server, not static export), the **Output directory** setting is secondary. The app runs as a Node process and serves all requests. If Hostinger requires an output path, `.next` is fine—the build creates it at the project root.

---

## Full Environment Variables

| Variable     | Value                                      | Notes                    |
|-------------|---------------------------------------------|--------------------------|
| PORT        | 4000 (or Hostinger default)                 | App listens on this      |
| NODE_ENV    | production                                  | Required for production  |
| DB_HOST     | 91.108.101.195                             | Your MySQL host          |
| DB_PORT     | **3306**                                    | MySQL default (not 4000) |
| DB_USER     | ondm                                        |                          |
| DB_PASSWORD | 123456On_Dm                                 |                          |
| DB_NAME     | ondm                                        |                          |
| FRONTEND_URL| https://forestgreen-horse-894495.hostingersite.com/ | Your site URL     |
| JWT_SECRET  | (use a strong random string in production)  |                          |

---

## Build Settings

- **Install:** `npm install`
- **Build:** `npm run build`
- **Start:** `npm start`

---

## If It Still Fails

1. Check the deployment logs in Hostinger for errors (e.g. DB connection, Prisma).
2. Ensure the MySQL database exists and the user has access from the app’s IP.
3. Confirm Hostinger is running the Node.js app (not only serving static files).
