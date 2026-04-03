"use server";

import { prisma } from "@/lib/prisma"; // Assure-toi que l'import de ton instance Prisma est correct
import { GuideFormValues } from "@/lib/validator/guide";
import { getSessionUser } from "../auth";
import { revalidatePath } from "next/cache";

/**
 * Vérification interne du rôle Admin
 * Puisque ton cookie ne contient que l'ID, on vérifie en DB si l'user est ADMIN
 */
async function checkAdmin() {
  const userId = await getSessionUser();
  if (!userId) throw new Error("Non connecté");

  const user = await prisma.user.findUnique({
    where: { id: userId as string },
  });

  if (user?.role !== "ADMIN") {
    throw new Error("Action réservée aux administrateurs.");
  }

  return userId as string;
}

// --- CREATE ---
export async function createGuide(data: GuideFormValues) {
  const adminId = await checkAdmin();

  const guide = await prisma.guide.create({
    data: {
      ...data,
      authorId: adminId,
    },
  });

  revalidatePath("/guides");
  return guide;
}

// --- UPDATE (La fonction qui manquait) ---
export async function updateGuide(id: string, data: GuideFormValues) {
  await checkAdmin();

  const guide = await prisma.guide.update({
    where: { id },
    data: {
      ...data,
      // On ne change généralement pas l'auteur initial lors d'une modif
    },
  });

  revalidatePath("/guides");
  return guide;
}

// --- DELETE ---
export async function deleteGuide(id: string) {
  await checkAdmin();

  await prisma.guide.delete({
    where: { id },
  });

  revalidatePath("/guides");
  return { success: true };
}
