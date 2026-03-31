"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { CreatePostSchema } from "@/lib/validator/post";
import { createPost } from "@/lib/services/post.service";

export async function createPostAction(prevState: any, formData: FormData) {
  // A. Sécurité
  const userId = await getSessionUser();
  if (!userId) return { error: "Vous devez être connecté." };

  // B. Validation
  const rawData = Object.fromEntries(formData.entries());
  const validated = CreatePostSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  // C. Exécution (Appel du service)
  try {
    await createPost(validated.data, userId);
  } catch (e) {
    console.error(e);
    return { error: "Erreur lors de la sauvegarde en base de données." };
  }

  // D. Effets de bord UI
  revalidatePath("/articles");
  redirect("/articles");
}
