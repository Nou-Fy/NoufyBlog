"use client";

import React, { useState } from "react";
import { MessageSquare, Lock } from "lucide-react";
import { PrismaDiscussion } from "@/types/community";
import DiscussionDrawer from "./DiscussionDrawer";

interface DiscussionItemProps {
  discussion: PrismaDiscussion;
  isAuthenticated: boolean; // Reçu du parent
  userId: string | null; // ID de l'utilisateur connecté, à passer depuis le parent si nécessaire
}

export default function DiscussionItem({
  discussion,
  isAuthenticated,
  userId,
}: DiscussionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isAuthenticated) setIsOpen(true);
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className={`p-5 bg-white rounded-xl border border-slate-100 shadow-sm transition-all ${
          isAuthenticated
            ? "hover:border-emerald-200 hover:shadow-md cursor-pointer group"
            : "opacity-75 cursor-not-allowed"
        }`}>
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
            Discussion
          </span>
          {!isAuthenticated && <Lock className="w-3 h-3 text-slate-400" />}
        </div>

        <h3
          className={`font-bold text-slate-800 mb-3 line-clamp-2 ${isAuthenticated && "group-hover:text-emerald-700"}`}>
          {discussion.content}
        </h3>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
          <p className="text-xs text-slate-500">
            Par{" "}
            <span className="font-semibold text-slate-700">
              {discussion.author.nom || "Éleveur"}
            </span>
          </p>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
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
