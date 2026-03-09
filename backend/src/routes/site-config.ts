import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

/** Key pattern: page.section.field (e.g. nav.services, hero.titleEn, about.hero.titleEn) */
const CONFIG_KEY_PATTERN = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/;

const bulkUpdateSchema = z.record(
  z.string().regex(CONFIG_KEY_PATTERN, "Key must follow page.section.field pattern"),
  z.union([z.string(), z.array(z.record(z.unknown())), z.null()])
);

async function getAllSiteConfig(): Promise<Record<string, string>> {
  const configs = await prisma.homepageConfig.findMany();
  const map: Record<string, string> = {};
  for (const c of configs) {
    map[c.key] = c.value;
  }
  return map;
}

/** GET /api/site-config - Admin: get all site config */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const config = await getAllSiteConfig();
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** PUT /api/site-config - Admin: bulk update site config */
router.put("/", authMiddleware, async (req, res) => {
  try {
    const parsed = bulkUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    for (const [key, value] of Object.entries(parsed.data)) {
      if (value === undefined) continue;
      const strValue = value === null ? "" : (typeof value === "string" ? value : JSON.stringify(value));
      await prisma.homepageConfig.upsert({
        where: { key },
        update: { value: strValue },
        create: { key, value: strValue },
      });
    }
    const config = await getAllSiteConfig();
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
export { getAllSiteConfig };
