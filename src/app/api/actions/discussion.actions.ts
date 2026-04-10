// src/lib/actions/discussion.actions.ts
"use server";

import { discussionSchema } from "@/lib/validator/discussion";
import { revalidatePath } from "next/cache";
import {
  createDiscussion as createDiscussionService,
  getPaginatedDiscussions as getPaginatedDiscussionsService,
} from "@/features/community/discussions.service";

export async function createDiscussion(values: unknown, authorId: string) {
  const validatedFields = discussionSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Données invalides" };

  try {
    await createDiscussionService({
      content: validatedFields.data.content,
      imageUrl: validatedFields.data.imageUrl || null,
      authorId,
    });

    revalidatePath("/community"); // Modifiez selon votre route
    return { success: true };
  } catch (error) {
    return { error: "Erreur lors de la publication" };
  }
}

export async function getPaginatedDiscussions(page = 1, sortBy = "newest") {
  try {
    return await getPaginatedDiscussionsService({ page, sortBy });
  } catch (error) {
    console.error("Erreur Prisma:", error);
    return { discussions: [], totalPages: 1, currentPage: 1 };
  }
}
