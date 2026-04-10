// src/views/components/RecentMembers.tsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { getLatestMonthlyMembers } from "@/app/api/actions/membre.actions";

export default async function RecentMembers() {
  const { data: members, success } = await getLatestMonthlyMembers();

  // On récupère le nom du mois en français pour le titre
  const currentMonth = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
  }).format(new Date());

  if (!success || members.length === 0) return null;

  return (
    <Card className="w-full border border-border bg-card shadow-sm rounded-3xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground capitalize">
          Nouveaux de {currentMonth} ✨
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between group rounded-2xl border border-border bg-card/80 p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-card/70 border border-border flex items-center justify-center text-xs font-bold uppercase text-muted-foreground">
                  {member.nom?.substring(0, 2) || "NV"}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {member.nom || "Éleveur anonyme"}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
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
