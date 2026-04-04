// views/components/community/RecentDiscutssion.tsx

import DiscussionItem from "./DiscussionItem";

interface RecentDiscussionsProps {
  discussions: any[]; // Remplace par ton type PrismaDiscussion[]
  isAuthenticated: boolean;
  userId: string | null; // Ajoute cette ligne
}

export default function RecentDiscussions({
  discussions,
  isAuthenticated,
  userId,
}: RecentDiscussionsProps) {
  return (
    <div className="grid gap-4">
      {discussions.map((discussion) => (
        <DiscussionItem
          key={discussion.id}
          discussion={discussion}
          isAuthenticated={isAuthenticated}
          userId={userId} // On fait descendre l'ID d'un cran supplémentaire
        />
      ))}
    </div>
  );
}
