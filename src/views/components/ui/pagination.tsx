"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";
import { getVisiblePages } from "@/app/api/actions/pagination";
import { ReadonlyURLSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const { searchParams, currentPage } = usePagination();

  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  function createPageURL(
    searchParams: ReadonlyURLSearchParams,
    arg1: number,
  ): string | import("url").UrlObject {
    throw new Error("Function not implemented.");
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      {/* Previous */}
      <Link
        href={createPageURL(searchParams, Math.max(1, currentPage - 1))}
        className={`p-2 rounded-xl border border-stone-200 ${
          currentPage === 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-stone-100 text-slate-600"
        }`}>
        <ChevronLeft className="w-5 h-5" />
      </Link>

      {/* Pages */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <div key={index} className="px-2 text-slate-400">
                <MoreHorizontal className="w-4 h-4" />
              </div>
            );
          }

          const isActive = currentPage === page;

          function createPageURL(
            searchParams: ReadonlyURLSearchParams,
            arg1: number,
          ): string | import("url").UrlObject {
            throw new Error("Function not implemented.");
          }

          return (
            <Link
              key={page}
              href={createPageURL(searchParams, page as number)}
              className={`min-w-[40px] h-10 flex items-center justify-center rounded-xl text-sm font-bold ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "text-slate-500 hover:bg-stone-100"
              }`}>
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next */}
      <Link
        href={createPageURL(
          searchParams,
          Math.min(totalPages, currentPage + 1),
        )}
        className={`p-2 rounded-xl border border-stone-200 ${
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-stone-100 text-slate-600"
        }`}>
        <ChevronRight className="w-5 h-5" />
      </Link>
    </nav>
  );
}
