import { Card, CardContent } from "@/views/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  bgColor,
  textColor,
}: StatCardProps) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 bg-white rounded-2xl overflow-hidden">
      <CardContent className="p-4 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* L'icône utilise le bgColor et le textColor pour rester assortie */}
        <div
          className={`p-3 sm:p-4 rounded-xl ${bgColor} ${textColor} flex-shrink-0`}>
          <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>

        <div className="flex flex-col min-w-0">
          {/* Le label utilise maintenant dynamiquement le textColor passé en prop */}
          <span
            className={`text-xs sm:text-sm font-medium uppercase tracking-wide ${textColor}`}>
            {label}
          </span>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 break-words">
            {value.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
