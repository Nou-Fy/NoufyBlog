import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { Plus, Clock, Tag, MessageSquare } from "lucide-react";
import { Button } from "@/views/components/ui/button";
import NouveauPostPage from "./news/page";
import ArticleDetailModal from "./ArticlesDetailModal";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ show?: string; view?: string }>;
}) {
  const userId = await getSessionUser();
  const { show, view } = await searchParams; // On récupère "view" (l'id du post)

  const isFormVisible = show === "true";
  const activePostId = view;

  const articles = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 py-12 px-4">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase">
              Le Blog des Éleveurs Malagasy
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900">
              Dernières <span className="text-orange-600">Publications</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="relative">
          {/* --- MODAL DE CRÉATION --- */}
          {isFormVisible && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <Link
                href="/articles"
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border-4 border-emerald-50">
                <Link
                  href="/articles"
                  className="absolute top-4 right-4 z-5 p-2 bg-stone-100 text-red-500 rounded-full hover:bg-red-700 hover:text-white">
                  ✕
                </Link>
                <div className="max-h-[85vh] overflow-y-auto p-2">
                  <NouveauPostPage />
                </div>
              </div>
            </div>
          )}

          {/* --- MODAL DE LECTURE & COMMENTAIRES --- */}
          {activePostId && <ArticleDetailModal postId={activePostId} />}

          {/* --- GRID DES ARTICLES --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col">
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={article.imageUrl || ""}
                    alt={article.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
                      {article.section}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(article.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {article.content}
                  </p>

                  <div className="mt-auto pt-4 border-t border-stone-50 flex justify-between items-center">
                    {/* LIEN LIRE LA SUITE (MODAL) */}
                    <Link
                      href={`/articles?view=${article.id}`}
                      className="text-emerald-600 font-bold text-sm hover:underline">
                      Lire la suite →
                    </Link>

                    {/* ICONE COMMENTAIRE (MODAL AUSSI) */}
                    <Link href={`/articles?view=${article.id}`}>
                      <MessageSquare className="w-4 h-4 text-stone-300 hover:text-emerald-600 cursor-pointer transition-colors" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
