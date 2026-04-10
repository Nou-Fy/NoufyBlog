import "server-only";
import { prisma } from "@/lib/prisma";

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function findUserById(userId: string) {
  return await prisma.user.findUnique({ where: { id: userId } });
}

export async function createUser(data: {
  nom: string;
  prenom: string;
  email: string;
  password: string;
}) {
  return await prisma.user.create({ data });
}

