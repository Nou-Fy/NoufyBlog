import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Créer un commentaire avec option image
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, postId, authorId, imageUrl } = body;

    // Vérification minimale
    if (!content || !postId || !authorId) {
      return NextResponse.json(
        { error: "content, postId et authorId sont requis" },
        { status: 400 },
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId,
        imageUrl,
      },
    });

    return NextResponse.json(comment);
  } catch (error: any) {
    console.error("Erreur création comment:", error);
    return NextResponse.json(
      { error: "Impossible de créer le commentaire" },
      { status: 500 },
    );
  }
}

// GET : récupérer les commentaires d’un post
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ error: "postId requis" }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "desc" },
      include: { author: true },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Erreur récupération commentaires:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les commentaires" },
      { status: 500 },
    );
  }
}
