import { Users, MessageSquare, Lightbulb, Map } from "lucide-react";

export function mapCommunityStats(stats: {
  users: number;
  discussions: number;
  tips: number;
  location: number;
}) {
  return [
    {
      label: "Éleveurs",
      value: stats.users,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Discussions",
      value: stats.discussions,
      icon: MessageSquare,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Posts",
      value: stats.tips,
      icon: Lightbulb,
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Régions",
      value: stats.location,
      icon: Map,
      color: "bg-purple-50 text-purple-600",
    },
  ];
}
