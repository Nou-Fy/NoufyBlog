"use client";

import { useRouter } from "next/navigation";
import GuideForm from "@/views/components/guides/GuideForm";

export default function NewGuidePage() {
  const router = useRouter();

  // Responsabilité : Gérer la navigation après succès pour cette URL spécifique
  const handleSuccess = () => {
    router.refresh();
    router.push("/guides"); // Redirige vers la liste des guides
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <GuideForm
          onSuccess={handleSuccess}
          // Pas de prop onClose ici car on n'est pas dans une modale
        />
      </div>
    </div>
  );
}
