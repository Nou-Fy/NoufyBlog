export default function CommunityStatsSkeleton() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-slate-100 animate-pulse rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
}
