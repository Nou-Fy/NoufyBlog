// @/views/components/articles/articles-detail-modal.tsx
import { prisma } from "@/lib/prisma";
import { X } from "lucide-react";
import Link from "next/link";
import { CommentSection } from "./comment-section";
import { ArticleContent } from "./articles-content";

export default async function ArticleDetailModal({
  postId,
  userId, // <-- AJOUT ICI
}: {
  postId: string;
  userId: string | null; // <-- AJOUT ICI
}) {
  const article = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      comments: { include: { author: true }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <Link
        href="/articles"
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[90vh] animate-in zoom-in-95 duration-200">
        <Link
          href="/articles"
          className="absolute top-4 right-4 z-20 p-2 bg-stone-100 text-slate-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm">
          <X className="w-5 h-5" />
        </Link>

        {/* Section Gauche (Article) : On lui passe bien le userId */}
        <ArticleContent article={article} userId={userId} />

        {/* Section Droite (Commentaires) */}
        <CommentSection comments={article.comments} postId={article.id} />
      </div>
    </div>
  );
}