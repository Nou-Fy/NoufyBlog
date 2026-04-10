// @/app/profile/page.tsx
import { getSessionUser, getUserProfileData } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { Card } from "@/components/ui/card";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import Link from "next/link";
import { FileText, PlusCircle } from "lucide-react";
import { UserPostsGrid } from "@/components/profile/UserPostsGrid";

export default async function ProfilePage() {
  // 1. Auth check
  const userId = await getSessionUser();
  if (!userId) redirect("/authentificate/sign-in");

  // 2. Data fetching
  const user = await getUserProfileData(userId);
  if (!user)
    return <p className="text-center py-20">Utilisateur introuvable.</p>;

  return (
    <div className="min-h-screen w-full bg-background">
      <Section bg="white" py="lg">
        <Container size="full">
          <ProfileHeader user={user} />
        </Container>
      </Section>

      <Section bg="stone-50" py="lg">
        <Container size="full">
          <div className="-mt-14 pb-12 flex flex-col gap-8">
            {/* Stats Dashboard */}
            <Card className="rounded-[2rem] border-none shadow-xl bg-card p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-black uppercase text-[10px] tracking-widest">
                    Tableau de bord
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    Vos statistiques en direct
                  </p>
                </div>
                <div className="bg-background px-8 py-4 rounded-2xl border border-border">
                  <ProfileStats
                    postsCount={user._count.posts}
                    commentsCount={user._count.comments}
                  />
                </div>
              </div>
            </Card>

            {/* Posts Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <h2 className="text-2xl font-black flex items-center gap-3">
                  <FileText className="text-emerald-600" /> Mes Publications
                </h2>
                <Link
                  href="/articles?show=true"
                  className="group flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-600 hover:text-white transition-all">
                  <PlusCircle className="w-4 h-4" /> Nouveau post
                </Link>
              </div>

              <UserPostsGrid posts={user.posts} />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
