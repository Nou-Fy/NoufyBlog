"use client";
import { useState } from "react";
import { Plus, Bird } from "lucide-react";
import { GuideCard } from "@/views/components/guides/GuideCard";
import GuideForm from "@/views/components/guides/GuideForm";
import { useRouter } from "next/navigation";

export default function GuideClientPage({
  isAdmin,
  initialGuides,
}: {
  isAdmin: boolean;
  initialGuides: any[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* HEADER (Pour ne pas avoir une page vide au début) */}
      <header className="bg-amber-50 py-16 px-4 text-center border-b">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Le Guide de l'Élevage
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16 w-full">
        {initialGuides.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {initialGuides.map((guide) => (
              <GuideCard
                key={guide.id || guide.title}
                guide={guide}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-xl">
            <Bird className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">
              Aucun guide disponible pour le moment.
            </p>
          </div>
        )}
      </main>

      {/* BOUTON ADMIN ET MODALE (Code précédent...) */}
      {isAdmin && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 bg-emerald-600 text-white p-4 rounded-full shadow-lg z-50">
          <Plus />
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <GuideForm
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                setIsModalOpen(false);
                router.refresh();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
