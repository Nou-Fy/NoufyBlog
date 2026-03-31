export function ProfileStats({
  postsCount,
  commentsCount,
}: {
  postsCount: number;
  commentsCount: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      <StatCard label="Articles" value={postsCount} color="text-emerald-600" />
      <StatCard
        label="Commentaires"
        value={commentsCount}
        color="text-orange-600"
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="p-4 rounded-3xl bg-stone-50 text-center border border-stone-100">
      <p className={`text-3xl font-black ${color}`}>{value}</p>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">
        {label}
      </p>
    </div>
  );
}
