// src/lib/actions/discussion.actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { discussionSchema } from "@/lib/validator/discussion";
import { revalidatePath } from "next/cache";

export async function createDiscussion(values: unknown, authorId: string) {
  const validatedFields = discussionSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Données invalides" };

  try {
    await prisma.discussion.create({
      data: {
        content: validatedFields.data.content,
        imageUrl: validatedFields.data.imageUrl || null,
        authorId: authorId,
      },
    });

    revalidatePath("/community"); // Modifiez selon votre route
    return { success: true };
  } catch (error) {
    return { error: "Erreur lors de la publication" };
  }
}

export async function getPaginatedDiscussions(page = 1, sortBy = "newest") {
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  // Définition de l'ordre de tri
  let orderBy: any = { createdAt: "desc" };
  if (sortBy === "popular") {
    orderBy = { comments: { _count: "desc" } };
  }

  try {
    const [discussions, total] = await Promise.all([
      prisma.discussion.findMany({
        take: pageSize,
        skip: skip,
        orderBy: orderBy,
        include: {
          author: { select: { nom: true } },
          _count: { select: { comments: true } },
        },
      }),
      prisma.discussion.count(),
    ]);

    return {
      discussions,
      totalPages: Math.ceil(total / pageSize),
      currentPage: page,
    };
  } catch (error) {
    return { discussions: [], totalPages: 0, currentPage: 1 };
  }
}
