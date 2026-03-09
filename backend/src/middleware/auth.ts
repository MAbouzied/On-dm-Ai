import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/auth.js";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }

  (req as Request & { adminId?: string }).adminId = payload.adminId;
  next();
}
