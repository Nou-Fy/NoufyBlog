import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const uploadDir = path.join(process.cwd(), "public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 2 * 1024 * 1024, // 2 MB
  });

  return new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) return reject(err);

      const fileArray = files.file;
      if (!fileArray || !fileArray.length) {
        return reject(new Error("No file uploaded"));
      }

      const file = fileArray[0];
      const fileName = path.basename(file.filepath);
      const imageUrl = `/uploads/${fileName}`;

      resolve(NextResponse.json({ imageUrl }));
    });
  });
}
