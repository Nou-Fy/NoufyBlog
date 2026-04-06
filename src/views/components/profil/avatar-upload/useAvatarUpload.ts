import { useState } from "react";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 Mo
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function useAvatarUpload(userId: string, currentAvatar?: string | null) {
  const [preview, setPreview] = useState<string | null>(currentAvatar ?? null);
  const [loading, setLoading] = useState(false);

  const uploadAvatar = async (file: File) => {
    // 1. Validations (Client-side)
    if (file.size > MAX_FILE_SIZE) {
      alert("Le fichier est trop lourd (maximum 2 Mo).");
      return { success: false, error: "File too large" };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Format non supporté (JPG, PNG ou WebP uniquement).");
      return { success: false, error: "Invalid format" };
    }

    // 2. Prévisualisation locale immédiate (Optimistic UI)
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    setLoading(true);

    // 3. Envoi au serveur
    try {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("userId", userId);

      const res = await fetch("/api/user/avatar", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      let data;

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Réponse du serveur invalide.");
      }

      if (!res.ok)
        throw new Error(data.error || `Erreur serveur (${res.status})`);

      // 4. Mise à jour avec l'URL finale du serveur (ex: S3/Cloudinary)
      if (data.avatarUrl) {
        setPreview(data.avatarUrl);
      }

      return { success: true, url: data.avatarUrl };
    } catch (err: any) {
      // En cas d'erreur, on peut décider de remettre l'ancienne image
      // ou laisser la preview locale en affichant l'erreur
      alert(`Erreur lors de l'envoi : ${err.message}`);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { preview, loading, uploadAvatar };
}
