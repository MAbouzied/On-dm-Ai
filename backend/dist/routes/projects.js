import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/db.js";
import { authMiddleware } from "../middleware/auth.js";
import { toProjectResponse } from "../lib/project.js";
const router = Router();
const imageUrlsSchema = z.union([
    z.string(),
    z.array(z.string()),
]).optional().nullable().transform((val) => {
    if (val == null)
        return null;
    if (Array.isArray(val))
        return val.length > 0 ? JSON.stringify(val) : null;
    return val || null;
});
const createProjectSchema = z.object({
    slug: z.string().min(1),
    type: z.enum(["design", "marketing", "software"]),
    category: z.string().optional().nullable(),
    titleEn: z.string().min(1),
    titleAr: z.string().min(1),
    descriptionEn: z.string(),
    descriptionAr: z.string(),
    imageUrl: z.string().optional().nullable(),
    imageUrls: imageUrlsSchema,
    tags: z.string(), // JSON: [{"label":"Design","color":"purple"}]
    liveUrl: z.string().optional().nullable(),
    contentEn: z.string().optional(),
    contentAr: z.string().optional(),
    published: z.boolean().optional(),
    sortOrder: z.number().optional(),
});
const updateProjectSchema = createProjectSchema.partial();
// Protected CRUD
router.get("/", authMiddleware, async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { sortOrder: "asc" },
        });
        res.json(projects.map(toProjectResponse));
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.post("/", authMiddleware, async (req, res) => {
    try {
        const parsed = createProjectSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.flatten() });
            return;
        }
        const project = await prisma.project.create({
            data: {
                ...parsed.data,
                contentEn: parsed.data.contentEn ?? "",
                contentAr: parsed.data.contentAr ?? "",
                published: parsed.data.published ?? false,
                sortOrder: parsed.data.sortOrder ?? 0,
            },
        });
        res.status(201).json(toProjectResponse(project));
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const project = await prisma.project.findUnique({
            where: { id: req.params.id },
        });
        if (!project) {
            res.status(404).json({ error: "Not found" });
            return;
        }
        res.json(toProjectResponse(project));
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const parsed = updateProjectSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.flatten() });
            return;
        }
        const project = await prisma.project.update({
            where: { id: req.params.id },
            data: parsed.data,
        });
        res.json(toProjectResponse(project));
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await prisma.project.delete({
            where: { id: req.params.id },
        });
        res.status(204).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
