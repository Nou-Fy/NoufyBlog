import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashPassword, comparePassword } from "@/lib/password";
import "server-only"; // ← Assure que ce fichier est traité comme un module serveur

export async function getSessionUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session")?.value;

  // Si le cookie n'existe pas, userId sera undefined, on renvoie null
  if (!userId) return null;

  // Puisqu'on n'utilise pas JWT, la valeur du cookie EST l'ID de l'utilisateur
  return userId;
}

export async function getIsAdmin() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session")?.value;

  // Si pas de cookie, on s'arrête là
  if (!userId) return false;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role === "ADMIN";
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
