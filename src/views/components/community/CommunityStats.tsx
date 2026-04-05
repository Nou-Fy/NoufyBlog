"use client";

import useCommunityStats from "@/views/hooks/useCommunityStats";
import StatCard from "./StatCard";
import StatsCarousel from "./StatsCarousel";
import CommunityStatsSkeleton from "./CommunityStatsSkeleton";
import { mapCommunityStats } from "@/lib/communityStats.mapper";

export default function CommunityStats() {
  // 1. Déstructuration du hook pour obtenir les deux propriétés
  const { stats, loading } = useCommunityStats();

  // 2. Utilisation de loading ou de l'absence de stats pour le skeleton
  if (loading || !stats) {
    return <CommunityStatsSkeleton />;
  }

  // 3. Maintenant stats est garanti d'être CommunityStatsData (pas null)
  const items = mapCommunityStats(stats);

  return (
    <StatsCarousel>
      {items.map((item, i) => (
        <StatCard key={i} {...item} />
      ))}
    </StatsCarousel>
  );
}
