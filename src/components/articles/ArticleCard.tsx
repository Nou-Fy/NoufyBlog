"use client";

import Link from "next/link";
import { Clock, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteButton from "../common/DeleteButton";
import { ImageFrame } from "../common/ImageFrame";
import { useArchiveArticle } from "@/hooks/articles/use-archive-article";

export function ArticleCard({
  article,
  canDelete,
}: {
  article: any;
  canDelete: boolean;
}) {
  const router = useRouter();
  const { loading, archive } = useArchiveArticle();

  const handleDelete = async () => {
    try {
      const result = await archive(article.id);
      if (!result.success) throw new Error(result.error);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="group bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <ImageFrame
        src={article.imageUrl}
        alt={article.title}
        ratio="aspect-[16/10]"
        className="group-hover:shadow-xl"
        imgClassName="group-hover:scale-[1.03]"
      >
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="bg-card/80 text-muted-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
            {article.section}
          </span>
          {canDelete && (
            <DeleteButton
              onConfirm={handleDelete}
              itemName="cet article"
            />
          )}
        </div>
      </ImageFrame>
      <div className="p-6 md:p-7 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-muted-foreground/80 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(article.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-foreground line-clamp-2 leading-snug">
          {article.title}
        </h2>
        <p className="text-muted-foreground text-base leading-7 line-clamp-3 mb-6">
          {article.content}
        </p>
        <div className="mt-auto pt-4 border-t border-border/60 flex justify-between items-center">
          <Link
            href={`/articles?view=${article.id}`}
            className="text-emerald-500 font-bold text-base hover:underline dark:text-emerald-400">
            Lire la suite →
          </Link>
        </div>
      </div>
    </article>
  );
}
