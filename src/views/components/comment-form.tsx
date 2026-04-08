import { addCommentAction } from "@/app/api/actions/comment-action";
import { Send } from "lucide-react";

export function CommentForm({ postId }: { postId: string }) {
  return (
    <div className="p-5 bg-card border-t border-border">
      <form action={addCommentAction} className="relative group">
        <input type="hidden" name="postId" value={postId} />
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
      </form>
    </div>
  );
}
