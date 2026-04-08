import { getSessionUser, getUserProfileData } from "@/lib/auth";
import { ProfileStats } from "@/views/components/ProfilStats";
import { AvatarUpload } from "@/views/components/profil/avatar-upload";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Calendar,
  FileText,
  LogOut,
  PlusCircle,
  Zap,
  Settings,
  EditIcon,
} from "lucide-react";
import { Button } from "@/views/components/ui/button";
import { Card } from "@/views/components/ui/card";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/views/components/ui/collapsible";
import Container from "@/views/components/common/Container";
import Section from "@/views/components/common/Section";
import { ProfilDetailsModals } from "@/views/components/profil/ProfilDetails";

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground font-medium">Utilisateur introuvable.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      {/* --- HEADER DU PROFIL --- */}
      <Section bg="white" py="lg">
        <Container size="full">
          <div className="bg-card border-b border-border pt-8 pb-12 shadow-sm px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
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
                <h1 className="text-4xl font-black text-foreground">
                  {user.prenom} {user.nom}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-muted-foreground text-sm">
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
              {/* Actions */}
              <div className="flex flex-col justify-center gap-4">
                {/* On appelle juste le composant, il contient déjà son bouton */}
                <ProfilDetailsModals user={user} />

                <Button
                  variant="outline"
                  className="rounded-2xl border-border bg-red-600 text-white hover:bg-red-100 hover:text-red-700 transition-all">
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- CONTENU PRINCIPAL --- */}
      <Section bg="stone-50" py="lg">
        <Container size="full">
          <div className="-mt-6 pb-12 flex flex-col gap-8">
            {" "}
            {/* Utilisation de flex-col pour l'empilement */}
            {/* 1. TABLEAU DE BORD (S'adapte automatiquement à la largeur) */}
            <aside className="w-full">
              <Card className="rounded-[2rem] border-none shadow-xl bg-card overflow-hidden p-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Titre et Label */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-black text-foreground uppercase text-[10px] tracking-[0.2em]">
                      Tableau de bord
                    </h3>
                    <p className="text-muted-foreground text-xs font-medium">
                      Vos statistiques en direct
                    </p>
                  </div>

                  {/* Les stats sur une même ligne */}
                  <div className="flex items-center gap-8 bg-background px-8 py-4 rounded-2xl border border-border">
                    <ProfileStats
                      postsCount={user._count.posts}
                      commentsCount={user._count.comments}
                    />
                  </div>
                </div>
              </Card>
            </aside>
            {/* 2. LISTE DES PUBLICATIONS */}
            <section className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
                  <FileText className="text-emerald-600 w-6 h-6" />
                  Mes Publications
                </h2>
                <Link
                  href="/articles?show=true"
                  className="group flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 hover:text-white transition-all shadow-sm">
                  <PlusCircle className="w-4 h-4" /> Nouveau post
                </Link>
              </div>

              {user.posts.length === 0 ? (
                <div className="bg-card rounded-[2rem] p-12 text-center border-2 border-dashed border-border">
                  <FileText className="w-12 h-12 text-muted-foreground/80 mx-auto mb-4" />
                  <p className="text-muted-foreground font-medium">
                    Vous n'avez pas encore publié d'article.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
                  {user.posts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/articles?view=${post.id}&from=profil`}
                      className="h-full">
                      <Card className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-card overflow-hidden cursor-pointer flex flex-col h-full">
                        {/* Image */}
                        <div className="relative w-full h-48 flex-shrink-0 bg-card/80">
                          {post.imageUrl ? (
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground/70">
                              <FileText className="w-10 h-10" />
                            </div>
                          )}
                        </div>

                        {/* Contenu texte */}
                        <div className="p-5 flex flex-col gap-2 flex-1">
                          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                            {post.section}
                          </span>
                          <h3 className="font-bold text-foreground group-hover:text-emerald-600 transition-colors line-clamp-2 text-base leading-tight flex-1">
                            {post.title}
                          </h3>
                          <span className="text-[10px] text-muted-foreground font-medium italic">
                            {new Date(post.createdAt).toLocaleDateString(
                              "fr-FR",
                            )}
                          </span>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>
        </Container>
      </Section>
    </div>
  );
}
