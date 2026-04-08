"use client";

import Link from "next/link";
import { Clock, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteButton from "../common/DeleteButton";

export function ArticleCard({
  article,
  canDelete,
}: {
  article: any;
  canDelete: boolean;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/articles/${article.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="group bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={article.imageUrl || "/api/placeholder/400/320"}
          alt={article.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="bg-card/70 text-muted-foreground text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
            {article.section}
          </span>
          {canDelete && (
            <DeleteButton onConfirm={handleDelete} itemName="cet article" />
          )}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground/80 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(article.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
        <h2 className="text-xl font-bold mb-3 text-foreground line-clamp-2">
          {article.title}
        </h2>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
          {article.content}
        </p>
        <div className="mt-auto pt-4 border-t border-border/60 flex justify-between items-center">
          <Link
            href={`/articles?view=${article.id}`}
            className="text-emerald-500 font-bold text-sm hover:underline dark:text-emerald-400">
            Lire la suite →
          </Link>
        </div>
      </div>
    </article>
  );
}
