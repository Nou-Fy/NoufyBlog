import { prisma } from "@/lib/prisma";
import { X, Send, MessageSquare, Clock, User } from "lucide-react";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Server Action pour ajouter un commentaire
async function addComment(formData: FormData) {
  "use server";
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;
  const authorId = await getSessionUser();

  if (!authorId || !content) return;

  await prisma.comment.create({
    data: {
      content,
      postId,
      authorId,
    },
  });

  revalidatePath("/articles");
}

export default async function ArticleDetailModal({
  postId,
}: {
  postId: string;
}) {
  const article = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      comments: {
        include: { author: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Overlay sombre */}
      <Link
        href="/articles"
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
      />

      {/* Conteneur Modal avec Grid : 3 colonnes sur desktop */}
      <div className="relative w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Bouton Fermer */}
        <Link
          href="/articles"
          className="absolute top-4 right-4 z-20 p-2 bg-stone-100 text-slate-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm">
          <X className="w-5 h-5" />
        </Link>

        {/* SECTION GAUCHE : L'ARTICLE (Occupe 2/3) */}
        <div className="md:col-span-2 overflow-y-auto p-6 md:p-12 border-r border-stone-100">
          <img
            src={article.imageUrl || ""}
            alt={article.title}
            className="w-full h-80 object-cover rounded-[2rem] mb-8 shadow-md"
          />
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="bg-emerald-100 text-emerald-700 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
              {article.section}
            </span>

            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1]">
              {article.title}
            </h2>

            <div className="flex items-center gap-6 text-sm text-slate-400 py-6 border-y border-stone-50">
              <div className="flex items-center gap-2 font-medium text-slate-600">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <User className="w-4 h-4" />
                </div>
                {article.author.nom}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-300" />
                <span>
                  {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap pb-10">
              {article.content}
            </p>
          </div>
        </div>

        {/* SECTION DROITE : COMMENTAIRES (Occupe 1/3) */}
        <div className="md:col-span-1 bg-stone-50 flex flex-col h-full border-t md:border-t-0">
          <div className="p-6 bg-white border-b border-stone-100 shadow-sm">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 uppercase text-xs tracking-widest">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Espace Discussion ({article.comments.length})
            </h3>
          </div>

          {/* Liste des commentaires */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4">
            {article.comments.length === 0 ? (
              <div className="text-center py-20 opacity-40">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 text-stone-300" />
                <p className="text-sm">Aucun commentaire</p>
              </div>
            ) : (
              article.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200/40 hover:border-emerald-100 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-[11px] text-emerald-700 uppercase tracking-tighter">
                      {comment.author.nom}
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-normal">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Formulaire pour ajouter un commentaire */}
          <div className="p-5 bg-white border-t border-stone-100">
            <form action={addComment} className="relative group">
              <input type="hidden" name="postId" value={article.id} />
              <textarea
                name="content"
                placeholder="ici votre commentaire"
                rows={2}
                className="w-full bg-stone-50 border-none rounded-2xl p-4 pr-14 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none resize-none transition-all"
                required
              />
              <button
                type="submit"
                className="absolute right-3 bottom-3 p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 active:scale-95 transition-all shadow-md">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
        {/* Fin de la GRID */}
      </div>
      {/* Fin du conteneur MODAL */}
    </div>
  );
}
