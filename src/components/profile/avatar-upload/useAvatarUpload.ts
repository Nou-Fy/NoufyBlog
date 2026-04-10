import { useState } from "react";
import { processImageInput } from "@/lib/image/processor";
import { uploadProcessedImage } from "@/lib/image/upload";

export interface UseAvatarUploadOptions {
  userId?: string;
  currentAvatar?: string | null;
  endpoint?: string;
  fieldName?: string;
  filename?: string;
  onPreview?: (value: string) => void;
}

export function useAvatarUpload(userId?: string, options?: UseAvatarUploadOptions) {
  const {
    currentAvatar,
    endpoint = "/api/user/avatar",
    fieldName = "photo",
    filename = "avatar.webp",
    onPreview,
  } = options || {};

  const [preview, setPreview] = useState<string | null>(currentAvatar ?? null);
  const [loading, setLoading] = useState(false);

  const handlePreview = (value: string) => {
    setPreview(value);
    if (onPreview) onPreview(value);
  };

  const uploadAvatar = async (input: File | string) => {
    setLoading(true);
    try {
      const { blob, preview: previewUrl } = await processImageInput(input);
      handlePreview(previewUrl);

      const url = await uploadProcessedImage(blob, endpoint, fieldName, filename);
      return { success: true, url };
    } catch (err: any) {
      console.error("Erreur lors de l'envoi :", err);
      return { success: false, error: err.message || "Erreur" };
    } finally {
      setLoading(false);
    }
  };

  return { preview, loading, uploadAvatar };
}
