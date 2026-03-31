"use server";

import { prisma } from "@/lib/prisma"; // ton instance Prisma existante

export async function updateUserAvatar(
  userId: string,
  avatarUrl: string,
): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { avatar: avatarUrl },
  });
}
