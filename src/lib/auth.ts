import { prisma } from "@/lib/prisma";
import "server-only"; // ← Assure que ce fichier est traité comme un module serveur
import {
  createSessionToken,
  getSessionIsAdmin,
  getSessionUserId,
} from "@/features/auth/session";
import { login, register } from "@/features/auth/service";

export async function getSessionUser() {
  return await getSessionUserId();
}

export async function getIsAdmin() {
  return await getSessionIsAdmin();
}

export { createSessionToken };

export async function loginUserService(data: {
  email: string;
  password: string;
}) {
  const { user } = await login({ email: data.email, password: data.password });
  return user;
}

export async function createUserService(data: {
  nom: string;
  prenom: string;
  email: string;
  password: string;
}) {
  const { user } = await register({
    nom: data.nom,
    prenom: data.prenom,
    email: data.email,
    password: data.password,
  });
  return user;
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
