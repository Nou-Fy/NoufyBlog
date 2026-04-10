import { useState } from "react";
import { isValidUrl } from "@/lib/image/format";
import { processImageInput } from "@/lib/image/processor";
import { uploadProcessedImage } from "@/lib/image/upload";

interface UseImageUploadOptions {
  endpoint: string;
  fieldName?: string;
  filename?: string;
  onUpload: (url: string) => void;
}

export function useImageUpload({
  endpoint,
  fieldName,
  filename,
  onUpload,
}: UseImageUploadOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlValue, setUrlValue] = useState("");

  const startUpload = async (input: File | string) => {
    if (!input) return;
    setLoading(true);
    setError(null);

    try {
      if (typeof input === "string" && !isValidUrl(input)) {
        throw new Error("Veuillez entrer une URL valide.");
      }

      const processed = await processImageInput(input);
      const finalUrl = await uploadProcessedImage(
        processed.blob,
        endpoint,
        fieldName,
        filename,
      );

      setUrlValue("");
      onUpload(finalUrl);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'import");
    } finally {
      setLoading(false);
    }
  };

  return {
    urlValue,
    setUrlValue,
    error,
    loading,
    uploadFile: (file: File) => startUpload(file),
    uploadUrl: () => startUpload(urlValue),
  };
}
