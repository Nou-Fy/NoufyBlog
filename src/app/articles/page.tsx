// @/app/articles/page.tsx
import Link from "next/link";
import { Clock, MessageSquare, Inbox, X } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import ArticleDetailModal from "@/views/components/articles/articles-detail-modal";
import NouveauPostPage from "./news/page";
import { getArticles } from "@/lib/services/articles.service";
import ArticlesFilters from "@/views/components/articles/articles-filter";

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

  // On délègue la récupération des données au service
  const articles = await getArticles(params);

  const isFormVisible = params.show === "true";
  const activePostId = params.view;

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="container mx-auto py-12 px-4">
        <ArticlesFilters />

        <div className="relative">
          {/* MODAL DE CRÉATION */}
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

          {/* MODAL DE LECTURE */}
          {activePostId && <ArticleDetailModal postId={activePostId} />}

          {/* LISTE DES ARTICLES */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
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

function ArticleCard({ article }: { article: any }) {
  return (
    <article className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col">
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={article.imageUrl || "/api/placeholder/400/320"}
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
            {new Date(article.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
        <h2 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
          {article.title}
        </h2>
        <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">
          {article.content}
        </p>
        <div className="mt-auto pt-4 border-t border-stone-50 flex justify-between items-center">
          <Link
            href={`/articles?view=${article.id}`}
            className="text-emerald-600 font-bold text-sm hover:underline">
            Lire la suite →
          </Link>
          <Link href={`/articles?view=${article.id}`}>
            <MessageSquare className="w-4 h-4 text-stone-300 hover:text-emerald-600 transition-colors" />
          </Link>
        </div>
      </div>
    </article>
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
