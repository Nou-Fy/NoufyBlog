import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("photo") as File | null;
    const userId = formData.get("userId") as string | null;

    // Validation
    if (!file || !userId) {
      return NextResponse.json(
        { error: "Données manquantes : photo ou userId absent" },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Format invalide, uniquement image acceptée" },
        { status: 422 },
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Fichier trop lourd, maximum 5MB" },
        { status: 422 },
      );
    }

    // Création du dossier si inexistant
    const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
    await mkdir(uploadDir, { recursive: true });

    // Nom unique du fichier
    const ext = file.type.split("/")[1];
    const filename = `${userId}-${Date.now()}.${ext}`;
    const filepath = path.join(uploadDir, filename);

    // Écriture sur le disque
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
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 },
    );
  }
}
