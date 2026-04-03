// src/app/communaute/page.tsx
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CommunityHero from "@/views/components/community/CommunityHero";
import CommunityStats from "@/views/components/community/CommunityStats";
import DiscussionFilters from "@/views/components/community/DiscussionFilters";
import RecentDiscussions from "@/views/components/community/RecentDiscutssion";
import RecentMembers from "@/views/components/community/RecentMembers";
import TopMembers from "@/views/components/community/TopMembres";
import Pagination from "@/views/components/ui/pagination";

/**
 * Logique de récupération des données mise à jour pour le tri par date
 */
async function getPaginatedDiscussions(
  page: number,
  sortOrder: "asc" | "desc",
) {
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  try {
    const [discussions, total] = await Promise.all([
      prisma.discussion.findMany({
        take: pageSize,
        skip: skip,
        // On applique ici le tri dynamique par date de création uniquement
        orderBy: {
          createdAt: sortOrder,
        },
        include: {
          author: {
            select: { nom: true, id: true },
          },
          _count: {
            select: { comments: true },
          },
        },
      }),
      prisma.discussion.count(),
    ]);

    return {
      discussions,
      totalPages: Math.ceil(total / pageSize) || 1,
    };
  } catch (error) {
    console.error("Erreur Prisma:", error);
    return { discussions: [], totalPages: 1 };
  }
}

export default async function CommunautePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  // On attend les searchParams (Recommandé pour les versions récentes de Next.js)
  const params = await searchParams;

  // Logique de tri : "asc" pour les plus anciens, "desc" (défaut) pour les plus récents
  const sortOrder = params.sort === "asc" ? "asc" : "desc";
  const page = Number(params.page) || 1;

  const userId = await getSessionUser();
  const { discussions, totalPages } = await getPaginatedDiscussions(
    page,
    sortOrder,
  );

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <CommunityHero userId={userId} />

      <CommunityStats />

      <main className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Barre de tri (Boutons : Plus récents / Plus anciens) */}
            <DiscussionFilters />

            {/* Liste des discussions injectée avec les données Prisma triées */}
            <RecentDiscussions discussions={discussions} />

            {/* Système de pagination */}
            <div className="mt-12">
              <Pagination totalPages={totalPages} />
              <p className="text-center text-xs text-slate-400 mt-4">
                Page {page} sur {totalPages}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <TopMembers />
            <RecentMembers />
          </div>
        </div>
      </main>
    </div>
  );
}
