import { NextResponse } from "next/server";
import { archiveArticle } from "@/features/articles/service";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await archiveArticle(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'archivage" },
      { status: 500 },
    );
  }
}
