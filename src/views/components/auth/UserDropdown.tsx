"use client";

import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export function UserDropdown() {
  const router = useRouter();
  const { logout } = useAuth();

  const rooute = useRouter();

  const handlelogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    logout();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-2 text-slate-900 font-bold">
          <User size={16} />
          Mon compte
        </Button>
      </DropdownMenuTrigger>

      {/* On s'assure que le contenu a un fond blanc et du texte sombre */}
      <DropdownMenuContent
        align="end"
        className="bg-white text-slate-900 border-emerald-100">
        <DropdownMenuItem
          className="cursor-pointer focus:bg-emerald-500 focus:text-white focus:font-bold"
          onSelect={() => router.push("/profil")}>
          Profil
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer focus:bg-emerald-500 focus:text-white focus:font-bold">
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer focus:bg-emerald-500 focus:text-white focus:font-bold">
          Paramètres
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handlelogout}
          className="cursor-pointer text-red-500 focus:bg-red-50 focus:text-red-700 font-bold">
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
