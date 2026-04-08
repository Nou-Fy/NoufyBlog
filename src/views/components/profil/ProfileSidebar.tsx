import { Zap } from "lucide-react";
import { Card } from "@/views/components/ui/card";
import { ProfileStats } from "@/views/components/ProfilStats";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/views/components/ui/collapsible";
import { DESIGN_SYSTEM } from "@/lib/constants/design-system";

interface SidebarProps {
  postsCount: number;
  commentsCount: number;
}

export function ProfileSidebar({ postsCount, commentsCount }: SidebarProps) {
  const StatsContent = () => (
    <ProfileStats postsCount={postsCount} commentsCount={commentsCount} />
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block">
        <Card
          className={`${DESIGN_SYSTEM.radius.lg} border-none ${DESIGN_SYSTEM.shadows.xl} bg-card overflow-hidden p-8`}>
          <h3 className="font-black text-foreground mb-6 uppercase text-[10px] tracking-[0.2em]">
            Tableau de bord
          </h3>
          <StatsContent />
        </Card>
      </aside>

      {/* Mobile */}
      <div className="lg:hidden mb-8">
        <Collapsible>
          <CollapsibleTrigger
            className={`w-full flex items-center gap-3 px-4 py-3 ${DESIGN_SYSTEM.radius.md} ${DESIGN_SYSTEM.colors.primary.light} ${DESIGN_SYSTEM.colors.primary.border} hover:bg-emerald-100 mb-4`}>
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-emerald-900">
              Tableau de bord
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card
              className={`${DESIGN_SYSTEM.radius.lg} border-none ${DESIGN_SYSTEM.shadows.xl} bg-card p-6`}>
              <StatsContent />
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
}
