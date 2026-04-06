// src/views/components/TopMembers.tsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/views/components/ui/card";
import { getTopMembers } from "@/app/api/actions/membre.actions";

export default async function TopMembers() {
  const { data: members, success } = await getTopMembers();

  if (!success || members.length === 0) return null;

  return (
    <Card className="w-full bg-emerald-50 border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl">Membres du mois 🏆</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {members.map((member, index) => (
          <div key={member.id} className="flex items-center gap-3">
            {/* Avatar avec initiales */}
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 uppercase">
              {member.nom?.substring(0, 2) || "EL"}
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                {member.nom || `Éleveur_${index + 1}`}
              </p>
              <p className="text-xs text-slate-500">
                {member._count.posts}{" "}
                {member._count.posts > 1
                  ? "articles partagés"
                  : "article partagé"}
              </p>
            </div>

            {/* Badge de position pour le top 3 */}
            {index === 0 && <span className="ml-auto text-lg">🥇</span>}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
