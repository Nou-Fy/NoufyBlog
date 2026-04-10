import "server-only";
import type { GuideFormValues } from "@/lib/validator/guide";
import * as repo from "@/features/guides/repo";

async function assertAdmin(userId: string) {
  const role = await repo.findUserRole(userId);
  if (!role) throw new Error("Non connecté");
  if (role !== "ADMIN") throw new Error("Action réservée aux administrateurs.");
}

export async function createGuideAsAdmin(userId: string, data: GuideFormValues) {
  await assertAdmin(userId);

  const existing = await repo.findGuideBySlug(data.slug);
  if (existing) throw new Error("Ce slug est déjà utilisé");

  return await repo.createGuide(data, userId);
}

export async function updateGuideAsAdmin(
  userId: string,
  id: string,
  data: GuideFormValues,
) {
  await assertAdmin(userId);
  return await repo.updateGuide(id, data);
}

export async function deleteGuideAsAdmin(userId: string, id: string) {
  await assertAdmin(userId);
  await repo.deleteGuide(id);
  return { success: true };
}

