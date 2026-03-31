// @/hooks/use-article-filters.ts
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function useArticleFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeFilters = {
    query: searchParams.get("query") || "",
    category: searchParams.get("category") || "",
    date: searchParams.get("date") || "",
    sort: searchParams.get("sort") || "desc",
  };

  const hasFilters = !!(
    activeFilters.query ||
    activeFilters.category ||
    activeFilters.date
  );

  const updateFilter = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(name, value);
    else params.delete(name);

    startTransition(() => {
      router.push(`/articles?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      router.push("/articles");
    });
  };

  return {
    activeFilters,
    hasFilters,
    isPending,
    updateFilter,
    clearFilters,
  };
}
