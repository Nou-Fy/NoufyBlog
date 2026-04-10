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
      bgColor: "bg-blue-100 dark:bg-blue-500/15",
      textColor: "text-blue-600 dark:text-blue-300",
    },
    {
      label: "Discussions",
      value: stats.discussions,
      icon: MessageSquare,
      bgColor: "bg-emerald-100 dark:bg-emerald-500/15",
      textColor: "text-emerald-600 dark:text-emerald-300",
    },
    {
      label: "Posts",
      value: stats.tips,
      icon: Lightbulb,
      bgColor: "bg-orange-100 dark:bg-orange-500/15",
      textColor: "text-orange-600 dark:text-orange-300",
    },
    {
      label: "Régions",
      value: stats.location,
      icon: MapPinned,
      bgColor: "bg-purple-100 dark:bg-purple-500/15",
      textColor: "text-purple-600 dark:text-purple-300",
    },
  ];
}
