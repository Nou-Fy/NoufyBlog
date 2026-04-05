import { getSessionUser } from "@/lib/auth";
import CommunityHero from "@/views/components/community/CommunityHero";
import CommunityStats from "@/views/components/community/CommunityStats";
import DiscussionFilters from "@/views/components/community/DiscussionFilters";
import RecentDiscussions from "@/views/components/community/RecentDiscutssion";
import Pagination from "@/views/components/ui/pagination";
import TopMembres from "@/views/components/community/TopMembres"; // à adapter
import RecentMembres from "@/views/components/community/RecentMembers"; // à adapter
import { getPaginatedDiscussions } from "../api/actions/discussion.actions";

export default async function CommunautePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const sortOrder = params.sort === "asc" ? "asc" : "desc";
  const page = Number(params.page) || 1;

  const userId = await getSessionUser();
  const isAuthenticated = !!userId;

  const { discussions, totalPages } = await getPaginatedDiscussions(
    page,
    sortOrder,
  );

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <CommunityHero userId={userId} />

      {/* Ce conteneur fait remonter les stats sur le Hero */}
      <div className="relative z-10 -mt-20 container mx-auto px-4">
        <CommunityStats />
      </div>

      <main className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Colonne gauche : discussions */}
          <div className="lg:col-span-2">
            <DiscussionFilters />
            <RecentDiscussions
              discussions={discussions}
              isAuthenticated={isAuthenticated}
              userId={userId || null}
            />
            <div className="mt-12">
              <Pagination totalPages={totalPages} />
              <p className="text-center text-xs text-slate-400 mt-4">
                Page {page} sur {totalPages}
              </p>
            </div>
          </div>

          {/* Colonne droite : TopMembres + RecentMembres */}
          <div className="lg:col-span-1 space-y-8">
            <TopMembres />
            <RecentMembres />
          </div>
        </div>
      </main>
    </div>
  );
}
