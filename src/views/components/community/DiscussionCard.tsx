import React from "react";
import { Card, CardContent } from "@/views/components/ui/card";
import { MessageSquare } from "lucide-react";

interface Discussion {
  id: number;
  title: string;
  author: string;
  replies: number;
  category: string;
  date: string;
}

interface Props {
  topic: Discussion;
}

export default function DiscussionCard({ topic }: Props) {
  return (
    <Card className="hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group bg-white border-slate-100">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2 flex-1 pr-4">
            <span className="px-2 py-1 rounded-md bg-stone-100 text-[10px] font-bold uppercase text-slate-500">
              {topic.category}
            </span>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
              {topic.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="font-medium text-slate-700">
                Par {topic.author}
              </span>
              <span>• {topic.date}</span>
            </div>
          </div>

          <div className="text-right min-w-[80px]">
            <div className="flex items-center justify-end gap-1.5 text-emerald-600 font-bold">
              <MessageSquare className="w-4 h-4" />
              {topic.replies}
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              réponses
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
