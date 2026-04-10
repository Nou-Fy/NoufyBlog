"use server";

import { cookies } from "next/headers";
import { loginSchema } from "@/features/auth/validators";
import { login } from "@/features/auth/service";

export async function loginUser(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: (formData.get("email") as string | null)?.trim().toLowerCase(),
    password: formData.get("password") as string | null,
  });
  if (!parsed.success) return { success: false, error: parsed.error.issues[0].message };

  try {
    const { user, token } = await login(parsed.data);

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 semaine
      path: "/",
      sameSite: "lax",
    });

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
    return { success: false, error: "Email ou mot de passe incorrect" };
  }
}
