import { Router } from "express";
import { prisma } from "../lib/db.js";
import { toBlogResponse } from "../lib/blog.js";
import { toProjectResponse } from "../lib/project.js";
import { getContactPageConfig } from "./contact-page.js";
import { getAllSiteConfig } from "./site-config.js";

const router = Router();

router.get("/services", async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/services/:slug", async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { slug: req.params.slug },
    });
    if (!service) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/blog", async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    res.json(posts.map(toBlogResponse));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/blog/:slug", async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug, published: true },
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

router.get("/homepage", async (req, res) => {
  try {
    const configs = await prisma.homepageConfig.findMany();
    const map: Record<string, string> = {};
    for (const c of configs) {
      map[c.key] = c.value;
    }
    res.json(map);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/team", async (req, res) => {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { sortOrder: "asc" },
    });
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
    res.json(projects.map(toProjectResponse));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/projects/:slug", async (req, res) => {
  try {
    const project = await prisma.project.findFirst({
      where: { slug: req.params.slug, published: true },
    });
    if (!project) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(toProjectResponse(project));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/contact-page", async (req, res) => {
  try {
    const config = await getContactPageConfig();
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/site-config", async (req, res) => {
  try {
    const config = await getAllSiteConfig();
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
