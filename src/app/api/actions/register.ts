"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { createSessionToken } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";

export async function registerUser(
  prevState: { error?: string } | null,
  formData: FormData,
) {
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName = (formData.get("lastName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    return { error: "Tous les champs sont obligatoires" };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { error: "Un utilisateur avec cet email existe déjà" };
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        prenom: firstName,
        nom: lastName,
        email,
        password: hashedPassword,
      },
    });

    // 🔥 AUTO LOGIN après inscription
    const sessionToken = await createSessionToken({
      id: user.id,
      role: user.role,
    });

    const cookieStore = await cookies();

    cookieStore.set("session", sessionToken, {
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
    return { error: "Une erreur est survenue lors de l'inscription" };
  }
}
