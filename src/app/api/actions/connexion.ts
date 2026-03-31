"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth"; // Import de notre utilitaire
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState: any, formData: FormData) {
  // RÉCUPÉRATION DYNAMIQUE DE L'UTILISATEUR
  const userId = await getSessionUser();

  if (!userId) {
    return { error: "Vous devez être connecté pour publier." };
  }

  try {
    await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        section: formData.get("section") as any,
        imageUrl: formData.get("imageUrl") as string,
        authorId: userId, // On utilise l'ID récupéré du cookie !
      },
    });
  } catch (e) {
    return { error: "Erreur lors de la création." };
  }

  revalidatePath("/articles");
  redirect("/articles");
}
