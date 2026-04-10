"use client";

import { MAX_IMAGE_BYTES, getFileSizeLabel } from "@/lib/image/format";

const MAX_WIDTH = 800;
const QUALITY = 0.8;

export interface ProcessedImage {
  blob: Blob;
  preview: string;
}

// --- Logique de traitement d'image ---
export function readAsDataURL(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Évite les erreurs CORS lors du dessin sur canvas
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

async function toBlobFromCanvas(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Impossible de générer le blob"));
      },
      "image/webp",
      QUALITY,
    );
  });
}

export async function processImageInput(
  input: File | string,
): Promise<ProcessedImage> {
  const sourceBlob =
    typeof input === "string"
      ? await fetch(input).then((res) => res.blob())
      : input;

  const dataUrl = await readAsDataURL(sourceBlob);
  const img = await loadImage(dataUrl);

  const canvas = document.createElement("canvas");
  let width = img.width;
  let height = img.height;

  if (width > MAX_WIDTH) {
    const ratio = MAX_WIDTH / width;
    width = MAX_WIDTH;
    height = height * ratio;
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(img, 0, 0, width, height);

  const preview = canvas.toDataURL("image/webp", QUALITY);
  const blob = await toBlobFromCanvas(canvas);

  if (blob.size > MAX_IMAGE_BYTES) {
    throw new Error(
      `L'image compressée (${getFileSizeLabel(blob.size)}) dépasse la limite.`,
    );
  }

  return { blob, preview };
}

