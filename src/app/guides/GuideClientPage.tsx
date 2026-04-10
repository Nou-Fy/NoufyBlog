"use client";
import { useState } from "react";
import { Plus, Bird } from "lucide-react";
import { GuideCard } from "@/components/guides/GuideCard";
import GuideForm from "@/components/guides/GuideForm";
import { useRouter } from "next/navigation";
import EmptyState from "@/components/common/EmptyState";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";

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
    <div className="min-h-screen w-full bg-background">
      {/* HEADER SECTION */}
      <Section bg="amber-50" py="lg">
        <Container size="full">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-foreground">
              Le Guide de l'Élevage
            </h1>
          </div>
        </Container>
      </Section>

      {/* MAIN CONTENT */}
      <Section py="lg">
        <Container size="full">
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
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
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
