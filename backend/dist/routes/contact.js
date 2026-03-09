import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/db.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();
const contactSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    message: z.string().min(1),
});
router.post("/", async (req, res) => {
    try {
        const parsed = contactSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: "Invalid form data" });
            return;
        }
        const submission = await prisma.contactSubmission.create({
            data: parsed.data,
        });
        // TODO: Send email via Resend/SendGrid when configured
        // const emailSent = await sendContactEmail(parsed.data);
        res.status(201).json({ success: true, id: submission.id });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/", authMiddleware, async (req, res) => {
    try {
        const submissions = await prisma.contactSubmission.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(submissions);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
