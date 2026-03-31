import { getSessionUser } from "@/lib/auth";
import { getUserProfileData } from "@/lib/services/user.services";
import { ProfileStats } from "@/views/components/ProfilStats";
import { AvatarUpload } from "@/views/components/profil/avatar-upload";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Mail, Calendar, FileText, LogOut, PlusCircle } from "lucide-react";
import { Button } from "@/views/components/ui/button";
import { Card } from "@/views/components/ui/card";

export default async function ProfilePage() {
  // 1. Responsabilité : Authentification
  const userId = await getSessionUser();

  if (!userId) {
    redirect("/authentificate/sign-in");
  }

  // 2. Responsabilité : Récupération des données (via le Service)
  const user = await getUserProfileData(userId);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <p className="text-slate-500 font-medium">Utilisateur introuvable.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* --- HEADER DU PROFIL --- */}
      <section className="bg-white border-b border-stone-200 pt-16 pb-24 px-4 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* Avatar Upload */}
          <AvatarUpload
            userId={user.id}
            defaultInitial={user.nom.charAt(0)}
            currentAvatar={user.avatar}
          />

          {/* Informations Utilisateur */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-200 text-emerald-700 text-[10px] font-black uppercase tracking-widest">
              {user.role}
            </span>
            <h1 className="text-4xl font-black text-slate-900">
              {user.prenom} {user.nom}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 text-sm">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-orange-500" /> {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-500" />
                Inscrit le{" "}
                {new Date(user.createdAt).toLocaleDateString("fr-FR")}
              </span>
            </div>
          </div>

          {/* Actions */}
          <Button
            variant="outline"
            className="rounded-2xl border-stone-200 hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut className="w-4 h-4 mr-2" /> Déconnexion
          </Button>
        </div>
      </section>

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="container mx-auto px-4 -mt-12 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tableau de bord */}
          <aside>
            <Card className="rounded-[2rem] border-none shadow-xl bg-white overflow-hidden p-8">
              <h3 className="font-black text-slate-900 mb-6 uppercase text-[10px] tracking-[0.2em]">
                Tableau de bord
              </h3>
              <ProfileStats
                postsCount={user._count.posts}
                commentsCount={user._count.comments}
              />
            </Card>
          </aside>

          {/* Liste des Publications */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <FileText className="text-emerald-600 w-6 h-6" />
                Mes Publications
              </h2>
              <Link
                href="/articles?show=true"
                className="group flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold hover:bg-orange-600 hover:text-white transition-all">
                <PlusCircle className="w-4 h-4" /> Nouveau post
              </Link>
            </div>

            {user.posts.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-16 text-center border-2 border-dashed border-stone-200">
                <FileText className="w-12 h-12 text-stone-200 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">
                  Vous n'avez pas encore publié d'article.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
                {user.posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/articles?view=${post.id}`}
                    className="h-full">
                    <Card className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-white overflow-hidden cursor-pointer flex flex-col h-full">
                      {/* Image */}
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

                      {/* Contenu texte */}
                      <div className="p-4 flex flex-col gap-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                            {post.section}
                          </span>
                        </div>
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
        </div>
      </main>
    </div>
  );
}
