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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      {/* HERO SECTION */}
      <Section bg="background" py="lg">
        <Container size="full">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-4 order-2 md:order-1">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider">
                  ✨ Mpiompy Akoho Malagasy
                </span>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground leading-tight">
                  Réussissez votre{" "}
                  <span className="text-emerald-600">élevage</span> de poules
                </h1>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Bienvenue sur{" "}
                <span className="font-bold text-orange-600">Noufy Blog</span>,
                la première ressource éducative dédiée aux éleveurs malgaches.
                Conseils pratiques, guides complets et communauté engagée.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all group">
                  <Link href="/articles" className="flex items-center gap-2">
                    Lire les articles
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                  <Link href="/about">En savoir plus</Link>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white order-1 md:order-2">
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
              <span className="inline-block text-orange-600 text-sm font-bold uppercase tracking-widest">
                Notre Mission
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-foreground">
                Un guide complet pour chaque étape
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
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
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg group">
                <Image
                  src="/alimentation.jpg"
                  alt="Alimentation des poules"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-black text-foreground">
                  Optimisez l'
                  <span className="text-orange-600">alimentation</span>
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  L'alimentation représente le plus gros coût de l'élevage. Nos
                  articles détaillés vous aident à formule des rations
                  équilibrées à base de produits locaux, maximisant la
                  croissance sans excès de coûts.
                </p>
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 group">
                  Lire les articles
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Detail 2 */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-4 order-2 md:order-1">
                <h3 className="text-3xl md:text-4xl font-black text-foreground">
                  Protégez votre cheptel contre les{" "}
                  <span className="text-red-600">maladies</span>
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
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
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg group order-1 md:order-2">
                <Image
                  src="/sante.jpg"
                  alt="Soins vétérinaires"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
