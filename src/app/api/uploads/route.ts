import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";
import { randomUUID } from "crypto";

// Important : Désactiver le body parser pour l'App Router
export const bodyParser = false;

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB limit
const AVATAR_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "avatars");

function ensureUploadDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getExtensionFromMime(mime: string) {
  const match = mime.split("/")[1];
  if (!match) return "webp";
  return match.includes("+") ? match.split("+")[0] : match;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  ensureUploadDir(AVATAR_UPLOAD_DIR);

  const formData = await req.formData();
  const entry = formData.get("file");

  if (!(entry instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }

  if (!entry.type.startsWith("image/")) {
    return NextResponse.json({ error: "Seules les images sont acceptées" }, { status: 422 });
  }

  if (entry.size > MAX_IMAGE_BYTES) {
    return NextResponse.json(
      { error: "Le fichier dépasse la limite de 5MB" },
      { status: 422 },
    );
  }

  const buffer = Buffer.from(await entry.arrayBuffer());
  const extension = getExtensionFromMime(entry.type);
  const fileName = `${randomUUID()}.${extension}`;
  const filePath = path.join(AVATAR_UPLOAD_DIR, fileName);

  try {
    await writeFile(filePath, buffer);
  } catch (error) {
    console.error("[UPLOAD_WRITE_ERROR]", error);
    return NextResponse.json({ error: "Échec lors de l'upload" }, { status: 500 });
  }

  const imageUrl = `/uploads/avatars/${fileName}`;
  return NextResponse.json({ imageUrl });
}
