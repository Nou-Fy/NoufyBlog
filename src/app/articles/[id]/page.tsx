import { prisma } from "@/lib/prisma";
import { ArticleContent } from "@/views/components/articles/articles-content";
import { CommentSection } from "@/views/components/articles/comment-section";
import { X } from "lucide-react";
import Link from "next/link";

export default async function ArticleDetailModal({
  params,
}: {
  params: { id: string };
}) {
  // 1. Récupération des données (Logique d'accès aux données)
  const article = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      comments: {
        include: { author: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!article) return null;

  // 2. Assemblage de l'UI (Structure globale de la Modal)
  return (
    <div className="min-h-screen w-full bg-stone-50 relative">
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        {/* Overlay */}
        <Link
          href="/articles"
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        />

        <div className="relative w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[90vh] animate-in zoom-in-95 duration-200">
          {/* Bouton Fermer */}
          <Link
            href="/articles"
            className="absolute top-4 right-4 z-20 p-2 bg-stone-100 text-slate-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm">
            <X className="w-5 h-5" />
          </Link>

          {/* SECTION GAUCHE : L'ARTICLE (Responsabilité déportée) */}
          <ArticleContent article={article} userId={article.author.id} />

          {/* SECTION DROITE : COMMENTAIRES (Responsabilité déportée) */}
          <CommentSection comments={article.comments} postId={article.id} />
        </div>
      </div>
    </div>
  );
}
