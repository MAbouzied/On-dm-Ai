import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ondm-secret-change-in-production";
if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  console.warn("[auth] JWT_SECRET not set - using default. Set JWT_SECRET in Hostinger env for production.");
}

export interface JwtPayload {
  adminId: string;
  email: string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
}
