// @/app/articles/page.tsx
import Link from "next/link";
import { Inbox, X } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import ArticleDetailModal from "@/views/components/articles/articles-detail-modal";
import NouveauPostPage from "./news/page";
import { getArticles } from "@/lib/services/articles.service";
import ArticlesFilters from "@/views/components/articles/articles-filter";
import CollapsibleFilters from "@/views/components/articles/CollapsibleFilters";
import { ArticleCard } from "@/views/components/articles/ArticleCard";
import Container from "@/views/components/common/Container";
import Section from "@/views/components/common/Section";
import EmptyState from "@/views/components/common/EmptyState";
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
    from?: string;
  }>;
}) {
  const params = await searchParams;

  const userId = await getSessionUser();
  const articles = await getArticles(params);

  const isFormVisible = params.show === "true";
  const activePostId = params.view;

  // Vérifier s'il y a des filtres actifs
  const hasFilters =
    params.query || params.category || params.sort || params.date;

  return (
    <div className="min-h-screen w-full bg-background">
      <Section bg="stone-50" py="lg">
        <Container size="full">
          <CollapsibleFilters hasFilters={!!hasFilters}>
            <ArticlesFilters />
          </CollapsibleFilters>

          <div className="relative">
            {isFormVisible && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <Link
                  href="/articles"
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />
                <div className="relative w-full max-w-2xl bg-card rounded-[2rem] shadow-2xl overflow-hidden border-4 border-emerald-50">
                  <Link
                    href="/articles"
                    className="absolute top-4 right-4 z-10 p-2 bg-card/80 text-muted-foreground rounded-full hover:bg-red-50 hover:text-red-500 transition-all">
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
              <ArticleDetailModal
                postId={activePostId}
                userId={userId}
                from={params.from}
              />
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
              <EmptyState
                icon={Inbox}
                title="Aucun article trouvé"
                description="Nous n'avons rien trouvé pour ces critères de recherche."
                action={
                  <Link
                    href="/articles"
                    className="mt-8 px-6 py-2 bg-card/90 text-white rounded-full text-sm font-bold hover:bg-emerald-600 transition-colors">
                    Réinitialiser les filtres
                  </Link>
                }
              />
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
