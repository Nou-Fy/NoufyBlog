"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/views/components/ui/collapsible";
import { Filter, X } from "lucide-react";
import { Button } from "@/views/components/ui/button";

interface CollapsibleFiltersProps {
  hasFilters: boolean;
  children: React.ReactNode;
  onClear?: () => void;
}

export default function CollapsibleFilters({
  hasFilters,
  children,
  onClear,
}: CollapsibleFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop: Filtres visibles */}
      <div className="hidden md:block mb-12">{children}</div>

      {/* Mobile: Filtres en collapsible */}
      <div className="md:hidden mb-8">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-emerald-900">Filtres</span>
              {hasFilters && (
                <span className="inline-block px-2 py-0.5 ml-2 bg-emerald-600 text-white text-xs rounded-full font-bold">
                  Actifs
                </span>
              )}
            </div>
            <span className="text-emerald-600">{isOpen ? "▼" : "▶"}</span>
          </CollapsibleTrigger>

          <CollapsibleContent className="pt-4 pb-2">
            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-4">
              {children}
              {hasFilters && onClear && (
                <Button
                  onClick={onClear}
                  variant="outline"
                  size="sm"
                  className="w-full border-stone-200 text-slate-600 hover:bg-red-50 hover:text-red-600">
                  <X className="w-4 h-4 mr-2" />
                  Réinitialiser
                </Button>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
}
