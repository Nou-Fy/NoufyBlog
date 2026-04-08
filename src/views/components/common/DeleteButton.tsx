"use client";

import React, { useState } from "react";
import { Trash2, Loader2, AlertCircle } from "lucide-react";

interface DeleteButtonProps {
  onConfirm: () => Promise<void>; // L'action de suppression (doit être asynchrone)
  itemName?: string; // Nom de l'item pour le message de confirmation
}

export default function DeleteButton({
  onConfirm,
  itemName = "cet élément",
}: DeleteButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Évite de déclencher le clic sur la carte parente
    setIsPending(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setIsPending(false);
      setIsConfirming(false);
    }
  };

  if (isConfirming) {
    return (
      <div className="flex flex-row items-center gap-1 xs:gap-2 sm:gap-3 animate-in fade-in zoom-in duration-200">
        <button
          disabled={isPending}
          onClick={handleDelete}
          className="text-[0.6875rem] xs:text-xs sm:text-sm font-bold bg-red-600 text-white px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 xs:gap-1.5 whitespace-nowrap transition-all">
          {isPending ? (
            <Loader2 className="w-3 h-3 animate-spin flex-shrink-0" />
          ) : (
            <AlertCircle className="w-3 h-3 flex-shrink-0" />
          )}
          <span>Confirmer</span>
        </button>
        <button
          disabled={isPending}
          onClick={(e) => {
            e.stopPropagation();
            setIsConfirming(false);
          }}
          className="text-[0.6875rem] xs:text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground dark:text-muted-foreground/70 dark:hover:text-muted-foreground/50 hover:underline disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transition-colors">
          Annuler
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setIsConfirming(true);
      }}
      className="inline-flex items-center justify-center text-muted-foreground hover:text-red-600 transition-colors duration-200"
      title={`Supprimer ${itemName}`}>
      <Trash2 className="w-4 h-4 xs:w-4.5 sm:w-5 xs:h-4 sm:h-5" />
    </button>
  );
}
