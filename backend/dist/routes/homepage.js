import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/db.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
const updateConfigSchema = z.object({
    key: z.string().min(1),
    value: z.string(),
});
const bulkUpdateSchema = z.object({
    configs: z.array(updateConfigSchema),
});
router.get("/", authMiddleware, async (req, res) => {
    try {
        const configs = await prisma.homepageConfig.findMany();
        const map = {};
        for (const c of configs) {
            map[c.key] = c.value;
        }
        res.json(map);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.put("/", authMiddleware, async (req, res) => {
    try {
        const parsed = bulkUpdateSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.flatten() });
            return;
        }
        for (const { key, value } of parsed.data.configs) {
            await prisma.homepageConfig.upsert({
                where: { key },
                update: { value },
                create: { key, value },
            });
        }
        const configs = await prisma.homepageConfig.findMany();
        const map = {};
        for (const c of configs) {
            map[c.key] = c.value;
        }
        res.json(map);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
