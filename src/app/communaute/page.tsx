import { getSessionUser } from "@/lib/auth";
import CommunityHero from "@/components/community/CommunityHero";
import CommunityStats from "@/components/community/CommunityStats";
import DiscussionFilters from "@/components/community/DiscussionFilters";
import RecentDiscussions from "@/components/community/RecentDiscussions";
import Pagination from "@/components/ui/pagination";
import TopMembers from "@/components/community/TopMembers";
import RecentMembres from "@/components/community/RecentMembers";
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
    // On s'assure que le parent n'empêche pas le sticky (pas d'overflow-hidden ici)
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <CommunityHero userId={userId} />

      <div className="relative z-10 -mt-10">
        <Container size="full">
          <CommunityStats />
        </Container>
      </div>

      <Section bg="surface-soft" py="lg" className="pt-12 dark:!bg-background">
        <Container size="full">
          {/* IMPORTANT : 
            1. items-start : empêche la sidebar de s'étirer (indispensable)
            2. relative : aide au positionnement contextuel
          */}
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Colonne gauche (Contenu long) */}
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

            {/* Colonne droite (Sticky) */}
            <aside className="hidden lg:block lg:col-span-1 h-full">
              {/* top-24 : distance du haut (ajuste selon ton header)
                 self-start : renforce le fait que l'élément ne s'étire pas
              */}
              <div className="sticky top-24 self-start space-y-6">
                <TopMembers />
                <RecentMembres />
              </div>
            </aside>

            {/* Mobile */}
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
