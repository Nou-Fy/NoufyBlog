"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";

export default function DiscussionFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // "desc" (plus récent) est la valeur par défaut
  const currentSort = searchParams.get("sort") || "desc";

  const handleSort = (order: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", order);
    params.set("page", "1"); // Reset de la pagination
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-1 bg-card/80 border border-border p-1 rounded-lg w-fit">
        <button
          onClick={() => handleSort("desc")}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all ${
            currentSort === "desc"
              ? "bg-emerald-600 text-white shadow-sm font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}>
          <Clock className="w-4 h-4" />
          Plus récents
        </button>

        <button
          onClick={() => handleSort("asc")}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm transition-all ${
            currentSort === "asc"
              ? "bg-emerald-600 text-white shadow-sm font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}>
          <CalendarDays className="w-4 h-4" />
          Plus anciens
        </button>
      </div>

      <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider italic">
        Trié par date d'ajout
      </span>
    </div>
  );
}
