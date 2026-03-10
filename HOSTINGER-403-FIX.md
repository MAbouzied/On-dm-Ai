# Fix 403 "Access to this resource on the server is denied"

This guide walks you through diagnosing and fixing the 403 error on Hostinger.

---

## Part A: Manual Steps on Hostinger (Do These First)

### Step 1: Verify Node.js App Type

1. Log in to **Hostinger hPanel**
2. Go to **Websites** → select your site → **Manage**
3. Confirm it is a **Node.js App** (not a static site or PHP site)
4. If it's not a Node.js app, you may need to remove the website and re-add it as a Node.js app

---

### Step 2: Check Build & Deploy Settings

1. In your Node.js app dashboard, open **Settings** or **Deployments**
2. Find **Build settings** and verify:

   | Setting | Required Value |
   |---------|----------------|
   | **Install command** | `npm install` |
   | **Build command** | `npm run build` |
   | **Start command** | `npm start` (or `node server.js`) |
   | **Output directory** | Leave empty or `.` (root) |
   | **Package manager** | `npm` |

3. **Important:** If there is a "Start command" or "Run command" field, it MUST be `npm start`. Some hosts use this instead of the root package.json start script.

---

### Step 3: Check Environment Variables

1. Go to **Environment Variables** in your Node.js app
2. Ensure ALL of these are set (values from your Hostinger MySQL):

   | Key | Example Value | Notes |
   |-----|---------------|-------|
   | `PORT` | `4000` | Hostinger may auto-set this |
   | `NODE_ENV` | `production` | Required |
   | `DB_HOST` | `91.108.101.195` | Your MySQL host (or `localhost` if DB is on same server) |
   | `DB_PORT` | `3306` | Must be 3306 for MySQL |
   | `DB_USER` | `ondm` | Your MySQL username |
   | `DB_PASSWORD` | `123456On_Dm` | Your MySQL password |
   | `DB_NAME` | `ondm` | Your database name |
   | `FRONTEND_URL` | `https://forestgreen-horse-894495.hostingersite.com` | Your site URL (no trailing slash) |
   | `JWT_SECRET` | `your-secret-here` | Any random string |

3. **DB_HOST note:** If your MySQL is on the same Hostinger account, try `localhost` instead of the IP. Hostinger sometimes uses `localhost` for local DBs.

---

### Step 4: Check Deployment Logs

1. Go to **Deployments** in your Node.js app
2. Open the **latest deployment** and view the **full build log**
3. Look for:
   - ✅ `Build completed` or similar success message
   - ❌ Any red error lines (Prisma, TypeScript, npm, etc.)
   - ❌ `Error:`, `Failed`, `ECONNREFUSED`, `Authentication failed`

4. **Copy the full log** (or at least the last 50–100 lines) and save it. You will need it if the issue continues.

---

### Step 5: Check if Node Process Is Running

1. In Hostinger, look for **Application status**, **Process manager**, or **Running processes**
2. Confirm the Node.js app shows as **Running** or **Active**
3. If it shows **Stopped** or **Crashed**, the app is not starting. Check deployment logs for the cause.

---

### Step 6: MySQL Database Access

1. In hPanel, go to **Databases** → **MySQL Databases**
2. Confirm the database `ondm` exists
3. Confirm the user `ondm` exists and has **All privileges** on `ondm`
4. If using **Remote MySQL**:
   - Add the Hostinger app server IP to **Remote MySQL Access** (or enable "Allow all" for testing)
   - If DB is on the same server, use `DB_HOST=localhost`

---

### Step 7: Redeploy

1. After changing any settings, click **Redeploy** or **Deploy**
2. Wait for the build to finish
3. Check deployment logs again for errors
4. Try opening your site URL

---

## Part B: Information to Collect (For Next Steps)

After completing Part A, please note:

1. **Deployment log:** Did the build succeed? Any errors? (copy last 50 lines if possible)
2. **App status:** Does Hostinger show the app as Running?
3. **DB_HOST:** Are you using `localhost` or `91.108.101.195`?
4. **Start command:** What exact value is set for the start/run command?

---

## Part C: Common Causes of 403

| Cause | Fix |
|-------|-----|
| Node app not running (crashed on start) | Fix DB connection, env vars, or build errors |
| Wrong start command | Set to `npm start` |
| Hostinger serving static files instead of Node | Ensure it's a Node.js app, not a static site |
| Output directory points to wrong folder | Use `.` or leave empty; app runs via Node |
| DB connection fails on startup | Fix DB_HOST, DB_PORT, credentials |

---

## Part D: Quick Test – Health Endpoint

If the app is running, this URL should return JSON:

```
https://forestgreen-horse-894495.hostingersite.com/health
```

- **If you get `{"status":"ok","service":"ondm-combined"}`** → App is running; 403 may be from routing or permissions.
- **If you get 403 or 404** → App is likely not running or not receiving requests.

---

## Part E: Hostinger-Specific Checks

### Root / Source Directory

Some Hostinger Node.js setups have a **Root directory** or **Source directory**:

- It should be **empty** or **`.`** (project root)
- Do **not** set it to `frontend`, `backend`, or `public_html`

### .htaccess (If You Have File Manager Access)

Hostinger normally creates `.htaccess` in `public_html` to proxy requests to the Node app. If you can edit files:

1. Open **File Manager** → `public_html`
2. Check if `.htaccess` exists
3. It should contain rules to proxy to the Node app (Hostinger usually adds these automatically)
4. Do **not** delete it unless you know what you're doing

### Node.js Version

In your Node.js app settings, set the version to **20.x** or **22.x** (the project requires Node >= 20.9.0).

---

## Part F: Try DB_HOST = localhost

If your MySQL database was created in the same Hostinger account:

1. In Environment Variables, change `DB_HOST` from `91.108.101.195` to `localhost`
2. Redeploy
3. Test again

---

## Next Step

Complete **Part A** (Steps 1–7), then reply with **"done"** and include:

1. Whether the build succeeded (yes/no)
2. Whether the app shows as Running (yes/no)
3. Any error lines from the deployment log (copy-paste last 30–50 lines)
4. Result of the `/health` URL test (what do you see?)
5. Your `DB_HOST` value (localhost or IP?)

Then the remaining fixes can be applied based on your results.
