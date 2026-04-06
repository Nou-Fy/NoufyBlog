import Link from "next/link";
import { FileText, PlusCircle } from "lucide-react";
import { Card } from "@/views/components/ui/card";
import { DESIGN_SYSTEM } from "@/lib/constants/design-system";

export function ProfilePostsList({ posts }: { posts: any[] }) {
  return (
    <section className="lg:col-span-2 space-y-4">
      {" "}
      {/* Réduit de space-y-4 à space-y-4 */}
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
          <FileText className="text-emerald-600 w-6 h-6" />
          Mes Publications
        </h2>
        <Link
          href="/articles?show=true"
          className={`group flex items-center gap-2 ${DESIGN_SYSTEM.colors.secondary.light} ${DESIGN_SYSTEM.colors.secondary.text} px-4 py-2 ${DESIGN_SYSTEM.radius.full} text-sm font-bold hover:${DESIGN_SYSTEM.colors.secondary.bg} hover:text-white ${DESIGN_SYSTEM.transitions.default}`}>
          <PlusCircle className="w-4 h-4" /> Nouveau post
        </Link>
      </div>
      {posts.length === 0 ? (
        <div
          className={`${DESIGN_SYSTEM.colors.neutral.bg} ${DESIGN_SYSTEM.radius.lg} p-16 text-center border-2 border-dashed ${DESIGN_SYSTEM.colors.neutral.border}`}>
          <FileText className="w-12 h-12 text-stone-200 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">
            Vous n'avez pas encore publié d'article.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/articles?view=${post.id}`}
              className="h-full">
              <Card
                className={`group border-none ${DESIGN_SYSTEM.shadows.sm} hover:${DESIGN_SYSTEM.shadows.xl} ${DESIGN_SYSTEM.transitions.shadow} ${DESIGN_SYSTEM.radius.lg} ${DESIGN_SYSTEM.colors.neutral.bg} overflow-hidden flex flex-col h-full`}>
                <div className="relative w-full h-48 flex-shrink-0 bg-stone-100">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <FileText className="w-10 h-10" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                    {post.section}
                  </span>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 text-sm leading-snug flex-1">
                    {post.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium italic">
                    {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
