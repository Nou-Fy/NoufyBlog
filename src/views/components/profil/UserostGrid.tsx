// @/views/components/profil/UserPostsGrid.tsx
import Link from "next/link";
import { FileText, PlusCircle } from "lucide-react";
import { Card } from "@/views/components/ui/card";

export function UserPostsGrid({ posts }: { posts: any[] }) {
  if (posts.length === 0) {
    return (
      <div className="bg-card rounded-[2rem] p-12 text-center border-2 border-dashed border-border">
        <FileText className="w-12 h-12 text-muted-foreground/80 mx-auto mb-4" />
        <p className="text-muted-foreground font-medium">
          Vous n'avez pas encore publié d'article.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/articles?view=${post.id}&from=profil`}
          className="h-full">
          <Card className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-card overflow-hidden h-full flex flex-col">
            <div className="relative w-full h-48 bg-card/80 overflow-hidden">
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-all"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileText />
                </div>
              )}
            </div>
            <div className="p-5 flex flex-col gap-2 flex-1">
              <span className="text-[10px] font-black text-emerald-600 uppercase">
                {post.section}
              </span>
              <h3 className="font-bold line-clamp-2 flex-1">{post.title}</h3>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
