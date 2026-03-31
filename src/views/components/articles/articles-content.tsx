import { User, Clock } from "lucide-react";

interface ArticleContentProps {
  article: {
    title: string;
    content: string;
    imageUrl?: string | null;
    section?: string;
    createdAt: Date;
    author: {
      nom: string;
    };
  };
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div className="md:col-span-2 overflow-y-auto p-6 md:p-12 border-r border-stone-100">
      <img
        src={article.imageUrl || ""}
        alt={article.title}
        className="w-full h-80 object-cover rounded-[2rem] mb-8 shadow-md"
      />
      <div className="max-w-3xl mx-auto space-y-6">
        <span className="bg-emerald-100 text-emerald-700 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
          {article.section}
        </span>

        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1]">
          {article.title}
        </h2>

        <div className="flex items-center gap-6 text-sm text-slate-400 py-6 border-y border-stone-50">
          <div className="flex items-center gap-2 font-medium text-slate-600">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <User className="w-4 h-4" />
            </div>
            {article.author.nom}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-stone-300" />
            <span>
              {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap pb-10">
          {article.content}
        </p>
      </div>
    </div>
  );
}
