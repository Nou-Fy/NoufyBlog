"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, User, Calendar, MessageCircle } from "lucide-react";
import { PrismaDiscussion } from "@/types/community";

interface DiscussionDrawerProps {
  discussion: PrismaDiscussion;
  isOpen: boolean;
  onClose: () => void;
}

export default function DiscussionDrawer({
  discussion,
  isOpen,
  onClose,
}: DiscussionDrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Discussion</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-8">
            <p className="text-slate-800 font-medium leading-relaxed mb-4">
              {discussion.content}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <User className="w-3.5 h-3.5" />{" "}
                {discussion.author.nom || "Éleveur"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />{" "}
                {new Date(discussion.createdAt).toLocaleDateString("fr-FR")}
              </span>
            </div>
          </div>
          <div className="text-center py-10">
            <MessageCircle className="w-10 h-10 text-slate-200 mx-auto mb-2" />
            <p className="text-sm text-slate-400 italic">
              Chargement des {discussion._count.comments} réponses...
            </p>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ajouter un commentaire..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button className="bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all">
              Poster
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
