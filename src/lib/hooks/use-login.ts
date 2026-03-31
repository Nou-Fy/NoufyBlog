// @/hooks/use-articles-filters.ts
"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Correct : next/navigation
import { loginUser } from "@/app/api/actions/login";

// --- HOOK DE CONNEXION ---
export function useLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("email", form.email);
      formData.append("password", form.password);

      const result = await loginUser(formData);

      if (!result.success) {
        setError(result.error || "Identifiants invalides");
      }

      return result;
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue");
      return { success: false, error: "Une erreur est survenue" };
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    setForm,
    handleLogin,
    loading,
    error,
  };
}

// --- HOOK DES FILTRES D'ARTICLES ---
export function useArticleFilters() {
  // 1. Appel des hooks (avec parenthèses)
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // 2. Récupération des valeurs (via l'instance searchParams)
  const activeFilters = {
    query: searchParams.get("query") || "",
    category: searchParams.get("category") || "",
    date: searchParams.get("date") || "",
    sort: searchParams.get("sort") || "desc",
  };

  const hasFilters = !!(
    activeFilters.query ||
    activeFilters.category ||
    activeFilters.date
  );

  const updateFilter = (name: string, value: string) => {
    // On transforme l'objet ReadonlyURLSearchParams en chaîne modifiable
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(name, value);
    else params.delete(name);

    startTransition(() => {
      // On utilise l'instance 'router' retournée par le hook useRouter()
      router.push(`/articles?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      router.push("/articles");
    });
  };

  return {
    activeFilters,
    hasFilters,
    isPending,
    updateFilter,
    clearFilters,
  };
}
