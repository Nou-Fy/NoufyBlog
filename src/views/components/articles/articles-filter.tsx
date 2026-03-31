// @/views/components/articles/articles-filters.tsx
"use client";

import { useArticleFilters } from "@/hooks/use-articles-filters";
import {
  Search,
  Calendar,
  Tag,
  RotateCcw,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/views/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function ArticlesFilters() {
  const { activeFilters, hasFilters, isPending, updateFilter, clearFilters } =
    useArticleFilters();

  // Style commun pour les Items afin d'assurer la lisibilité au survol
  const selectItemClasses =
    "text-sm text-slate-700 cursor-pointer transition-colors";

  // Mixin pour le style de focus (survol) : Fond coloré, texte BLANC pour le contraste
  const focusClasses = {
    emerald: "focus:bg-emerald-600 focus:text-white",
    orange: "focus:bg-orange-500 focus:text-white",
    red: "focus:bg-red-600 focus:text-white",
    stone: "focus:bg-stone-200 focus:text-slate-900", // Pour le neutre, fond gris clair, texte sombre
  };

  return (
    <div
      className={`mb-12 space-y-4 transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}>
      <div className="flex flex-wrap items-center gap-4">
        {/* RECHERCHE */}
        <div className="relative flex-grow min-w-[250px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un conseil..."
            value={activeFilters.query}
            onChange={(e) => updateFilter("query", e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-white border border-stone-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all shadow-sm text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>

        <div className="min-w-[180px]">
          <Select
            value={activeFilters.category || "ALL"}
            onValueChange={(value) => updateFilter("category", value)}>
            <SelectTrigger className="h-12 border-stone-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 bg-white shadow-sm text-sm font-medium text-slate-700 hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-emerald-600" />
                <SelectValue placeholder="Toutes les sections" />
              </div>
            </SelectTrigger>

            <SelectContent className="rounded-xl border-stone-200 shadow-xl bg-white p-1">
              {/* Option Neutre : gérée par le service avec category !== "ALL" */}
              <SelectItem
                value="ALL"
                className="text-sm text-slate-700 cursor-pointer focus:bg-stone-200 focus:text-slate-900 transition-colors">
                Toutes les sections
              </SelectItem>

              <SelectItem
                value="ASTUCE"
                className="text-sm text-slate-700 cursor-pointer focus:bg-orange-500 focus:text-white transition-colors">
                💡 Astuces Gasy
              </SelectItem>

              <SelectItem
                value="SANTE"
                className="text-sm text-slate-700 cursor-pointer focus:bg-red-600 focus:text-white transition-colors">
                💉 Santé & Vaccins
              </SelectItem>

              <SelectItem
                value="ALIMENTATION"
                className="text-sm text-slate-700 cursor-pointer focus:bg-emerald-600 focus:text-white transition-colors">
                🌾 Alimentation
              </SelectItem>

              {/* Ajout de la section REPRODUCTION présente dans ton Enum */}
              <SelectItem
                value="REPRODUCTION"
                className="text-sm text-slate-700 cursor-pointer focus:bg-sky-600 focus:text-white transition-colors">
                🐣 Reproduction
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative min-w-[180px]">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 z-10 pointer-events-none" />
          <input
            type="date"
            value={activeFilters.date}
            onChange={(e) => updateFilter("date", e.target.value)}
            className="w-full h-12 pl-11 pr-4 bg-white border border-stone-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 shadow-sm text-sm font-medium text-slate-700 [color-scheme:light] [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer hover:bg-stone-50 transition-colors"
          />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="min-w-[180px]">
          <Select
            value={activeFilters.sort || "desc"}
            onValueChange={(value) => updateFilter("sort", value)}>
            <SelectTrigger className="h-12 border-emerald-100 bg-emerald-50/40 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 shadow-sm text-sm font-bold text-emerald-700 hover:bg-emerald-100 transition-colors">
              <div className="flex items-center gap-3">
                <ArrowUpDown className="w-4 h-4 text-emerald-600" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-stone-200 shadow-xl bg-white p-1">
              {/* Pour le Tri, on utilise le focus émeraude standard */}
              <SelectItem
                value="desc"
                className={`${selectItemClasses} ${focusClasses.emerald}`}>
                Plus récents
              </SelectItem>
              <SelectItem
                value="asc"
                className={`${selectItemClasses} ${focusClasses.emerald}`}>
                Plus anciens
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* RESET */}
        {hasFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="h-12 px-6 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all">
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
        )}
      </div>
    </div>
  );
}
