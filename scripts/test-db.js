#!/usr/bin/env node
/**
 * Test MySQL connection - run from project root
 * Usage: DB_HOST=x DB_USER=x DB_PASSWORD=x DB_NAME=x node scripts/test-db.js
 */
// Don't load .env - use explicitly passed env vars for testing
if (!process.env.DATABASE_URL) {
  const h = process.env.DB_HOST || "localhost";
  const p = process.env.DB_PORT || "3306";
  const u = process.env.DB_USER || "root";
  const pw = process.env.DB_PASSWORD || "";
  const n = process.env.DB_NAME || "ondm";
  process.env.DATABASE_URL = `mysql://${u}:${encodeURIComponent(pw)}@${h}:${p}/${n}`;
}
const url = process.env.DATABASE_URL;
console.log("Testing connection to:", url.replace(/:[^:@]+@/, ":****@"));
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    console.log("✓ Connected successfully");
    return prisma.$queryRaw`SELECT 1 as ok`;
  })
  .then((r) => {
    console.log("✓ Query OK:", r);
    return prisma.$disconnect();
  })
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("✗ Connection failed:", e.message);
    process.exit(1);
  });
