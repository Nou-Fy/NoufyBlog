"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { registerSchema } from "@/features/auth/validators";
import { register } from "@/features/auth/service";

export async function registerUser(
  prevState: { error?: string } | null,
  formData: FormData,
) {
  const parsed = registerSchema.safeParse({
    prenom: (formData.get("firstName") as string | null)?.trim(),
    nom: (formData.get("lastName") as string | null)?.trim(),
    email: (formData.get("email") as string | null)?.trim().toLowerCase(),
    password: formData.get("password") as string | null,
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    const { user, token } = await register(parsed.data);

    const cookieStore = await cookies();

    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    // Retourner l'utilisateur pour que le contexte se mette à jour
    return {
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error(error);
    return { error: (error as Error)?.message || "Une erreur est survenue lors de l'inscription" };
  }
}
