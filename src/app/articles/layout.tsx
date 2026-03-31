import Link from "next/link";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Les Articles dans
            <span className="text-orange-600">Noufy</span>
            <span className="text-emerald-700">Blog</span>
          </h1>

          <Link
            href="/articles?show=true"
            className="bg-emerald-600 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-all shadow-md active:scale-95">
            + Ajouter un article dans
          </Link>
        </div>

        <section>{children}</section>
      </div>
    </div>
  );
}
