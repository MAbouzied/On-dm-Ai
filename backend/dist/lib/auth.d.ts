export interface JwtPayload {
    adminId: string;
    email: string;
}
export declare function signToken(payload: JwtPayload): string;
export declare function verifyToken(token: string): JwtPayload | null;
//# sourceMappingURL=auth.d.ts.map