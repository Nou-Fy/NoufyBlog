"use client";

import { useState } from "react";
import { LogInIcon, UserPlus } from "lucide-react";
import AuthModal from "./AuthModal"; // Vérifie ton chemin d'import

export default function AuthButtons() {
  const [modalOpen, setModalOpen] = useState<{
    isOpen: boolean;
    type: "sign-in" | "sign-up";
  }>({
    isOpen: false,
    type: "sign-in",
  });

  return (
    <>
      <div className="flex gap-4">
        <button
          onClick={() => setModalOpen({ isOpen: true, type: "sign-in" })}
          className="flex items-center gap-2 px-6 py-2.5 bg-card border border-border text-foreground font-bold rounded-xl hover:bg-background transition-all shadow-sm">
          <LogInIcon size={18} className="text-emerald-600" />
          Se connecter
        </button>

        <button
          onClick={() => setModalOpen({ isOpen: true, type: "sign-up" })}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100">
          <UserPlus size={18} />
          S'inscrire
        </button>
      </div>

      {/* Rendu de la modale */}
      {modalOpen.isOpen && (
        <AuthModal
          type={modalOpen.type}
          onClose={() => setModalOpen({ ...modalOpen, isOpen: false })}
        />
      )}
    </>
  );
}
