import LoadingSpinner from "@/views/components/common/LoadingSpinner";

export default function ArticlesLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-muted-foreground">Chargement des articles...</p>
    </div>
  );
}
