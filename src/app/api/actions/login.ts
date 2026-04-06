"use server";

import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/password";
import { createSessionToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function loginUser(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Tous les champs sont obligatoires" };
  }

  try {
    // 1. Chercher l'utilisateur
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { success: false, error: "Email ou mot de passe incorrect" };
    }

    // 2. Vérifier le mot de passe
    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return { success: false, error: "Email ou mot de passe incorrect" };
    }

    // 3. Créer le Token JWT
    const sessionToken = await createSessionToken({
      id: user.id,
      role: user.role,
    });

    // 4. Enregistrer le Cookie
    const cookieStore = await cookies();
    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 semaine
      path: "/",
      sameSite: "lax",
    });

    // 5. Retourner les infos pour le Context Client (SANS le mot de passe)
    return {
      success: true,
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
    console.error(error);
    return { success: false, error: "Erreur technique lors de la connexion" };
  }
}
