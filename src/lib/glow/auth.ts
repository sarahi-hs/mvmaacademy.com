import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

/**
 * Auth del Glow Club. Mismo patrón que src/lib/pr/auth.ts pero con
 * su propia cookie y su propio secret, para aislar sesiones.
 * Reutiliza PR_AUTH_SECRET si GLOW_AUTH_SECRET no existe (dev fallback).
 */

const COOKIE_NAME = "glow_session";

function secret() {
  const s = process.env.GLOW_AUTH_SECRET || process.env.PR_AUTH_SECRET;
  if (!s) throw new Error("Falta GLOW_AUTH_SECRET (o PR_AUTH_SECRET) en env vars");
  return new TextEncoder().encode(s);
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export type GlowSession = {
  memberId: string;
  email: string;
  fullName: string;
};

export async function createSessionToken(payload: GlowSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret());
}

export async function setSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días — más cómodo que el admin
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

/** Devuelve la sesión de la chica logueada o null. */
export async function getGlowSession(): Promise<GlowSession | null> {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE_NAME)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret());
    return {
      memberId: payload.memberId as string,
      email: payload.email as string,
      fullName: payload.fullName as string,
    };
  } catch {
    return null;
  }
}

/** Helper para generar iniciales del nombre. "Ana Rodríguez" → "AR" */
export function initialsFromName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}
