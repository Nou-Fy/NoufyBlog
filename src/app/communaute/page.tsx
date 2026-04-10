import { getSessionUser } from "@/lib/auth";
import CommunityHero from "@/components/community/CommunityHero";
import CommunityStats from "@/components/community/CommunityStats";
import DiscussionFilters from "@/components/community/DiscussionFilters";
import RecentDiscussions from "@/components/community/RecentDiscussions";
import Pagination from "@/components/ui/pagination";
import TopMembers from "@/components/community/TopMembers"; // à adapter
import RecentMembres from "@/components/community/RecentMembers"; // à adapter
import CollapsibleSidebar from "@/components/community/CollapsibleSidebar";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
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
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-background text-foreground">
      <CommunityHero userId={userId} />

      {/* Ce conteneur fait remonter les stats sur le Hero */}
      <div className="relative z-10 -mt-10">
        <Container size="full" /* className="!px-4 sm:!px-6 lg:!px-8" */>
          <CommunityStats />
        </Container>
      </div>

      <Section bg="surface-soft" py="lg" className="pt-12 dark:!bg-background">
        <Container size="full">
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
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Page {page} sur {totalPages}
                </p>
              </div>
            </div>

            {/* Colonne droite : TopMembers + RecentMembres (Desktop) */}
            <div className="hidden lg:flex lg:col-span-1 lg:flex-col lg:space-y-4">
              <TopMembers />
              <RecentMembres />
            </div>

            {/* Mobile collapsibles */}
            <div className="lg:hidden space-y-4">
              <CollapsibleSidebar
                title="Membres du mois 🏆"
                icon={<Trophy className="w-5 h-5 text-amber-600" />}>
                <TopMembers />
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
