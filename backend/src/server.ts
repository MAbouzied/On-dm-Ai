import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
// Next.js default export typing can be inconsistent; use type assertion for createServer
import next from "next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Support -p $PORT (Hostinger: npm run start -- -p $PORT)
const pIdx = process.argv.indexOf("-p");
const portArg = pIdx >= 0 ? process.argv[pIdx + 1] : null;
const PORT = parseInt(portArg || process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const frontendDir = path.resolve(__dirname, "../../frontend");

// Next.js and next-intl resolve paths relative to cwd; switch to frontend dir
const originalCwd = process.cwd();
process.chdir(frontendDir);

// Use webpack (not Turbopack) for next-intl compatibility when running from custom server
const createNextApp = next as unknown as (opts: { dev: boolean; dir: string; turbopack?: boolean; webpack?: boolean }) => { getRequestHandler: () => (req: unknown, res: unknown) => Promise<void>; prepare: () => Promise<void> };
const nextApp = createNextApp({ dev, dir: ".", webpack: true });

// Restore cwd after Next.js is created (uploads path is relative to backend)
process.chdir(originalCwd);
const handle = nextApp.getRequestHandler();

const server = express();

// Ensure uploads directory exists (backend/uploads) - use absolute path since we chdir
const uploadsDir = path.resolve(__dirname, "..", "uploads");
try {
  fs.mkdirSync(uploadsDir, { recursive: true });
} catch (e) {
  console.warn("[server] Could not create uploads dir:", (e as Error).message);
}

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000,http://localhost:3001,http://localhost:3002")
  .split(",")
  .map((o) => o.trim());
server.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(null, false);
  },
}));
server.use(express.json());

// Serve uploaded files at /uploads/
server.use("/uploads", express.static(uploadsDir));

server.get("/health", (_, res) => {
  res.json({ status: "ok", service: "ondm-combined" });
});

server.get("/api/health", async (req, res) => {
  const checkDb = req.query.db === "1" || req.query.db === "true";
  if (!checkDb) {
    res.json({ status: "ok", service: "ondm-combined" });
    return;
  }
  try {
    const { prisma } = await import("./lib/db.js");
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "connected" });
  } catch (e: unknown) {
    const err = e as Error;
    res.status(503).json({
      status: "degraded",
      db: "disconnected",
      error: err.message,
      hint: "Set DB_HOST=localhost (or MYSQL_HOST), DB_USER/DB_NAME with Hostinger prefix. See HOSTINGER-MYSQL.md",
    });
  }
});

server.get("/api/db-status", async (_, res) => {
  try {
    const { prisma } = await import("./lib/db.js");
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, message: "Database connected" });
  } catch (e: unknown) {
    const err = e as Error;
    res.status(500).json({
      ok: false,
      error: err.message,
      hint: "Set DB_HOST=localhost (or MYSQL_HOST), DB_USER/DB_NAME with Hostinger prefix. See HOSTINGER-MYSQL.md",
    });
  }
});

import authRoutes from "./routes/auth.js";
import servicesRoutes from "./routes/services.js";
import projectsRoutes from "./routes/projects.js";
import blogRoutes from "./routes/blog.js";
import homepageRoutes from "./routes/homepage.js";
import siteConfigRoutes from "./routes/site-config.js";
import contactPageRoutes from "./routes/contact-page.js";
import teamRoutes from "./routes/team.js";
import contactRoutes from "./routes/contact.js";
import publicRoutes from "./routes/public.js";
import uploadRoutes from "./routes/upload.js";

server.use("/api/auth", authRoutes);
server.use("/api/services", servicesRoutes);
server.use("/api/projects", projectsRoutes);
server.use("/api/blog", blogRoutes);
server.use("/api/upload", uploadRoutes);
server.use("/api/homepage", homepageRoutes);
server.use("/api/site-config", siteConfigRoutes);
server.use("/api/contact-page", contactPageRoutes);
server.use("/api/team", teamRoutes);
server.use("/api/contact", contactRoutes);
server.use("/api/public", publicRoutes);

// Redirect / to default locale (next-intl uses /ar or /en)
server.get("/", (req, res) => {
  res.redirect(302, "/ar");
});

// Next.js handles all other routes
server.all("*", (req, res) => {
  handle(req, res).catch((err: unknown) => {
    console.error("[server] Next.js handle error:", err);
    res.status(500).end("Internal Server Error");
  });
});

nextApp.prepare().then(() => {
  server.listen(PORT, () => {
    console.log(`ON-DM (Frontend + Backend) running on http://localhost:${PORT}`);
    const dbUrl = process.env.DATABASE_URL;
    console.log("Database:", dbUrl ? `${dbUrl.split("@")[1] || "(set)"}` : "(not set - check DB_* or MYSQL_* env)");
    console.log("CORS allowed origins:", process.env.FRONTEND_URL || "http://localhost:3000");
  });
}).catch((err: unknown) => {
  const e = err as Error;
  console.error("[server] Next.js prepare failed:", e.message || e);
  console.error("[server] Check: frontend/.next exists, NODE_ENV=production. Stack:", e.stack);
  process.exit(1);
});
