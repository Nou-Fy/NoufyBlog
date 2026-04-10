import "server-only";
import { prisma } from "@/lib/prisma";
import type { GuideFormValues } from "@/lib/validator/guide";

export async function findUserRole(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role ?? null;
}

export async function findGuideBySlug(slug: string) {
  return await prisma.guide.findUnique({ where: { slug } });
}

export async function createGuide(data: GuideFormValues, authorId: string) {
  return await prisma.guide.create({
    data: { ...data, authorId },
  });
}

export async function updateGuide(id: string, data: GuideFormValues) {
  return await prisma.guide.update({
    where: { id },
    data: { ...data },
  });
}

export async function deleteGuide(id: string) {
  return await prisma.guide.delete({ where: { id } });
}

