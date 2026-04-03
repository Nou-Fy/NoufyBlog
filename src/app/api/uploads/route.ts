import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import path from "path";
import fs from "fs";

// Important : Désactiver le body parser pour l'App Router
export const bodyParser = false;

export async function POST(req: NextRequest): Promise<NextResponse> {
  const uploadDir = path.join(process.cwd(), "public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 2 * 1024 * 1024, // 2 MB
  });

  // On précise ici que la Promise retournera un NextResponse
  return new Promise<NextResponse>((resolve) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) {
        return resolve(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
      }

      const fileArray = files.file;
      if (!fileArray || fileArray.length === 0) {
        return resolve(NextResponse.json({ error: "No file uploaded" }, { status: 400 }));
      }

      const file = fileArray[0];
      const fileName = path.basename(file.filepath);
      const imageUrl = `/uploads/${fileName}`;

      resolve(NextResponse.json({ imageUrl }));
    });
  });
}