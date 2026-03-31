// @/app/api/guides/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma"; // Vérifie que ton export est "prisma" en minuscule
import { guideSchema } from "@/lib/validator/guide";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("session")?.value;

    if (!userId) {
      return NextResponse.json({ message: "Non connecté" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Accès refusé" }, { status: 403 });
    }

    const body = await req.json();
    const validation = guideSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Données invalides", errors: validation.error.format() },
        { status: 400 },
      );
    }

    const { title, description, content, badge, color, iconName, slug } =
      validation.data;

    const existingGuide = await prisma.guide.findUnique({ where: { slug } });
    if (existingGuide) {
      return NextResponse.json(
        { message: "Ce slug est déjà utilisé" },
        { status: 400 },
      );
    }

    // CRÉATION ALIGNÉE SUR TON MODEL PRISMA
    const guide = await prisma.guide.create({
      data: {
        title,
        description,
        content,
        badge,
        color,
        iconName,
        slug,
        authorId: userId,
      },
    });

    return NextResponse.json(guide, { status: 201 });
  } catch (error: any) {
    console.error("[GUIDE_POST_ERROR]", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
