// src/views/components/profil/LogoutButton.tsx
"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/views/components/ui/button";
import { useLogout } from "@/hooks/useLogout";

export function LogoutButton() {
  const { handleLogout, isLoading } = useLogout();

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="outline"
      className="flex items-center gap-4 text-red-500 hover:bg-red-500 hover:text-white hover:text-md focus:bg-red-500 focus:text-white transition-colors duration-300">
      <LogOut className="w-4 h-4" />
      <span>{isLoading ? "Déconnexion..." : "Déconnexion"}</span>
    </Button>
  );
}
