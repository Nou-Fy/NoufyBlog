import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // On définit params comme une Promise
) {
  try {
    const { id } = await params; // On attend l'extraction de l'ID

    const updatedResponse = await prisma.response.update({
      where: { id: id },
      data: { archived: true },
    });

    return NextResponse.json(updatedResponse);
  } catch (error: any) {
    // TRÈS IMPORTANT : Regardez ce log dans votre terminal (celui de VS Code)
    console.error("ERREUR DÉTAILLÉE PRISMA :", error);

    return NextResponse.json(
      { error: "Impossible d'archiver la réponse en base de données" },
      { status: 500 },
    );
  }
}
