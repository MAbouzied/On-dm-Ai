#!/usr/bin/env node
/**
 * Tests DB connection - runs on Hostinger during deploy.
 * Tries configured host, then localhost if that fails.
 * Exits 0 if either works, 1 if both fail.
 */
require("dotenv/config");
const { PrismaClient } = require("@prisma/client");

function buildUrl(host) {
  const h = host;
  const p = process.env.DB_PORT || "3306";
  const u = process.env.DB_USER || "root";
  const pw = process.env.DB_PASSWORD || "";
  const n = process.env.DB_NAME || "ondm";
  return `mysql://${u}:${encodeURIComponent(pw)}@${h}:${p}/${n}`;
}

async function tryConnect(url) {
  const prisma = new PrismaClient({ datasourceUrl: url });
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();
    return true;
  } catch (e) {
    await prisma.$disconnect().catch(() => {});
    throw e;
  }
}

async function main() {
  const host = process.env.DB_HOST || "localhost";
  const url1 = process.env.DATABASE_URL || buildUrl(host);
  const url2 = host !== "localhost" ? buildUrl("localhost") : null;

  console.log("[db-connect-test] Testing connection...");
  console.log("[db-connect-test] Host:", host, "| User:", process.env.DB_USER || "root", "| DB:", process.env.DB_NAME || "ondm");

  try {
    await tryConnect(url1);
    console.log("[db-connect-test] ✓ Connected successfully");
    process.exit(0);
  } catch (e1) {
    console.error("[db-connect-test] ✗ Failed:", e1.message);
    if (url2) {
      console.log("[db-connect-test] Trying localhost...");
      try {
        await tryConnect(url2);
        console.log("[db-connect-test] ✓ Connected with localhost");
        console.log("[db-connect-test] → Set DB_HOST=localhost in Hostinger and redeploy");
        process.exit(0);
      } catch (e2) {
        console.error("[db-connect-test] ✗ localhost also failed:", e2.message);
      }
    }
  }
  console.error("[db-connect-test] Check: DB_USER and DB_NAME need Hostinger prefix (e.g. u123_ondm). See HOSTINGER-MYSQL.md");
  process.exit(1);
}
main();
