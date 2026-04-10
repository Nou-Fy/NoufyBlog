import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function NewGuideLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-muted-foreground">Préparation du formulaire...</p>
    </div>
  );
}
