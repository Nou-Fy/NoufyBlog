"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export function useLogout() {
  const router = useRouter();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // 1. Appel API pour supprimer le cookie/session côté serveur
      await fetch("/api/logout", { method: "POST" });

      // 2. Nettoyage de l'état global (Context)
      logout();

      // 3. Rafraîchir les Server Components et rediriger
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogout, isLoading };
}
