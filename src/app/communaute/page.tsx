"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  Trophy,
  MapPin,
  ArrowRight,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/views/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/views/components/ui/card";

export default function CommunautePage() {
  const discussions = [
    {
      id: 1,
      title: "Conseils pour la maladie de Newcastle à Antsirabe",
      author: "Rivo M.",
      replies: 12,
      category: "Santé",
      date: "Il y a 2h",
    },
    {
      id: 2,
      title: "Où trouver du bon maïs concassé près de Tamatave ?",
      author: "Lova T.",
      replies: 5,
      category: "Alimentation",
      date: "Il y a 5h",
    },
    {
      id: 3,
      title: "Réussite : Mes premières Wyandottes sont arrivées !",
      author: "Nomena R.",
      replies: 24,
      category: "Succès",
      date: "Hier",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* HERO SECTION - COMMUNAUTÉ */}
      <section className="bg-emerald-700 py-16 px-4 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            L'Espace des Éleveurs Passionnés 🇲🇬
          </h1>
          <p className="text-xl text-emerald-50 max-w-2xl mx-auto mb-8">
            Rejoignez plus de 500 éleveurs malgaches. Échangez vos astuces,
            posez vos questions et progressez ensemble.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white border-none">
              <PlusCircle className="mr-2 w-5 h-5" /> Poser une question
            </Button>
          </div>
        </div>
      </section>

      {/* STATS RAPIDES */}
      <section className="relative -mt-8 px-4">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Membres actifs",
              value: "500+",
              icon: <Users className="text-emerald-600" />,
            },
            {
              label: "Discussions",
              value: "1.2k",
              icon: <MessageSquare className="text-orange-600" />,
            },
            {
              label: "Régions",
              value: "22",
              icon: <MapPin className="text-red-600" />,
            },
            {
              label: "Experts",
              value: "15",
              icon: <Trophy className="text-sky-600" />,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col items-center text-center">
              <div className="mb-2">{stat.icon}</div>
              <span className="text-2xl font-bold text-slate-900">
                {stat.value}
              </span>
              <span className="text-sm text-slate-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="container mx-auto py-16 px-4 grid lg:grid-cols-3 gap-12">
        {/* FIL DE DISCUSSION (PRINCIPAL) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Discussions récentes
            </h2>
            <Link
              href="/forum"
              className="text-emerald-600 hover:underline text-sm font-semibold">
              Voir tout le forum
            </Link>
          </div>

          {discussions.map((topic) => (
            <Card
              key={topic.id}
              className="hover:border-emerald-200 transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <span className="px-2 py-1 rounded-md bg-stone-100 text-[10px] font-bold uppercase text-slate-500">
                      {topic.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {topic.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="font-medium text-slate-700">
                        Par {topic.author}
                      </span>
                      <span>• {topic.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-emerald-600 font-bold">
                      <MessageSquare className="w-4 h-4" />
                      {topic.replies}
                    </div>
                    <span className="text-xs text-slate-400 font-medium tracking-tight">
                      réponses
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SIDEBAR - CLASSEMENT & REGIONS */}
        <div className="space-y-8">
          <Card className="bg-amber-50 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-xl">Membres du mois 🏆</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((m) => (
                <div key={m} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
                    M{m}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Éleveur_Gasy_{m}
                    </p>
                    <p className="text-xs text-slate-500">
                      +45 conseils partagés
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-stone-200">
            <CardHeader>
              <CardTitle className="text-xl italic text-emerald-800">
                Partagez votre ferme !
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                Envoyez-nous les photos de votre élevage pour être mis en avant
                sur notre page Facebook.
              </p>
              <Button
                variant="outline"
                className="w-full border-emerald-600 text-emerald-700">
                Envoyer mes photos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SECTION APPEL À L'ACTION (CTA) */}
      <section className="py-20 px-4 bg-white border-t border-stone-100">
        <div className="container mx-auto">
          <div className="bg-slate-900 rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
            <div className="space-y-4 relative z-10 md:max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Besoin d'un accompagnement personnalisé ?
              </h2>
              <p className="text-slate-400 text-lg">
                Nos experts modérateurs répondent à vos questions techniques
                sous 24h. Ne restez plus seul face aux difficultés.
              </p>
              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-700 mt-4">
                <Link href="/authentificate/sign-up">
                  Rejoindre le club gratuitement
                </Link>
              </Button>
            </div>
            <div className="md:w-1/3 relative z-10">
              <Users className="w-48 h-48 text-emerald-600/20 absolute -right-10 -bottom-20 rotate-12" />
              <MessageSquare className="w-32 h-32 text-orange-600/20 absolute -left-10 -top-20 -rotate-12" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 bg-slate-900 text-slate-300">
        <div className="container mx-auto text-center">
          <p>&copy; 2026 Noufy Blog - Mpiompy Akoho Malagasy.</p>
          <p className="text-sm mt-2 text-slate-500">
            Développé pour les mpiompy malagasy.
          </p>
        </div>
      </footer>
    </div>
  );
}
