import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

function isDatabaseUnreachable(err: unknown): boolean {
  const s = err instanceof Error ? err.message : String(err);
  return s.includes("Can't reach database server") || s.includes("P1001");
}

function isDatabaseAuthFailed(err: unknown): boolean {
  const s = err instanceof Error ? err.message : String(err);
  return s.includes("Authentication failed against database") || s.includes("P1000");
}

function isPrismaMissingTable(err: unknown): boolean {
  const s = err instanceof Error ? err.message : String(err);
  return s.includes("does not exist in the current database") || s.includes("P2021");
}

function prismaErrorResponse(err: unknown): { status: number; body: { error: string } } {
  if (isDatabaseAuthFailed(err)) {
    return {
      status: 503,
      body: {
        error:
          "Database login failed. Set DATABASE_URL or DB_* / MYSQL_* in backend/.env to match your MySQL user and password. For repo docker compose defaults: mysql://ondm:ondm_secure_pass_2024@localhost:3306/ondm (or root with MYSQL_ROOT_PASSWORD from docker-compose.yml).",
      },
    };
  }
  if (isPrismaMissingTable(err)) {
    return {
      status: 503,
      body: {
        error:
          "Database schema is missing tables. From the backend folder run: npx prisma db push (or apply migrations), then retry.",
      },
    };
  }
  if (isDatabaseUnreachable(err)) {
    return {
      status: 503,
      body: {
        error:
          "Cannot connect to the database. Start MySQL and set DATABASE_URL in backend/.env (e.g. mysql://ondm:ondm_secure_pass_2024@localhost:3306/ondm when using docker compose defaults).",
      },
    };
  }
  return { status: 500, body: { error: "Internal server error" } };
}

/** Empty / omitted / null → null; otherwise trimmed string (admin may paste domains without strict URL parsing). */
const optionalWebsite = z.preprocess((val) => {
  if (val === undefined || val === null) return null;
  const s = String(val).trim();
  return s === "" ? null : s;
}, z.union([z.string().max(2048), z.null()]).optional());

const createSchema = z.object({
  logoUrl: z.string().min(1).max(2048),
  websiteUrl: optionalWebsite,
  label: z
    .preprocess((v) => (v === "" || v === null || v === undefined ? undefined : v), z.string().max(255).optional()),
  sortOrder: z.coerce.number().int().optional(),
});

const updateSchema = createSchema.partial();

router.get("/", authMiddleware, async (_req, res) => {
  try {
    const items = await prisma.successPartner.findMany({
      orderBy: { sortOrder: "asc" },
    });
    res.json(items);
  } catch (err) {
    console.error(err);
    const { status, body } = prismaErrorResponse(err);
    res.status(status).json(body);
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const d = parsed.data;
    const row = await prisma.successPartner.create({
      data: {
        logoUrl: d.logoUrl,
        websiteUrl: d.websiteUrl ? d.websiteUrl : null,
        label: d.label,
        sortOrder: d.sortOrder ?? 0,
      },
    });
    res.status(201).json(row);
  } catch (err) {
    console.error(err);
    const { status, body } = prismaErrorResponse(err);
    res.status(status).json(body);
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const row = await prisma.successPartner.findUnique({
      where: { id: req.params.id },
    });
    if (!row) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error(err);
    const { status, body } = prismaErrorResponse(err);
    res.status(status).json(body);
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const { websiteUrl, ...rest } = parsed.data;
    const data = {
      ...rest,
      ...(websiteUrl !== undefined ? { websiteUrl: websiteUrl ?? null } : {}),
    };
    if (Object.keys(data).length === 0) {
      res.status(400).json({ error: "No fields to update" });
      return;
    }
    const row = await prisma.successPartner.update({
      where: { id: req.params.id },
      data,
    });
    res.json(row);
  } catch (err) {
    console.error(err);
    const { status, body } = prismaErrorResponse(err);
    res.status(status).json(body);
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.successPartner.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    const { status, body } = prismaErrorResponse(err);
    res.status(status).json(body);
  }
});

export default router;
