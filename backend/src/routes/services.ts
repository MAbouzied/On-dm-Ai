import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

const createServiceSchema = z.object({
  slug: z.string().min(1),
  category: z.string().min(1),
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
  contentEn: z.string().optional(),
  contentAr: z.string().optional(),
  tags: z.string(),
  backgroundColor: z.string(),
  isDark: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

const updateServiceSchema = createServiceSchema.partial();

// Protected CRUD
router.get("/", authMiddleware, async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const parsed = createServiceSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const service = await prisma.service.create({
      data: {
        ...parsed.data,
        contentEn: parsed.data.contentEn ?? "",
        contentAr: parsed.data.contentAr ?? "",
        isDark: parsed.data.isDark ?? false,
        sortOrder: parsed.data.sortOrder ?? 0,
      },
    });
    res.status(201).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: req.params.id },
    });
    if (!service) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const parsed = updateServiceSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: parsed.data,
    });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.service.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
