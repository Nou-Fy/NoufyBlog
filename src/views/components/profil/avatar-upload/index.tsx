"use client";

import { useRef } from "react";
import { Settings } from "lucide-react";
import { useAvatarUpload } from "./useAvatarUpload";
import { AvatarPreview } from "./AvatarPreview";

interface AvatarUploadProps {
  userId: string;
  defaultInitial: string;
  currentAvatar?: string | null;
}

export function AvatarUpload({
  userId,
  defaultInitial,
  currentAvatar,
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { preview, loading, uploadAvatar } = useAvatarUpload(
    userId,
    currentAvatar,
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await uploadAvatar(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset pour permettre de re-sélectionner le même fichier
    }
  };

  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      <AvatarPreview preview={preview} defaultInitial={defaultInitial} />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="absolute bottom-2 right-2 p-2 bg-orange-600 text-white rounded-xl shadow-lg hover:scale-110 transition-all disabled:opacity-50 disabled:scale-100">
        <Settings className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
      </button>
    </div>
  );
}
