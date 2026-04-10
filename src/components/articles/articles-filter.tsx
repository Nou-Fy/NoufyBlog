// @/components/articles/articles-filters.tsx
"use client";

import { useArticleFilters } from "@/hooks/articles/use-article-filters";
import {
  Search,
  Calendar,
  Tag,
  RotateCcw,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
    "text-sm text-muted-foreground cursor-pointer transition-colors";

  // Mixin pour le style de focus (survol) : Fond coloré, texte BLANC pour le contraste
  const focusClasses = {
    emerald: "focus:bg-emerald-600 focus:text-white",
    orange: "focus:bg-orange-500 focus:text-white",
    red: "focus:bg-red-600 focus:text-white",
    stone: "focus:bg-card/70 focus:text-foreground", // Pour le neutre, fond gris clair, texte sombre
  };

  return (
    <div
      className={`mb-12 space-y-4 transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}>
      <div className="flex flex-wrap items-center gap-4">
        {/* RECHERCHE */}
        <div className="relative flex-grow min-w-[250px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
          <input
            type="text"
            placeholder="Rechercher un conseil..."
            value={activeFilters.query}
            onChange={(e) => updateFilter("query", e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-card/80 border border-border rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all shadow-sm text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="min-w-[180px]">
          <Select
            value={activeFilters.category || "ALL"}
            onValueChange={(value) => updateFilter("category", value)}>
            <SelectTrigger className="h-12 border border-border rounded-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-600 bg-card/80 shadow-sm text-sm font-medium text-foreground hover:bg-card transition-colors">
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-emerald-600" />
                <SelectValue placeholder="Toutes les sections" />
              </div>
            </SelectTrigger>

            <SelectContent className="rounded-xl border border-border shadow-xl bg-card p-1 text-muted-foreground">
              {/* Option Neutre : gérée par le service avec category !== "ALL" */}
              <SelectItem
                value="ALL"
                className="text-sm text-muted-foreground cursor-pointer focus:bg-emerald-500/20 focus:text-foreground transition-colors">
                Toutes les sections
              </SelectItem>

              <SelectItem
                value="ASTUCE"
                className="text-sm text-muted-foreground cursor-pointer focus:bg-orange-500 focus:text-white transition-colors">
                💡 Astuces Gasy
              </SelectItem>

              <SelectItem
                value="SANTE"
                className="text-sm text-muted-foreground cursor-pointer focus:bg-red-600 focus:text-white transition-colors">
                💉 Santé & Vaccins
              </SelectItem>

              <SelectItem
                value="ALIMENTATION"
                className="text-sm text-muted-foreground cursor-pointer focus:bg-emerald-600 focus:text-white transition-colors">
                🌾 Alimentation
              </SelectItem>

              {/* Ajout de la section REPRODUCTION présente dans ton Enum */}
              <SelectItem
                value="REPRODUCTION"
                className="text-sm text-muted-foreground cursor-pointer focus:bg-sky-600 focus:text-white transition-colors">
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
            className="w-full h-12 pl-11 pr-4 bg-card/80 border border-border rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-600 shadow-sm text-sm font-medium text-foreground [color-scheme:light] [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer hover:bg-card transition-colors"
          />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70 pointer-events-none" />
        </div>

        <div className="min-w-[180px]">
          <Select
            value={activeFilters.sort || "desc"}
            onValueChange={(value) => updateFilter("sort", value)}>
            <SelectTrigger className="h-12 border border-border bg-card/80 rounded-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-600 shadow-sm text-sm font-bold text-foreground hover:bg-card transition-colors">
              <div className="flex items-center gap-3">
                <ArrowUpDown className="w-4 h-4 text-emerald-600" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-border shadow-xl bg-card p-1 text-muted-foreground">
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
