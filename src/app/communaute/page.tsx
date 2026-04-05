import { getSessionUser } from "@/lib/auth";
import CommunityHero from "@/views/components/community/CommunityHero";
import CommunityStats from "@/views/components/community/CommunityStats";
import DiscussionFilters from "@/views/components/community/DiscussionFilters";
import RecentDiscussions from "@/views/components/community/RecentDiscutssion";
import Pagination from "@/views/components/ui/pagination";
import TopMembres from "@/views/components/community/TopMembres"; // à adapter
import RecentMembres from "@/views/components/community/RecentMembers"; // à adapter
import CollapsibleSidebar from "@/views/components/community/CollapsibleSidebar";
import { getPaginatedDiscussions } from "../api/actions/discussion.actions";
import { Trophy, Sparkles } from "lucide-react";

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
      <div className="relative z-10 -mt-20">
        <div className="container mx-auto px-4">
          <CommunityStats />
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="container mx-auto">
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

            {/* Colonne droite : TopMembres + RecentMembres (Desktop) */}
            <div className="hidden lg:flex lg:col-span-1 lg:flex-col lg:space-y-8">
              <TopMembres />
              <RecentMembres />
            </div>

            {/* Mobile collapsibles */}
            <div className="lg:hidden space-y-4">
              <CollapsibleSidebar
                title="Membres du mois 🏆"
                icon={<Trophy className="w-5 h-5 text-amber-600" />}>
                <TopMembres />
              </CollapsibleSidebar>

              <CollapsibleSidebar
                title="Nouveaux membres ✨"
                icon={<Sparkles className="w-5 h-5 text-emerald-600" />}>
                <RecentMembres />
              </CollapsibleSidebar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
