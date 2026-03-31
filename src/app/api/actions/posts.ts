"use server";

import { prisma } from "@/lib/prisma";
import { CreatePostInput } from "@/types/poste";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createPostAction(
  data: Omit<CreatePostInput, "authorId">,
) {
  try {
    // 1. Récupération de l'ID depuis les cookies
    const cookieStore = await cookies();
    const userId = cookieStore.get("session")?.value;

    if (!userId) {
      throw new Error("Vous devez être connecté pour publier un article.");
    }

    // 2. Vérification que l'utilisateur existe bien en base (Sécurité)
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Auteur introuvable dans la base de données.");
    }

    // 3. Création du post via Prisma (Une seule fois !)
    const post = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl || null,
        section: data.section,
        authorId: user.id, // On utilise l'ID vérifié venant du cookie
      },
    });

    // 4. Revalidation du cache pour mettre à jour l'affichage
    revalidatePath("/blog");
    revalidatePath("/articles"); // Si ta liste est sur cette page aussi

    return { success: true, post };
  } catch (error: any) {
    console.error("Erreur Action:", error.message);
    return { success: false, error: error.message };
  }
}
