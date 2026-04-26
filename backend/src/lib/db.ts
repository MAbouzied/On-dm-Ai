import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function buildDatabaseUrlFromParts(): string {
  const host = process.env.MYSQL_HOST || process.env.DB_HOST || "localhost";
  const port = process.env.MYSQL_PORT || process.env.DB_PORT || "3306";
  const user = process.env.MYSQL_USER || process.env.DB_USER || "root";
  const password = process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "";
  const name = process.env.MYSQL_DATABASE || process.env.DB_NAME || "ondm";
  return `mysql://${user}:${encodeURIComponent(password)}@${host}:${port}/${name}`;
}

/** Prisma schema uses `provider = "mysql"` — only `mysql://` URLs are valid. */
function resolveDatabaseUrl(): string {
  const raw = process.env.DATABASE_URL?.trim();
  if (raw && /^mysql:/i.test(raw)) return raw;
  if (raw && !/^mysql:/i.test(raw)) {
    const preview = raw.length > 32 ? `${raw.slice(0, 32)}…` : raw;
    console.warn(
      `[db] Ignoring DATABASE_URL (not mysql://). Prisma expects MySQL. Using DB_* / MYSQL_* or default localhost. Was: ${preview}`
    );
  }
  return buildDatabaseUrlFromParts();
}

process.env.DATABASE_URL = resolveDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
