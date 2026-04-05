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
      <CardContent className="p-8 flex items-center gap-6">
        {/* L'icône utilise le bgColor et le textColor pour rester assortie */}
        <div className={`p-4 rounded-xl ${bgColor} ${textColor}`}>
          <Icon className="w-8 h-8" />
        </div>

        <div className="flex flex-col">
          {/* Le label utilise maintenant dynamiquement le textColor passé en prop */}
          <span
            className={`text-sm font-medium uppercase tracking-wide ${textColor}`}>
            {label}
          </span>
          <span className="text-3xl font-black text-slate-900">
            {value.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
