import { getSessionUser } from "@/lib/auth";
import DiscussionItem from "./DiscussionItem";
import { prisma } from "@/lib/prisma";

export default async function DiscussionList() {
  // 1. Appel de la logique serveur
  const userId = await getSessionUser();
  const isAuthenticated = !!userId;

  // 2. Récupération des données
  const discussions = await prisma.discussion.findMany({
    include: { author: true, _count: { select: { comments: true } } },
  });

  return (
    <div className="grid gap-4">
      {discussions.map((d) => (
        <DiscussionItem
          key={d.id}
          discussion={d}
          isAuthenticated={isAuthenticated}
          userId={userId || null}
        />
      ))}
    </div>
  );
}
