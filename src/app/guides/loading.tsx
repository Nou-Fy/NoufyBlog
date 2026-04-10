import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function GuidesLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-muted-foreground">Chargement des guides...</p>
    </div>
  );
}
