import { useCallback, useState } from "react";

export function useDiscussionResponses(discussionId: string) {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/responses?discussionId=${discussionId}`);
      const data = await res.json();
      setResponses((Array.isArray(data) ? data : []).filter((r: any) => !r.archived));
    } catch (e) {
      console.error("Erreur chargement:", e);
      setResponses([]);
    } finally {
      setLoading(false);
    }
  }, [discussionId]);

  const archiveResponse = useCallback(
    async (responseId: string) => {
      const res = await fetch(`/api/responses/${responseId}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || "Erreur lors de la suppression");
      }
      await refresh();
    },
    [refresh],
  );

  return { responses, loading, refresh, archiveResponse };
}

