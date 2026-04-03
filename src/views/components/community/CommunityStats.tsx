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
    <section className="py-12 bg-stone-50/50">
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <StatCard key={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
