import LoadingSpinner from "@/views/components/common/LoadingSpinner";

export default function AboutLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-slate-600">Chargement de la page...</p>
    </div>
  );
}
