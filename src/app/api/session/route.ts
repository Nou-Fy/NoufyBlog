import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionUser } from "@/lib/auth"; // Ta fonction qui vérifie le JWT
import { prisma } from "@/lib/prisma";

export async function GET() {
  const userId = await getSessionUser();

  if (!userId) {
    return NextResponse.json({ isLoggedIn: false, user: null });
  }

  // On cherche l'utilisateur dans la base pour avoir son nom/prénom
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      nom: true,
      prenom: true,
      email: true,
      role: true,
    },
  });

  return NextResponse.json({
    isLoggedIn: true,
    user: user, // <--- C'EST ÇA QUI MANQUAIT !
  });
}
