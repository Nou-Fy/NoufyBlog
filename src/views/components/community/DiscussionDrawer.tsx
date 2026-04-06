"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, MessageCircle, User } from "lucide-react";
import { DiscussionHeader } from "./DiscussionHeader";
import { CommentForm } from "./CommentForm";
import DeleteButton from "../common/DeleteButton";

interface DiscussionDrawerProps {
  discussion: any;
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
}

export default function DiscussionDrawer({
  discussion,
  isOpen,
  onClose,
  userId,
}: DiscussionDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour charger les réponses (on filtre côté API normalement, mais on sécurise ici aussi)
  const fetchResponses = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/responses?discussionId=${discussion.id}`);
      const data = await res.json();
      // On s'assure de ne garder que les réponses non archivées
      setResponses(data.filter((r: any) => !r.archived));
    } catch (error) {
      console.error("Erreur chargement:", error);
    } finally {
      setIsLoading(false);
    }
  }, [discussion.id]);

  // Fonction pour archiver une réponse
  const handleDeleteResponse = async (responseId: string) => {
    console.log("Tentative de suppression de la réponse ID:", responseId);

    const res = await fetch(`/api/responses/${responseId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Erreur lors de la suppression");
    }

    // Rafraîchir la liste localement après succès
    await fetchResponses();
  };

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      fetchResponses();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, fetchResponses]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end overflow-x-hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Discussion</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-6">
          <DiscussionHeader discussion={discussion} />

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-700 px-1">
              Réponses ({responses.length})
            </h3>

            {isLoading ? (
              <div className="text-center py-10 text-slate-400 text-sm flex flex-col items-center gap-2">
                <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                Chargement...
              </div>
            ) : responses.length > 0 ? (
              responses.map((resp: any) => (
                <div
                  key={resp.id}
                  className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-emerald-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">
                          {resp.author?.nom || "Éleveur"}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(resp.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Bouton supprimer unique pour les commentaires de l'utilisateur */}
                    {userId === resp.authorId && (
                      <DeleteButton
                        onConfirm={() => handleDeleteResponse(resp.id)}
                        itemName="votre réponse"
                      />
                    )}
                  </div>

                  <p className="text-sm text-slate-600 ml-8 whitespace-pre-wrap">
                    {resp.content}
                  </p>

                  {resp.imageUrl && (
                    <img
                      src={resp.imageUrl}
                      alt="Illustration"
                      className="mt-3 rounded-lg max-h-40 ml-8 object-cover border border-slate-100"
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <MessageCircle className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400 italic">
                  Aucune réponse pour le moment.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer avec formulaire */}
        <div className="p-4 bg-white border-t border-slate-100">
          {userId && (
            <CommentForm
              discussionId={discussion.id}
              userId={userId} // Ici, TS sait que userId n'est plus null
              onSuccess={fetchResponses}
            />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
