import { useEffect, useState } from "react";

type Stats = {
  users: number;
  discussions: number;
  tips: number;
  location: number;
};

export default function useCommunityStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    }

    fetchStats();
  }, []);

  return stats;
}
