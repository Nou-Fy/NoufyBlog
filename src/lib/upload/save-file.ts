import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function saveAvatarFile(
  file: File,
  userId: string,
): Promise<string> {
  const ext = file.type.split("/")[1];
  const filename = `${userId}-${Date.now()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public/uploads/avatars");

  // Crée le dossier s'il n'existe pas
  await mkdir(uploadDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  await writeFile(path.join(uploadDir, filename), Buffer.from(bytes));

  return `/uploads/avatars/${filename}`;
}
