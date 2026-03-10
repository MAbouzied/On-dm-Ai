import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function buildDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const host = process.env.MYSQL_HOST || process.env.DB_HOST || "localhost";
  const port = process.env.MYSQL_PORT || process.env.DB_PORT || "3306";
  const user = process.env.MYSQL_USER || process.env.DB_USER || "root";
  const password = process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "";
  const name = process.env.MYSQL_DATABASE || process.env.DB_NAME || "ondm";
  return `mysql://${user}:${encodeURIComponent(password)}@${host}:${port}/${name}`;
}

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = buildDatabaseUrl();
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
