"use client";

import React, { useState } from "react";
import { MessageSquare, Lock } from "lucide-react";
import { PrismaDiscussion } from "@/types/community";
import DiscussionDrawer from "./DiscussionDrawer";
import { useRouter } from "next/navigation";
import DeleteButton from "../common/DeleteButton";

interface DiscussionItemProps {
  discussion: PrismaDiscussion;
  isAuthenticated: boolean;
  userId: string | null;
}

export default function DiscussionItem({
  discussion,
  isAuthenticated,
  userId,
}: DiscussionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Seul l'auteur peut voir le bouton de suppression
  const isAuthor = userId === discussion.author.id;

  const handleOpen = () => {
    if (isAuthenticated) setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/discussions/${discussion.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de l'archivage");
      }

      // Force Next.js à re-fetch les données du serveur (où archived est désormais true)
      router.refresh();
    } catch (error: any) {
      console.error("Échec de l'action :", error.message);
      alert(error.message);
    }
  };

  // Sécurité supplémentaire : si la donnée arrive déjà archivée, on ne l'affiche pas
  if (discussion.archived) return null;

  return (
    <>
      <div
        onClick={handleOpen}
        className={`p-5 w-full min-w-0 bg-card border border-border rounded-xl shadow-sm transition-all ${
          isAuthenticated
            ? "hover:border-emerald-400/70 hover:shadow-md cursor-pointer group"
            : "opacity-70 cursor-not-allowed"
        }`}>
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-card/80 px-2 py-1 rounded">
            Discussion
          </span>

          <div className="flex items-center gap-2">
            {/* Bouton de suppression unique et réutilisable */}
            {isAuthenticated && isAuthor && (
              <DeleteButton
                onConfirm={handleDelete}
                itemName="votre discussion"
              />
            )}
            {!isAuthenticated && <Lock className="w-3 h-3 text-muted-foreground" />}
          </div>
        </div>

          <h3
            className={`font-bold text-foreground mb-3 line-clamp-2 ${
              isAuthenticated ? "group-hover:text-emerald-500" : ""
            }`}>
            {discussion.content}
          </h3>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/60">
          <p className="text-xs text-muted-foreground">
            Par{" "}
            <span className="font-semibold text-card-foreground">
              {discussion.author.nom || "Éleveur"}
            </span>
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
            <MessageSquare className="w-4 h-4" />
            <span>{discussion._count.comments} réponses</span>
          </div>
        </div>
      </div>

      {isAuthenticated && (
        <DiscussionDrawer
          discussion={discussion}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          userId={userId!}
        />
      )}
    </>
  );
}
