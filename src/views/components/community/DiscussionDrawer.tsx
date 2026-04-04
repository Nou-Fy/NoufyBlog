"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, MessageCircle, User } from "lucide-react";
import { PrismaDiscussion } from "@/types/community";
import { DiscussionHeader } from "./DiscussionHeader";
import { CommentForm } from "./CommentForm";

export default function DiscussionDrawer({ discussion, isOpen, onClose, userId }: any) {
  const [mounted, setMounted] = useState(false);
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour charger les réponses
  const fetchResponses = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/responses?discussionId=${discussion.id}`);
      const data = await res.json();
      setResponses(data);
    } catch (error) {
      console.error("Erreur chargement:", error);
    } finally {
      setIsLoading(false);
    }
  }, [discussion.id]);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      fetchResponses(); // Charger les données quand on ouvre
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen, fetchResponses]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Discussion</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-6">
          <DiscussionHeader discussion={discussion} />

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-700 px-1">Réponses ({responses.length})</h3>
            
            {isLoading ? (
              <div className="text-center py-10 text-slate-400 text-sm">Chargement...</div>
            ) : responses.length > 0 ? (
              responses.map((resp: any) => (
                <div key={resp.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{resp.author.nom}</span>
                    <span className="text-[10px] text-slate-400 italic">
                       {new Date(resp.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 ml-8">{resp.content}</p>
                  {resp.imageUrl && (
                    <img src={resp.imageUrl} alt="Contenu" className="mt-2 rounded-lg max-h-40 ml-8 object-cover" />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <MessageCircle className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400 italic">Aucune réponse pour le moment.</p>
              </div>
            )}
          </div>
        </div>

        <CommentForm 
          discussionId={discussion.id} 
          userId={userId} 
          onSuccess={fetchResponses} // Rafraîchir la liste après un post
        />
      </div>
    </div>,
    document.body
  );
}