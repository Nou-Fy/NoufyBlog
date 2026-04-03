import { Card, CardContent } from "@/views/components/ui/card";

interface StatCardProps {
  label: string;
  value: number;
  icon: any;
  color: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 bg-white rounded-2xl overflow-hidden">
      <CardContent className="p-8 flex items-center gap-6">
        <div className={`p-4 rounded-xl ${color}`}>
          <Icon className="w-8 h-8" />
        </div>

        <div className="flex flex-col">
          <span className="text-3xl font-black text-slate-900">
            {value.toLocaleString()}
          </span>
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">
            {label}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
