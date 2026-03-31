"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
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
    const cookieStore = await cookies();

    cookieStore.set("session", user.id, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    redirect("/articles");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.error(error);
    return { error: "Une erreur est survenue lors de l'inscription" };
  }
}
