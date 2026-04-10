import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const userId = await getSessionUser();
    if (!userId) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("photo") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Fichier manquant" },
        { status: 400 },
      );
    }

    // Le dossier reste le même
    const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
    await mkdir(uploadDir, { recursive: true });

    // OPTIMISATION : On utilise l'extension réelle du fichier envoyé ou .webp par défaut
    const ext = file.name.split(".").pop() || "webp";
    const filename = `${userId}-${Date.now()}.${ext}`;
    const filepath = path.join(uploadDir, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    const avatarUrl = `/uploads/avatars/${filename}`;

    // Mise à jour Prisma
    await prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
    });

    return NextResponse.json({ avatarUrl }, { status: 200 });
  } catch (err) {
    console.error("[AVATAR_UPLOAD_ERROR]", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
