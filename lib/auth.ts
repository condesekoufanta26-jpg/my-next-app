import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { JwtPayload as AppJwtPayload } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "10", 10);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signAccessToken(payload: AppJwtPayload): string {
  return jwt.sign(
    { sub: payload.sub, email: payload.email, role: payload.role },
    JWT_SECRET,
    { expiresIn: "15m" }
  );
}

export function signRefreshToken(payload: AppJwtPayload): string {
  return jwt.sign(
    { sub: payload.sub, email: payload.email, role: payload.role },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyAccessToken(token: string): AppJwtPayload {
  const decoded = jwt.verify(token, JWT_SECRET) as unknown;
  return decoded as AppJwtPayload;
}

export function verifyRefreshToken(token: string): AppJwtPayload {
  const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as unknown;
  return decoded as AppJwtPayload;
}