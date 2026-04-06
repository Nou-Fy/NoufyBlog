import Link from "next/link";
import Container from "@/views/components/common/Container";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-stone-50">
      <Container size="full" className="py-8">
        {/* Conteneur Principal : Aligne le bloc texte à gauche et le bouton à droite */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          {/* Bloc de Gauche : Empile les deux textes verticalement */}
          <div className="space-y-2 text-center md:text-left flex-1">
            <span className="text-emerald-600 font-bold tracking-widest text-sm uppercase block">
              Le Blog des Éleveurs Malagasy
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Dernières <span className="text-orange-600">Publications</span>
            </h1>
          </div>

          {/* Bloc de Droite : Le bouton seul */}
          <Link
            href="/articles?show=true"
            className="self-center md:self-auto bg-emerald-600 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap">
            + Ajouter un article
          </Link>
        </div>

        <section>{children}</section>
      </Container>
    </div>
  );
}
