"use client";

import { useSearchParams } from "next/navigation";

export function usePagination() {
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSort = searchParams.get("sort") || "newest";

  return {
    searchParams,
    currentPage,
    currentSort,
  };
}
