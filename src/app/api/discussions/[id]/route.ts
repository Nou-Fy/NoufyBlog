import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // Ajoutez Promise ici si nécessaire
) {
  try {
    const { id } = await params; // Attendez l'id

    const updated = await prisma.discussion.update({
      where: { id: id },
      data: { archived: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("DEBUG PRISMA:", error); // Regardez votre console TERMINAL (pas navigateur)
    return NextResponse.json(
      { error: "Détails dans les logs serveur" },
      { status: 500 },
    );
  }
}
