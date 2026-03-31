"use server";

import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/utils/hash";
import { cookies } from "next/headers";

export async function loginUser(formData: FormData, event?: any) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Tous les champs sont obligatoires" };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { success: false, error: "Email ou mot de passe incorrect" };
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return { success: false, error: "Email ou mot de passe incorrect" };
    }

    const cookieStore = await cookies();

    cookieStore.set("session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    // ✅ Retourne success pour le client
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Une erreur est survenue lors de la connexion",
    };
  }
}
