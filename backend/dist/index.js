import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 4000;
// Ensure uploads directory exists (backend/uploads)
const uploadsDir = path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
    .split(",")
    .map((o) => o.trim());
app.use(cors({
    origin: (origin, cb) => {
        if (!origin || allowedOrigins.includes(origin))
            cb(null, true);
        else
            cb(null, false);
    },
}));
app.use(express.json());
// Serve uploaded files at /uploads/
app.use("/uploads", express.static(uploadsDir));
app.get("/health", (_, res) => {
    res.json({ status: "ok", service: "ondm-backend" });
});
import authRoutes from "./routes/auth.js";
import servicesRoutes from "./routes/services.js";
import projectsRoutes from "./routes/projects.js";
import blogRoutes from "./routes/blog.js";
import homepageRoutes from "./routes/homepage.js";
import siteConfigRoutes from "./routes/site-config.js";
import contactPageRoutes from "./routes/contact-page.js";
import teamRoutes from "./routes/team.js";
import contactRoutes from "./routes/contact.js";
import publicRoutes from "./routes/public.js";
import uploadRoutes from "./routes/upload.js";
app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/homepage", homepageRoutes);
app.use("/api/site-config", siteConfigRoutes);
app.use("/api/contact-page", contactPageRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/public", publicRoutes);
app.listen(PORT, () => {
    console.log(`ON-DM Backend running on http://localhost:${PORT}`);
    console.log("Database:", process.env.DATABASE_URL || "file:./dev.db (default)");
    console.log("CORS allowed origins:", process.env.FRONTEND_URL || "http://localhost:3000");
});
