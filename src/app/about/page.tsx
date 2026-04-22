import {
  Mail,
  ShieldCheck,
  Sprout,
  Users,
  Award,
  MapPin,
  UserCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import ContactForm from "@/components/nous_contacter/we-contacter";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Section bg="white" py="lg">
        <Container size="full">
          <div className="bg-card border-b border-border pt-20 pb-32 shadow-sm text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-700 text-xs font-black uppercase tracking-[0.2em]">
                Notre Histoire
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
                Passionnés par l'élevage <br />
                <span className="text-emerald-600">à Madagascar.</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl leading-8">
                NoufyBlog est bien plus qu'une simple blog. C'est un espace de
                partage dédié à la modernisation de l'aviculture malagasy et à
                la préservation de races d'exception ici à Madagascar.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="stone-50" py="lg">
        <Container size="full">
          <div className="-mt-16 pb-20">
            {/* --- VALEURS (GRILLE) --- */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  icon: <Sprout className="w-8 h-8 text-emerald-600" />,
                  title: "Élevage Bio",
                  desc: "Nous privilégions des méthodes naturelles et respectueuses de l'environnement pour des volailles en pleine santé.",
                },
                {
                  icon: <Award className="w-8 h-8 text-orange-500" />,
                  title: "Excellence ORNEMENT",
                  desc: "Spécialistes des races d'ornement, nous travaillons sur la sélection génétique pour garantir la pureté des lignées.",
                },
                {
                  icon: <Users className="w-8 h-8 text-blue-500" />,
                  title: "Communauté",
                  desc: "Un espace d'entraide pour tous les éleveurs, du débutant au professionnel, partout dans la Grande Île.",
                },
              ].map((val, i) => (
                <Card
                  key={i}
                  className="rounded-[2.5rem] border-none shadow-xl bg-card p-8 hover:scale-[1.02] transition-transform">
                  <div className="mb-6 bg-background w-16 h-16 rounded-2xl flex items-center justify-center">
                    {val.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {val.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-7">
                    {val.desc}
                  </p>
                </Card>
              ))}
            </div>

            {/* --- SECTION DÉTAILLÉE --- */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-[5/4] md:aspect-square rounded-[3rem] bg-emerald-100 overflow-hidden shadow-2xl relative flex items-center justify-center max-w-xl">
                  <Image
                    src="/noufyblog_removeBG.png"
                    alt="NoufyBlog logo"
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-8 rounded-[2rem] shadow-xl hidden md:block">
                  <p className="text-3xl font-black">100%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                    Origine Madagascar
                  </p>
                </div>
              </div>
              <div className="space-y-5">
                <h2 className="text-3xl md:text-4xl font-black text-foreground">
                  Pourquoi avoir créé ce blog ?
                </h2>
                <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-8">
                  <p>
                    L'aviculture à Madagascar possède un potentiel immense.
                    Cependant, l'accès à des informations techniques fiables
                    reste souvent difficile pour les éleveurs locaux.
                  </p>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <ShieldCheck className="text-emerald-500 w-6 h-6" />
                    </div>
                    <p className="text-base italic">
                      &quot;Notre objectif est de fournir des guides pratiques
                      sur l'hygiène, la reproduction et la gestion de ferme,
                      adaptés à notre contexte malgache.&quot;
                    </p>
                  </div>
                  <p>
                    Que vous soyez ici pour admirer nos Wyandottes ou pour
                    apprendre à protéger votre basse-cour contre la maladie de
                    Newcastle, vous êtes au bon endroit.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    href="/articles"
                    className="bg-card/90 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all">
                    Explorer le blog
                  </Link>

                  <div className="flex items-center gap-4 px-4 py-2">
                    {/* Taille ajustée (w-8) pour s'aligner sur la hauteur du bloc texte */}
                    <MapPin className="w-8 h-8 text-orange-500 stroke-[1.5]" />

                    <div className="flex flex-col justify-center">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-600 leading-none mb-1">
                        Localisation
                      </span>
                      <span className="text-xl md:text-2xl font-black text-foreground tracking-tight leading-tight">
                        Antananarivo,{" "}
                        <span className="text-emerald-600">Madagascar</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="white" py="lg">
        <Container size="full">
          <ContactForm />
        </Container>
      </Section>
    </div>
  );
}
