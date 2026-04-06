import { getSessionUser } from "@/lib/auth";
import CommunityHero from "@/views/components/community/CommunityHero";
import CommunityStats from "@/views/components/community/CommunityStats";
import DiscussionFilters from "@/views/components/community/DiscussionFilters";
import RecentDiscussions from "@/views/components/community/RecentDiscutssion";
import Pagination from "@/views/components/ui/pagination";
import TopMembres from "@/views/components/community/TopMembres"; // à adapter
import RecentMembres from "@/views/components/community/RecentMembers"; // à adapter
import CollapsibleSidebar from "@/views/components/community/CollapsibleSidebar";
import Container from "@/views/components/common/Container";
import Section from "@/views/components/common/Section";
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
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-stone-50">
      <CommunityHero userId={userId} />

      {/* Ce conteneur fait remonter les stats sur le Hero */}
      <div className="relative z-10 -mt-10">
        <Container size="2xl" className="!px-4 sm:!px-6 lg:!px-8">
          <CommunityStats />
        </Container>
      </div>

      <Section bg="stone-50" py="xl" className="pt-0">
        <Container size="2xl">
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
        </Container>
      </Section>
    </div>
  );
}
