"use client";

import { useState } from "react";
import {
  Plus,
  Home,
  ShieldCheck,
  ShoppingBasket,
  ArrowRight,
  Bird,
  EggIcon,
  Leaf,
  WheatIcon,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/views/components/ui/card";
import NewGuidePage from "./new/page"; // Vérifie bien le chemin vers ton formulaire

interface Props {
  isAdmin: boolean;
  initialGuides: any[];
}

export default function GuideClientPage({ isAdmin, initialGuides }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Liste statique de secours si la DB est vide (optionnel)
  const staticGuides = [
    {
      title: "Le Poulailler Idéal",
      icon: <Home className="w-8 h-8 text-orange-600" />,
      description: "Dimensions, isolation...",
      color: "bg-amber-50",
      badge: "Habitat",
    },
    {
      title: "Alimentation Locale",
      icon: <ShoppingBasket className="w-8 h-8 text-emerald-600" />,
      description: "Formuler ses rations...",
      color: "bg-stone-50",
      badge: "Économie",
    },
  ];

  // On fusionne ou on choisit quelle liste afficher
  const displayGuides = initialGuides.length > 0 ? initialGuides : staticGuides;

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {/* 1. BOUTON FLOTTANT : S'affiche UNIQUEMENT si isAdmin est true */}
      {isAdmin && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-700 hover:scale-110 transition-all flex items-center gap-2 group">
          <Plus className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap">
            Nouveau Guide
          </span>
        </button>
      )}

      {/* 2. MODALE FORMULAIRE : Uniquement pour l'admin */}
      {isAdmin && isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in duration-200">
            <NewGuidePage onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}

      {/* --- DESIGN DE TA PAGE --- */}
      <header className="bg-amber-50 py-20 px-4 border-b border-amber-100">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold tracking-wide">
            Ressources Éducatives
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Le Guide Complet de l'Élevage{" "}
            <span className="text-emerald-600">Familial</span>
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Retrouvez tous nos conseils pratiques adaptés au contexte local.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayGuides.map((guide, index) => (
            <Card
              key={index}
              className={`${guide.color || "bg-slate-50"} border-none shadow-md hover:shadow-xl transition-all duration-300 group`}>
              <CardHeader>
                <div className="p-3 rounded-2xl bg-white w-fit mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  {/* Gestion de l'icône (statique ou dynamique) */}
                  {guide.icon ? (
                    guide.icon
                  ) : (
                    <Bird className="w-8 h-8 text-emerald-600" />
                  )}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  {guide.badge}
                </div>
                <CardTitle className="text-2xl text-slate-900">
                  {guide.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 text-sm leading-relaxed">
                  {guide.description}
                </p>
                <button className="flex items-center text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors">
                  Lire le guide <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="py-8 px-4 bg-slate-900 text-slate-300 text-center">
        <p>&copy; 2026 NoufyBlog - Mpiompy Akoho Malagasy.</p>
      </footer>
    </div>
  );
}
