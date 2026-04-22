import Image from "next/image";
import Link from "next/link";
import {
  BookOpenText,
  Sprout,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      {/* HERO SECTION */}
      <Section bg="background" py="lg">
        <Container size="full">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Text Content */}
            <div className="space-y-5 order-2 md:order-1">
              <div className="space-y-5">
                <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-bold uppercase tracking-wider">
                  ✨ Mpiompy Akoho Malagasy
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight">
                  Réussissez votre{" "}
                  <span className="text-emerald-600">élevage</span> de poules
                </h1>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground leading-8 max-w-xl">
                Bienvenue sur{" "}
                <span className="font-bold text-orange-600">Noufy Blog</span>,
                la première ressource éducative dédiée aux éleveurs malgaches.
                Conseils pratiques, guides complets et communauté engagée.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-6">
                {/* Bouton Principal : Émeraude doux avec interaction subtile */}
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="!bg-emerald-500 !text-white font-semibold tracking-tight px-8 hover:scale-125 hover:opacity-100 rounded-xl shadow-sm hover:text-orange-500 hover:shadow-md transition-all duration-300 ease-in-out group">
                  <Link href="/articles" className="flex items-center gap-2.5">
                    Lire les articles
                    {/* L'icône bouge très légèrement, de manière fluide */}
                    <ArrowRight className="w-4 h-4 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </Button>

                {/* Bouton Secondaire : Minimaliste avec fond teinté au survol */}
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="!text-emerald-700 font-medium px-8 rounded-xl hover:scale-125 hover:!bg-emerald-50/80 transition-colors duration-300">
                  <Link href="/about">En savoir plus</Link>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[5/4] md:aspect-[6/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white order-1 md:order-2">
              <Image
                src="/hero-chickens.jpg"
                alt="Poules en plein air à Madagascar"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* FEATURES SECTION */}
      <Section bg="surface" py="lg">
        <Container size="full">
          <div className="space-y-4">
            {/* Header */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="inline-block text-orange-600 text-base font-bold uppercase tracking-widest">
                Notre Mission
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground">
                Un guide complet pour chaque étape
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-8">
                Que vous débutiez avec quelques poules ou gériez une ferme
                professionnelle, nous vous accompagnons avec des contenus
                adaptés à Madagascar.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: BookOpenText,
                  iconBg: "bg-orange-100",
                  iconColor: "text-orange-600",
                  title: "Guides de Démarrage",
                  description:
                    "Construire un poulailler, choisir les bonnes races et gérer votre budget.",
                },
                {
                  icon: Sprout,
                  iconBg: "bg-emerald-100",
                  iconColor: "text-emerald-600",
                  title: "Alimentation Locale",
                  description:
                    "Nourrir efficacement vos poules avec les ressources disponibles.",
                },
                {
                  icon: ShieldCheck,
                  iconBg: "bg-red-100",
                  iconColor: "text-red-600",
                  title: "Santé & Biosécurité",
                  description:
                    "Prévenir et traiter les maladies courantes pour protéger votre cheptel.",
                },
                {
                  icon: Users,
                  iconBg: "bg-sky-100",
                  iconColor: "text-sky-600",
                  title: "Communauté",
                  description:
                    "Connectez-vous avec d'autres éleveurs et partagez vos expériences.",
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={idx}
                    className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="space-y-4">
                      <div
                        className={`p-3 rounded-2xl ${feature.iconBg} w-fit transition-transform group-hover:scale-110`}>
                        <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                      </div>
                      <CardTitle className="text-xl text-card-foreground">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* DETAILS SECTION */}
      <Section bg="background" py="lg">
        <Container size="full">
          <div className="space-y-4">
            {/* Detail 1 */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-lg group">
                <Image
                  src="/alimentation.jpg"
                  alt="Alimentation des poules"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-5">
                <h3 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                  Optimisez l'
                  <span className="text-orange-600">alimentation</span>
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-8">
                  L'alimentation représente le plus gros coût de l'élevage. Nos
                  articles détaillés vous aident à formule des rations
                  équilibrées à base de produits locaux, maximisant la
                  croissance sans excès de coûts.
                </p>
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-orange-500 group">
                  Lire les articles
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Detail 2 */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-5 order-2 md:order-1">
                <h3 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                  Protégez votre cheptel contre les{" "}
                  <span className="text-red-600">maladies</span>
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-8">
                  Les épidémies peuvent décimer un élevage en quelques jours.
                  Nos guides vous apprennent à reconnaître les symptômes tôt et
                  à appliquer une prophylaxie efficace adaptée à votre région.
                </p>
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 group">
                  Voir les guides
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-lg group order-1 md:order-2">
                <Image
                  src="/sante.jpg"
                  alt="Soins vétérinaires"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-lg group">
                <Image
                  src="/communaute.jpg"
                  alt="Échanges entre éleveurs"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-5">
                <h3 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                  Échangez avec une{" "}
                  <span className="text-emerald-600">communauté</span> solidaire
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-8">
                  Ne restez plus jamais seul face à un défi. Rejoignez des amis
                  d'éleveurs pour partager vos expériences, poser vos questions
                  et trouver des solutions concrètes basées sur le terrain.
                </p>
                <Link
                  href="/communaute"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 group">
                  Rejoindre la discussion
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
