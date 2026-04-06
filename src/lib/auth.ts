import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashPassword, comparePassword } from "@/lib/password";
import { SignJWT, jwtVerify } from "jose";
import "server-only"; // ← Assure que ce fichier est traité comme un module serveur

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-in-production",
);

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.userId as string;
  } catch (error) {
    // Token invalide ou expiré
    return null;
  }
}

export async function getIsAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.role === "ADMIN";
  } catch (error) {
    return false;
  }
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

export async function loginUserService(data: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  const isPasswordValid = await comparePassword(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Mot de passe incorrect");
  }

  return user;
}

export async function createUserService(data: {
  nom: string;
  prenom: string;
  email: string;
  password: string;
}) {
  // vérifier email existant
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Email déjà utilisé");
  }

  // hash password
  const hashedPassword = await hashPassword(data.password);

  // créer user
  return await prisma.user.create({
    data: {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      password: hashedPassword,
    },
  });
}

export async function getUserProfileData(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      posts: { orderBy: { createdAt: "desc" } },
      _count: {
        select: { comments: true, posts: true },
      },
    },
  });
}
