import "server-only";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function ensureDir(dir: string) {
  await mkdir(dir, { recursive: true });
}

export async function writePublicUploadFile(options: {
  dirSegments: string[];
  filename: string;
  bytes: ArrayBuffer;
}): Promise<{ publicPath: string; absolutePath: string }> {
  const uploadDir = path.join(process.cwd(), "public", ...options.dirSegments);
  await ensureDir(uploadDir);

  const absolutePath = path.join(uploadDir, options.filename);
  await writeFile(absolutePath, Buffer.from(options.bytes));

  const publicPath = `/${options.dirSegments.join("/")}/${options.filename}`;
  return { publicPath, absolutePath };
}

