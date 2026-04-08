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
          className="flex items-center gap-2 text-white hover:bg-white hover:text-orange-400 font-semibold focus-visible:ring-0">
          <UserCircle size={22} className="text-orange-400" />
          <span className="hidden lg:inline">{user.prenom}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-card p-2 shadow-xl border-border mt-2">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold text-foreground">
              {user.prenom} {user.nom}
            </p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => router.push("/profil")}
          className="cursor-pointer gap-2 transition-transform duration-500 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-700 dark:hover:text-emerald-300 hover:scale-125 focus:bg-emerald-50 dark:focus:bg-emerald-950 focus:text-emerald-700 dark:focus:text-emerald-300"
          style={{ transformOrigin: "left center" }}>
          Profil
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => router.push("/dashboard")}
          className="cursor-pointer gap-2 transition-transform duration-500 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-700 dark:hover:text-emerald-300 hover:scale-125 focus:bg-emerald-50 dark:focus:bg-emerald-950 focus:text-emerald-700 dark:focus:text-emerald-300"
          style={{ transformOrigin: "left center" }}>
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={logoutLoading}
          className="cursor-pointer transition-transform duration-500 text-red-600 dark:text-red-400 font-bold gap-2 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-700 dark:hover:text-red-300 hover:scale-125 focus:bg-red-50 dark:focus:bg-red-950 focus:text-red-700 dark:focus:text-red-300"
          style={{ transformOrigin: "left center" }}>
          {logoutLoading ? "Déconnexion..." : "Déconnexion"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
