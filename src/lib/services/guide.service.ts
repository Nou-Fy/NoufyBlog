"use server";

import { GuideFormValues } from "@/lib/validator/guide";
import { getSessionUser } from "../auth";
import { revalidatePath } from "next/cache";
import {
  createGuideAsAdmin,
  updateGuideAsAdmin,
  deleteGuideAsAdmin,
} from "@/features/guides/service";

/**
 * Vérification interne du rôle Admin
 * Puisque ton cookie ne contient que l'ID, on vérifie en DB si l'user est ADMIN
 */
async function checkAdmin() {
  const userId = await getSessionUser();
  if (!userId) throw new Error("Non connecté");
  return userId as string;
}

// --- CREATE ---
export async function createGuide(data: GuideFormValues) {
  const adminId = await checkAdmin();
  const guide = await createGuideAsAdmin(adminId, data);

  revalidatePath("/guides");
  return guide;
}

// --- UPDATE (La fonction qui manquait) ---
export async function updateGuide(id: string, data: GuideFormValues) {
  const adminId = await checkAdmin();
  const guide = await updateGuideAsAdmin(adminId, id, data);

  revalidatePath("/guides");
  return guide;
}

// --- DELETE ---
export async function deleteGuide(id: string) {
  const adminId = await checkAdmin();
  await deleteGuideAsAdmin(adminId, id);

  revalidatePath("/guides");
  return { success: true };
}
