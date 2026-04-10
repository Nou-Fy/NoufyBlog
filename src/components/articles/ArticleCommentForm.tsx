"use client";

import { useState } from "react";
import { addCommentAction } from "@/app/api/actions/comment-action";
import { Send } from "lucide-react";
import ImageUpload from "@/components/media/ImageUpload";

export function ArticleCommentForm({ postId }: { postId: string }) {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="p-5 bg-card border-t border-border space-y-3">
      <form
        action={async (formData) => {
          await addCommentAction(formData);
          setImageUrl("");
        }}
        className="relative group space-y-3">
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="imageUrl" value={imageUrl} />
        <div className="relative">
          <textarea
            name="content"
            placeholder="Ici votre commentaire..."
            rows={2}
            className="w-full bg-card/80 border border-border/60 rounded-2xl p-4 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-emerald-500/30 outline-none resize-none transition-all"
            required
          />
          <button
            type="submit"
            className="absolute right-3 bottom-3 p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 active:scale-95 transition-all shadow-md">
            <Send className="w-4 h-4" />
          </button>
        </div>
        <ImageUpload
          label="Image (optionnel, fichier ou URL)"
          onUpload={(url) => setImageUrl(url)}
        />
      </form>
    </div>
  );
}
