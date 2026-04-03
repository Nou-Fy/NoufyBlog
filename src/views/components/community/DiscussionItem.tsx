"use client";

import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { PrismaDiscussion } from "@/types/community";
import DiscussionDrawer from "./DiscussionDrawer";

export default function DiscussionItem({
  discussion,
}: {
  discussion: PrismaDiscussion;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
            Discussion
          </span>
          <span className="text-xs text-slate-400">
            {new Date(discussion.createdAt).toLocaleDateString("fr-FR")}
          </span>
        </div>

        <h3 className="font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
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

      <DiscussionDrawer
        discussion={discussion}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
