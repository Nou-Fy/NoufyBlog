"use client";

import { useState } from "react";
import ImageUpload from "@/components/media/ImageUpload";

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
      <ImageUpload
        label="Importer une image (optionnel)"
        onUpload={(url) => setImageUrl(url)}
      />
    </div>
  );
}
