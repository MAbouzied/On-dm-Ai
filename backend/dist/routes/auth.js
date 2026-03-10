import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/db.js";
import { signToken } from "../lib/auth.js";
const router = Router();
const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().trim().min(1),
});
router.post("/login", async (req, res) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }
        const { email, password } = parsed.data;
        const admin = await prisma.admin.findUnique({
            where: { email },
        });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
        }
        const token = signToken({
            adminId: admin.id,
            email: admin.email,
        });
        res.json({ token });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
