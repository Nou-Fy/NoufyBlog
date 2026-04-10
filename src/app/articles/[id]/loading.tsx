import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function ArticleDetailLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-muted-foreground">Chargement de l'article...</p>
    </div>
  );
}
