import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

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

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Mot de passe incorrect");
  }

  return user;
}


