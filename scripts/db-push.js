#!/usr/bin/env node
if (!process.env.DATABASE_URL) {
  const host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT || "3306";
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";
  const name = process.env.DB_NAME || "ondm";
  process.env.DATABASE_URL = `mysql://${user}:${encodeURIComponent(password)}@${host}:${port}/${name}`;
}
const { execSync } = require("child_process");
execSync("npx prisma db push --schema=backend/prisma/schema.prisma", {
  stdio: "inherit",
  cwd: process.cwd(),
});
