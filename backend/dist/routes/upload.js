import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { authMiddleware } from "../middleware/auth.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOADS_DIR = path.join(__dirname, "../../uploads");
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname) || ".jpg";
        const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
        cb(null, safeName);
    },
});
const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (_req, file, cb) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            cb(new Error("Invalid file type. Allowed: JPEG, PNG, WebP"));
            return;
        }
        cb(null, true);
    },
});
function handleMulterError(err, res) {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            res.status(400).json({ error: "File too large. Max 5MB per file." });
            return true;
        }
        if (err.code === "LIMIT_FILE_COUNT") {
            res.status(400).json({ error: "Too many files. Max 10 per request." });
            return true;
        }
    }
    if (err instanceof Error && err.message.includes("Invalid file type")) {
        res.status(400).json({ error: err.message });
        return true;
    }
    return false;
}
/**
 * POST /api/upload
 * Accept multipart/form-data with one or more image files (field name: "images" or "image")
 * Returns array of public URLs for uploaded images
 */
router.post("/", authMiddleware, (req, res, next) => {
    upload.fields([
        { name: "images", maxCount: 10 },
        { name: "image", maxCount: 10 },
    ])(req, res, (err) => {
        if (err) {
            if (handleMulterError(err, res))
                return;
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        next();
    });
}, (req, res) => {
    try {
        const fileFields = req.files;
        const files = [
            ...(fileFields?.images || []),
            ...(fileFields?.image || []),
        ];
        if (files.length === 0) {
            res.status(400).json({ error: "No image files provided" });
            return;
        }
        const baseUrl = process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 4000}`;
        const urls = files.map((f) => `${baseUrl}/uploads/${f.filename}`);
        res.status(201).json({ urls });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
