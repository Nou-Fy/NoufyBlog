"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/views/components/ui/dialog";
import { Button } from "@/views/components/ui/button";
import {
  Settings,
  UserIcon,
  Mail,
  FileText,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/views/components/ui/card";

interface ProfilDetailsModalsProps {
  user: any;
}

export function ProfilDetailsModals({ user }: ProfilDetailsModalsProps) {
  const fullName = `${user.prenom} ${user.nom}`;

  return (
    <Dialog>
      {/* LE BOUTON EST ICI MAINTENANT */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="rounded-2xl border-stone-200 bg-emerald-600 text-white hover:bg-emerald-100 hover:text-emerald-700 transition-all">
          <Settings className="w-4 h-4 mr-2" />
          Modifier le profil
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none bg-stone-50">
        <DialogHeader className="sr-only">
          <DialogTitle>Profil de {fullName}</DialogTitle>
        </DialogHeader>

        {/* --- CONTENU DU MODAL --- */}
        <div className="relative pb-10">
          <div className="bg-emerald-700 h-32 w-full relative">
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="px-6 -mt-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center border-4 border-white shadow-md mb-3">
                      <UserIcon className="w-10 h-10 text-orange-600" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {fullName}
                    </h2>
                    <p className="text-emerald-600 text-sm font-medium mb-4">
                      Éleveur
                    </p>
                    <div className="w-full pt-4 border-t border-stone-100 text-left">
                      <div className="flex items-center gap-3 text-slate-600 text-xs">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stats rapides */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <p className="text-xs text-slate-400 uppercase">Articles</p>
                  <p className="text-xl font-bold">{user._count?.posts || 0}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <p className="text-xs text-slate-400 uppercase">Réponses</p>
                  <p className="text-xl font-bold">
                    {user._count?.comments || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
