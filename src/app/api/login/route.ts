import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/utils/hash";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    // Le formulaire sign-in envoie un FormData, pas du JSON
    const formData = await request.formData();
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const password = formData.get("password") as string;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email et mot de passe requis" },
        { status: 400 },
      );
    }

    // 1. Chercher l'utilisateur dans la vraie base de données
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Email ou mot de passe incorrect" },
        { status: 401 },
      );
    }

    // 2. Comparer le mot de passe reçu avec le hash stocké
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Email ou mot de passe incorrect" },
        { status: 401 },
      );
    }

    // 3. Créer le cookie de session
    const cookieStore = await cookies();
    cookieStore.set("session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    // 4. Retourner le succès
    return NextResponse.json(
      { success: true, message: "Connexion réussie" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur login:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de la connexion" },
      { status: 500 },
    );
  }
}
