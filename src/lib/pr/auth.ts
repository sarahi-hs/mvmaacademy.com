import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "pr_session";

function secret() {
  const s = process.env.PR_AUTH_SECRET;
  if (!s) throw new Error("Falta PR_AUTH_SECRET en env vars");
  return new TextEncoder().encode(s);
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export type SessionPayload = {
  userId: string;
  email: string;
  role: "owner" | "editor" | "viewer";
};

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function setSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

/** Devuelve la sesión actual o null si no hay/no es válida. */
export async function getSession(): Promise<SessionPayload | null> {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE_NAME)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret());
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as SessionPayload["role"],
    };
  } catch {
    return null;
  }
}
