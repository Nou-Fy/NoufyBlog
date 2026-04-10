import { NextResponse } from "next/server";
import { archiveResponseParamsSchema } from "@/features/community/responses.validators";
import { archiveResponse } from "@/features/community/responses.service";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // On définit params comme une Promise
) {
  try {
    const { id } = await params; // On attend l'extraction de l'ID
    const parsed = archiveResponseParamsSchema.safeParse({ id });
    if (!parsed.success) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const updatedResponse = await archiveResponse(parsed.data.id);

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
