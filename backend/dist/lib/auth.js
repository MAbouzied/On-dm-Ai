import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "ondm-secret-change-in-production";
export function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
    catch {
        return null;
    }
}
