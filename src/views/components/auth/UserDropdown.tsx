"use client";

import { User, LayoutDashboard, LogOut, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/hooks/useLogout";

export function UserDropdown() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading: authLoading } = useAuth();
  const { handleLogout, isLoading: logoutLoading } = useLogout();

  if (authLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-emerald-800 animate-pulse border border-emerald-700" />
    );
  }

  // Si pas de session ou pas d'objet user, on ne rend rien
  if (!isLoggedIn || !user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-white hover:bg-emerald-800 hover:text-orange-400 font-semibold focus-visible:ring-0">
          <UserCircle size={22} className="text-orange-400" />
          <span className="hidden lg:inline">{user.prenom}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-white p-2 shadow-xl border-stone-200 mt-2">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold text-slate-900">
              {user.prenom} {user.nom}
            </p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => router.push("/profil")}
          className="cursor-pointer gap-2 focus:bg-emerald-50">
          <User size={16} /> Profil
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => router.push("/dashboard")}
          className="cursor-pointer gap-2 focus:bg-emerald-50">
          <LayoutDashboard size={16} /> Dashboard
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={logoutLoading}
          className="cursor-pointer text-red-600 font-bold gap-2 focus:bg-red-50">
          <LogOut size={16} />
          {logoutLoading ? "Déconnexion..." : "Déconnexion"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
