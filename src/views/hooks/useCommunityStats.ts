"use client";

import { getCommunityStats } from "@/app/api/stats/route";
import { useState, useEffect } from "react";

export interface CommunityStatsData {
  users: number;
  discussions: number;
  tips: number;
  location: number;
}

export default function useCommunityStats() {
  const [stats, setStats] = useState<CommunityStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // Pour éviter l'erreur de "mount" sur Next.js

    async function fetchStats() {
      try {
        const data = await getCommunityStats();
        if (isMounted && data) {
          setStats(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des stats:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  return { stats, loading }; // Retourne l'objet complet
}
