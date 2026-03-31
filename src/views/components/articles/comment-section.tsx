import { MessageSquare } from "lucide-react";
import { CommentForm } from "../comment-form";

export function CommentSection({ comments, postId }: { comments: any[], postId: string }) {
  return (
    <div className="md:col-span-1 bg-stone-50 flex flex-col h-full border-t md:border-t-0">
      <div className="p-6 bg-white border-b border-stone-100 shadow-sm">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 uppercase text-xs tracking-widest">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          Espace Discussion ({comments.length})
        </h3>
      </div>

      <div className="flex-grow overflow-y-auto p-5 space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-20 opacity-40">
            <MessageSquare className="w-12 h-12 mx-auto mb-2 text-stone-300" />
            <p className="text-sm">Aucun commentaire</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200/40 hover:border-emerald-100 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-[11px] text-emerald-700 uppercase tracking-tighter">{comment.author.nom}</span>
                <span className="text-[9px] text-slate-400 font-medium">{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-slate-600 leading-normal">{comment.content}</p>
            </div>
          ))
        )}
      </div>
      <CommentForm postId={postId} />
    </div>
  );
}