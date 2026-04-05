import LoadingSpinner from "@/views/components/common/LoadingSpinner";

export default function GuidesLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-slate-600">Chargement des guides...</p>
    </div>
  );
}
