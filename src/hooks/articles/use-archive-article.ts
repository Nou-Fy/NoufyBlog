import { useCallback, useState } from "react";

export function useArchiveArticle() {
  const [loading, setLoading] = useState(false);

  const archive = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur lors de l'archivage");
      return { success: true } as const;
    } catch (e: any) {
      return { success: false, error: e?.message || "Erreur" } as const;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, archive };
}

