import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/db.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
const createTeamSchema = z.object({
    nameEn: z.string().min(1),
    nameAr: z.string().min(1),
    roleEn: z.string().min(1),
    roleAr: z.string().min(1),
    bioEn: z.string(),
    bioAr: z.string(),
    photoUrl: z.string().optional(),
    sortOrder: z.number().optional(),
});
const updateTeamSchema = createTeamSchema.partial();
router.get("/", authMiddleware, async (req, res) => {
    try {
        const members = await prisma.teamMember.findMany({
            orderBy: { sortOrder: "asc" },
        });
        res.json(members);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.post("/", authMiddleware, async (req, res) => {
    try {
        const parsed = createTeamSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.flatten() });
            return;
        }
        const member = await prisma.teamMember.create({
            data: {
                ...parsed.data,
                sortOrder: parsed.data.sortOrder ?? 0,
            },
        });
        res.status(201).json(member);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const member = await prisma.teamMember.findUnique({
            where: { id: req.params.id },
        });
        if (!member) {
            res.status(404).json({ error: "Not found" });
            return;
        }
        res.json(member);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const parsed = updateTeamSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.flatten() });
            return;
        }
        const member = await prisma.teamMember.update({
            where: { id: req.params.id },
            data: parsed.data,
        });
        res.json(member);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await prisma.teamMember.delete({
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
