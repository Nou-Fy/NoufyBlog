"use client";

import { useRef, useState } from "react";
import { Settings } from "lucide-react";

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
  const [preview, setPreview] = useState<string | null>(currentAvatar ?? null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Prévisualisation locale immédiate
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("photo", file); // Vérifie que ton API attend bien la clé "photo"
      formData.append("userId", userId);

      const res = await fetch("/api/user/avatar", {
        method: "POST",
        body: formData,
        // Note : On ne définit pas de Content-Type manuellement pour le FormData,
        // le navigateur s'en occupe avec le boundary.
      });

      // 2. Récupération sécurisée du corps de la réponse
      const responseText = await res.text();
      let data;

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        data = { error: responseText || "Erreur de parsing JSON" };
      }

      if (!res.ok) {
        // C'est ici que tu verras le vrai problème dans ta console
        console.error(`Erreur HTTP ${res.status}:`, data);
        throw new Error(data.error || `Erreur serveur (${res.status})`);
      }

      // 3. Succès
      if (data.avatarUrl) {
        setPreview(data.avatarUrl);
        console.log("Upload réussi !");
      }
    } catch (err: any) {
      console.error("Erreur attrapée dans le catch :", err.message);
      alert(`Erreur lors de l'upload : ${err.message}`);
    } finally {
      setLoading(false);
      // Réinitialise l'input pour permettre de sélectionner le même fichier deux fois
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      {preview ? (
        <img
          src={preview}
          alt="Photo de profil"
          className="w-full h-full rounded-[2.5rem] object-cover border-4 border-white shadow-xl"
        />
      ) : (
        <div className="w-full h-full rounded-[2.5rem] bg-emerald-100 flex items-center justify-center border-4 border-white shadow-xl text-5xl font-black text-emerald-600 uppercase">
          {defaultInitial}
        </div>
      )}

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
