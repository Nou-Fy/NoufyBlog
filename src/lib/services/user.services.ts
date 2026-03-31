import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/utils/hash";

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
