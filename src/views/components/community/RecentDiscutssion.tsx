import React from "react";
import { PrismaDiscussion } from "@/types/community";
import DiscussionItem from "./DiscussionItem";

interface RecentDiscussionsProps {
  discussions: PrismaDiscussion[];
}

export default function RecentDiscussions({
  discussions,
}: RecentDiscussionsProps) {
  if (discussions.length === 0) {
    return (
      <div className="p-12 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
        <p className="text-slate-500">Aucune discussion trouvée.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {discussions.map((discussion) => (
        <DiscussionItem key={discussion.id} discussion={discussion} />
      ))}
    </div>
  );
}
