import { cookies } from "next/headers";
import "server-only";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-in-production",
);

export type SessionPayload = {
  userId: string;
  role?: string;
};

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value ?? null;
}

export async function getSessionPayload(): Promise<SessionPayload | null> {
  const token = await getSessionToken();
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      userId: payload.userId as string,
      role: payload.role as string | undefined,
    };
  } catch {
    return null;
  }
}

export async function getSessionUserId(): Promise<string | null> {
  const payload = await getSessionPayload();
  return payload?.userId ?? null;
}

export async function getSessionIsAdmin(): Promise<boolean> {
  const payload = await getSessionPayload();
  return payload?.role === "ADMIN";
}

export async function createSessionToken(user: { id: string; role: string }) {
  return await new SignJWT({
    userId: user.id,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(JWT_SECRET);
}

