import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/db.js";
import { authMiddleware } from "../middleware/auth.js";
import { toBlogResponse } from "../lib/blog.js";

const router = Router();

const createBlogSchema = z.object({
  slug: z.string().min(1),
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  excerptEn: z.string(),
  excerptAr: z.string(),
  contentEn: z.string(),
  contentAr: z.string(),
  imageUrl: z.string().optional(), // deprecated: fallback for migration
  imageUrls: z.array(z.string()).optional(),
  imageColor: z.string(),
  tags: z.string(),
  published: z.boolean().optional(),
});

const updateBlogSchema = createBlogSchema.partial();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(posts.map(toBlogResponse));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const parsed = createBlogSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const data = parsed.data;
    const createData: Record<string, unknown> = {
      slug: data.slug,
      titleEn: data.titleEn,
      titleAr: data.titleAr,
      excerptEn: data.excerptEn,
      excerptAr: data.excerptAr,
      contentEn: data.contentEn,
      contentAr: data.contentAr,
      imageColor: data.imageColor,
      tags: data.tags,
      published: data.published ?? false,
      publishedAt: data.published ? new Date() : null,
    };
    if (data.imageUrls && data.imageUrls.length > 0) {
      createData.imageUrls = JSON.stringify(data.imageUrls);
      createData.imageUrl = null;
    } else if (data.imageUrl) {
      createData.imageUrl = data.imageUrl;
      createData.imageUrls = null;
    }
    const post = await prisma.blogPost.create({
      data: createData as Parameters<typeof prisma.blogPost.create>[0]["data"],
    });
    res.status(201).json(toBlogResponse(post));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id },
    });
    if (!post) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(toBlogResponse(post));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const parsed = updateBlogSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const data = parsed.data;
    const updateData: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data)) {
      if (v !== undefined && k !== "imageUrls" && k !== "imageUrl") {
        updateData[k] = v;
      }
    }
    if (data.published !== undefined) {
      updateData.publishedAt = data.published ? new Date() : null;
    }
    if (data.imageUrls !== undefined) {
      updateData.imageUrls = data.imageUrls.length > 0 ? JSON.stringify(data.imageUrls) : null;
      updateData.imageUrl = null;
    } else if (data.imageUrl !== undefined) {
      updateData.imageUrl = data.imageUrl;
      updateData.imageUrls = null;
    }
    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: updateData as Parameters<typeof prisma.blogPost.update>[0]["data"],
    });
    res.json(toBlogResponse(post));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.blogPost.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
