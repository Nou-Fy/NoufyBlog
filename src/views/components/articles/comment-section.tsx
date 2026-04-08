import { MessageSquare } from "lucide-react";
import { CommentForm } from "../comment-form";

export function CommentSection({ comments, postId }: { comments: any[]; postId: string }) {
  return (
    <div className="md:col-span-1 bg-background flex flex-col h-full border border-border shadow-sm rounded-3xl overflow-hidden">
      <div className="p-6 bg-card/80 border-b border-border">
        <h3 className="font-bold text-card-foreground flex items-center gap-2 uppercase text-xs tracking-widest">
          <MessageSquare className="w-4 h-4 text-emerald-500" />
          Espace Discussion ({comments.length})
        </h3>
      </div>

      <div className="flex-grow overflow-y-auto p-5 space-y-4 bg-background">
        {comments.length === 0 ? (
          <div className="text-center py-20 opacity-70">
            <MessageSquare className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Aucun commentaire</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-card/80 p-4 rounded-2xl border border-border/60 hover:border-emerald-400/60 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[11px] text-emerald-500 uppercase tracking-tighter">
                  {comment.author.nom}
                </span>
                <span className="text-[9px] text-muted-foreground font-medium">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-normal">{comment.content}</p>
            </div>
          ))
        )}
      </div>
      <CommentForm postId={postId} />
    </div>
  );
}
