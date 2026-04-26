import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

const createSchema = z.object({
  logoUrl: z.string().min(1),
  websiteUrl: z.union([z.string().url(), z.literal("")]).optional(),
  label: z.string().max(255).optional(),
  sortOrder: z.number().int().optional(),
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
    res.status(500).json({ error: "Internal server error" });
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
    res.status(500).json({ error: "Internal server error" });
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
    res.status(500).json({ error: "Internal server error" });
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
      ...(websiteUrl !== undefined ? { websiteUrl: websiteUrl || null } : {}),
    };
    const row = await prisma.successPartner.update({
      where: { id: req.params.id },
      data,
    });
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
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
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
