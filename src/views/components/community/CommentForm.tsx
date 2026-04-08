"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface CommentFormProps {
  discussionId: string;
  userId: string;
  onSuccess?: () => void;
}

export function CommentForm({
  discussionId,
  userId,
  onSuccess,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostResponse = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          imageUrl: imageUrl || null,
          discussionId,
          authorId: userId,
        }),
      });

      if (response.ok) {
        setContent("");
        setImageUrl("");
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-card border-t border-border space-y-3">
      <div className="relative flex items-center">
        <ImageIcon className="absolute left-3 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Lien d'une image (optionnel)..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full bg-card/80 border border-border/70 rounded-lg pl-9 pr-4 py-2 text-xs text-foreground outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>
      <div className="flex gap-2 min-w-0">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="flex-1 min-w-0 bg-card/80 border border-border/70 rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
          onKeyDown={(e) => e.key === "Enter" && handlePostResponse()}
        />
        <button
          onClick={handlePostResponse}
          disabled={isSubmitting || !content.trim()}
          className="bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all disabled:opacity-50">
          {isSubmitting ? "..." : "Poster"}
        </button>
      </div>
    </div>
  );
}
