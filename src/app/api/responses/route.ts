import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ajuste selon ton projet

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, imageUrl, discussionId, authorId } = body;

    const newResponse = await prisma.response.create({
      data: {
        content,
        imageUrl: imageUrl || null,
        discussionId,
        authorId,
      },
    });

    return NextResponse.json(newResponse, { status: 201 });
  } catch (error) {
    console.error("Erreur API Responses:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const discussionId = searchParams.get("discussionId");

    if (!discussionId) {
      return NextResponse.json(
        { error: "Missing discussionId" },
        { status: 400 },
      );
    }

    const responses = await prisma.response.findMany({
      where: {
        discussionId: discussionId,
      },
      include: {
        author: {
          select: {
            nom: true,
            // image: true, // Vérifie que ce champ existe dans ton modèle User
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(responses);
  } catch (error: any) {
    // 🔥 C'EST ICI QUE TU VERRAS L'ERREUR DANS TON TERMINAL
    console.error("[API_RESPONSES_GET]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
