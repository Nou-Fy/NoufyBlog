"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, MessageCircle, User } from "lucide-react";
import { DiscussionHeader } from "./DiscussionHeader";
import { CommentForm } from "./CommentForm";
import DeleteButton from "../common/DeleteButton";
import { ImageFrame } from "../common/ImageFrame";
import { useDiscussionResponses } from "@/hooks/community/use-discussion-responses";

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
  const { responses, loading, refresh, archiveResponse } = useDiscussionResponses(
    discussion.id,
  );

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      refresh();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, refresh]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end overflow-x-hidden">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-md h-full bg-card border border-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Discussion</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-card/70 rounded-full text-muted-foreground transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background">
          <DiscussionHeader discussion={discussion} />

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground px-1">
              Réponses ({responses.length})
            </h3>

            {loading ? (
              <div className="text-center py-10 text-sm flex flex-col items-center gap-2 text-muted-foreground">
                <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                Chargement...
              </div>
            ) : responses.length > 0 ? (
              responses.map((resp: any) => (
                <div
                  key={resp.id}
                  className="bg-card/80 p-4 rounded-xl border border-border shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-emerald-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-card-foreground">
                          {resp.author?.nom || "Éleveur"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(resp.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Bouton supprimer unique pour les commentaires de l'utilisateur */}
                    {userId === resp.authorId && (
                      <DeleteButton
                        onConfirm={() => archiveResponse(resp.id)}
                        itemName="votre réponse"
                      />
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground ml-8 whitespace-pre-wrap">
                    {resp.content}
                  </p>

                  {resp.imageUrl && (
                    <div className="mt-3 ml-8 max-w-full">
                      <ImageFrame
                        src={resp.imageUrl}
                        alt="Illustration"
                        ratio="aspect-[4/3]"
                        className="rounded-xl border border-border bg-card/80"
                        imgClassName="p-0"
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <MessageCircle className="w-10 h-10 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground italic">
                  Aucune réponse pour le moment.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer avec formulaire */}
        <div className="p-4 bg-card/80 border-t border-border">
          {userId && (
            <CommentForm
              discussionId={discussion.id}
              userId={userId} // Ici, TS sait que userId n'est plus null
              onSuccess={refresh}
            />
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
