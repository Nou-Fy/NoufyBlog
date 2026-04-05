"use client";
import { useState } from "react";
import { Plus, Bird } from "lucide-react";
import { GuideCard } from "@/views/components/guides/GuideCard";
import GuideForm from "@/views/components/guides/GuideForm";
import { useRouter } from "next/navigation";
import EmptyState from "@/views/components/common/EmptyState";
import Container from "@/views/components/common/Container";
import Section from "@/views/components/common/Section";

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
    <>
      {/* HEADER SECTION */}
      <Section bg="amber-50" py="xl">
        <Container size="2xl">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-slate-900">
              Le Guide de l'Élevage
            </h1>
          </div>
        </Container>
      </Section>

      {/* MAIN CONTENT */}
      <Section py="xl">
        <Container size="2xl">
          {initialGuides.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {initialGuides.map((guide) => (
                <GuideCard
                  key={guide.id || guide.title}
                  guide={guide}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Bird}
              title="Aucun guide disponible"
              description="Aucun guide disponible pour le moment."
            />
          )}
        </Container>
      </Section>

      {/* BOUTON ADMIN ET MODALE */}
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
    </>
  );
}
