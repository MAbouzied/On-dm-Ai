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

// Build DATABASE_URL from DB_* if not set
if (!process.env.DATABASE_URL) {
  let host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT || "3306";
  if (port === "4000") {
    console.error("ERROR: DB_PORT=4000 is wrong. MySQL uses port 3306. Set DB_PORT=3306 in your environment.");
    process.exit(1);
  }
  // Hostinger MySQL uses localhost - IP often fails
  if (host !== "localhost" && host !== "127.0.0.1") {
    console.warn("[db-setup] DB_HOST is", host, "- Hostinger MySQL usually needs DB_HOST=localhost. See HOSTINGER-MYSQL.md");
  }
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";
  const name = process.env.DB_NAME || "ondm";
  process.env.DATABASE_URL = `mysql://${user}:${encodeURIComponent(password)}@${host}:${port}/${name}`;
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
