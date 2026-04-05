"use client";

import useCommunityStats from "@/views/hooks/useCommunityStats";
import StatCard from "./StatCard";
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
    // Suppression du padding et du fond pour laisser l'overlap se faire proprement
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <StatCard key={i} {...item} />
      ))}
    </div>
  );
}
