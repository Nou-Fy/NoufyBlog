"use client";

export async function uploadProcessedImage(
  blob: Blob,
  endpoint: string,
  fieldName = "file",
  filename = "image.webp",
) {
  const formData = new FormData();
  formData.append(fieldName, blob, filename);

  const res = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) throw new Error(data?.error || "Échec de l'upload");

  const url = data?.imageUrl || data?.avatarUrl || data?.url;
  if (!url) throw new Error("L’upload n’a pas retourné d’URL");

  return url;
}
