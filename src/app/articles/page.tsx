// @/app/articles/page.tsx
import Link from "next/link";
import { Inbox, X } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import ArticleDetailModal from "@/views/components/articles/articles-detail-modal";
import NouveauPostPage from "./news/page";
import { getArticles } from "@/lib/services/articles.service";
import ArticlesFilters from "@/views/components/articles/articles-filter";
import { ArticleCard } from "@/views/components/articles/ArticleCard";
// On importe la carte pour la grille, pas le contenu complet

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{
    show?: string;
    view?: string;
    query?: string;
    category?: string;
    sort?: string;
    date?: string;
  }>;
}) {
  const params = await searchParams;

  const userId = await getSessionUser();
  const articles = await getArticles(params);

  const isFormVisible = params.show === "true";
  const activePostId = params.view;

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="container mx-auto py-12 px-4">
        <ArticlesFilters />

        <div className="relative">
          {isFormVisible && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <Link
                href="/articles"
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border-4 border-emerald-50">
                <Link
                  href="/articles"
                  className="absolute top-4 right-4 z-10 p-2 bg-stone-100 text-slate-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-all">
                  <X size={20} />
                </Link>
                <div className="max-h-[85vh] overflow-y-auto p-2">
                  <NouveauPostPage />
                </div>
              </div>
            </div>
          )}

          {/* On passe bien le userId à la modale */}
          {activePostId && (
            <ArticleDetailModal postId={activePostId} userId={userId} />
          )}

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article: any) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  // On donne la permission à la carte si l'utilisateur est l'auteur
                  canDelete={userId === article.author?.id}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-stone-200">
      <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-6 text-stone-300">
        <Inbox size={40} />
      </div>
      <h3 className="text-2xl font-bold text-slate-900">
        Aucun article trouvé
      </h3>
      <p className="text-slate-500 mt-2 max-w-xs text-center">
        Nous n'avons rien trouvé pour ces critères de recherche.
      </p>
      <Link
        href="/articles"
        className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-emerald-600 transition-colors">
        Réinitialiser les filtres
      </Link>
    </div>
  );
}
