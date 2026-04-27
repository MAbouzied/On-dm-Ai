import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

const CONTACT_KEYS = new Set([
  "contact.titleEn",
  "contact.titleAr",
  "contact.descriptionEn",
  "contact.descriptionAr",
  "contact.whatsappUrl",
  "contact.phoneNumber",
  "contact.meetingUrl",
  "contact.whatsappTextEn",
  "contact.whatsappTextAr",
  "contact.callTextEn",
  "contact.callTextAr",
  "contact.meetingTextEn",
  "contact.meetingTextAr",
  "contact.formHeadingEn",
  "contact.formHeadingAr",
  "contact.email",
  "contact.address1En",
  "contact.address1Ar",
  "contact.address2En",
  "contact.address2Ar",
  "contact.socialLinks",
]);

const updateContactPageSchema = z.record(
  z.string(),
  z.union([z.string(), z.array(z.record(z.unknown())), z.null()])
);

async function getContactPageConfig(): Promise<Record<string, string>> {
  const configs = await prisma.homepageConfig.findMany({
    where: { key: { startsWith: "contact." } },
  });
  const map: Record<string, string> = {};
  for (const c of configs) {
    map[c.key] = c.value;
  }
  return map;
}

/** GET /api/contact-page - Admin: get contact page config */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const config = await getContactPageConfig();
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** PUT /api/contact-page - Admin: update contact page config */
router.put("/", authMiddleware, async (req, res) => {
  try {
    const parsed = updateContactPageSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    for (const [key, value] of Object.entries(parsed.data)) {
      if (!CONTACT_KEYS.has(key)) continue;
      if (value === undefined) continue;
      const strValue = value === null ? "" : (typeof value === "string" ? value : JSON.stringify(value));
      await prisma.homepageConfig.upsert({
        where: { key },
        update: { value: strValue },
        create: { key, value: strValue },
      });
    }
    console.log("Contact page config updated:", Object.keys(parsed.data));
    const config = await getContactPageConfig();
    res.json(config);
  } catch (err) {
    console.error("Contact page save error:", err);
    if (err instanceof Error && err.stack) console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
export { getContactPageConfig };
