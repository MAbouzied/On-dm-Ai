#!/usr/bin/env node
/**
 * Runs db-push (creates/updates tables) then seed (only if database is empty).
 * Used on Hostinger deploy - runs from the same server so DB connection works.
 */
require("dotenv/config");
const { execSync } = require("child_process");
const path = require("path");

const root = path.resolve(__dirname, "..");
process.chdir(root);

const { buildDatabaseUrl } = require("./db-env.js");

if (!process.env.DATABASE_URL) {
  const port = process.env.MYSQL_PORT || process.env.DB_PORT || "3306";
  if (port === "4000") {
    console.error("ERROR: DB_PORT=4000 is wrong. MySQL uses port 3306. Set DB_PORT=3306 in your environment.");
    process.exit(1);
  }
  const host = process.env.MYSQL_HOST || process.env.DB_HOST || "localhost";
  if (host !== "localhost" && host !== "127.0.0.1") {
    console.warn("[db-setup] DB_HOST is", host, "- Hostinger MySQL usually needs DB_HOST=localhost. See HOSTINGER-MYSQL.md");
  }
  process.env.DATABASE_URL = buildDatabaseUrl(undefined);
}

// 0. Test connection first (helps debug Hostinger)
let testOk = false;
try {
  require("child_process").execSync("node scripts/db-connect-test.js", {
    stdio: "inherit",
    cwd: root,
    env: { ...process.env },
  });
  testOk = true;
} catch (e) {
  const host = process.env.MYSQL_HOST || process.env.DB_HOST;
  if (host && host !== "localhost" && host !== "127.0.0.1") {
    console.log("[db-setup] Retrying with DB_HOST=localhost...");
    process.env.DB_HOST = "localhost";
    process.env.MYSQL_HOST = "localhost";
    delete process.env.DATABASE_URL;
    try {
      require("child_process").execSync("node scripts/db-connect-test.js", {
        stdio: "inherit",
        cwd: root,
        env: { ...process.env },
      });
      testOk = true;
      process.env.DB_HOST = "localhost";
      process.env.MYSQL_HOST = "localhost";
      const u = process.env.MYSQL_USER || process.env.DB_USER || "root";
      const pw = process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "";
      const n = process.env.MYSQL_DATABASE || process.env.DB_NAME || "ondm";
      process.env.DATABASE_URL = buildDatabaseUrl("localhost");
    } catch (e2) {
      // fall through
    }
  }
}
if (!testOk) {
  console.error("[db-setup] DB connection failed. Server will start anyway; API may fail until DB is reachable.");
  console.error("[db-setup] Set DB_HOST=localhost (or MYSQL_HOST), use full DB_USER/DB_NAME with Hostinger prefix. See HOSTINGER-MYSQL.md");
  process.exit(0); // Don't crash - server already starting
}

// 1. Push schema (creates tables)
console.log("[db-setup] Pushing schema...");
execSync("npx prisma db push --schema=backend/prisma/schema.prisma", {
  stdio: "inherit",
  cwd: root,
});

// 2. Seed (run from backend - uses Prisma)
console.log("[db-setup] Seeding database...");
try {
  execSync("cd backend && npx prisma db seed", {
    stdio: "inherit",
    cwd: root,
  });
  console.log("[db-setup] Seed completed.");
} catch (e) {
  console.warn("[db-setup] Seed failed or skipped:", e.message || e);
  // Don't exit - app can still run; tables exist
}
