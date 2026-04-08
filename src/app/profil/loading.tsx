import LoadingSpinner from "@/views/components/common/LoadingSpinner";

export default function ProfilLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-muted-foreground">Chargement du profil...</p>
    </div>
  );
}
