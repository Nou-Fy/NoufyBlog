export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-4 animate-pulse">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="h-4 w-32 bg-orange-100 rounded-full" />
          <div className="h-12 w-full bg-card/20 rounded-lg" />
          <div className="h-6 w-3/4 bg-card/10 rounded-md" />
          <div className="flex gap-4">
            <div className="h-10 w-32 bg-emerald-100 rounded-md" />
            <div className="h-10 w-32 bg-card/20 rounded-md" />
          </div>
        </div>
        <div className="aspect-video bg-card/70 rounded-3xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-48 bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="h-10 w-10 bg-amber-100 rounded-xl" />
            <div className="h-6 w-3/4 bg-card/20 rounded-md" />
            <div className="h-12 w-full bg-card/10 rounded-md" />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center pt-8 gap-3">
        <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-orange-600 font-medium animate-bounce">
          Fampidinana ny pejy...
        </p>
      </div>
    </div>
  );
}
