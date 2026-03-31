import Image from "next/image";
import Link from "next/link";
import { BookOpenText, Sprout, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/views/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/views/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative bg-amber-50 py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-500 text-sm font-semibold tracking-wide">
              Mpiompy Akoho Malagasy
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Réussissez votre élevage de poules à{" "}
              <span className="text-emerald-600">Madagascar</span>
            </h1>
            <p className="text-xl text-slate-700 max-w-2xl">
              Bienvenue sur{" "}
              <span className="font-bold text-orange-600">Noufy Blog</span>, la
              première ressource éducative dédiée aux éleveurs malgaches.
              Conseils pratiques, guides complets et partage d'expérience pour
              un élevage rentable et sain.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/blog">Lire les derniers articles</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                <Link href="/about">En savoir plus</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video md:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/hero-chickens.jpg"
              alt="Poules en plein air à Madagascar"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-medium font-medium uppercase tracking-widest text-orange-600">
              Notre Mission
            </h2>
            <p className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Un guide complet pour chaque étape
            </p>
            <p className="text-lg text-slate-600 pt-2">
              Que vous débutiez avec quelques poules "Gasy" ou que vous gériez
              une ferme avicole professionnelle, Akoho Blog vous accompagne avec
              des contenus adaptés au contexte malgache.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-md bg-stone-50 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="p-3 rounded-2xl bg-orange-100 w-fit mb-4">
                  <BookOpenText className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl text-slate-900">
                  Guides de Démarrage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  Apprenez les bases : construire un poulailler adapté au
                  climat, choisir les bonnes races (pondeuses, chair, Gasy) et
                  gérer votre budget.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-stone-50 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="p-3 rounded-2xl bg-emerald-100 w-fit mb-4">
                  <Sprout className="w-8 h-8 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl text-slate-900">
                  Alimentation Locale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  Comment nourrir vos poules efficacement en utilisant les
                  ressources disponibles à Madagascar (maïs, manioc, sons) pour
                  réduire les coûts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-stone-50 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="p-3 rounded-2xl bg-red-100 w-fit mb-4">
                  <ShieldCheck className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-slate-900">
                  Santé & Biosécurité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  Prévenir et traiter les maladies courantes (maladie de
                  Newcastle, variole). Calendriers de vaccination et hygiène du
                  poulailler.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-stone-50 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="p-3 rounded-2xl bg-sky-100 w-fit mb-4">
                  <Users className="w-8 h-8 text-sky-600" />
                </div>
                <CardTitle className="text-2xl text-slate-900">
                  Communauté
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">
                  Partagez vos succès, posez vos questions et connectez-vous
                  avec d'autres éleveurs de toutes les régions de l'île.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 lg:px-8 bg-stone-50">
        <div className="container mx-auto space-y-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/alimentation.jpg"
                alt="Alimentation des poules"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-slate-900">
                Optimisez l'
                <span className="text-orange-600">alimentation</span> pour une
                meilleure rentabilité
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                L'alimentation représente le plus gros coût de l'élevage. Nous
                publions des articles détaillés sur la formulation de rations
                équilibrées à base de produits locaux, vous aidant à maximiser
                la croissance de vos volailles ou la production d'œufs sans vous
                ruiner.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 md:order-last">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/sante.jpg"
                  alt="Soins vétérinaires"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 md:order-first">
              <h3 className="text-3xl font-bold text-slate-900">
                Protégez votre cheptel contre les{" "}
                <span className="text-red-600">maladies</span>
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                A Madagascar, les épidémies peuvent décimer un élevage en
                quelques jours. Nos guides de santé vous apprennent à
                reconnaître les symptômes tôt, à appliquer des mesures de
                biosécurité strictes et à suivre un programme de prophylaxie
                efficace adapté à votre région.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
