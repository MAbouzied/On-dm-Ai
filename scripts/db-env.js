#!/usr/bin/env node
/**
 * Builds DATABASE_URL from DB_* or MYSQL_* env vars.
 * Use MYSQL_* as alternative (Hostinger, some panels).
 * Password is URL-encoded for special characters.
 * @param {string} [hostOverride] - Override host (e.g. "localhost" for retry)
 */
function buildDatabaseUrl(hostOverride) {
  if (process.env.DATABASE_URL && !hostOverride) return process.env.DATABASE_URL;
  const host = hostOverride ?? process.env.MYSQL_HOST ?? process.env.DB_HOST ?? "localhost";
  const port = process.env.MYSQL_PORT || process.env.DB_PORT || "3306";
  const user = process.env.MYSQL_USER || process.env.DB_USER || "root";
  const password = process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "";
  const name = process.env.MYSQL_DATABASE || process.env.DB_NAME || "ondm";
  return `mysql://${user}:${encodeURIComponent(password)}@${host}:${port}/${name}`;
}

module.exports = { buildDatabaseUrl };
