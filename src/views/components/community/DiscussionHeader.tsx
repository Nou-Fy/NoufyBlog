import { User, Calendar } from "lucide-react";
import { PrismaDiscussion } from "@/types/community";

export function DiscussionHeader({
  discussion,
}: {
  discussion: PrismaDiscussion;
}) {
  return (
    <div className="bg-card/80 p-5 rounded-2xl border border-border shadow-sm mb-8">
      <p className="text-card-foreground font-medium leading-relaxed mb-4">
        {discussion.content}
      </p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5 font-semibold text-card-foreground">
          <User className="w-3.5 h-3.5" /> {discussion.author.nom || "Éleveur"}
        </span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />{" "}
          {new Date(discussion.createdAt).toLocaleDateString("fr-FR")}
        </span>
      </div>
    </div>
  );
}
