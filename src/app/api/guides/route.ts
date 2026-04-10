// @/app/api/guides/route.ts
import { NextRequest, NextResponse } from "next/server";
import { guideSchema } from "@/lib/validator/guide";
import { getSessionUser } from "@/lib/auth";
import { createGuideAsAdmin } from "@/features/guides/service";

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUser();
    if (!userId) {
      return NextResponse.json({ message: "Non connecté" }, { status: 401 });
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
    const guide = await createGuideAsAdmin(userId, {
      title,
      description,
      content,
      badge,
      color,
      iconName,
      slug,
    });

    return NextResponse.json(guide, { status: 201 });
  } catch (error: any) {
    console.error("[GUIDE_POST_ERROR]", error);
    const message = error?.message || "Erreur serveur";
    const status =
      message === "Non connecté" ? 401 : message.includes("administrateurs") ? 403 : 500;
    return NextResponse.json({ message }, { status });
  }
}
