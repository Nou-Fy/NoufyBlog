import { Users, MessageSquare, Lightbulb, MapPinned } from "lucide-react";

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
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      label: "Discussions",
      value: stats.discussions,
      icon: MessageSquare,
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      label: "Posts",
      value: stats.tips,
      icon: Lightbulb,
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      label: "Régions",
      value: stats.location,
      icon: MapPinned,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];
}
