// src/views/components/RecentMembers.tsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/views/components/ui/card";
import { getLatestMonthlyMembers } from "@/app/api/actions/membre.actions";

export default async function RecentMembers() {
  const { data: members, success } = await getLatestMonthlyMembers();

  // On récupère le nom du mois en français pour le titre
  const currentMonth = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
  }).format(new Date());

  if (!success || members.length === 0) return null;

  return (
    <Card className="border-stone-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-emerald-900 capitalize">
          Nouveaux de {currentMonth} ✨
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-600 uppercase">
                  {member.nom?.substring(0, 2) || "NV"}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {member.nom || "Éleveur anonyme"}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Inscrit le{" "}
                    {new Date(member.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
